// 客服聊天接口层。挂在 /api/business/chat 下（后端 chatRoutes.js）。
//
// 契约要点（读过后端源码，不是猜的）：
//   * 所有路由都要求**企业账号**（requireBusinessAccount），非企业角色一律 403。
//   * **POST /thread 与 POST /thread/messages 必须带 X-Idempotency-Key**，
//     缺失直接 400（后端 requireIdempotencyKey）。rating 和 faq/feedback
//     不强制，但带上无害，也让重试更安全。
//     同一个键换内容 → 409（后端按 requestHash 判定），所以**消息文本变了就要换新键**。
//   * POST /thread 用于**创建会话并带上第一句话**（首条消息不能走 messages 接口，
//     因为后端要求"会话已存在"）。
//   * GET /thread 带 ETag：未变化时返回 304，适合做廉价轮询。
//   * GET /events 是 SSE，但 authMiddleware **只读 Authorization 头**，
//     所以不能用 EventSource（它无法带头），必须用 fetch + ReadableStream。
import { apiClient } from './client';

const BASE = '/api/business/chat';

const newKey = (scope) => {
  const rand = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`);
  return `${scope}:${rand}`;
};

const authHeader = () => {
  const token = window.localStorage.getItem('surveyToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getChatFaq = async (locale = 'en-GB') => {
  const { data } = await apiClient.get(`${BASE}/faq`, { params: { locale } });
  return Array.isArray(data?.faq) ? data.faq : [];
};

export const getChatFaqItem = async (faqId, locale = 'en-GB') => {
  const { data } = await apiClient.get(`${BASE}/faq/${encodeURIComponent(faqId)}`, { params: { locale } });
  return data;
};

export const sendFaqFeedback = async (faqId, resolved) => {
  const { data } = await apiClient.post(
    `${BASE}/faq/${encodeURIComponent(faqId)}/feedback`,
    { resolved },
    { headers: { 'X-Idempotency-Key': newKey('faq-feedback') } },
  );
  return data;
};

/** 取当前会话。etag 未变时后端回 304，这里统一转成 { unchanged: true }。 */
export const getChatThread = async (etag) => {
  try {
    const res = await apiClient.get(`${BASE}/thread`, {
      headers: etag ? { 'If-None-Match': etag } : undefined,
      validateStatus: (s) => (s >= 200 && s < 300) || s === 304,
    });
    if (res.status === 304) return { unchanged: true };
    return { thread: res.data?.thread ?? null, etag: res.headers?.etag || null };
  } catch (error) {
    if (error?.response?.status === 304) return { unchanged: true };
    throw error;
  }
};

/** 创建会话并发出第一句话。message 变了必须换新 key（否则 409）。 */
export const startChatThread = async ({ message, triedFaqItemIds = [], key }) => {
  const { data } = await apiClient.post(
    `${BASE}/thread`,
    { message, triedFaqItemIds },
    { headers: { 'X-Idempotency-Key': key || newKey('chat-thread') } },
  );
  return data;
};

/** 会话已存在时的后续消息。 */
export const sendChatMessage = async ({ message, key }) => {
  const { data } = await apiClient.post(
    `${BASE}/thread/messages`,
    { message },
    { headers: { 'X-Idempotency-Key': key || newKey('chat-message') } },
  );
  return data;
};

export const markChatRead = async () => {
  const { data } = await apiClient.patch(`${BASE}/thread/read`);
  return data;
};

export const submitChatRating = async ({ score, comment, threadId }) => {
  const { data } = await apiClient.post(
    `${BASE}/thread/rating`,
    { score, ...(comment ? { comment } : {}), ...(threadId ? { threadId } : {}) },
  );
  return data;
};

/**
 * 订阅 SSE。返回一个可关闭的句柄。
 *
 * 为什么不用 EventSource：后端 authMiddleware 只认 Authorization 头，
 * 而 EventSource 无法自定义请求头，会直接 401。
 * 所以用 fetch 流式读取并手动解析 `event:` / `data:` 行。
 */
export const openChatStream = ({ onMessage, onState, onError } = {}) => {
  const controller = new AbortController();
  let stopped = false;

  const pump = async () => {
    try {
      const res = await fetch(`${apiClient.defaults.baseURL}${BASE}/events`, {
        headers: { ...authHeader(), Accept: 'text/event-stream' },
        signal: controller.signal,
      });
      if (!res.ok || !res.body) throw new Error(`stream HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (!stopped) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE 以空行分隔事件块。
        let split;
        while ((split = buffer.indexOf('\n\n')) !== -1) {
          const chunk = buffer.slice(0, split);
          buffer = buffer.slice(split + 2);

          let eventName = 'message';
          const dataLines = [];
          for (const line of chunk.split('\n')) {
            if (line.startsWith('event:')) eventName = line.slice(6).trim();
            else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
          }
          if (!dataLines.length) continue;
          let payload = null;
          try { payload = JSON.parse(dataLines.join('\n')); } catch { continue; }

          if (eventName === 'message') onMessage?.(payload?.message ?? payload);
          else if (eventName === 'state') onState?.(payload);
        }
      }
      if (!stopped) onState?.({ status: 'CLOSED_BY_SERVER' });
    } catch (error) {
      if (!stopped && error?.name !== 'AbortError') onError?.(error);
    }
  };

  void pump();
  return { close: () => { stopped = true; controller.abort(); } };
};

import { apiClient } from './client';

/**
 * AI 简报的会话。
 *
 * 形状照抄 `vercel/ai-chatbot`：会话（conversations）与消息（messages）分开，
 * 浏览器只持有会话 id；id 在地址栏里，刷新、分享、后退都靠它复原。
 *
 * 契约由后端实现（见 docs 里的任务卡）。在接口上线前，这组函数只被
 * VITE_AI_CONVERSATIONS=1 的分支调用，生产默认关闭。
 */

const BASE = '/api/business/ai/conversations';

const idempotency = () => {
  const bytes = new Uint8Array(16);
  (globalThis.crypto || window.crypto).getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

export const listConversations = async (limit = 20) => {
  const { data } = await apiClient.get(BASE, { params: { limit } });
  return data?.conversations ?? [];
};

export const createConversation = async (title) => {
  const { data } = await apiClient.post(
    BASE,
    title ? { title } : {},
    { headers: { 'X-Idempotency-Key': idempotency() } },
  );
  return data?.conversation ?? null;
};

export const getConversation = async (id) => {
  const { data } = await apiClient.get(`${BASE}/${encodeURIComponent(id)}`);
  return { conversation: data?.conversation ?? null, messages: data?.messages ?? [], draft: data?.draft ?? null };
};

export const saveDraft = async (id, payload) => {
  const { data } = await apiClient.patch(`${BASE}/${encodeURIComponent(id)}/draft`, { payload });
  return data;
};

export const deleteConversation = async (id) => {
  await apiClient.delete(`${BASE}/${encodeURIComponent(id)}`);
};

/** 接口上线前，前端用它判断走哪条路；后端就绪后把环境变量打开即可。 */
export const conversationsApiEnabled = import.meta.env.VITE_AI_CONVERSATIONS === '1';

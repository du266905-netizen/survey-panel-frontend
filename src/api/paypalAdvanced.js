import { apiClient } from './client';

/**
 * PayPal Advanced / Expanded Checkout（Buttons + CardFields）。
 *
 * 三步全部由服务端持有订单与账本：
 *   1. 读 SDK 需要的公开配置（client id / 币种 / intent）
 *   2. 用幂等键创建本地充值 + PayPal order，前端只拿 order id
 *   3. 批准后只把 order id 交回去，由服务端捕获
 *
 * 卡号、CVV 一律由 PayPal 托管的字段渲染，这里不接触，也不自建卡输入框。
 */

const BASE = '/api/business/account/recharge/paypal/advanced';

export const getPaypalAdvancedConfig = async () => {
  try {
    const { data } = await apiClient.get(`${BASE}/config`);
    /* 契约是 { paypal: { clientId, currency, intent } }；这里同时容忍
       直接返回 config 或裸对象，免得形状差一层就表现成“不可用”。 */
    const config = data?.paypal ?? data?.config ?? data;
    return config?.clientId ? config : null;
  } catch (error) {
    /* 把状态码带出去：面板要能区分“没登录”“没配置”“服务出错”，
       而不是统统说一句“暂不可用”。不记录任何令牌或响应体。 */
    const status = error?.response?.status ?? 0;
    const code = error?.response?.data?.code || error?.code || '';
    error.paypalStatus = status;
    error.paypalCode = code;
    throw error;
  }
};

export const createPaypalAdvancedOrder = async ({ amountUsd, fundingSource, idempotencyKey }) => {
  const { data } = await apiClient.post(
    `${BASE}/orders`,
    /* fundingSource 只声明用哪个官方组件（paypal / card），
       不携带任何卡数据、3DS 参数或服务商 payload。 */
    { amountUsd, fundingSource },
    { headers: idempotencyKey ? { 'X-Idempotency-Key': idempotencyKey } : undefined },
  );
  return data?.payment ?? null;
};

export const capturePaypalAdvancedOrder = async (paypalOrderId) => {
  const { data } = await apiClient.post(
    `${BASE}/orders/${encodeURIComponent(paypalOrderId)}/capture`,
  );
  return data?.payment ?? null;
};

/** 一次充值尝试用一把幂等键：重试复用，成功后作废。 */
export const newIdempotencyKey = () => {
  const bytes = new Uint8Array(16);
  (globalThis.crypto || window.crypto).getRandomValues(bytes);
  return `paypal:${Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')}`;
};

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
  const { data } = await apiClient.get(`${BASE}/config`);
  return data?.paypal ?? null;
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

import { apiClient } from './client';

/**
 * 发票与预算。契约见 docs/INTEGRATION-TASKS.md §10–§11。
 *
 * 前端只展示服务端给的状态与链接：
 *  - 不本地拼发票、不补编号、不伪造已付；
 *  - 下载直接用服务端给的短时 pdfUrl，不缓存、不转存。
 */

const INV = '/api/business/account/invoices';
const BUDGETS = '/api/business/account/budgets';

export const listInvoices = async ({ limit = 20, cursor } = {}) => {
  const { data } = await apiClient.get(INV, { params: { limit, ...(cursor ? { cursor } : {}) } });
  return { items: data?.items || [], nextCursor: data?.nextCursor || null };
};

export const getInvoice = async (id) => {
  const { data } = await apiClient.get(`${INV}/${encodeURIComponent(id)}`);
  return data;
};

export const listBudgets = async ({ limit = 20, cursor } = {}) => {
  const { data } = await apiClient.get(BUDGETS, { params: { limit, ...(cursor ? { cursor } : {}) } });
  return { items: data?.items || [], nextCursor: data?.nextCursor || null };
};

const idemKey = () =>
  (globalThis.crypto?.randomUUID?.() || `idem-${Date.now()}-${Math.random().toString(16).slice(2)}`);

/* Both writes come back as { budget } (and echo { duplicate: true } when the
   same key arrives twice). Callers only ever want the budget, so unwrap here.
   A caller that retries a failed submit passes the same key back in; a fresh
   key on retry would let the server create the row twice. */
export const createBudget = async ({ name, amountCents, startsAt, endsAt }, { key } = {}) => {
  const { data } = await apiClient.post(BUDGETS,
    { name, amountCents, startsAt, ...(endsAt ? { endsAt } : {}) },
    { headers: { 'X-Idempotency-Key': key || idemKey() } });
  return data?.budget ?? data;
};

export const updateBudget = async (id, patch, { key } = {}) => {
  const { data } = await apiClient.patch(`${BUDGETS}/${encodeURIComponent(id)}`, patch,
    { headers: { 'X-Idempotency-Key': key || idemKey() } });
  return data?.budget ?? data;
};

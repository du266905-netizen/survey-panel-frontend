import { apiClient } from './client';

/* Quote, AI allowance and answer-quality reads.
 *
 * One rule, enforced here rather than trusted: these responses may only carry
 * what a customer can see. Cost, margin, markup, supplier, CPI and every
 * threshold stay on the server. `assertPublic` throws in development when a
 * response carries an internal key, so a backend change that leaks one shows
 * up on the first screen that reads it instead of in a screenshot six weeks
 * later.
 */

const FORBIDDEN = [
  'cost', 'cogs', 'margin', 'markup', 'cpi', 'supplier', 'vendor', 'wholesale',
  'threshold', 'minseconds', 'stddev', 'lock', 'lease', 'worker', 'queue',
  'retrycount', 'featureflag', 'devicehash', 'useragent',
];

function walk(value, path, hits) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, hits));
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    const flat = key.toLowerCase();
    if (FORBIDDEN.some((word) => flat.includes(word))) hits.push(`${path}.${key}`);
    walk(child, `${path}.${key}`, hits);
  }
}

export function assertPublic(payload, label) {
  if (!import.meta.env?.DEV) return payload;
  const hits = [];
  walk(payload, label, hits);
  if (hits.length) {
    throw new Error(`Internal field in ${label} response: ${hits.join(', ')}`);
  }
  return payload;
}

export async function estimateQuote(brief) {
  const { data } = await apiClient.post('/api/business/quotes/estimate', { brief });
  return assertPublic(data, 'estimate');
}

export async function createQuote(payload, idempotencyKey) {
  const { data } = await apiClient.post('/api/business/quotes', payload, {
    headers: idempotencyKey ? { 'x-idempotency-key': idempotencyKey } : undefined,
  });
  return assertPublic(data, 'quote');
}

export async function getQuote(quoteId) {
  const { data } = await apiClient.get(`/api/business/quotes/${encodeURIComponent(quoteId)}`);
  return assertPublic(data, 'quote');
}

export async function getAiCredits() {
  const { data } = await apiClient.get('/api/business/ai/credits');
  return assertPublic(data, 'credits');
}

export async function getQuestionnaireQuality(questionnaireId) {
  const { data } = await apiClient.get(
    `/api/business/questionnaires/${encodeURIComponent(questionnaireId)}/quality`,
  );
  return assertPublic(data, 'quality');
}

/* 公开价目表 —— 客户看到的就是这张表，不含成本、加价或毛利。
 *
 * 自助研究必须当场出价：客户改受众、改长度、改份数，价格即时变，付钱即投放。
 * 因此客户端只能有"零售价"，不能有批发价、加价倍数或成本常量——那三样一旦
 * 打进包里，任何人打开 devtools 就能反推我们的采购价。
 *
 * 价目按"符合比例"分档；比例越低，找到合格受访者越贵。
 * 低于 5% 的自助不出价，转人工报价（可行性风险太高，硬报价必亏或必违约）。
 */

export const BANDS = [
  { min: 0.5, priceCents: 350, label: 'Broad population' },
  { min: 0.3, priceCents: 580, label: 'Category buyers' },
  { min: 0.15, priceCents: 1160, label: 'Screened audience' },
  { min: 0.05, priceCents: 3480, label: 'Narrow audience' },
];

export const MIN_ORDER_CENTS = 30000;   // $300
export const PAYMENT_FEE_RATE = 0.03;
export const BASE_LOI_MINUTES = 8;
export const LOI_RATE = 0.08;           // +8% per minute over the base
export const QUOTA_RATE = 0.03;         // +3% per extra quota cell
export const QUOTA_CAP = 1.3;

const band = (incidence) => BANDS.find((item) => incidence >= item.min) || null;

export const isSelfServe = (incidence) => Boolean(band(incidence));

export function pricePerCompleteCents(incidence, minutes = 8, quotaCells = 1) {
  const match = band(incidence);
  if (!match) return null;
  const length = 1 + Math.max(0, minutes - BASE_LOI_MINUTES) * LOI_RATE;
  const quotas = Math.min(QUOTA_CAP, 1 + Math.max(0, quotaCells - 1) * QUOTA_RATE);
  return Math.round(match.priceCents * length * quotas);
}

export function quoteFor({ incidence, minutes, quotaCells, completes }) {
  const unit = pricePerCompleteCents(incidence, minutes, quotaCells);
  if (unit === null) return { selfServe: false };
  const sampleCents = Math.max(MIN_ORDER_CENTS, unit * completes);
  const feeCents = Math.round(sampleCents * PAYMENT_FEE_RATE);
  return {
    selfServe: true,
    unitCents: unit,
    sampleCents,
    feeCents,
    totalCents: sampleCents + feeCents,
    minimumApplied: unit * completes < MIN_ORDER_CENTS,
  };
}

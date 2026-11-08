/* 钱显示统一走这里。
 *
 * 管理员接口给的 BusinessProjectQuote.amount 是「元」的浮点数（Float），
 * 不是分。前端不要自己猜单位，一律经过这个函数。 */
export const dollars = (value) => (value == null ? '—' : `$${Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 })}`);

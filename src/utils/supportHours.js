// 客服在线时间：周一至周六 10:00–22:00（中国标准时间 UTC+8）。
//
// 这里的规则来自产品要求，不是推测。抽成纯函数的原因：
// 它是整个组件里唯一能被严格验证的部分 —— 时区/边界/跨天都必须有测试兜住，
// 不能靠"上线看一眼"。

export const SUPPORT_TZ = 'Asia/Shanghai';
export const SUPPORT_OPEN_HOUR = 10; // 10:00
export const SUPPORT_CLOSE_HOUR = 22; // 22:00
// 周一=1 … 周六=6，周日=0 休息。
export const SUPPORT_WEEKDAYS = [1, 2, 3, 4, 5, 6];

const pad = (n) => String(n).padStart(2, '0');

/** 把一个绝对时间拆成"客服所在时区"的年月日时分。 */
export function partsInSupportTz(date = new Date()) {
  const dtf = new Intl.DateTimeFormat('en-GB', {
    timeZone: SUPPORT_TZ,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const out = {};
  for (const part of dtf.formatToParts(date)) {
    if (part.type !== 'literal') out[part.type] = part.value;
  }
  // Intl 在午夜可能给出 hour=24（hourCycle 差异），归一成 0。
  const hour = Number(out.hour) % 24;
  return {
    year: Number(out.year),
    month: Number(out.month),
    day: Number(out.day),
    hour,
    minute: Number(out.minute),
    second: Number(out.second),
  };
}

/**
 * 客服现在在线吗？
 * @returns {{online: boolean, weekday: number, hour: number, minute: number}}
 */
export function supportAvailability(now = new Date()) {
  const p = partsInSupportTz(now);
  // 用 UTC 构造只为取星期几（该日期就是客服时区的那一天）。
  const weekday = new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay();
  const online = SUPPORT_WEEKDAYS.includes(weekday) && p.hour >= SUPPORT_OPEN_HOUR && p.hour < SUPPORT_CLOSE_HOUR;
  return { online, weekday, hour: p.hour, minute: p.minute };
}

export function isSupportOnline(now = new Date()) {
  return supportAvailability(now).online;
}

/**
 * 下一次开始营业的时刻，用于"客服已离线"文案。
 * 逐小时向前试探——最多 8 天（192 小时）必定命中一个营业时段，
 * 比手写"加一天再处理周日"的边界逻辑更难写错。
 */
export function nextSupportOpening(now = new Date()) {
  const probe = new Date(now.getTime());
  probe.setUTCMinutes(0, 0, 0);
  for (let i = 0; i < 24 * 8; i += 1) {
    probe.setUTCHours(probe.getUTCHours() + 1);
    const p = partsInSupportTz(probe);
    const weekday = new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay();
    if (SUPPORT_WEEKDAYS.includes(weekday) && p.hour === SUPPORT_OPEN_HOUR) return new Date(probe.getTime());
  }
  return null;
}

const WEEKDAY_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAY_ZH = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

/** 形如 "Monday, October 12, 2026, 09:00 AM China Standard Time"（对齐参考设计）。 */
export function formatOpeningEn(opening) {
  if (!opening) return '';
  const s = new Intl.DateTimeFormat('en-US', {
    timeZone: SUPPORT_TZ,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(opening);
  // en-US 会输出 "Monday, October 12, 2026 at 10:00 AM" —— 把 " at " 换成逗号。
  return `${s.replace(' at ', ', ')} China Standard Time`;
}

/** 中文版："10月12日（周一）10:00"。 */
export function formatOpeningZh(opening) {
  if (!opening) return '';
  const p = partsInSupportTz(opening);
  const weekday = new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay();
  return `${p.month}月${p.day}日（${WEEKDAY_ZH[weekday]}）${pad(SUPPORT_OPEN_HOUR)}:00`;
}

/** 当前时间的可读形式，用于调试与客服端展示。 */
export function describeNow(now = new Date()) {
  const { online, weekday, hour, minute } = supportAvailability(now);
  return `${WEEKDAY_EN[weekday]} ${pad(hour)}:${pad(minute)} CST — ${online ? 'online' : 'offline'}`;
}

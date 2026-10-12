// 客服在线时间的边界测试。用 node:test 跑，不引入新依赖：
//   node --test src/utils/supportHours.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  supportAvailability,
  isSupportOnline,
  nextSupportOpening,
  formatOpeningEn,
  formatOpeningZh,
  partsInSupportTz,
  supportHoursLabel,
} from './supportHours.js';

// 中国标准时间 = UTC+8。下面全部用 UTC 构造，避免依赖跑测试的机器时区。
const cst = (y, m, d, hh, mm = 0) => new Date(Date.UTC(y, m - 1, d, hh - 8, mm));

test('营业中：周一 10:00 整点开门', () => {
  assert.equal(isSupportOnline(cst(2026, 10, 12, 10, 0)), true);
});

test('营业中：周一 21:59 仍在营业', () => {
  assert.equal(isSupportOnline(cst(2026, 10, 12, 21, 59)), true);
});

test('已打烊：周一 22:00 整点关闭（右开区间）', () => {
  assert.equal(isSupportOnline(cst(2026, 10, 12, 22, 0)), false);
});

test('已打烊：周一 09:59 未开门', () => {
  assert.equal(isSupportOnline(cst(2026, 10, 12, 9, 59)), false);
});

test('已打烊：周一 00:30 深夜', () => {
  assert.equal(isSupportOnline(cst(2026, 10, 12, 0, 30)), false);
});

test('休息：周日全天不在线（含原本的营业时段）', () => {
  for (const hh of [0, 10, 15, 21, 23]) {
    assert.equal(isSupportOnline(cst(2026, 10, 11, hh, 0)), false, `周日 ${hh}:00 不该在线`);
  }
});

test('周六 10:00–22:00 在线（周六是工作日）', () => {
  assert.equal(isSupportOnline(cst(2026, 10, 17, 10, 0)), true);
  assert.equal(isSupportOnline(cst(2026, 10, 17, 21, 0)), true);
});

test('时区：UTC 凌晨 2 点 = 北京时间 10 点，应在线', () => {
  // 2026-10-12 是周一。UTC 02:00 → CST 10:00
  assert.equal(isSupportOnline(new Date(Date.UTC(2026, 9, 12, 2, 0))), true);
});

test('时区：UTC 前一天 23:00 = 北京周一 07:00，未开门', () => {
  assert.equal(isSupportOnline(new Date(Date.UTC(2026, 9, 11, 23, 0))), false);
});

test('跨周：周日 23:00 时，下一次开门是周一 10:00', () => {
  const opening = nextSupportOpening(cst(2026, 10, 11, 23, 0));
  const p = partsInSupportTz(opening);
  assert.deepEqual(
    { y: p.year, m: p.month, d: p.day, h: p.hour },
    { y: 2026, m: 10, d: 12, h: 10 },
  );
});

test('跨天：周一 23:30 时，下一次开门是周二 10:00', () => {
  const opening = nextSupportOpening(cst(2026, 10, 12, 23, 30));
  const p = partsInSupportTz(opening);
  assert.deepEqual({ d: p.day, h: p.hour }, { d: 13, h: 10 });
});

test('当天未开门：周一 08:00 时，下一次开门是当天 10:00', () => {
  const opening = nextSupportOpening(cst(2026, 10, 12, 8, 0));
  const p = partsInSupportTz(opening);
  assert.deepEqual({ d: p.day, h: p.hour, minute: p.minute }, { d: 12, h: 10, minute: 0 });
});

test('营业中时，下一次开门是下一个工作日的 10:00（不是当前）', () => {
  const opening = nextSupportOpening(cst(2026, 10, 12, 15, 0));
  const p = partsInSupportTz(opening);
  assert.deepEqual({ d: p.day, h: p.hour }, { d: 13, h: 10 });
});

test('文案：英文格式含星期、日期与钟点，且不含时区全名（太长会把气泡撑成两行）', () => {
  const text = formatOpeningEn(nextSupportOpening(cst(2026, 10, 11, 23, 0)));
  assert.match(text, /Monday/);
  assert.match(text, /October 12, 2026/);
  assert.match(text, /10:00\s*AM/);
  assert.doesNotMatch(text, /China Standard Time/);
});

test('营业时段文案是 10:00–22:00（对用户只说钟点）', () => {
  assert.equal(supportHoursLabel(), '10:00–22:00');
});

test('文案：中文格式包含月日与周一', () => {
  const text = formatOpeningZh(nextSupportOpening(cst(2026, 10, 11, 23, 0)));
  assert.equal(text, '10月12日（周一）10:00');
});

test('availability 返回的 weekday 与客服时区一致（周日=0）', () => {
  assert.equal(supportAvailability(cst(2026, 10, 11, 12, 0)).weekday, 0);
  assert.equal(supportAvailability(cst(2026, 10, 12, 12, 0)).weekday, 1);
});

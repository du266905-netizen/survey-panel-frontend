#!/usr/bin/env node
/**
 * 构建产物里不许出现内部字段名。
 *
 *   node ops/check-no-internals.mjs
 *
 * 接口文档 docs/接口-定价-额度-质量.md §4 列了清单：成本、毛利、加价倍数、供应商、
 * 各类阈值、锁与队列状态。前端包里出现这些字样，说明有字段被判成“客户可见”，
 * 或者有人把内部常量写进了页面。两种都必须是硬失败。
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'dist/assets';
const FORBIDDEN = [
  'wholesale', 'markup', 'costCents', 'unitCost', 'grossMargin', 'supplierName',
  'vendorId', 'cpiUsd', 'minSeconds', 'stdDevThreshold',
];

let bad = 0;
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.js'))) {
  const source = readFileSync(join(DIR, file), 'utf8');
  for (const word of FORBIDDEN) {
    if (source.includes(word)) {
      console.error(`${DIR}/${file}: 出现内部字段 ${word}`);
      bad += 1;
    }
  }
}

/* Page-level guards: one source for price and one for status. */
const PAGES = readdirSync('src/pages').filter((f) => f.startsWith('Business') && f.endsWith('.jsx'));

const PAGE_RULES = [
  { re: /incidence\s*=\s*Math\./, msg: '自己算了 incidence，价格必须来自 content/rateCard.js' },
  { re: /const\s+STEPS\s*=\s*\[/, msg: '自己定义了步骤表，用 content/projectStatus.js 的 CLIENT_STEPS' },
  { re: /const\s+STATUS_TEXT\s*=/, msg: '自己定义了状态文案，用 statusLabel()' },
  { re: /statuses\[[^\]]*\]\s*\|\|\s*status\b/, msg: '状态直接回落枚举，用 statusLabel()' },
];

for (const page of PAGES) {
  const source = readFileSync(join('src/pages', page), 'utf8');
  for (const rule of PAGE_RULES) {
    if (rule.re.test(source)) {
      console.error(`src/pages/${page}: ${rule.msg}`);
      bad += 1;
    }
  }
}

/* One definition of "the report is released". Five places compared the status
   to APPROVED, one accepted SENT too: a SENT report was readable at its URL but
   hidden in the list and the sheet. */
const RELEASE_RULE = { re: /deliveryStatus[^\n]*===\s*'APPROVED'/, msg: '直接比较 deliveryStatus，用 isReportReleased()' };
const releaseFiles = [
  ...readdirSync('src/pages').filter((f) => f.startsWith('Business') && f.endsWith('.jsx')).map((f) => join('src/pages', f)),
  ...readdirSync('src/components').filter((f) => f.startsWith('Business') && f.endsWith('.jsx')).map((f) => join('src/components', f)),
  join('src/components', 'businessNextStep.js'),
];
for (const file of releaseFiles) {
  if (RELEASE_RULE.re.test(readFileSync(file, 'utf8'))) {
    console.error(`${file}: ${RELEASE_RULE.msg}`);
    bad += 1;
  }
}

if (bad) {
  console.error(`\n❌ 有 ${bad} 处问题`);
  process.exit(1);
}
console.log('✅ 构建产物没有内部字段，客户页没有第二套价格/状态实现');

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

if (bad) {
  console.error(`\n❌ 构建产物里有 ${bad} 处内部字段`);
  process.exit(1);
}
console.log('✅ 构建产物没有内部字段');

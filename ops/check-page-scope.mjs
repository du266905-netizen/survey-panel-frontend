#!/usr/bin/env node
/**
 * 页面样式不许被全站样表接管。
 *
 * 2026-10-26：public-no-mid-black / public-reading-flow / public-redesign 用
 * !important 把中国页压成白底单栏，页内怎么改都不生效，查了三轮才找到。
 * 因此加这条闸门：src/styles/ 下的全站样表里，不许出现某个页面的根选择器
 * （.china-market- / .industry-page / .business-marketing-page / .home-atlas …）。
 * 页面自己的样式写在 src/pages/<Page>.css。
 *
 *   node ops/check-page-scope.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/styles';
/* 目前只有中国页迁出了全站样表；其它页面迁完再往这里加。 */
const PAGE_ROOTS = ['china-market'];
let bad = 0;
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.css'))) {
  const lines = readFileSync(join(DIR, file), 'utf8').split('\n');
  lines.forEach((line, i) => {
    const selector = line.split('{')[0];
    if (selector.includes('!important')) return;
    for (const root of PAGE_ROOTS) {
      if (selector.includes(`.${root}`)) {
        console.log(`${DIR}/${file}:${i + 1}  ${selector.trim()}`);
        bad++;
        break;
      }
    }
  });
}
if (bad) {
  console.error(`\n❌ 全站样表里有 ${bad} 处页面选择器；页面样式请写回 src/pages/。`);
  process.exit(1);
}
console.log('✅ 全站样表没有接管任何页面的选择器');

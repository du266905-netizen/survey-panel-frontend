#!/usr/bin/env node
/**
 * 字号闸门 —— 全量扫描"档位外字号"（《闸门清单》G-09 的 `check-tokens`）。
 *
 * 唯一的档位出处是代码里的 Part 18：`src/pages/BusinessWorkspaceTheme.css`
 * （《规章制度》§0 铁律 1：标准只活在代码里，文档不复制数值）。本脚本**从那里解析**
 * 档位，不把数值写死在这里。
 *
 * 现状是历史上有大量档外字号。一次清完不现实，所以本闸门管的是**不许新增**：
 * 以 `ops/tokens-baseline.json` 为基线（按文件记出现次数），
 *   - 某文件的档外次数比基线多 → 失败；
 *   - 出现基线里没有的文件且带档外字号 → 失败；
 *   - 某文件变少或清空 → 通过（记得跑 `--update-baseline` 收紧基线）。
 *
 * 用法：
 *   node ops/check-tokens.js                     # 以基线比对，exit 0/1
 *   node ops/check-tokens.js --update-baseline   # 重写基线（人为收紧时用）
 *   node ops/check-tokens.js --report            # 只打印，不判失败
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SCALE_FILE = join(repoRoot, 'src/pages/BusinessWorkspaceTheme.css');
const SOURCE_DIR = join(repoRoot, 'src');
const BASELINE_FILE = join(repoRoot, 'ops/tokens-baseline.json');

const updateBaseline = process.argv.includes('--update-baseline');
const reportOnly = process.argv.includes('--report');

/* The scale lives in Part 18 of the theme file; read it rather than hard-code it.
   Lines look like `     13   UI       buttons, inputs, ...` — the number is
   followed by variable spacing then a label, so match that shape and not
   "digit + one space + letter". */
function readScale() {
  const css = readFileSync(SCALE_FILE, 'utf8');
  const block = css.match(/The scale is now:([\s\S]*?)\*\//);
  if (!block) throw new Error(`Cannot find the scale block in ${SCALE_FILE}`);
  const values = [...block[1].matchAll(/^\s*(\d+(?:\.\d+)?)\s+[A-Za-z]/gm)].map((m) => Number(m[1]));
  if (!values.length) throw new Error('Scale block parsed but contained no steps');
  // guard against the parser silently dropping a step again
  for (const required of [11, 13, 14, 16]) {
    if (!values.includes(required)) {
      throw new Error(`Scale parsed as [${values.join(', ')}] but ${required} is missing — fix the parser, do not trust this result.`);
    }
  }
  return values;
}

const ALLOWED = new Set(readScale());

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

/** Every font-size declaration in a source file, with the line it sits on. */
function offScaleIn(file) {
  const text = readFileSync(file, 'utf8');
  const hits = [];
  text.split('\n').forEach((line, index) => {
    const sizes = [
      ...line.matchAll(/font-size:\s*([\d.]+)px/g),
      ...line.matchAll(/fontSize:\s*['"]?([\d.]+)(?:px)?['"]?/g),
    ];
    for (const match of sizes) {
      const value = Number(match[1]);
      if (!Number.isFinite(value)) continue;
      // 0 and percentage-ish values are not steps; only px values are judged
      if (value === 0) continue;
      if (!ALLOWED.has(value)) hits.push({ line: index + 1, value, text: line.trim().slice(0, 100) });
    }
  });
  return hits;
}

const current = {};
for (const file of walk(SOURCE_DIR)) {
  if (!/\.(css|jsx|tsx|js)$/.test(file)) continue;
  const hits = offScaleIn(file);
  if (hits.length) current[relative(repoRoot, file).split('\\').join('/')] = hits;
}

const total = Object.values(current).reduce((sum, list) => sum + list.length, 0);

console.log(`=== 字号闸门 ===`);
console.log(`  档位（从 Part 18 解析）: ${[...ALLOWED].sort((a, b) => a - b).join(' / ')}`);
console.log(`  扫描目录              : src/`);
console.log(`  档外字号出现          : ${total} 处，涉及 ${Object.keys(current).length} 个文件`);

const top = Object.entries(current)
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 12);
if (top.length) {
  console.log(`  最多的文件：`);
  for (const [file, hits] of top) console.log(`    ${String(hits.length).padStart(5)}  ${file}`);
}

if (updateBaseline) {
  const payload = Object.fromEntries(Object.entries(current).map(([file, hits]) => [file, hits.length]));
  writeFileSync(BASELINE_FILE, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`  基线已写入: ${relative(repoRoot, BASELINE_FILE)}（${Object.keys(payload).length} 个文件）`);
  process.exit(0);
}

if (reportOnly) process.exit(0);

if (!existsSync(BASELINE_FILE)) {
  console.error(`\n  没有基线文件 ${relative(repoRoot, BASELINE_FILE)}；先跑 --update-baseline 建基线。`);
  process.exit(1);
}
const baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf8'));

const problems = [];
for (const [file, hits] of Object.entries(current)) {
  const was = baseline[file] ?? 0;
  if (hits.length > was) {
    problems.push(`${file}: ${was} → ${hits.length} 处档外字号（新增 ${hits.length - was}）`);
    for (const hit of hits.slice(0, 3)) console.log(`      ${file}:${hit.line}  ${hit.value}px  ${hit.text}`);
  }
}

if (problems.length) {
  console.error(`\n  ❌ 字号闸门未通过：${problems.length} 个文件的档外字号比基线多`);
  for (const problem of problems) console.error(`     - ${problem}`);
  console.error('     改回档位内的值，或（确有必要时）更新基线并说明理由。');
  process.exit(1);
}

const improved = Object.entries(baseline).filter(([file, count]) => (current[file]?.length ?? 0) < count);
console.log(`\n  ✅ 字号闸门通过：没有文件比基线多`);
if (improved.length) {
  console.log(`  （有 ${improved.length} 个文件比基线更干净，可跑 --update-baseline 收紧）`);
}

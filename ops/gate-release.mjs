#!/usr/bin/env node
/**
 * 对外发布闸门（External Release Gate）
 *   node ops/gate-release.mjs ops/release-manifest.json
 *
 * 铁律：**未过审 = 不许发出。**
 *   exit 0 = 可发（并自动写入 ops/releases.log）
 *   exit 1 = 不许发（不写日志）
 *
 * 设计原则（来自 2026-10-07 一轮发布的真实事故）：
 *   病根是"说的 ≠ 实际"，只是参照物换了一层。所以这里对**每一层交叉比对**都设卡：
 *     制作人 vs 审计员 / 清单 vs 实物 / 附件 vs 邮件 / 文件 vs 文件名 / 文档 vs 文档
 *
 * 任何判断失败一律 fail-closed：**宁可拦住好版本，也不放走坏版本。**
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

/* ROOT defaults to this script's repository. Set GATE_ROOT when the outward
   documents live elsewhere (they currently live in the workspace, which is not a
   repository), so the gate and its manifests can be versioned here. */
const ROOT = process.env.GATE_ROOT
  ? path.resolve(process.env.GATE_ROOT)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error('用法: node ops/gate-release.mjs <manifest.json>');
  process.exit(2);
}

const abs = (p) => (path.isAbsolute(p) ? p : path.join(ROOT, p));
const DRY_RUN = process.argv.includes('--dry-run');
const read = (p) => fs.readFileSync(abs(p), 'utf8');
const sha256 = (p) => crypto.createHash('sha256').update(fs.readFileSync(abs(p))).digest('hex');

/** 永远不许出现在外发文件里的东西 */
const NEVER_FORBIDDEN = [
  // 内部话术 / 纪律
  '使用说明', '三条纪律', '不要写', '不要提', '留到电话里说', 'Internal only', '仍不发', '绝不外发',
  // 商业条款（谈完价格才能给）
  'five to seven', '5 to 7', 'Bank transfer within',
];

const results = [];
const check = (name, fn) => {
  try { const note = fn(); results.push({ ok: true, name, note: note || '' }); }
  catch (e) { results.push({ ok: false, name, note: e.message }); }
};

let M;
try {
  M = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (e) {
  console.error(`❌ 清单读不了: ${e.message}`);
  process.exit(2);
}

const outwardDocs = M.outward_documents || [];
const scanned = [...(M.email_body ? [M.email_body] : []), ...outwardDocs];

// ── 1. 职责分离 ────────────────────────────────────────────────
check('制作人 ≠ 审计员，且都已填写', () => {
  if (!M.author?.trim()) throw new Error('未填 author（制作人）');
  if (!M.auditor?.trim()) throw new Error('未填 auditor（审计员）—— 没人审就是不许发');
  if (M.author.trim() === M.auditor.trim()) {
    throw new Error(`author 与 auditor 是同一个（${M.author}）—— 作者不得自己批自己`);
  }
  return `${M.author} → 审计 ${M.auditor}`;
});

// ── 2. 审计结论 ────────────────────────────────────────────────
check('审计结论为 approved', () => {
  if (M.audit_verdict !== 'approved') {
    throw new Error(`audit_verdict = ${JSON.stringify(M.audit_verdict)}（必须是 "approved"）→ 驳回`);
  }
  return 'approved';
});

// ── 3. 审计报告存在 ────────────────────────────────────────────
check('审计报告文件存在', () => {
  if (!M.audit_report) throw new Error('未填 audit_report');
  if (!fs.existsSync(abs(M.audit_report))) throw new Error(`找不到 ${M.audit_report}`);
  return M.audit_report;
});

// ── 4. 版本唯一性（防"两份都叫 Rev 1.0"）────────────────────────
check('无版本碰撞（同 Document + Revision 只能有一份非 SUPERSEDED）', () => {
  const skip = /(^|\/)(node_modules|dist|shots|\.chrome-profile|\.i18n-work|assets|archive)\//;
  const seen = new Map();
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = path.relative(ROOT, path.join(dir, e.name));
      if (skip.test(rel + '/')) continue;
      if (e.isDirectory()) { walk(path.join(dir, e.name)); continue; }
      if (!e.name.endsWith('.md')) continue;
      const txt = fs.readFileSync(path.join(dir, e.name), 'utf8');
      const doc = txt.match(/^\|\s*Document\s*\|\s*(.+?)\s*\|/m)?.[1];
      const rev = txt.match(/^\|\s*Revision\s*\|\s*(.+?)\s*\|/m)?.[1];
      if (!doc || !rev) continue;
      const key = `${doc} @@ ${rev}`;
      const superseded = /SUPERSEDED/i.test(txt.slice(0, 1200));
      if (!seen.has(key)) seen.set(key, []);
      seen.get(key).push({ rel, superseded });
    }
  };
  walk(ROOT);
  const clashes = [];
  for (const [key, files] of seen) {
    const live = files.filter((f) => !f.superseded);
    if (live.length > 1) clashes.push(`${key} → ${live.map((f) => f.rel).join('  vs  ')}`);
  }
  if (clashes.length) throw new Error(`版本碰撞:\n      ${clashes.join('\n      ')}`);
  return `${seen.size} 组 (Document, Revision) 无冲突`;
});

// ── 5/6/7. 密级标记 + 禁用词 ───────────────────────────────────
const forbidden = [...NEVER_FORBIDDEN, ...(M.also_forbidden || [])];

// 文档类外发件必须有密级行（邮件正文不算"文档"，不要求密级表）
for (const f of outwardDocs) {
  check(`外发文档有 Classification 行：${path.basename(f)}`, () => {
    if (!/^\|\s*Classification\s*\|/m.test(read(f))) throw new Error('缺 Classification 行');
    return '有';
  });
}
// 所有外发内容（含邮件正文）都不得含禁用词
for (const f of scanned) {
  check(`外发件无禁用词：${path.basename(f)}`, () => {
    const txt = read(f).toLowerCase();
    const hit = forbidden.filter((k) => txt.includes(k.toLowerCase()));
    if (hit.length) throw new Error(`命中: ${hit.join(' / ')}`);
    return `${forbidden.length} 个词已扫，0 命中`;
  });
}

for (const f of M.internal_only || []) {
  check(`内部件有 Internal 标记：${f}`, () => {
    if (!/Internal only/i.test(read(f))) throw new Error('缺 "Internal only" 标记');
    return '有';
  });
}

// ── 8. 附件：哈希 + 修订号与邮件一致 ───────────────────────────
for (const a of M.attachments || []) {
  check(`附件存在且哈希一致：${path.basename(a.path)}`, () => {
    if (!fs.existsSync(abs(a.path))) throw new Error('文件不存在');
    const got = sha256(a.path);
    if (a.sha256 && got !== a.sha256) throw new Error(`SHA-256 不符\n      清单: ${a.sha256}\n      实际: ${got}`);
    return got.slice(0, 16) + '…';
  });
  check(`附件修订号与邮件声明一致：${path.basename(a.path)}`, () => {
    if (!M.email_states_revision) throw new Error('清单未填 email_states_revision');
    if (a.revision && a.revision !== M.email_states_revision) {
      throw new Error(`附件是 ${a.revision}，邮件却声明 ${M.email_states_revision} —— 典型"邮件说 A、附件是 B"`);
    }
    const base = path.basename(a.path);
    if (!base.includes(M.email_states_revision)) {
      throw new Error(`附件文件名「${base}」里看不到修订号 ${M.email_states_revision} —— 无法从文件名排除误附旧稿`);
    }
    return `${M.email_states_revision} ✓`;
  });

  // 附件的修订号必须与**源文档内部**的 Revision 字段一致。
  // 2026-10-09：我生成品牌版 PDF 时把它命名成 Rev1.1，而文档内部仍写 1.0 ——
  // 文件名与内容不符，正是本闸门要拦的那一类，当时却查不出来。
  if (a.source) {
    check(`附件修订号与源文档内部一致：${path.basename(a.source)}`, () => {
      const txt = read(a.source);
      const inner = txt.match(/^\|\s*Revision\s*\|\s*(.+?)\s*\|/m)?.[1];
      if (!inner) throw new Error(`源文档 ${a.source} 没有 | Revision | 行，无法核对`);
      if (a.revision !== inner) {
        throw new Error(`附件声明 ${a.revision}，但源文档内部写的是 ${inner} —— 文件名与内容不符`);
      }
      return `内部 ${inner} = 声明 ${a.revision} ✓`;
    });
  }
}
if (!(M.attachments || []).length) {
  check('至少声明一个附件（或邮件正文即交付物）', () => {
    if (!M.email_body) throw new Error('既没有 attachments 也没有 email_body');
    return '无附件，仅有正文';
  });
}

// ── 10. 对外 PDF 必须嵌入品牌字体 ──────────────────────────────
// 依据：品牌字体规范.md §3.1。2026-10-09 发现已发出的 Integration Guide
// 整份是 DejaVu Serif（导出工具的 Linux 默认），看着尚可但**不是品牌字体**。
const ALLOWED_FONT_PREFIXES = [
  'SourceSerif4', 'BodoniModa', 'Inter',
  'SourceHanSerifSC', 'NotoSerifSC', 'SourceHanSansSC', 'NotoSansSC',
];

function pdfFontNames(file) {
  const buf = fs.readFileSync(abs(file));
  const names = new Set();
  // 两种键都要扫，缺一不可：
  //   /BaseFont  —— 多数生成器（含 Chrome 的页脚真实字体）
  //   /FontName  —— Chrome 把正文写成 Type3 字体，子集名只在 FontDescriptor 的 /FontName 上
  // 2026-10-09：只扫 /BaseFont 时，Chrome 生成的品牌字体 PDF 会"解不出字体"而误判。
  const scan = (txt) => {
    for (const m of txt.matchAll(/\/(?:BaseFont|FontName)\s*\/([A-Za-z0-9+\-_,.]+)/g)) names.add(m[1]);
  };
  scan(buf.toString('latin1'));                       // ① 不压缩的对象字典
  let i = 0;
  while ((i = buf.indexOf('stream', i)) !== -1) {     // ② 压缩流内部
    let s = i + 6;
    if (buf[s] === 13) s += 1;
    if (buf[s] === 10) s += 1;
    const e = buf.indexOf('endstream', s);
    if (e === -1) break;
    let data = buf.subarray(s, e);
    try { data = zlib.inflateSync(data); } catch { /* 未压缩的流，直接用 */ }
    scan(data.toString('latin1'));
    i = e + 9;
  }
  return [...names];
}

for (const a of M.attachments || []) {
  if (!/\.pdf$/i.test(a.path)) continue;
  check(`对外 PDF 嵌入品牌字体：${path.basename(a.path)}`, () => {
    const fonts = pdfFontNames(a.path);
    if (!fonts.length) throw new Error('解不出任何字体名 —— 无法判定，按不通过处理');
    const stripped = fonts.map((f) => f.replace(/^[A-Z]{6}\+/, ''));
    const bad = [...new Set(stripped.filter((f) => !ALLOWED_FONT_PREFIXES.some((p) => f.startsWith(p))))];
    if (bad.length) {
      throw new Error(`出现非品牌字体：${bad.join(', ')}\n      白名单：${ALLOWED_FONT_PREFIXES.join(' / ')}\n      依据：品牌字体规范.md §3.1`);
    }
    return `${fonts.length} 个字体全部在品牌白名单内`;
  });
}

// ── 9. 跨文档章节引用必须真实存在 ──────────────────────────────
for (const x of M.cross_references || []) {
  check(`章节引用可解析：${x.in} → ${x.target}`, () => {
    const target = read(x.target);
    const heads = new Set([...target.matchAll(/^##\s+(\d+)\./gm)].map((m) => Number(m[1])));
    const missing = (x.sections || []).filter((s) => !heads.has(Number(s)));
    if (missing.length) throw new Error(`目标文档没有 Section ${missing.join(', ')}（它只有 ${[...heads].join(', ')}）`);
    return `Section ${x.sections.join(', ')} ✓`;
  });
}

// ── 输出 ──────────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n);
console.log(`\n═══ 对外发布闸门 ═══  release: ${M.release_id || '(未命名)'}`);
console.log(`收件方: ${M.recipient || '(未填)'}\n`);
let failed = 0;
for (const r of results) {
  if (!r.ok) failed += 1;
  console.log(`  ${r.ok ? '✅' : '❌'} ${pad(r.name, 52)} ${r.note}`);
}

if (failed) {
  console.log(`\n❌ 未过审：${failed} 项失败 —— **不许发出**（未写入 releases.log）`);
  console.log('   修正后重新提交审计，再次跑本闸门。\n');
  process.exit(1);
}

const record = {
  at: new Date().toISOString(),
  release_id: M.release_id || '(未命名)',
  recipient: M.recipient || '',
  revision: M.email_states_revision || '',
  author: M.author,
  auditor: M.auditor,
  audit_report: M.audit_report,
  retrospective: M.retrospective === true,
  files: [
    ...scanned.map((f) => ({ path: f, sha256: sha256(f) })),
    ...(M.attachments || []).map((a) => ({ path: a.path, sha256: sha256(a.path) })),
  ],
};
if (DRY_RUN) {
  console.log(`\n✅ 过审：${results.length} 项全通过 —— 可以发出`);
  console.log('   ⚠️ --dry-run：**未**写入 ops/releases.log（本次不计入发出记录）\n');
} else {
  fs.appendFileSync(path.join(ROOT, 'ops/releases.log'), JSON.stringify(record) + '\n');
  console.log(`\n✅ 过审：${results.length} 项全通过 —— 可以发出`);
  if (record.retrospective) {
    console.log('   ⚠️ 本条标记 retrospective: true —— 该版本**已先发出**，这是事后补录 + 存证哈希');
  } else {
    console.log('   已写入 ops/releases.log（这是"我当初发的是哪一版"的权威答案）');
  }
  console.log('');
}
process.exit(0);

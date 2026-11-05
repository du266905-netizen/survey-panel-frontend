#!/usr/bin/env node
/**
 * 把 src/content/legal/*.md 编成 src/content/legal.js。
 *
 * 网页上的三份条款要跟 PDF 一模一样，所以不手抄内容：md 是唯一源，
 * 这里做一次最小转换（标题 / 段落 / 列表 / 粗体 / 斜体 / 链接 / 表格 / 分隔线），
 * 页面只负责排版。改了 md 就跑一次 `node scripts/build-legal.mjs`。
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = resolve(HERE, '../src/content/legal');
const OUT = resolve(HERE, '../src/content/legal.js');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

function blocks(lines) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    if (/^---+\s*$/.test(line)) { i += 1; continue; }
    if (/^### /.test(line)) { out.push(`<h3>${inline(line.slice(4))}</h3>`); i += 1; continue; }
    if (/^\|/.test(line)) {
      const raw = [];
      while (i < lines.length && /^\|/.test(lines[i])) { raw.push(lines[i]); i += 1; }
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const rows = raw.filter((r) => !/^\|[\s:|-]+\|$/.test(r)).map(cells);
      const head = rows.shift() || [];
      out.push(`<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>`
        + `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
      continue;
    }
    if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^- /.test(lines[i])) { items.push(lines[i].slice(2)); i += 1; }
      out.push(`<ul>${items.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>`);
      continue;
    }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#|\||- |---)/.test(lines[i])) { buf.push(lines[i]); i += 1; }
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out.join('\n');
}

const slugOf = (file) => file.replace(/\.md$/, '');

const docs = {};
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const md = readFileSync(join(DIR, file), 'utf8');
  const lines = md.split('\n');
  const title = (lines.find((l) => /^# /.test(l)) || '# Untitled').slice(2).trim();
  const dateLine = lines.find((l) => /^Effective /.test(l)) || '';
  const firstH2 = lines.findIndex((l) => /^## /.test(l));

  const preamble = lines
    .slice(lines.findIndex((l) => /^# /.test(l)) + 1, firstH2 < 0 ? lines.length : firstH2)
    .filter((l) => !/^Effective /.test(l));

  const sections = [];
  let current = null;
  for (const line of lines.slice(firstH2 < 0 ? lines.length : firstH2)) {
    if (/^## /.test(line)) {
      if (current) sections.push(current);
      const heading = line.slice(3).trim();
      const id = heading.toLowerCase().replace(/^\d+\.\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      current = { id, title: heading, lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);

  docs[slugOf(file)] = {
    title,
    date: dateLine.replace(/^Effective /, ''),
    pdf: `/legal/guanyisearch-${slugOf(file)}-2026-09-en.pdf`,
    lead: blocks(preamble),
    sections: sections.map((s) => ({ id: s.id, title: s.title, html: blocks(s.lines) })),
  };
}

const banner = '/* 自动生成：node scripts/build-legal.mjs —— 不要手改，改 src/content/legal/*.md */\n';
writeFileSync(OUT, `${banner}export const legalDocs = ${JSON.stringify(docs, null, 2)};\n`);
console.log('已生成', OUT, Object.keys(docs).map((k) => `${k}:${docs[k].sections.length} 节`).join(' · '));

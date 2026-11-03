/* Scan the help copy for the things we do not publish: gaps, internal
 * machinery, and other brands. Run after any content change.
 *
 *   node ops/check-help-copy.mjs
 */
import { ARTICLES } from '../src/help/content.js';

// Hard fails: gaps we must not advertise, and machinery we must not describe.
const ZH = ['尚未', '还没开通', '暂不支持', '暂未', '不支持', '不提供', '无法自助', '开通中', '逐步开放', '正在接通', '内部', '后台', '服务端', '数据库', '队列', '风控', '部署', '提示词'];
const EN = ['not yet', 'does not offer', 'do not offer', 'not supported', 'no self-service', 'unavailable', 'coming soon', 'internal', 'server', 'database', 'queue', 'deploy', 'prompt'];
const BRANDS = ['AAPOR', 'Pew', 'Roper', 'Gallup', 'Qualtrics', 'SurveyMonkey', 'Pollfish', 'Chatwoot', 'Claude', 'OpenAI'];

let hits = 0;
const walk = (slug, lang, text, terms) => {
  const lower = text.toLowerCase();
  terms.forEach((term) => {
    const needle = term.toLowerCase();
    let at = lower.indexOf(needle);
    while (at !== -1) {
      hits += 1;
      console.log(`${slug}\t${lang}\t${term}\t…${text.slice(Math.max(0, at - 40), at + 40).replace(/\n/g, ' ')}…`);
      at = lower.indexOf(needle, at + needle.length);
    }
  });
};

ARTICLES.forEach((article) => {
  ['zh', 'en'].forEach((lang) => {
    const copy = article[lang];
    const parts = [copy.title, copy.summary, ...copy.blocks.flatMap((b) => [b.h, b.p, b.note, ...(b.steps || [])])].filter(Boolean);
    parts.forEach((part) => walk(article.slug, lang, part, lang === 'zh' ? ZH : EN));
    parts.forEach((part) => walk(article.slug, lang, part, BRANDS));
  });
});

console.log(hits ? `\n${hits} hits` : '\nclean');
process.exit(hits ? 1 : 0);

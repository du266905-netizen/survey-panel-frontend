import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Check, Copy, Menu, Search } from 'lucide-react';
import { ARTICLES, CATEGORIES, findArticle } from '../help/content';
import { SOURCES } from '../help/sources';
import LanguageGlobe from '../components/LanguageGlobe';
import { useLanguage } from '../components/LanguageContext';
import './HelpCenter.css';

/* Public help centre, on the Claude Code docs frame:
 *
 *   bar      wordmark, doc title at 38, search, language
 *   nav      the categories as tabs, the current one underlined
 *   rail     groups of articles, the open one filled
 *   column   32 title, one line, the prose
 *   toc      "On this page" for the sections below
 *
 * There is no table-of-contents page: /help opens the first article, and the
 * rail plus the tabs are the way around. The one entry page lives in the
 * workspace at /business/help.
 */

const t = (entry, lang) => entry[lang] || entry.en;
const copyFor = (lang, zh, en) => (lang === 'zh' ? zh : en);

function Blocks({ blocks }) {
  return blocks.map((block, index) => {
    const key = `${index}-${block.h || block.p ? 'text' : 'list'}`;
    if (block.h) return <h2 key={key} id={`section-${index}`}>{block.h}</h2>;
    if (block.p) return <p key={key}>{block.p}</p>;
    if (block.steps) {
      return (
        <ol key={key} className="hc-steps">
          {block.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      );
    }
    if (block.note) return <p key={key} className="hc-note">{block.note}</p>;
    return null;
  });
}

export default function HelpCenter() {
  const { language, navigateToLanguage } = useLanguage();
  const lang = language.startsWith('zh') ? 'zh' : 'en';
  const { slug } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const article = slug ? findArticle(slug) : null;
  const copy = article ? t(article, lang) : null;
  const category = article ? CATEGORIES.find((item) => item.id === article.category) : null;

  const sections = useMemo(
    () => (copy ? copy.blocks.map((block, index) => ({ ...block, index })).filter((block) => block.h) : []),
    [copy],
  );

  // Only categories that actually carry articles earn a tab and a rail group.
  const groups = useMemo(
    () => CATEGORIES
      .map((group) => ({ ...group, items: ARTICLES.filter((entry) => entry.category === group.id) }))
      .filter((group) => group.items.length),
    [],
  );

  // Search is a jump list, not a page: it sits under the field and navigates.
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return ARTICLES
      .filter((item) => {
        const text = t(item, lang);
        const body = text.blocks.map((block) => block.h || block.p || (block.steps || []).join(' ')).join(' ');
        return `${text.title} ${text.summary} ${body}`.toLowerCase().includes(needle);
      })
      .slice(0, 8);
  }, [query, lang]);

  const copyPage = async () => {
    if (!copy) return;
    const lines = [copy.title, copy.summary];
    copy.blocks.forEach((block) => {
      if (block.h) lines.push(`## ${block.h}`);
      else if (block.p) lines.push(block.p);
      else if (block.steps) block.steps.forEach((step, index) => lines.push(`${index + 1}. ${step}`));
      else if (block.note) lines.push(`> ${block.note}`);
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: leave the label alone */
    }
  };

  const open = (nextSlug) => {
    setQuery('');
    navigate(`/help/${nextSlug}`);
  };

  // `/help` has no page of its own: it opens the first article.
  if (!article) return <Navigate to={`/help/${ARTICLES[0].slug}`} replace />;

  return (
    <div className="hc">
      <header className="hc-top">
        <div className="hc-brand">
          <Link to="/">
            <img src="/guanyisearch-wordmark.png" alt="guanyisearch" />
          </Link>
          <span className="hc-brand-rule" aria-hidden="true" />
          <Link to={`/help/${ARTICLES[0].slug}`} className="hc-brand-title">
            {copyFor(lang, '帮助中心', 'Help centre')}
          </Link>
        </div>
        <div className="hc-tools">
          <div className="hc-find">
            <label className="hc-search">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copyFor(lang, '搜索', 'Search')}
                aria-label={copyFor(lang, '搜索帮助文章', 'Search help articles')}
              />
              <kbd aria-hidden="true">⌘K</kbd>
            </label>
            {matches.length ? (
              <ul className="hc-find-list">
                {matches.map((item) => (
                  <li key={item.slug}>
                    <button type="button" onClick={() => open(item.slug)}>
                      {t(item, lang).title}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <button
            type="button"
            className="hc-lang"
            onClick={() => navigateToLanguage(lang === 'zh' ? 'en-US' : 'zh-CN')}
            aria-label={copyFor(lang, 'Switch to English', '切换到中文')}
            title={copyFor(lang, 'Switch to English', '切换到中文')}
          >
            <LanguageGlobe aria-hidden="true" size={17} strokeWidth={1.7} />
            <span>{lang === 'zh' ? '中文' : 'EN'}</span>
          </button>
        </div>
      </header>

      <nav className="hc-nav" aria-label={copyFor(lang, '分类', 'Categories')}>
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/help/${group.items[0].slug}`}
            className={article.category === group.id ? 'is-active' : ''}
          >
            {t(group, lang)}
          </Link>
        ))}
      </nav>

      <div className={`hc-shell${sections.length ? '' : ' is-two'}`}>
        <nav className="hc-side" aria-label={copyFor(lang, '全部文章', 'All articles')}>
          {groups.map((group) => (
            <section key={group.id} className="hc-group">
              <h2>{t(group, lang)}</h2>
              <ul>
                {group.items.map((entry) => {
                  const active = entry.slug === article.slug;
                  return (
                    <li key={entry.slug}>
                      <Link
                        to={`/help/${entry.slug}`}
                        className={active ? 'is-active' : ''}
                        aria-current={active ? 'page' : undefined}
                      >
                        {t(entry, lang).title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>

        <main className="hc-main">
          <div className="hc-head">
            <h1>{copy.title}</h1>
            <button type="button" className="hc-copy" onClick={copyPage}>
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              {copied ? copyFor(lang, '已复制', 'Copied') : copyFor(lang, '复制本页', 'Copy page')}
            </button>
          </div>

          <p className="hc-summary">{copy.summary}</p>
          <p className="hc-meta">{copyFor(lang, '持续更新', 'Kept up to date')}</p>

          <div className="hc-body">
            <Blocks blocks={copy.blocks} />
          </div>

          {SOURCES[article.slug] ? (
            <section className="hc-sources">
              <h2>{copyFor(lang, '参考来源', 'Sources')}</h2>
              <ul>
                {SOURCES[article.slug].map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer noopener">{source.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <footer className="hc-article-foot">
            <p>
              {copyFor(
                lang,
                '仍然没有解决？用右下角的客服找我们。',
                'Still stuck? Use the chat in the bottom-right corner.',
              )}
            </p>
          </footer>
        </main>

        {sections.length ? (
          <aside className="hc-toc" aria-label={copyFor(lang, '本页内容', 'On this page')}>
            <p className="hc-toc-title">
              <Menu size={15} aria-hidden="true" />
              {copyFor(lang, '本页内容', 'On this page')}
            </p>
            <ul>
              {sections.map((section) => (
                <li key={section.index}>
                  <a href={`#section-${section.index}`}>{section.h}</a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

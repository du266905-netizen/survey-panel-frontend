import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Check, Copy, Menu, Search } from 'lucide-react';
import { ARTICLES, CATEGORIES, findArticle } from '../help/content';
import { useLanguage } from '../components/LanguageContext';
import './HelpCenter.css';

/* Public help centre, built on the Claude Code docs frame:
 *
 *   bar      wordmark, doc title, search
 *   nav      the categories as tabs, the current one underlined
 *   rail     groups of articles, the open one filled
 *   column   eyebrow, 56 title, one line, the prose
 *   toc      "On this page" for the sections below
 *
 * There is one entry page and it lives in the workspace (`/business/help`).
 * `/help` is the public table of contents, not a second landing.
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
  const { language } = useLanguage();
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

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return null;
    return ARTICLES.filter((item) => {
      const text = t(item, lang);
      return `${text.title} ${text.summary}`.toLowerCase().includes(needle);
    });
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

  return (
    <div className="hc">
      <header className="hc-top">
        <div className="hc-brand">
          <Link to="/">
            <img src="/guanyisearch-wordmark.png" alt="guanyisearch" />
          </Link>
          <span className="hc-brand-rule" aria-hidden="true" />
          <Link to="/help" className="hc-brand-title">{copyFor(lang, '帮助中心', 'Help centre')}</Link>
        </div>
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
      </header>

      <nav className="hc-nav" aria-label={copyFor(lang, '分类', 'Categories')}>
        <Link to="/help" className={article ? '' : 'is-active'}>{copyFor(lang, '全部文章', 'All articles')}</Link>
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/help/${group.items[0].slug}`}
            className={article && article.category === group.id ? 'is-active' : ''}
          >
            {t(group, lang)}
          </Link>
        ))}
      </nav>

      {article ? (
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
              <div>
                <h1>{copy.title}</h1>
              </div>
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
      ) : (
        <div className="hc-shell is-index">
          <main className="hc-main hc-index">
            <h1 className="hc-sr-only">{copyFor(lang, '全部文章', 'All articles')}</h1>

            {results ? (
              <section className="hc-results">
                <p className="hc-count">
                  {copyFor(lang, `${results.length} 篇`, `${results.length} articles`)}
                </p>
                <ul>
                  {results.map((item) => {
                    const entry = t(item, lang);
                    return (
                      <li key={item.slug}>
                        <button type="button" onClick={() => navigate(`/help/${item.slug}`)}>
                          <strong>{entry.title}</strong>
                          <small>{entry.summary}</small>
                          <ArrowRight size={15} aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {results.length === 0 ? (
                  <p className="hc-empty">
                    {copyFor(lang, '没有匹配的文章。换个说法，或直接找客服。', 'No articles match. Try another phrase, or contact support.')}
                  </p>
                ) : null}
              </section>
            ) : (
              groups.map((group) => (
                <section key={group.id} className="hc-index-group">
                  <h2 className="hc-index-group-title">{t(group, lang)}</h2>
                  <ul>
                    {group.items.map((entry) => {
                      const entryCopy = t(entry, lang);
                      return (
                        <li key={entry.slug}>
                          <Link to={`/help/${entry.slug}`}>
                            <strong>{entryCopy.title}</strong>
                            <small>{entryCopy.summary}</small>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))
            )}
          </main>
        </div>
      )}
    </div>
  );
}

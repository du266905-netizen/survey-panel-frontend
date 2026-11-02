import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, ChevronRight, CreditCard, FolderOpen,
  BarChart3, Search, Sparkles, UserRound, Users,
} from 'lucide-react';
import { ARTICLES, CATEGORIES, findArticle } from '../help/content';
import { useLanguage } from '../components/LanguageContext';
import './HelpCenter.css';

/* Public help centre.
 *
 * The shape is the one Claude's support centre uses: a standing left rail of
 * category rows that open to their articles, a wide reading column with a
 * rail of section links on the right. The two rails stay put; only the middle
 * column scrolls far.
 */

const t = (entry, lang) => entry[lang] || entry.en;
const copyFor = (lang, zh, en) => (lang === 'zh' ? zh : en);

const ICONS = {
  start: Sparkles,
  projects: FolderOpen,
  recruiting: Users,
  results: BarChart3,
  payments: CreditCard,
  account: UserRound,
};

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
  const [openExtra, setOpenExtra] = useState([]);
  const [closedIds, setClosedIds] = useState([]);

  const article = slug ? findArticle(slug) : null;
  const copy = article ? t(article, lang) : null;
  const category = article ? CATEGORIES.find((item) => item.id === article.category) : null;

  const sections = useMemo(
    () => (copy ? copy.blocks.map((block, index) => ({ ...block, index })).filter((block) => block.h) : []),
    [copy],
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return null;
    return ARTICLES.filter((item) => {
      const text = t(item, lang);
      return `${text.title} ${text.summary}`.toLowerCase().includes(needle);
    });
  }, [query, lang]);

  /* The category holding the open article starts expanded; the rest stay
     closed until someone opens them by hand. */
  const isOpen = (groupId) => !closedIds.includes(groupId)
    && (Boolean(article && article.category === groupId) || openExtra.includes(groupId));

  const toggle = (groupId) => {
    if (isOpen(groupId)) {
      setClosedIds((current) => [...current, groupId]);
      setOpenExtra((current) => current.filter((id) => id !== groupId));
    } else {
      setOpenExtra((current) => [...current, groupId]);
      setClosedIds((current) => current.filter((id) => id !== groupId));
    }
  };

  const rail = (
    <nav className="hc-side" aria-label={copyFor(lang, '全部文章', 'All articles')}>
      {CATEGORIES.map((group) => {
        const items = ARTICLES.filter((entry) => entry.category === group.id);
        if (!items.length) return null;
        const Icon = ICONS[group.id] || FolderOpen;
        const open = isOpen(group.id);
        return (
          <section key={group.id} className={`hc-group${open ? ' is-open' : ''}`}>
            <button
              type="button"
              className="hc-group-title"
              onClick={() => toggle(group.id)}
              aria-expanded={open}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{t(group, lang)}</span>
              <ChevronRight size={16} className="hc-group-chevron" aria-hidden="true" />
            </button>
            {open ? (
              <ul>
                {items.map((entry) => {
                  const active = Boolean(article && entry.slug === article.slug);
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
            ) : null}
          </section>
        );
      })}
    </nav>
  );

  return (
    <div className="hc">
      <header className="hc-top">
        <Link to="/" className="hc-brand">
          <img src="/guanyisearch-wordmark.png" alt="guanyisearch" />
        </Link>
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

      <div className={`hc-shell${article ? (sections.length ? '' : ' is-two') : ' is-home'}`}>
        {article ? rail : null}

        <main className="hc-main">
          {article ? (
            <>
              <nav className="hc-crumbs" aria-label="Breadcrumb">
                <Link to="/help">{copyFor(lang, '帮助中心', 'Help centre')}</Link>
                <span aria-hidden="true">/</span>
                <span>{t(category, lang)}</span>
              </nav>

              <h1>{copy.title}</h1>
              <p className="hc-summary">{copy.summary}</p>
              <p className="hc-meta">
                {copyFor(lang, '持续更新', 'Kept up to date')}
              </p>

              <div className="hc-body">
                <Blocks blocks={copy.blocks} />
              </div>

              <footer className="hc-article-foot">
                <Link to="/help" className="hc-back">
                  <ArrowLeft size={15} aria-hidden="true" />
                  {copyFor(lang, '全部文章', 'All articles')}
                </Link>
                <p>
                  {copyFor(
                    lang,
                    '仍然没有解决？用右下角的客服找我们。',
                    'Still stuck? Use the chat in the bottom-right corner.',
                  )}
                </p>
              </footer>
            </>
          ) : results ? (
            <section className="hc-results">
              <h1>{copyFor(lang, '搜索结果', 'Search results')}</h1>
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
            <section className="hc-home">
              <h1>{copyFor(lang, '帮助中心', 'Help centre')}</h1>
              <p className="hc-summary">
                {copyFor(lang, '先按主题找，找不到再用上面的搜索。', 'Browse by topic, or use search above.')}
              </p>
              <div className="hc-cards">
                {CATEGORIES.filter((item) => ARTICLES.some((entry) => entry.category === item.id)).map((group) => {
                  const items = ARTICLES.filter((entry) => entry.category === group.id);
                  const Icon = ICONS[group.id] || FolderOpen;
                  return (
                    <article key={group.id} className="hc-card">
                      <header>
                        <Icon size={18} aria-hidden="true" />
                        <h2>{t(group, lang)}</h2>
                        <span>{items.length}</span>
                      </header>
                      <p>{lang === 'zh' ? group.zhNote : group.enNote}</p>
                      <ul>
                        {items.map((entry) => (
                          <li key={entry.slug}>
                            <Link to={`/help/${entry.slug}`}>{t(entry, lang).title}</Link>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </main>

        {article && sections.length ? (
          <aside className="hc-toc" aria-label={copyFor(lang, '本页内容', 'On this page')}>
            <p className="hc-toc-title">{copyFor(lang, '本页内容', 'On this page')}</p>
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

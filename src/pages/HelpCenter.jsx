import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { ARTICLES, CATEGORIES, findArticle } from '../help/content';
import { useLanguage } from '../components/LanguageContext';
import './HelpCenter.css';

/* Public help centre: search, categories, article.
 *
 * The layout follows the researcher help centres of comparable products —
 * search first, categories as cards, one article per page with a short
 * breadcrumb — and uses the same paper/ink palette as the public pay page. */

const t = (entry, lang) => entry[lang] || entry.en;

function Blocks({ blocks }) {
  return blocks.map((block, index) => {
    const key = `${index}-${block.h || block.p ? 'text' : 'list'}`;
    if (block.h) return <h2 key={key}>{block.h}</h2>;
    if (block.p) return <p key={key}>{block.p}</p>;
    if (block.steps) {
      return (
        <ol key={key} className="help-steps">
          {block.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      );
    }
    if (block.note) return <p key={key} className="help-note">{block.note}</p>;
    return null;
  });
}

export default function HelpCenter() {
  const { language } = useLanguage();
  const lang = language.startsWith('zh') ? 'zh' : 'en';
  const { slug } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const article = slug ? findArticle(slug) : null;
  const category = article ? CATEGORIES.find((item) => item.id === article.category) : null;

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return null;
    return ARTICLES.filter((item) => {
      const copy = t(item, lang);
      return `${copy.title} ${copy.summary}`.toLowerCase().includes(needle);
    });
  }, [query, lang]);

  const related = useMemo(() => {
    if (!article) return [];
    return ARTICLES.filter((item) => item.category === article.category && item.slug !== article.slug);
  }, [article]);

  if (article) {
    const copy = t(article, lang);
    return (
      <main className="help-page">
        <header className="help-top">
          <Link to="/help" className="help-back">
            <ArrowLeft size={16} aria-hidden="true" />
            {lang === 'zh' ? '帮助中心' : 'Help centre'}
          </Link>
        </header>

        <article className="help-article">
          <p className="help-eyebrow">{t(category, lang)}</p>
          <h1>{copy.title}</h1>
          <p className="help-summary">{copy.summary}</p>
          <div className="help-body">
            <Blocks blocks={copy.blocks} />
          </div>

          {related.length ? (
            <aside className="help-related">
              <h2>{lang === 'zh' ? '相关文章' : 'Related articles'}</h2>
              <ul>
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/help/${item.slug}`}>{t(item, lang).title}</Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <p className="help-foot">
            {lang === 'zh'
              ? '仍然没有解决？使用页面右下角的客服，或发邮件给我们。'
              : 'Still stuck? Use the chat in the bottom-right corner, or email us.'}
          </p>
        </article>
      </main>
    );
  }

  return (
    <main className="help-page">
      <header className="help-top">
        <Link to="/" className="help-brand">
          <img src="/guanyisearch-wordmark.png" alt="guanyisearch" />
        </Link>
      </header>

      <section className="help-hero">
        <h1>{lang === 'zh' ? '帮助中心' : 'Help centre'}</h1>
        <label className="help-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={lang === 'zh' ? '搜索问题，例如：付款失败' : 'Search, for example: payment failed'}
            aria-label={lang === 'zh' ? '搜索帮助文章' : 'Search help articles'}
          />
        </label>
      </section>

      {matches ? (
        <section className="help-results">
          <p className="help-count">
            {lang === 'zh' ? `${matches.length} 篇结果` : `${matches.length} results`}
          </p>
          <ul>
            {matches.map((item) => {
              const copy = t(item, lang);
              return (
                <li key={item.slug}>
                  <button type="button" onClick={() => navigate(`/help/${item.slug}`)}>
                    <strong>{copy.title}</strong>
                    <small>{copy.summary}</small>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
          {matches.length === 0 ? (
            <p className="help-empty">
              {lang === 'zh' ? '没有匹配的文章。换个说法试试，或直接联系客服。' : 'No articles match. Try another phrase, or contact support.'}
            </p>
          ) : null}
        </section>
      ) : (
        <section className="help-categories">
          {CATEGORIES.filter((item) => ARTICLES.some((entry) => entry.category === item.id)).map((item) => {
            const items = ARTICLES.filter((entry) => entry.category === item.id);
            return (
              <article key={item.id} className="help-card">
                <header>
                  <h2>{t(item, lang)}</h2>
                  <span>{items.length}</span>
                </header>
                <p>{lang === 'zh' ? item.zhNote : item.enNote}</p>
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
        </section>
      )}

      <footer className="help-foot">
        {lang === 'zh'
          ? '没有找到答案？页面右下角的客服，工作日 10:00–19:00。'
          : 'No answer here? Use the chat in the bottom-right corner, weekdays 10:00–19:00.'}
      </footer>
    </main>
  );
}

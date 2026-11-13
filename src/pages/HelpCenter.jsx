import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown, Copy, Search } from 'lucide-react';
import { ARTICLES, CATEGORIES, findArticle } from '../help/content';
import LanguageGlobe from '../components/LanguageGlobe';
import { useLanguage } from '../components/LanguageContext';
import { useAuth } from '../components/AuthContext';
import { isBusinessRole } from '../utils/roles';
import helpHero from '../assets/help/help-hero.jpg';
import './HelpCenter.css';

/* Public help centre, on the knowledge-base frame:
 *
 *   bar      wordmark + doc title, language and account on the right
 *   hero     photograph, centred title, subtitle and the search field
 *   page     breadcrumb, article title and last-updated line
 *   rail     accordion of article groups, the active group open
 *   column   summary, then the prose (no "in this article" rail)
 *
 * There is no table-of-contents page: /help opens the first article, and the
 * rail plus the search are the way around. The workspace entry lives at
 * /business/help.
 */

const t = (entry, lang) => entry[lang] || entry.en;
const copyFor = (lang, zh, en) => (lang === 'zh' ? zh : en);
const HELP_UPDATED = '2026-11';

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
  const { user } = useAuth();
  const lang = language.startsWith('zh') ? 'zh' : 'en';
  const { slug } = useParams();
  const navigate = useNavigate();

  const article = slug ? findArticle(slug) : null;
  const copy = article ? t(article, lang) : null;
  const category = article ? CATEGORIES.find((item) => item.id === article.category) : null;

  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [openGroups, setOpenGroups] = useState(() => new Set(article ? [article.category] : []));

  // Follow the article's group when navigating between sections.
  useEffect(() => {
    if (article) setOpenGroups(new Set([article.category]));
  }, [article?.category]);

  // Only categories that actually carry articles earn a rail group.
  const groups = useMemo(
    () => CATEGORIES
      .map((group) => ({ ...group, items: ARTICLES.filter((entry) => entry.category === group.id) }))
      .filter((group) => group.items.length),
    [],
  );

  // Search is a jump list: it sits under the field and navigates.
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

  const readingMinutes = useMemo(() => {
    if (!copy) return 1;
    const text = [copy.summary, ...copy.blocks.map((block) => block.h || block.p || (block.steps || []).join(' '))].join(' ');
    return Math.max(1, Math.round(text.length / 320));
  }, [copy]);

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

  const toggleGroup = (id) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const accountHref = user
    ? (isBusinessRole(user.role) ? '/business/workspace' : '/')
    : '/login';
  const accountLabel = user
    ? copyFor(lang, '工作台', 'Workspace')
    : copyFor(lang, '登录', 'Sign in');

  // `/help` has no page of its own: it opens the first article.
  if (!article) return <Navigate to={`/help/${ARTICLES[0].slug}`} replace />;

  return (
    <div className="hc">
      <section
        className="hc-hero"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(20,20,19,.22) 0%, rgba(20,20,19,0) 62%), linear-gradient(180deg, rgba(20,20,19,.58) 0%, rgba(20,20,19,.38) 44%, rgba(20,20,19,.56) 100%), url(${helpHero})`,
        }}
      >
      <header className="hc-top">
        <div className="hc-brand">
          <button
            type="button"
            className="hc-back"
            aria-label={copyFor(lang, '返回', 'Back')}
            title={copyFor(lang, '返回', 'Back')}
            onClick={() => {
              let sameOrigin = false;
              try {
                sameOrigin = new URL(document.referrer).origin === window.location.origin;
              } catch {
                sameOrigin = false;
              }
              if (sameOrigin) navigate(-1);
              else navigate(isBusinessRole(user?.role) ? '/business/workspace' : '/');
            }}
          >
            <ArrowLeft size={17} aria-hidden="true" />
          </button>

          <Link to="/" className="hc-wordmark">
            <img src="/guanyisearch-wordmark.png" alt="guanyisearch" />
          </Link>
          <span className="hc-brand-rule" aria-hidden="true" />
          <Link to={`/help/${ARTICLES[0].slug}`} className="hc-brand-title">
            {copyFor(lang, '帮助中心', 'Help centre')}
          </Link>
        </div>

        <div className="hc-tools">
          <button
            type="button"
            className="hc-lang"
            onClick={() => navigateToLanguage(lang === 'zh' ? 'en-US' : 'zh-CN')}
            aria-label={copyFor(lang, 'Switch to English', '切换到中文')}
            title={copyFor(lang, 'Switch to English', '切换到中文')}
          >
            <LanguageGlobe aria-hidden="true" size={16} strokeWidth={1.7} />
            <span>{lang === 'zh' ? '中文' : 'EN'}</span>
          </button>
          <Link to={accountHref} className="hc-login">{accountLabel}</Link>
        </div>
      </header>

        <div className="hc-hero-inner">
          <h1>{copyFor(lang, '帮助中心', 'Help centre')}</h1>
          <p className="hc-hero-sub">
            {copyFor(
              lang,
              '所有与 guanyisearch 使用相关的问题和资源。',
              'Everything you need to use guanyisearch with confidence.',
            )}
          </p>

          <div className="hc-find hc-find-hero">
            <label className="hc-search">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copyFor(lang, '请在此处输入您的搜索词。', 'Search the knowledge base')}
                aria-label={copyFor(lang, '搜索帮助文章', 'Search help articles')}
              />
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
            {query.trim() && !matches.length ? (
              <p className="hc-find-empty">{copyFor(lang, '没有找到相关文章。', 'No matching articles.')}</p>
            ) : null}
          </div>
        </div>
      </section>

      <div className="hc-page">
        <nav className="hc-crumb" aria-label={copyFor(lang, '面包屑', 'Breadcrumb')}>
          <Link to={`/help/${ARTICLES[0].slug}`}>{copyFor(lang, '帮助中心', 'Help centre')}</Link>
          <span aria-hidden="true">/</span>
          {category ? (
            <>
              <Link to={`/help/${groups.find((group) => group.id === category.id)?.items[0]?.slug || ARTICLES[0].slug}`}>
                {t(category, lang)}
              </Link>
              <span aria-hidden="true">/</span>
            </>
          ) : null}
          <strong>{copy.title}</strong>
        </nav>

        <header className="hc-article-head">
          <div>
            <h1>{copy.title}</h1>
            <p className="hc-meta">
              {copyFor(lang, `最后更新：${HELP_UPDATED}`, `Updated ${HELP_UPDATED}`)}
              <span aria-hidden="true">·</span>
              {copyFor(lang, `约 ${readingMinutes} 分钟`, `${readingMinutes} min read`)}
            </p>
          </div>
          <button type="button" className="hc-copy" onClick={copyPage}>
            {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copied ? copyFor(lang, '已复制', 'Copied') : copyFor(lang, '复制本页', 'Copy page')}
          </button>
        </header>

        <div className="hc-layout">
          <nav className="hc-side" aria-label={copyFor(lang, '全部文章', 'All articles')}>
            {groups.map((group) => {
              const isOpen = openGroups.has(group.id);
              return (
                <section key={group.id} className={`hc-group${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="hc-group-toggle"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isOpen}
                    aria-controls={`hc-group-${group.id}`}
                    title={t(group, lang)}
                  >
                    <span>{t(group, lang)}</span>
                    <ChevronDown size={16} className="hc-group-chevron" aria-hidden="true" />
                  </button>
                  <div className={`hc-group-body${isOpen ? ' is-open' : ''}`} id={`hc-group-${group.id}`}>
                    <div>
                      <ul>
                        {group.items.map((entry) => {
                          const active = entry.slug === article.slug;
                          return (
                            <li key={entry.slug}>
                              <Link
                                to={`/help/${entry.slug}`}
                                className={active ? 'is-active' : ''}
                                aria-current={active ? 'page' : undefined}
                                title={t(entry, lang).title}
                              >
                                {t(entry, lang).title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </section>
              );
            })}
          </nav>

          <main className="hc-main">
            <article className="hc-article">
              <p className="hc-summary">{copy.summary}</p>
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
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

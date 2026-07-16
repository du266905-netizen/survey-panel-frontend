import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, Check, ExternalLink, Eye, Newspaper, Sparkles, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { getNewsArticle, getNewsBrief, getNewsPreferences, getNewsWall, updateNewsPreferences } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import Logo from '../components/Logo';
import PageHeader from '../components/PageHeader';

const countries = [
  { id: 'US', label: 'US' },
  { id: 'UK', label: 'UK' },
  { id: 'CA', label: 'Canada' },
];

const categories = [
  { id: 'tech', label: 'Tech' },
  { id: 'finance', label: 'Finance' },
  { id: 'society', label: 'Society' },
  { id: 'entertainment', label: 'Entertainment' },
];

const categoryTones = {
  tech: { bg: 'rgba(180, 209, 213, .07)', border: 'rgba(180, 209, 213, .18)', text: '#b8cdd0', accent: '#8fb4b9' },
  finance: { bg: 'rgba(218, 196, 134, .07)', border: 'rgba(218, 196, 134, .18)', text: '#d2c394', accent: '#bda963' },
  society: { bg: 'rgba(194, 184, 211, .07)', border: 'rgba(194, 184, 211, .17)', text: '#c6bed1', accent: '#a999bb' },
  entertainment: { bg: 'rgba(211, 184, 188, .07)', border: 'rgba(211, 184, 188, .17)', text: '#d0bdc0', accent: '#b8979d' },
  news: { bg: 'rgba(194, 211, 207, .07)', border: 'rgba(194, 211, 207, .17)', text: '#c2d3cf', accent: '#95b9b2' },
};

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString();
}

function formatBriefDate(value) {
  if (!value) return 'Today';
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function formatCount(value) {
  return new Intl.NumberFormat('en-US').format(Number(value || 0));
}

function placeholderViewCount(article) {
  const seed = String(article?.id || article?.title || article?.link || article?.sourceName || 'news');
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1001;
  }
  return hash;
}

function categoryInfo(value) {
  const raw = String(value || '').toLowerCase();
  const matched = categories.find((item) => item.id === raw || item.label.toLowerCase() === raw);
  const id = matched?.id || 'news';
  return {
    id,
    label: matched?.label || (value ? String(value) : 'News'),
    tone: categoryTones[id] || categoryTones.news,
  };
}

function categoryStyle(value) {
  const { tone } = categoryInfo(value);
  return {
    '--news-category-bg': tone.bg,
    '--news-category-border': tone.border,
    '--news-category-text': tone.text,
    '--news-category-accent': tone.accent,
  };
}

function CategoryPill({ category, className = '' }) {
  const info = categoryInfo(category);
  return (
    <span className={`news-category-pill ${className}`} style={categoryStyle(info.id)}>
      <span className="news-category-dot" aria-hidden="true" />
      {info.label}
    </span>
  );
}

function countryLabel(value) {
  const key = String(value || 'US').toUpperCase();
  return countries.find((item) => item.id === key)?.label || key;
}

function countryFlag(value) {
  const key = String(value || 'US').toUpperCase();
  if (key === 'US') return '🇺🇸';
  if (key === 'UK') return '🇬🇧';
  if (key === 'CA') return '🇨🇦';
  return '🌐';
}

function DailyBriefCard({ brief, loading, error, country }) {
  const briefCountry = brief?.country || country;
  return (
    <section className="card mb-6 overflow-hidden">
      <div className="border-b border-slate-100 bg-cyan-50/50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
              <Sparkles size={18} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">{brief?.isAiGenerated ? 'AI Daily Brief' : 'Daily Brief'}</p>
              <h2 className="text-xl font-black text-slate-950">{brief?.title || 'Today’s Brief'}</h2>
            </div>
          </div>
          <span className="rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-bold text-cyan-800">
            <span className="mr-1.5" aria-hidden="true">{countryFlag(briefCountry)}</span>
            {brief?.countryLabel || countryLabel(briefCountry)} · {formatBriefDate(brief?.briefDate)}
          </span>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-11/12 animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 w-9/12 animate-pulse rounded-full bg-slate-100" />
            <div className="grid gap-3 pt-2 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-24 animate-pulse rounded-xl bg-slate-100" />)}
            </div>
          </div>
        ) : error ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">{error}</p>
        ) : brief ? (
          <>
            <p className="max-w-5xl text-sm leading-7 text-slate-600">{brief.summary}</p>
            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {(brief.highlights || []).slice(0, 5).map((item, index) => (
                <article key={`${item.headline}-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
                  <CategoryPill category={item.category} />
                  <h3 className="mt-2 text-sm font-black leading-snug text-slate-950">{item.headline}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.takeaway}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-cyan-100 bg-cyan-50/70 px-4 py-3 text-sm font-bold text-cyan-900">
              <ArrowDown size={16} />
              {brief.cta || 'After reading today’s brief, pick a story below to read more.'}
            </div>
          </>
        ) : (
          <p className="text-sm font-semibold text-slate-500">Today’s brief is not available yet.</p>
        )}
      </div>
    </section>
  );
}

function summaryFor(article) {
  return article?.description || article?.content || 'Open the detail view to review this story.';
}

function articleImage(article) {
  if (article?.imageUrl) {
    return <img className="h-full w-full object-cover" src={article.imageUrl} alt="" loading="lazy" />;
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-cyan-50 text-cyan-700">
      <Newspaper size={34} strokeWidth={1.6} />
    </div>
  );
}

export default function NewsWall() {
  const { user } = useAuth();
  const isPublicView = !user;
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedArticleRef = useRef('');
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('tech');
  const [articles, setArticles] = useState([]);
  const [brief, setBrief] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [briefLoading, setBriefLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [briefError, setBriefError] = useState('');
  const [authPrompt, setAuthPrompt] = useState('');

  const subscribedCategories = useMemo(
    () => new Set((preferences?.categories || []).filter((item) => item.subscribed).map((item) => item.id)),
    [preferences]
  );

  const loadNews = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getNewsWall({ country, category });
      setArticles(response.data);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to load news right now.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const loadBrief = async () => {
    setBriefLoading(true);
    setBriefError('');
    try {
      const response = await getNewsBrief({ country });
      setBrief(response.data);
    } catch (caughtError) {
      setBrief(null);
      setBriefError(caughtError.response?.data?.message || 'Unable to load today’s brief.');
    } finally {
      setBriefLoading(false);
    }
  };

  const loadPreferences = async () => {
    try {
      const response = await getNewsPreferences();
      setPreferences(response.data || { categories: [] });
    } catch {
      setPreferences({ categories: [] });
    }
  };

  useEffect(() => {
    if (isPublicView) {
      setPreferences({ categories: [] });
      return;
    }
    loadPreferences();
  }, [isPublicView]);

  useEffect(() => {
    loadNews();
  }, [country, category]);

  useEffect(() => {
    loadBrief();
  }, [country]);

  const openArticle = async (article) => {
    setDetailLoading(true);
    setError('');
    try {
      const response = await getNewsArticle(article.id);
      setSelectedArticle(response.data);
      setArticles((current) => current.map((item) => (item.id === article.id ? response.data : item)));
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to open this story.');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    requestedArticleRef.current = '';
    if (searchParams.get('article')) {
      const next = new URLSearchParams(searchParams);
      next.delete('article');
      setSearchParams(next, { replace: true });
    }
  };

  useEffect(() => {
    const articleId = searchParams.get('article');
    if (!articleId) {
      requestedArticleRef.current = '';
      return;
    }
    if (selectedArticle?.id === articleId || requestedArticleRef.current === articleId) return;
    requestedArticleRef.current = articleId;
    openArticle({ id: articleId });
  }, [searchParams, selectedArticle?.id]);

  const toggleSubscription = async (categoryId) => {
    if (isPublicView) {
      setAuthPrompt('Create a free account or sign in to save topic subscriptions.');
      return;
    }
    const next = new Set(subscribedCategories);
    if (next.has(categoryId)) next.delete(categoryId);
    else next.add(categoryId);
    const optimistic = {
      categories: categories.map((item) => ({
        ...item,
        subscribed: next.has(item.id),
        interactionCount: preferences?.categories?.find((preference) => preference.id === item.id)?.interactionCount || 0,
      })),
    };
    setPreferences(optimistic);
    try {
      const response = await updateNewsPreferences([...next]);
      setPreferences(response.data || optimistic);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to update subscriptions.');
      await loadPreferences();
    }
  };

  const content = (
    <>
      {!isPublicView && <PageHeader title="News Wall" description="Follow lightweight news signals and stories worth tracking." />}

      {error && <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">{error}</div>}

      <DailyBriefCard brief={brief} loading={briefLoading} error={briefError} country={country} />

      <section className="card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">Region</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {countries.map((item) => (
                <button
                  key={item.id}
                  className={`rounded-full border px-4 py-2 text-sm font-bold ${country === item.id ? 'border-cyan-300 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-white text-slate-600'}`}
                  type="button"
                  onClick={() => setCountry(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {!isPublicView && (
            <div className="min-w-[260px]">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">Subscribed topics</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {categories.map((item) => (
                  <label key={item.id} className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                    <input
                      className="h-4 w-4 accent-cyan-500"
                      type="checkbox"
                      checked={subscribedCategories.has(item.id)}
                      onChange={() => toggleSubscription(item.id)}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
          {categories.map((item) => (
            <button
              key={item.id}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${category === item.id ? 'border-cyan-300 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-white text-slate-600'}`}
              type="button"
              onClick={() => setCategory(item.id)}
              style={categoryStyle(item.id)}
            >
              <span className="news-category-dot" aria-hidden="true" />
              {subscribedCategories.has(item.id) && <Check size={14} />}
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-72 animate-pulse rounded-xl bg-slate-100" />)
        ) : !articles.length ? (
          <div className="card col-span-full flex min-h-48 items-center justify-center p-8 text-sm font-semibold text-slate-500">
            No news available for this region and topic yet.
          </div>
        ) : (
          articles.map((article) => (
            <article key={article.id} className="card overflow-hidden">
              <button className="block w-full text-left" type="button" onClick={() => openArticle(article)} disabled={detailLoading}>
                <div className="aspect-[1.9] overflow-hidden border-b border-slate-100">
                  {articleImage(article)}
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold text-slate-500">
                    <span className="flex min-w-0 flex-wrap items-center gap-2">
                      <CategoryPill category={article.category} />
                      <span className="truncate">{article.sourceName || 'News source'}</span>
                    </span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h2 className="line-clamp-2 text-lg font-black leading-snug text-slate-950">{article.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{summaryFor(article)}</p>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="inline-flex items-center gap-1"><Eye size={14} /> {formatCount(placeholderViewCount(article))} views</span>
                  </div>
                </div>
              </button>
            </article>
          ))
        )}
      </section>

      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4" role="dialog" aria-modal="true" aria-labelledby="news-detail-title">
          <section className="card flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryPill category={selectedArticle.category} />
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">{selectedArticle.sourceName || 'News source'}</p>
                </div>
                <h2 id="news-detail-title" className="mt-2 text-2xl font-black leading-tight text-slate-950">{selectedArticle.title}</h2>
              </div>
              <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" type="button" onClick={closeArticle} aria-label="Close news detail">
                <X size={19} />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto p-5">
              <div className="mb-5 aspect-[2.15] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                {articleImage(selectedArticle)}
              </div>
              <p className="text-sm leading-7 text-slate-600">{summaryFor(selectedArticle)}</p>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-slate-700">Reader activity</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><Eye size={14} /> {formatCount(placeholderViewCount(selectedArticle))} views</span>
                </div>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">Discussion controls are intentionally quiet while the audience base grows.</p>
              </div>

              {selectedArticle.link && (
                <a className="btn-secondary mt-5 w-full" href={selectedArticle.link} target="_blank" rel="noreferrer">
                  Open original story <ExternalLink size={16} />
                </a>
              )}
            </div>
          </section>
        </div>
      )}

      {authPrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/65 p-4" role="dialog" aria-modal="true" aria-labelledby="news-auth-title">
          <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-700">Save your feed</p>
                <h2 id="news-auth-title" className="mt-2 text-2xl font-black text-slate-950">Sign in to continue</h2>
              </div>
              <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" type="button" onClick={() => setAuthPrompt('')} aria-label="Close sign-in prompt">
                <X size={19} />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{authPrompt}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link className="btn-primary" to="/register">Create account</Link>
              <Link className="btn-secondary" to="/login">Sign in</Link>
            </div>
          </section>
        </div>
      )}
    </>
  );

  if (!isPublicView) return content;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/92 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" aria-label="GuanyiSearch home"><Logo size="md" variant="light" /></Link>
          <nav className="flex items-center gap-4 text-sm font-bold">
            <Link className="text-cyan-100" to="/news">News Wall</Link>
            <Link className="hidden text-slate-300 transition hover:text-white sm:inline" to="/login">Sign in</Link>
            <Link className="rounded-full bg-white px-4 py-2 text-slate-950 transition hover:bg-cyan-100" to="/register">Create account</Link>
          </nav>
        </div>
      </header>

      <section className="bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,.22),transparent_34%),linear-gradient(135deg,#061217,#0f172a)] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">News Wall</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Read today’s stories without the noise.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Browse public news trends for free. Create an account when you are ready to save topic preferences and earn coins through eligible surveys.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {content}
      </section>
    </main>
  );
}

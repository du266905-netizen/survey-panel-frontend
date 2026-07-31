import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNewsBrief, getNewsPreferences, getNewsWall, updateNewsPreferences } from '../api/realApi';
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

function BriefHighlightCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const summaryId = `brief-highlight-${index}`;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3.5">
      <CategoryPill category={item.category} />
      <h3 className="mt-2 text-sm font-black leading-snug text-slate-950">{item.headline}</h3>
      {item.takeaway && (
        <>
          <button
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 transition hover:text-cyan-900"
            type="button"
            aria-expanded={expanded}
            aria-controls={summaryId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Hide description' : 'Read description'}
            <ChevronDown className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'} size={14} />
          </button>
          <p id={summaryId} className={`overflow-hidden text-xs leading-5 text-slate-500 ${expanded ? 'mt-2' : 'hidden'}`}>
            {item.takeaway}
          </p>
        </>
      )}
    </article>
  );
}

function DailyBriefCard({ brief, loading, error, country }) {
  const briefCountry = brief?.country || country;
  const [summaryExpanded, setSummaryExpanded] = useState(false);
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
            <p className={`max-w-5xl text-sm leading-7 text-slate-600 ${summaryExpanded ? '' : 'line-clamp-2'}`}>{brief.summary}</p>
            {brief.summary && (
              <button
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 transition hover:text-cyan-900"
                type="button"
                aria-expanded={summaryExpanded}
                onClick={() => setSummaryExpanded((value) => !value)}
              >
                {summaryExpanded ? 'Collapse daily brief' : 'Read daily brief'}
                <ChevronDown className={summaryExpanded ? 'rotate-180 transition-transform' : 'transition-transform'} size={14} />
              </button>
            )}
            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              {(brief.highlights || []).slice(0, 5).map((item, index) => (
                <BriefHighlightCard key={`${item.headline}-${index}`} item={item} index={index} />
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
  return article?.summary || article?.description || article?.content || 'Open the detail view to review this story.';
}

function NewsStoryCard({ article }) {
  const [expanded, setExpanded] = useState(false);
  const summaryId = `news-summary-${article.id}`;

  return (
    <article className="card news-story-card flex h-full flex-col p-4">
      <Link className="group block text-left no-underline" to={`/news/${encodeURIComponent(article.id)}`}>
        <div className="flex min-w-0 items-center gap-2 text-xs font-bold text-slate-500">
          <CategoryPill category={article.category} />
          <span className="truncate">{article.sourceName || 'News source'}</span>
        </div>
        <h2 className="mt-3 line-clamp-3 text-base font-black leading-snug text-slate-950 transition group-hover:text-cyan-800">
          {article.title}
        </h2>
      </Link>
      <button
        className="mt-4 inline-flex w-fit items-center gap-1.5 text-left text-xs font-bold text-cyan-700 transition hover:text-cyan-900"
        type="button"
        aria-expanded={expanded}
        aria-controls={summaryId}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? 'Hide description' : 'Read description'}
        <ChevronDown className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'} size={14} />
      </button>
      <div id={summaryId} className={expanded ? 'mt-3' : 'hidden'}>
        <p className="text-sm leading-6 text-slate-500">{summaryFor(article)}</p>
        <Link className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cyan-700" to={`/news/${encodeURIComponent(article.id)}`}>
          Read story <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  );
}

function NewsFilters({ country, category, isPublicView, subscribedCategories, onCountryChange, onCategoryChange, onToggleSubscription }) {
  return (
    <div className="flex w-full flex-wrap items-end gap-2 sm:w-auto sm:flex-nowrap sm:justify-end">
      <label className="flex min-w-[132px] flex-1 flex-col gap-1.5 sm:flex-none">
        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Region</span>
        <select
          className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          value={country}
          onChange={(event) => onCountryChange(event.target.value)}
          aria-label="Filter news by region"
        >
          {countries.map((item) => <option key={item.id} value={item.id}>{countryFlag(item.id)} {item.label}</option>)}
        </select>
      </label>

      <label className="flex min-w-[142px] flex-1 flex-col gap-1.5 sm:flex-none">
        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Content</span>
        <select
          className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          aria-label="Filter news by content"
        >
          {categories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
      </label>

      {!isPublicView && (
        <details className="group relative min-w-[142px] flex-1 sm:flex-none">
          <summary className="flex h-[58px] cursor-pointer list-none flex-col justify-end rounded-lg border border-slate-200 bg-white px-3 pb-2.5 outline-none transition hover:border-slate-300 focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-100 [&::-webkit-details-marker]:hidden">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Topics</span>
            <span className="mt-1 flex items-center justify-between gap-3 text-sm font-bold text-slate-800">
              {subscribedCategories.size ? `${subscribedCategories.size} saved` : 'Choose topics'}
              <ChevronDown className="transition-transform group-open:rotate-180" size={15} />
            </span>
          </summary>
          <div className="absolute right-0 z-30 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
            <p className="px-1 pb-2 text-xs font-bold leading-5 text-slate-500">Save the topics you want to follow.</p>
            <div className="grid gap-1">
              {categories.map((item) => (
                <label key={item.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <input
                    className="h-4 w-4 accent-cyan-600"
                    type="checkbox"
                    checked={subscribedCategories.has(item.id)}
                    onChange={() => onToggleSubscription(item.id)}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
        </details>
      )}
    </div>
  );
}

export default function NewsWall() {
  const { user } = useAuth();
  const isPublicView = !user;
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('tech');
  const [articles, setArticles] = useState([]);
  const [brief, setBrief] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [briefLoading, setBriefLoading] = useState(true);
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

  const newsFilters = (
    <NewsFilters
      country={country}
      category={category}
      isPublicView={isPublicView}
      subscribedCategories={subscribedCategories}
      onCountryChange={setCountry}
      onCategoryChange={setCategory}
      onToggleSubscription={toggleSubscription}
    />
  );

  const content = (
    <>
      {!isPublicView && (
        <PageHeader
          title="News Wall"
          description="Follow lightweight news signals and stories worth tracking."
          action={newsFilters}
        />
      )}

      {error && <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">{error}</div>}

      <DailyBriefCard brief={brief} loading={briefLoading} error={briefError} country={country} />

      <section className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-44 animate-pulse rounded-xl bg-slate-100" />)
        ) : !articles.length ? (
          <div className="card col-span-full flex min-h-48 items-center justify-center p-8 text-sm font-semibold text-slate-500">
            No news available for this region and topic yet.
          </div>
        ) : (
          articles.map((article) => <NewsStoryCard key={article.id} article={article} />)
        )}
      </section>

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
    <main className="news-wall-public min-h-screen bg-slate-50 text-slate-950">
      <style>{`
        .news-wall-public { background: #171716; color: #efede7; }
        .news-wall-public-header { border-color: rgba(244,241,232,.14) !important; background: rgba(23,23,22,.94) !important; }
        .news-wall-public-header nav a:first-child { color: #f4f1e9; }
        .news-wall-public-header nav a:nth-child(2) { color: rgba(239,237,231,.62); }
        .news-wall-public-header nav a:nth-child(2):hover { color: #fff; }
        .news-wall-public-header nav a:last-child { background: #f1eee6; color: #171716; }
        .news-wall-public-header nav a:last-child:hover { background: #fffdf7; }
        .news-wall-public-hero { border-bottom: 1px solid rgba(244,241,232,.14); background: radial-gradient(circle at 76% 18%, rgba(255,255,255,.05), transparent 30%), #1d1d1c !important; color: #f4f1e9; }
        .news-wall-public-hero > div > p { color: #c3b9a8; }
        .news-wall-public-hero > div > h1 { font-family: var(--font-serif); font-weight: 760; }
        .news-wall-public-hero > div > p:last-child { color: rgba(239,237,231,.66); }
        .news-wall-public-body { max-width: 1280px; }
        .news-wall-public .card { border-color: rgba(244,241,232,.14); background: #20201e; box-shadow: none; }
        .news-wall-public .card.mb-6 > .border-b { border-color: rgba(244,241,232,.12); background: #252523; }
        .news-wall-public .text-slate-950, .news-wall-public .text-slate-700 { color: #f4f1e9; }
        .news-wall-public .text-slate-600, .news-wall-public .text-slate-500, .news-wall-public .text-slate-400 { color: rgba(239,237,231,.64); }
        .news-wall-public .text-cyan-700 { color: #c9bfac; }
        .news-wall-public .text-cyan-800, .news-wall-public .text-cyan-900 { color: #24231f; }
        .news-wall-public .bg-white { background-color: #1a1a19; }
        .news-wall-public .bg-slate-50, .news-wall-public .bg-slate-100 { background-color: #292927; }
        .news-wall-public .border-slate-100, .news-wall-public .border-slate-200 { border-color: rgba(244,241,232,.13); }
        .news-wall-public .border-cyan-100, .news-wall-public .border-cyan-200 { border-color: rgba(244,241,232,.16); }
        .news-wall-public .bg-cyan-100 { background-color: #e7e1d4; color: #24231f; }
        .news-wall-public .bg-cyan-50 { background-color: #e7e1d4; }
        .news-wall-public .border-cyan-300 { border-color: #e7e1d4; }
        .news-wall-public .bg-amber-50 { background-color: rgba(123,94,44,.18); }
        .news-wall-public .border-amber-200 { border-color: rgba(214,185,119,.3); }
        .news-wall-public .text-amber-800 { color: #ead39b; }
        .news-wall-public .news-category-pill { box-shadow: none; }
        .news-wall-public .btn-primary { border-color: #ece7dc; background: #ece7dc; color: #1b1b19; }
        .news-wall-public .btn-secondary { border-color: rgba(244,241,232,.22); background: transparent; color: #f4f1e9; }
      `}</style>
      <header className="news-wall-public-header sticky top-0 z-40 border-b border-white/10 bg-slate-950/92 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" aria-label="GuanyiSearch home"><Logo size="md" variant="light" /></Link>
          <nav className="flex items-center gap-4 text-sm font-bold">
            <Link className="text-cyan-100" to="/news">News Wall</Link>
            <Link className="hidden text-slate-300 transition hover:text-white sm:inline" to="/login">Sign in</Link>
            <Link className="rounded-full bg-white px-4 py-2 text-slate-950 transition hover:bg-cyan-100" to="/register">Create account</Link>
          </nav>
        </div>
      </header>

      <section className="news-wall-public-hero bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,.22),transparent_34%),linear-gradient(135deg,#061217,#0f172a)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">News Wall</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              Read today’s stories without the noise.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Browse public news trends for free. Create an account when you are ready to save topic preferences and earn coins through eligible surveys.
            </p>
          </div>
          {newsFilters}
        </div>
      </section>

      <section className="news-wall-public-body mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {content}
      </section>
    </main>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Newspaper, Search, Sparkles, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { getNewsBrief, getNewsPreferences, getNewsWall, updateNewsPreferences } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import PageHeader from '../components/PageHeader';

const countries = [
  { id: 'GLOBAL', label: 'Global' },
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

const NEWS_WALL_SCROLL_KEY = 'guanyisearch.news-wall-scroll-position';

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

function CategoryPill({ category }) {
  const info = categoryInfo(category);
  return (
    <span className="news-category-pill" style={categoryStyle(info.id)}>
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
  if (key === 'GLOBAL') return '🌐';
  if (key === 'US') return '🇺🇸';
  if (key === 'UK') return '🇬🇧';
  if (key === 'CA') return '🇨🇦';
  return '🌐';
}

function summaryFor(article) {
  return article?.summary || article?.description || article?.content || 'Open the detail view to review this story.';
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

function DailyBriefDescription({ brief, loading, error, country }) {
  const briefCountry = brief?.country || country;

  return (
    <section className="card mb-5 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-cyan-50/45 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-800" aria-hidden="true">
            <Sparkles size={18} strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-800">{brief?.isAiGenerated ? 'AI daily brief' : 'Daily brief'}</p>
            <h2 className="truncate text-xl font-black text-slate-950">{brief?.title || 'Today’s briefing'}</h2>
          </div>
        </div>
        <span className="rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-bold text-cyan-800">
          <span className="mr-1.5" aria-hidden="true">{countryFlag(briefCountry)}</span>
          {brief?.countryLabel || countryLabel(briefCountry)} · {formatBriefDate(brief?.briefDate)}
        </span>
      </div>
      <div className="px-5 py-4">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-11/12 animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 w-8/12 animate-pulse rounded-full bg-slate-100" />
          </div>
        ) : error ? (
          <p className="text-sm font-semibold leading-7 text-slate-500">Today’s editorial summary is temporarily unavailable. The latest stories are still available below.</p>
        ) : (
          <p className="max-w-5xl text-sm leading-7 text-slate-600">
            {brief?.summary || 'A focused selection of reporting and context from the stories currently available below.'}
          </p>
        )}
      </div>
    </section>
  );
}

function articleImage(article) {
  if (article?.imageUrl) {
    return <img className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" src={article.imageUrl} alt="" loading="lazy" />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-cyan-50 text-cyan-800">
      <Newspaper size={30} strokeWidth={1.5} />
    </div>
  );
}

function NewsStoryCard({ article, onOpen }) {
  return (
    <article className="card group flex h-full overflow-hidden">
      <Link className="flex h-full w-full flex-col text-left no-underline" to={`/news/${encodeURIComponent(article.id)}`} onClick={onOpen}>
        <div className="aspect-[1.78] shrink-0 overflow-hidden border-b border-slate-100">
          {articleImage(article)}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex min-w-0 items-center gap-2 text-xs font-bold text-slate-500">
            <CategoryPill category={article.category} />
            <span className="truncate">{article.sourceName || 'News source'}</span>
          </div>
          <h2 className="mt-3 line-clamp-2 text-[1.05rem] font-black leading-snug text-slate-950 transition group-hover:text-cyan-800">
            {article.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{summaryFor(article)}</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-cyan-700 transition group-hover:text-cyan-900">
            Read story <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>
    </article>
  );
}

function CompactSelect({ label, value, onChange, options, ariaLabel, optionLabel }) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((item) => item.id === value) || options[0];

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex h-10 min-w-[148px] items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-left shadow-sm transition hover:border-slate-300 focus-visible:border-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">{label}</span>
        <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-800">{optionLabel(selectedOption)}</span>
        <ChevronDown className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} size={15} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-0 z-30 mt-2 min-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl" role="listbox" aria-label={ariaLabel}>
          {options.map((item) => {
            const selected = item.id === value;
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-bold transition ${selected ? 'bg-cyan-50 text-cyan-900' : 'text-slate-700 hover:bg-slate-50'}`}
                onClick={() => {
                  onChange(item.id);
                  setOpen(false);
                }}
              >
                {optionLabel(item)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NewsFilters({ country, category, isPublicView, subscribedCategories, loading, onCountryChange, onCategoryChange, onToggleSubscription }) {
  const [topicsOpen, setTopicsOpen] = useState(false);

  return (
    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
      <CompactSelect
        label="Region"
        value={country}
        onChange={onCountryChange}
        options={countries}
        ariaLabel="Filter news by region"
        optionLabel={(item) => `${countryFlag(item.id)} ${item.label}`}
      />
      <CompactSelect
        label="Content"
        value={category}
        onChange={onCategoryChange}
        options={categories}
        ariaLabel="Filter news by content"
        optionLabel={(item) => item.label}
      />
      {loading && <span className="text-xs font-bold text-slate-400" role="status">Updating…</span>}
      {!isPublicView && (
        <div
          className="group relative"
          onMouseEnter={() => setTopicsOpen(true)}
          onMouseLeave={() => setTopicsOpen(false)}
        >
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-slate-300 focus-visible:border-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
            aria-expanded={topicsOpen}
            aria-haspopup="menu"
            onClick={() => setTopicsOpen((current) => !current)}
            onFocus={() => setTopicsOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setTopicsOpen(false);
            }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">Topics</span>
            <span>{subscribedCategories.size ? `${subscribedCategories.size} saved` : 'All topics'}</span>
            <ChevronDown className={`transition-transform ${topicsOpen ? 'rotate-180' : ''}`} size={15} />
          </button>
          {topicsOpen && (
            <div className="absolute right-0 z-30 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl" role="menu" aria-label="News topics">
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
          )}
        </div>
      )}
    </div>
  );
}

export default function NewsWall() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const isPublicView = !user;
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('tech');
  const [articles, setArticles] = useState([]);
  const [newsMeta, setNewsMeta] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [briefLoading, setBriefLoading] = useState(true);
  const [error, setError] = useState('');
  const [briefError, setBriefError] = useState('');
  const [authPrompt, setAuthPrompt] = useState('');
  const requestIdRef = useRef(0);
  const briefRequestIdRef = useRef(0);

  const searchQuery = searchParams.get('search')?.trim() || '';
  const [searchInput, setSearchInput] = useState(searchQuery);

  const subscribedCategories = useMemo(
    () => new Set((preferences?.categories || []).filter((item) => item.subscribed).map((item) => item.id)),
    [preferences]
  );

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const loadNews = async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);
    setError('');

    try {
      const response = await getNewsWall({
        ...(country === 'GLOBAL' ? {} : { country }),
        ...(searchQuery ? { search: searchQuery, window: '72h' } : { category }),
      });
      if (requestId !== requestIdRef.current) return;
      setArticles(response.data || []);
      setNewsMeta(response.meta || null);
    } catch (caughtError) {
      if (requestId !== requestIdRef.current) return;
      setError(caughtError.response?.data?.message || 'Unable to update this feed right now. Please try another region or try again shortly.');
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  };

  const loadBrief = async () => {
    const requestId = briefRequestIdRef.current + 1;
    briefRequestIdRef.current = requestId;
    setBriefLoading(true);
    setBriefError('');

    try {
      const response = await getNewsBrief(country === 'GLOBAL' ? {} : { country });
      if (requestId !== briefRequestIdRef.current) return;
      setBrief(response.data || null);
    } catch {
      if (requestId !== briefRequestIdRef.current) return;
      setBrief(null);
      setBriefError('Unable to load the daily brief.');
    } finally {
      if (requestId === briefRequestIdRef.current) setBriefLoading(false);
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
    loadBrief();
    return () => {
      requestIdRef.current += 1;
      briefRequestIdRef.current += 1;
    };
  }, [country, category, searchQuery]);

  useEffect(() => {
    if (loading || briefLoading) return undefined;

    const storedPosition = Number(window.sessionStorage.getItem(NEWS_WALL_SCROLL_KEY));
    if (!Number.isFinite(storedPosition) || storedPosition < 0) return undefined;

    let nestedFrame;
    const frame = window.requestAnimationFrame(() => {
      nestedFrame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: storedPosition, left: 0, behavior: 'auto' });
        window.sessionStorage.removeItem(NEWS_WALL_SCROLL_KEY);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (nestedFrame) window.cancelAnimationFrame(nestedFrame);
    };
  }, [briefLoading, loading]);

  const rememberNewsPosition = () => {
    window.sessionStorage.setItem(NEWS_WALL_SCROLL_KEY, String(window.scrollY));
  };

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

  const submitNewsSearch = (event) => {
    event.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    const nextQuery = searchInput.trim();
    if (nextQuery) nextParams.set('search', nextQuery);
    else nextParams.delete('search');
    setSearchParams(nextParams, { replace: true });
  };

  const clearNewsSearch = () => {
    setSearchInput('');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('search');
    setSearchParams(nextParams, { replace: true });
  };

  const newsFilters = (
    <NewsFilters
      country={country}
      category={category}
      isPublicView={isPublicView}
      subscribedCategories={subscribedCategories}
      loading={loading}
      onCountryChange={setCountry}
      onCategoryChange={setCategory}
      onToggleSubscription={toggleSubscription}
    />
  );

  const workspaceNewsActions = (
    <div className="news-wall-toolbar">
      <form className="news-search" onSubmit={submitNewsSearch} role="search">
        <Search size={16} aria-hidden="true" />
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search the past 3 days"
          aria-label="Search news summaries from the past three days"
        />
        {searchInput && (
          <button className="news-search-clear" type="button" onClick={clearNewsSearch} aria-label="Clear news search">
            <X size={14} />
          </button>
        )}
        <button className="news-search-submit" type="submit">Search</button>
      </form>
      {newsFilters}
    </div>
  );

  const content = (
    <>
      {!isPublicView && (
        <PageHeader
          title="News Wall"
          description="Today’s latest signals, with the past three days of original summaries kept searchable."
          action={workspaceNewsActions}
          className="news-workspace-header"
        />
      )}

      {error && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">{error}</div>}

      {searchQuery ? (
        <section className="card mb-5 flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-800">Recent archive</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">Results from the past {newsMeta?.windowHours || 72} hours</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">Searching saved original summaries, titles, sources, and topic labels for “{searchQuery}”.</p>
          </div>
          <button className="btn-secondary" type="button" onClick={clearNewsSearch}>Back to today</button>
        </section>
      ) : <DailyBriefDescription brief={brief} loading={briefLoading} error={briefError} country={country} />}

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && !articles.length ? (
          Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-[22rem] animate-pulse rounded-xl bg-slate-100" />)
        ) : !articles.length ? (
          <div className="card col-span-full flex min-h-48 items-center justify-center p-8 text-sm font-semibold text-slate-500">
            {searchQuery ? `No stories match “${searchQuery}” in the past 72 hours.` : 'No news published today for this region and topic yet.'}
          </div>
        ) : (
          articles.map((article) => <NewsStoryCard key={article.id} article={article} onOpen={rememberNewsPosition} />)
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
        .news-wall-public { background: #f7f7f3; color: #17251f; }
        .news-wall-public-hero { border-bottom: 1px solid rgba(36,56,46,.16); background: radial-gradient(circle at 76% 18%, rgba(170,184,156,.13), transparent 30%), repeating-linear-gradient(0deg, transparent 0 7px, rgba(40,67,54,.012) 8px 9px), #f7f7f3 !important; color: #17251f; }
        .news-wall-public-hero > div > div > p:first-child { color: #285647 !important; }
        .news-wall-public-hero > div > div > h1 { color: #17251f; font-family: var(--font-display); font-optical-sizing: auto; font-weight: 600; }
        .news-wall-public-hero > div > div > p:last-child { color: #59675f !important; }
        .news-wall-public-body { max-width: 1280px; }
        .news-wall-public .card { border-color: rgba(36,56,46,.16); background: #fffefd; box-shadow: 0 12px 24px rgba(35,54,43,.06); }
        .news-wall-public .text-slate-950, .news-wall-public .text-slate-700 { color: #17251f; }
        .news-wall-public .text-slate-600, .news-wall-public .text-slate-500, .news-wall-public .text-slate-400 { color: #59675f; }
        .news-wall-public .text-cyan-700, .news-wall-public .text-cyan-800 { color: #285647; }
        .news-wall-public .text-cyan-900 { color: #17251f; }
        .news-wall-public .bg-white { background-color: #fffefd; }
        .news-wall-public .bg-slate-50, .news-wall-public .bg-slate-100 { background-color: #f0f3ee; }
        .news-wall-public .border-slate-100, .news-wall-public .border-slate-200 { border-color: rgba(36,56,46,.13); }
        .news-wall-public .border-cyan-100, .news-wall-public .border-cyan-200 { border-color: rgba(40,86,71,.18); }
        .news-wall-public .bg-cyan-50, .news-wall-public .bg-cyan-100 { background-color: #e6eee5; }
        .news-wall-public .bg-amber-50 { background-color: #f4ebd5; }
        .news-wall-public .border-amber-200 { border-color: rgba(176,130,47,.3); }
        .news-wall-public .text-amber-800 { color: #806125; }
        .news-wall-public .news-category-pill { box-shadow: none; }
        .news-wall-public .btn-primary { border-color: #285647; background: #285647; color: #f7f7f3; }
        .news-wall-public .btn-secondary { border-color: rgba(40,86,71,.32); background: transparent; color: #285647; }
      `}</style>
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
          {workspaceNewsActions}
        </div>
      </section>

      <section className="news-wall-public-body mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {content}
      </section>
    </main>
  );
}

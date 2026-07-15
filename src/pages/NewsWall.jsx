import { useEffect, useMemo, useState } from 'react';
import { Check, ExternalLink, Eye, LoaderCircle, Newspaper, ThumbsDown, ThumbsUp, UsersRound, X } from 'lucide-react';
import { getNewsArticle, getNewsPreferences, getNewsWall, updateNewsPreferences, voteNewsArticle } from '../api/realApi';
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

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString();
}

function formatCount(value) {
  return new Intl.NumberFormat('en-US').format(Number(value || 0));
}

function summaryFor(article) {
  return article?.description || article?.content || 'Open the detail view to review this story and vote on the current signal.';
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

function VoteBar({ article }) {
  const approve = Number(article?.approvePercent ?? 50);
  const reject = Number(article?.rejectPercent ?? 50);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Approve {approve}%</span>
        <span>Reject {reject}%</span>
      </div>
      <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="bg-cyan-500" style={{ width: `${approve}%` }} />
        <div className="bg-red-400" style={{ width: `${reject}%` }} />
      </div>
    </div>
  );
}

export default function NewsWall() {
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('tech');
  const [articles, setArticles] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [voting, setVoting] = useState('');
  const [error, setError] = useState('');

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

  const loadPreferences = async () => {
    try {
      const response = await getNewsPreferences();
      setPreferences(response.data || { categories: [] });
    } catch {
      setPreferences({ categories: [] });
    }
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  useEffect(() => {
    loadNews();
  }, [country, category]);

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

  const handleVote = async (stance) => {
    if (!selectedArticle) return;
    setVoting(stance);
    setError('');
    try {
      const response = await voteNewsArticle(selectedArticle.id, stance);
      setSelectedArticle(response.data);
      setArticles((current) => current.map((item) => (item.id === selectedArticle.id ? response.data : item)));
      await loadPreferences();
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to save your vote.');
    } finally {
      setVoting('');
    }
  };

  const toggleSubscription = async (categoryId) => {
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

  return (
    <>
      <PageHeader title="News Wall" description="Follow lightweight news signals and vote on stories worth tracking." />

      {error && <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">{error}</div>}

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
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
          {categories.map((item) => (
            <button
              key={item.id}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${category === item.id ? 'border-cyan-300 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-white text-slate-600'}`}
              type="button"
              onClick={() => setCategory(item.id)}
            >
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
                    <span>{article.sourceName || 'News source'}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h2 className="line-clamp-2 text-lg font-black leading-snug text-slate-950">{article.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{summaryFor(article)}</p>
                  <div className="mt-4">
                    <VoteBar article={article} />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="inline-flex items-center gap-1"><UsersRound size={14} /> {formatCount(article.participantCount)} participants</span>
                    <span className="inline-flex items-center gap-1"><Eye size={14} /> {formatCount(article.viewCount)} views</span>
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
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">{selectedArticle.sourceName || 'News source'}</p>
                <h2 id="news-detail-title" className="mt-2 text-2xl font-black leading-tight text-slate-950">{selectedArticle.title}</h2>
              </div>
              <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" type="button" onClick={() => setSelectedArticle(null)} aria-label="Close news detail">
                <X size={19} />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto p-5">
              <div className="mb-5 aspect-[2.15] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                {articleImage(selectedArticle)}
              </div>
              <p className="text-sm leading-7 text-slate-600">{summaryFor(selectedArticle)}</p>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-slate-700">Community signal</p>
                  <span className="text-xs font-bold text-slate-500">{formatCount(selectedArticle.participantCount)} participants</span>
                </div>
                <VoteBar article={selectedArticle} />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button className="btn-primary" type="button" onClick={() => handleVote('approve')} disabled={Boolean(voting)}>
                    {voting === 'approve' ? <LoaderCircle className="animate-spin" size={17} /> : <ThumbsUp size={17} />}
                    Approve
                  </button>
                  <button className="btn-secondary border-red-200 text-red-700" type="button" onClick={() => handleVote('reject')} disabled={Boolean(voting)}>
                    {voting === 'reject' ? <LoaderCircle className="animate-spin" size={17} /> : <ThumbsDown size={17} />}
                    Reject
                  </button>
                </div>
                {selectedArticle.userVote && (
                  <p className="mt-3 text-xs font-bold text-slate-500">Your current vote: {selectedArticle.userVote === 'approve' ? 'Approve' : 'Reject'}</p>
                )}
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
    </>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, ExternalLink, FlaskConical, Globe2, LoaderCircle, MessageCircle, Search, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getNewsArticle, getNewsWall, saveNewsResearchSignal } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import './NewsArticlePage.css';

const categoryLabels = {
  tech: 'Technology',
  finance: 'Finance',
  society: 'Society',
  entertainment: 'Culture',
};

const MAX_READING_SUMMARY_WORDS = 760;

function formatPublishedAt(value) {
  if (!value) return 'Date unavailable';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatPublishedTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function cleanArticleText(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(nbsp|#160);/gi, ' ')
    .replace(/&(amp|#38);/gi, '&')
    .replace(/&(quot|#34);/gi, '"')
    .replace(/&(apos|#39);/gi, "'")
    .replace(/&(lt|#60);/gi, '<')
    .replace(/&(gt|#62);/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(value) {
  return cleanArticleText(value).split(' ').filter(Boolean).length;
}

function articleSummary(article) {
  const candidates = [article?.readingBrief, article?.summary]
    .map(cleanArticleText)
    .filter((value) => value && !/only available (?:in|on) paid plans/i.test(value));
  const preparedSummary = candidates.find((value) => wordCount(value) <= MAX_READING_SUMMARY_WORDS);
  return preparedSummary || 'A fuller reading report is being prepared from the available reporting.';
}

function articleCategory(article) {
  const key = String(article?.category || '').toLowerCase();
  return categoryLabels[key] || 'News';
}

function splitSummary(value) {
  const sentences = String(value || '')
    .trim()
    .split(/(?:\r?\n){2,}|(?<=[.!?。！？])\s+(?=[A-Z\u4E00-\u9FFF])|(?<=[。！？])(?=[\u4E00-\u9FFF])/)
    .filter(Boolean);
  if (sentences.length < 4) return sentences.length > 1 ? sentences : [String(value || '').trim()];

  const paragraphs = [];
  for (let index = 0; index < sentences.length; index += 2) {
    paragraphs.push(sentences.slice(index, index + 2).join(' '));
  }
  return paragraphs;
}

function matchesSearch(article, query) {
  const haystack = [article?.title, article?.summary, article?.description, article?.sourceName]
    .map(cleanArticleText)
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase();
  return haystack.includes(query.toLocaleLowerCase());
}

function ArticleImage({ article }) {
  if (article?.imageUrl) {
    return <img src={article.imageUrl} alt="" className="news-reading-image" />;
  }

  return (
    <div className="news-reading-image-fallback" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function SourceHandoff({ article, onClose }) {
  if (!article?.link || typeof document === 'undefined') return null;

  return createPortal(
    <div className="news-source-handoff-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="news-source-handoff"
        role="dialog"
        aria-modal="true"
        aria-labelledby="news-source-handoff-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="news-source-handoff-close" type="button" onClick={onClose} aria-label="Close source notice">
          <X size={18} />
        </button>
        <p className="news-source-handoff-kicker">Original reporting</p>
        <h2 id="news-source-handoff-title">Continue to the source?</h2>
        <p>
          You are about to open the original reporting from {article.sourceName || 'the source'} in a new tab.
        </p>
        <div className="news-source-handoff-actions">
          <button className="news-source-handoff-cancel" type="button" onClick={onClose}>Stay here</button>
          <a className="news-source-handoff-confirm" href={article.link} target="_blank" rel="noreferrer">
            Open source <ExternalLink size={16} />
          </a>
        </div>
      </section>
    </div>,
    document.body
  );
}

export default function NewsArticlePage() {
  const { articleId } = useParams();
  const { user } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sourceHandoffOpen, setSourceHandoffOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savingResearchSignal, setSavingResearchSignal] = useState(false);
  const [researchSignalError, setResearchSignalError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadArticle() {
      setLoading(true);
      setError('');
      try {
        const response = await getNewsArticle(articleId);
        if (active) setArticle(response.data);
      } catch (caughtError) {
        if (active) setError(caughtError.response?.data?.message || 'This story is not available right now.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadArticle();
    return () => {
      active = false;
    };
  }, [articleId]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setSourceHandoffOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length < 2) {
      setSearchResults([]);
      setSearching(false);
      return undefined;
    }

    let active = true;
    const timeout = window.setTimeout(async () => {
      setSearching(true);
      try {
        const response = await getNewsWall({
          country: article?.country || 'US',
          search: query,
          window: '72h',
          limit: 6,
        });
        if (active) setSearchResults(response.data || []);
      } catch {
        if (active) setSearchResults([]);
      } finally {
        if (active) setSearching(false);
      }
    }, 220);

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [article?.country, searchQuery]);

  const summaryParagraphs = useMemo(() => splitSummary(articleSummary(article)), [article]);
  const publishedDate = formatPublishedAt(article?.publishedAt);
  const publishedTime = formatPublishedTime(article?.publishedAt);
  const hasResearchSignal = ['research', 'approve'].includes(String(article?.userVote || '').toLowerCase());

  const saveResearchSignal = async () => {
    if (!article?.id || savingResearchSignal || hasResearchSignal) return;

    setSavingResearchSignal(true);
    setResearchSignalError('');
    try {
      const response = await saveNewsResearchSignal(article.id);
      setArticle(response.data);
    } catch (caughtError) {
      setResearchSignalError(caughtError.response?.data?.message || 'Unable to save your research signal right now.');
    } finally {
      setSavingResearchSignal(false);
    }
  };

  return (
    <main className="news-reading-page">
      <header className="news-reading-header">
        <div
          className="news-reading-search-wrap"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false);
          }}
        >
          <label className="news-reading-search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search the News Wall"
              aria-label="Search the News Wall"
            />
            {searching && <LoaderCircle className="news-reading-search-loader" size={15} aria-label="Searching news" />}
          </label>
          {searchOpen && searchQuery.trim().length >= 2 && (
            <div className="news-reading-search-results" role="listbox" aria-label="News search results">
              {searchResults.length ? searchResults.map((result) => (
                <Link
                  key={result.id}
                  className="news-reading-search-result"
                  to={`/news/${encodeURIComponent(result.id)}`}
                  onClick={() => setSearchOpen(false)}
                >
                  <span>{articleCategory(result)} · {formatPublishedAt(result.publishedAt)}</span>
                  <strong>{result.title}</strong>
                </Link>
              )) : !searching && <p className="news-reading-search-empty">No matching stories in this edition yet.</p>}
            </div>
          )}
        </div>
        <Link className="news-reading-return" to="/news">
          <ArrowLeft size={16} />
          <span>News Wall</span>
        </Link>
      </header>

      {loading ? (
        <section className="news-reading-state" aria-live="polite">
          <LoaderCircle className="news-reading-loader" size={22} />
          <p>Preparing this story.</p>
        </section>
      ) : error ? (
        <section className="news-reading-state is-error">
          <p>{error}</p>
          <Link to="/news">Return to News Wall</Link>
        </section>
      ) : article ? (
        <>
          <article className="news-reading-article">
            <section className="news-reading-intro">
              <div className="news-reading-meta">
                <span>{articleCategory(article)}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.publishedAt || undefined}>{publishedDate}</time>
              </div>
              <h1>{article.title}</h1>
              <div className="news-reading-source-line">
                <Globe2 size={15} />
                <span>Reading note based on reporting from {article.sourceName || 'the original source'}.</span>
              </div>
            </section>

            <figure className="news-reading-media">
              <ArticleImage article={article} />
            </figure>
          </article>

          <div className="news-reading-rule" aria-hidden="true" />

          <section className="news-reading-body">
            <div className="news-reading-copy">
              <p className="news-reading-section-label">The story</p>
              {summaryParagraphs.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>)}
            </div>

            <aside className="news-reading-aside" aria-label="Story details">
              <div className="news-reading-detail">
                <CalendarDays size={16} />
                <div>
                  <span>Published</span>
                  <strong>{publishedDate}</strong>
                  {publishedTime && <small>{publishedTime}</small>}
                </div>
              </div>
              <div className="news-reading-detail">
                <Globe2 size={16} />
                <div>
                  <span>Source</span>
                  <strong>{article.sourceName || 'Original reporting'}</strong>
                </div>
              </div>
              <section className="news-research-signal" aria-labelledby="news-research-signal-title">
                <div className="news-research-signal-icon" aria-hidden="true"><FlaskConical size={18} /></div>
                <p>News signal</p>
                <h2 id="news-research-signal-title">Worth researching further?</h2>
                <span>This helps prioritize possible topics. It is not a fact-check or a verdict on this report.</span>
                {user ? (
                  hasResearchSignal ? (
                    <strong><Check size={15} /> Signal saved</strong>
                  ) : (
                    <button className="news-research-signal-button action-injection" type="button" onClick={saveResearchSignal} disabled={savingResearchSignal}>
                      {savingResearchSignal ? <LoaderCircle className="animate-spin" size={15} /> : <FlaskConical size={15} />}
                      Worth researching
                    </button>
                  )
                ) : (
                  <Link className="news-research-signal-login" to="/login">Sign in to add a signal <ArrowUpRight size={15} /></Link>
                )}
                {researchSignalError && <em>{researchSignalError}</em>}
              </section>
              {article.link && (
                <button className="news-reading-source-button" type="button" onClick={() => setSourceHandoffOpen(true)}>
                  View original reporting <ArrowUpRight size={17} />
                </button>
              )}
              <section className="news-reading-whatsapp" aria-labelledby="news-reading-whatsapp-title">
                <div className="news-reading-whatsapp-icon" aria-hidden="true"><MessageCircle size={19} /></div>
                <p>WhatsApp channel</p>
                <h2 id="news-reading-whatsapp-title">Stay close to what matters.</h2>
                <span>
                  Join for new signals and occasional special survey invitations. Eligible activities can offer up to 500,000 Coins.
                </span>
                <a
                  href="https://whatsapp.com/channel/0029Vb8T5zhJf05W6ZZmi83F"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join the channel <ArrowUpRight size={16} />
                </a>
              </section>
            </aside>
          </section>
        </>
      ) : null}

      {sourceHandoffOpen && <SourceHandoff article={article} onClose={() => setSourceHandoffOpen(false)} />}
    </main>
  );
}

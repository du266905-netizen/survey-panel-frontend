import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, CalendarDays, ExternalLink, Globe2, LoaderCircle, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getNewsArticle } from '../api/realApi';
import Logo from '../components/Logo';
import './NewsArticlePage.css';

const categoryLabels = {
  tech: 'Technology',
  finance: 'Finance',
  society: 'Society',
  entertainment: 'Culture',
};

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

function articleSummary(article) {
  return article?.summary || article?.description || article?.content || 'A short reading note for this story is not available yet.';
}

function articleCategory(article) {
  const key = String(article?.category || '').toLowerCase();
  return categoryLabels[key] || 'News';
}

function splitSummary(value) {
  const sentences = String(value || '')
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .filter(Boolean);
  return sentences.length > 1 ? sentences : [String(value || '').trim()];
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
  if (!article?.link) return null;

  return (
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
    </div>
  );
}

export default function NewsArticlePage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sourceHandoffOpen, setSourceHandoffOpen] = useState(false);

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

  const summaryParagraphs = useMemo(() => splitSummary(articleSummary(article)), [article]);
  const publishedDate = formatPublishedAt(article?.publishedAt);
  const publishedTime = formatPublishedTime(article?.publishedAt);

  return (
    <main className="news-reading-page">
      <header className="news-reading-header">
        <Link className="news-reading-brand" to="/" aria-label="GuanyiSearch home">
          <Logo size="md" />
        </Link>
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
              {article.link && (
                <button className="news-reading-source-button" type="button" onClick={() => setSourceHandoffOpen(true)}>
                  View original reporting <ArrowUpRight size={17} />
                </button>
              )}
            </aside>
          </section>
        </>
      ) : null}

      {sourceHandoffOpen && <SourceHandoff article={article} onClose={() => setSourceHandoffOpen(false)} />}
    </main>
  );
}

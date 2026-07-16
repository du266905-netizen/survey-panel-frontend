import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, CircleDollarSign, Eye, Newspaper, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getNewsWall } from '../api/realApi';
import GlobalGlobe from '../components/GlobalGlobe';
import Logo from '../components/Logo';
import PublicAuthPanel from '../components/PublicAuthPanel';

const qualityControls = [
  ['Clear eligibility', 'A transparent start helps people understand how participation begins and what comes next.', BadgeCheck],
  ['Respectful privacy', 'Information is collected only when it has a clear purpose in the research experience.', ShieldCheck],
  ['Visible records', 'Participation, rewards, and account progress stay easy to understand at every step.', UserRoundCheck],
];

const panelistSteps = [
  ['01', 'Create your account', 'Use Google or your email, then verify the account and accept the platform terms.'],
  ['02', 'Complete your profile', 'Tell us the basics so available research can be matched more thoughtfully.'],
  ['03', 'Track your rewards', 'Keep wallet activity, records, and redemption requests in one place.'],
];

const socialLinks = [
  { id: 'x', label: 'X / Twitter', href: 'https://x.com/GUANYISEARCH' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591672089947' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/guanyisearch/' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/guanyisearch/' },
];

const previewNewsCategories = ['tech', 'finance', 'society', 'entertainment'];

function SocialGlyph({ id }) {
  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="17.25" cy="6.75" r="1.35" fill="currentColor" />
      </svg>
    );
  }

  if (id === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M14.1 8.65h3.15V4h-3.72C9.4 4 7 6.46 7 10.1v2.4H4v4.38h3V23h4.85v-6.12h3.74l.7-4.38h-4.44v-1.95c0-1.26.62-1.9 2.25-1.9Z" />
      </svg>
    );
  }

  if (id === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M5.15 7.25A2.6 2.6 0 1 1 5.18 2a2.6 2.6 0 0 1-.03 5.25ZM2.78 22V9.22h4.78V22H2.78Zm7.12 0V9.22h4.58v1.75h.06c.64-1.12 2.08-2.14 4.17-2.14 4.1 0 5.02 2.7 5.02 6.2V22h-4.78v-6.25c0-1.5-.03-3.43-2.1-3.43-2.1 0-2.18 1.67-2.18 3.34V22H9.9Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

function formatPreviewCount(value) {
  return new Intl.NumberFormat('en-US', { notation: Number(value || 0) >= 1000 ? 'compact' : 'standard' }).format(Number(value || 0));
}

function placeholderPreviewViews(article) {
  const seed = String(article?.id || article?.title || article?.link || article?.sourceName || 'news');
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1001;
  }
  return hash;
}

function LandingNewsImage({ article }) {
  if (article?.imageUrl) {
    return <img src={article.imageUrl} alt="" loading="lazy" decoding="async" />;
  }
  return (
    <div className="landing-news-image-fallback" aria-hidden="true">
      <Newspaper size={34} strokeWidth={1.6} />
    </div>
  );
}

function LandingNewsPreview() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadPreviewNews() {
      setLoading(true);
      setError('');
      try {
        const responses = await Promise.allSettled(
          previewNewsCategories.map((category) => getNewsWall({ country: 'US', category, limit: 6 }))
        );
        const byId = new Map();
        responses.forEach((result) => {
          if (result.status !== 'fulfilled') return;
          (result.value.data || []).forEach((article) => {
            if (article?.id && !byId.has(article.id)) byId.set(article.id, article);
          });
        });
        const nextArticles = [...byId.values()]
          .sort((left, right) => Number(right.score || 0) - Number(left.score || 0) || new Date(right.publishedAt || 0) - new Date(left.publishedAt || 0))
          .slice(0, 3);
        if (!cancelled) setArticles(nextArticles);
      } catch {
        if (!cancelled) setError('News preview is temporarily unavailable.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPreviewNews();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="landing-news-preview" aria-labelledby="landing-news-preview-title">
      <div className="landing-container landing-news-preview-panel">
        <div className="landing-news-preview-head">
          <div>
            <h2 id="landing-news-preview-title">Today’s topics are already moving.</h2>
          </div>
          <Link to="/news">Explore <ArrowRight size={17} /></Link>
        </div>

        {loading ? (
          <div className="landing-news-grid" aria-label="Loading news preview">
            {Array.from({ length: 3 }).map((_, index) => <div key={index} className="landing-news-card is-loading" />)}
          </div>
        ) : error ? (
          <p className="landing-news-preview-error">{error}</p>
        ) : articles.length ? (
          <div className="landing-news-grid">
            {articles.map((article) => (
              <Link key={article.id} className="landing-news-card" to={`/news?article=${encodeURIComponent(article.id)}`}>
                <div className="landing-news-card-image">
                  <LandingNewsImage article={article} />
                </div>
                <div className="landing-news-card-body">
                  <p>{article.sourceName || 'News source'}</p>
                  <h3>{article.title}</h3>
                  <div className="landing-news-card-meta">
                    <span><Eye size={14} /> {formatPreviewCount(placeholderPreviewViews(article))} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="landing-news-preview-error">Latest News Wall stories will appear here as soon as the feed refreshes.</p>
        )}
      </div>
    </section>
  );
}

function LandingPhoto({ className = '', src, alt, eyebrow, title, priority = false }) {
  const imageRef = useRef(null);
  const [imageState, setImageState] = useState('loading');

  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete) return;
    setImageState(image.naturalWidth > 0 ? 'loaded' : 'error');
  }, []);

  return (
    <article className={`landing-photo ${className} is-${imageState}`}>
      <div className="landing-photo-loading" aria-hidden="true"><span /></div>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setImageState('loaded')}
        onError={() => setImageState('error')}
      />
      <div className="landing-photo-fallback" aria-hidden="true"><span>Visual preview is temporarily unavailable.</span></div>
      <div className="landing-photo-caption"><p>{eyebrow}</p><strong>{title}</strong></div>
    </article>
  );
}

export default function Landing({ initialAuthMode = 'register' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [authMode, setAuthMode] = useState(initialAuthMode);

  useEffect(() => setAuthMode(initialAuthMode), [initialAuthMode]);

  useEffect(() => {
    const revealItems = [...document.querySelectorAll('[data-reveal]')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -44px' }
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const setMode = (nextMode) => {
    setAuthMode(nextMode);
    navigate({ pathname: nextMode === 'login' ? '/login' : '/register', search: location.search });
  };

  return (
    <main className="landing-page">
      <style>{`
        .landing-page { background: #f7f8f8; color: #0d1216; min-width: 320px; }
        .landing-shell { position: relative; height: min(900px, 100svh); min-height: 720px; overflow: hidden; background: radial-gradient(circle at 44% 54%, #12262d 0%, #081216 27%, #050708 53%, #020303 100%); }
        .landing-brand { position: relative; display: flex; width: calc(52% + 40px); height: 100%; min-height: 0; flex-direction: column; overflow: hidden; background: transparent; color: white; padding: 34px clamp(28px, 6vw, 88px) 48px; }
        .landing-brand:before { position: absolute; inset: -12%; background: radial-gradient(circle at 48% 42%, rgba(38, 111, 121, .19), transparent 32%), radial-gradient(circle at 73% 67%, rgba(53, 77, 86, .18), transparent 35%), linear-gradient(140deg, transparent 20%, rgba(255,255,255,.025) 100%); background-size: 135% 135%; animation: landing-aurora 15s ease-in-out infinite alternate; content: ''; pointer-events: none; }
        .landing-brand-header, .landing-brand-content { position: relative; z-index: 1; }
        .landing-brand-header { display: flex; align-items: center; justify-content: space-between; }
        .landing-brand-header a { display: inline-flex; }
        .landing-brand-kicker { color: rgba(255,255,255,.5); font-size: 10px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
        .landing-brand-mark { position: absolute; z-index: 0; top: 22%; left: 67%; width: min(32vw, 380px); transform: translate(-50%, -50%); mix-blend-mode: screen; opacity: .66; pointer-events: none; will-change: transform, filter; animation: landing-mark-drift 10s ease-in-out infinite; }
        .landing-brand-header { animation: landing-enter-soft .8s cubic-bezier(.2,.8,.2,1) both; }
        .landing-brand-content { margin-top: auto; max-width: 590px; }
        .landing-brand-content h1 { max-width: 620px; margin: 0; font-size: clamp(38px, 4vw, 64px); font-weight: 800; letter-spacing: -.055em; line-height: 1.03; }
        .landing-brand-content > p { max-width: 525px; margin: 22px 0 0; color: rgba(255,255,255,.68); font-size: 16px; line-height: 1.75; }
        .landing-brand-proof { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 11px; margin-top: 35px; }
        .landing-brand-proof span { display: flex; min-height: 62px; align-items: center; gap: 8px; border-top: 1px solid rgba(255,255,255,.18); color: rgba(255,255,255,.78); font-size: 12px; font-weight: 700; line-height: 1.35; padding-top: 12px; }
        .landing-brand-proof svg { flex: 0 0 auto; color: rgba(221,234,233,.76); }
        .landing-brand-content h1, .landing-brand-content > p, .landing-brand-proof { opacity: 0; animation: landing-enter-soft .82s cubic-bezier(.2,.8,.2,1) both; }
        .landing-brand-content h1 { animation-delay: .12s; }
        .landing-brand-content > p { animation-delay: .22s; }
        .landing-brand-proof { animation-delay: .32s; }
        .landing-access { position: absolute; z-index: 2; top: 0; right: 0; bottom: 0; display: flex; width: 48%; min-width: 480px; min-height: 0; height: auto; flex-direction: column; overflow: hidden; border: 0; border-radius: 0; background: linear-gradient(90deg, rgba(5,9,11,0) 0%, rgba(6,13,16,.36) 24%, rgba(8,15,18,.84) 62%, rgba(8,14,17,.98) 100%); box-shadow: none; padding: 34px clamp(28px, 4vw, 68px) 32px; animation: landing-access-in .86s cubic-bezier(.2,.8,.2,1) .16s both; }
        .landing-access-nav { display: flex; align-items: center; justify-content: flex-end; gap: 22px; font-size: 13px; font-weight: 700; }
        .landing-access-nav a { color: rgba(231,239,238,.62); text-decoration: none; }
        .landing-access-nav a:hover { color: #f4f7f6; }
        .landing-access-nav .landing-nav-pill { border: 1px solid rgba(230,239,239,.22); border-radius: 999px; color: #f7f8f7; padding: 9px 14px; }
        .landing-access-inner { display: flex; min-height: 0; flex: 1; flex-direction: column; align-items: center; justify-content: flex-start; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; padding: 42px 12px 72px; scroll-padding-top: 42px; scrollbar-width: thin; scrollbar-color: rgba(218,230,230,.3) transparent; }
        .public-auth-panel { width: min(100%, 400px); }
        .public-auth-tabs { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid rgba(221,233,232,.16); }
        .public-auth-tabs button { border: 0; border-bottom: 2px solid transparent; background: transparent; color: rgba(228,238,237,.46); cursor: pointer; font-size: 13px; font-weight: 800; padding: 0 0 13px; }
        .public-auth-tabs button.is-active { border-color: rgba(244,247,246,.9); color: #f8f9f8; }
        .public-auth-content { padding-top: 31px; }
        .public-auth-eyebrow { margin: 0 0 8px; color: rgba(199,216,214,.66); font-size: 10px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; }
        .public-auth-content h2 { margin: 0; color: #f7f8f7; font-size: clamp(28px, 3.1vw, 37px); font-weight: 800; letter-spacing: -.045em; line-height: 1.12; }
        .public-auth-intro { margin: 12px 0 22px; color: rgba(216,228,226,.62); font-size: 14px; line-height: 1.65; }
        .public-auth-consent { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 17px; color: rgba(216,228,226,.62); font-size: 11px; line-height: 1.45; }
        .public-auth-consent input { width: 14px; height: 14px; margin: 1px 0 0; accent-color: #d6e2df; }
        .public-auth-consent a, .public-auth-secondary a { color: #edf3f1; font-weight: 800; }
        .public-auth-google-disabled { display: flex; width: 100%; height: 44px; align-items: center; justify-content: center; gap: 10px; border: 1px solid rgba(218,231,230,.18); border-radius: 999px; background: rgba(255,255,255,.035); color: rgba(230,238,237,.58); cursor: not-allowed; font-size: 14px; font-weight: 700; }
        .public-auth-divider { display: flex; align-items: center; gap: 12px; color: rgba(219,231,230,.42); font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; margin: 23px 0; }
        .public-auth-divider:before, .public-auth-divider:after { height: 1px; flex: 1; background: rgba(221,232,231,.16); content: ''; }
        .public-auth-form { display: grid; gap: 15px; }
        .public-auth-form label > span:first-child { display: block; margin-bottom: 7px; color: rgba(222,233,232,.65); font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .public-auth-input { display: flex !important; height: 48px; align-items: center; gap: 9px; border: 1px solid rgba(218,231,230,.16); border-radius: 13px; background: rgba(0,0,0,.2); color: rgba(213,226,225,.52); padding: 0 13px; transition: border-color .18s ease, box-shadow .18s ease, background .18s ease; }
        .public-auth-input:focus-within { border-color: rgba(235,243,242,.55); background: rgba(0,0,0,.28); box-shadow: 0 0 0 4px rgba(222,235,234,.055); }
        .public-auth-input input { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: #f4f7f5; font-size: 14px; font-weight: 600; }
        .public-auth-input input::placeholder { color: rgba(210,224,222,.37); font-weight: 500; }
        .public-auth-input button { border: 0; background: transparent; color: rgba(219,232,231,.58); cursor: pointer; padding: 4px; }
        .public-auth-secondary { margin-top: -4px; text-align: right; font-size: 12px; }
        .public-auth-submit, .public-auth-email-cta { display: flex; width: 100%; height: 49px; align-items: center; justify-content: center; gap: 8px; border: 1px solid rgba(231,239,238,.18); border-radius: 13px; background: #eef2f0; color: #101615; cursor: pointer; font-size: 14px; font-weight: 800; transition: transform .18s ease, background .18s ease, border-color .18s ease; }
        .public-auth-submit:hover, .public-auth-email-cta:hover { border-color: #fff; background: #fff; transform: translateY(-1px); }
        .public-auth-submit:disabled, .public-auth-code:disabled { cursor: not-allowed; opacity: .55; transform: none; }
        .public-auth-email-cta { border: 1px solid rgba(231,239,238,.19); background: transparent; color: #f2f5f3; }
        .public-auth-back { display: inline-flex; width: max-content; align-items: center; gap: 4px; border: 0; background: transparent; color: rgba(238,244,242,.83); cursor: pointer; font-size: 12px; font-weight: 800; margin-bottom: 2px; padding: 0; }
        .public-auth-code { justify-self: start; border: 0; background: transparent; color: rgba(238,244,242,.83); cursor: pointer; font-size: 12px; font-weight: 800; margin-top: -7px; padding: 0; }
        .public-auth-register-form { gap: 13px; }
        .public-auth-register-form .cf-turnstile { max-width: 100%; }
        .public-auth-message { margin: 15px 0 0; border: 1px solid #f7caca; border-radius: 11px; background: #fff5f5; color: #bb3434; font-size: 12px; font-weight: 700; line-height: 1.45; padding: 10px 12px; }
        .public-auth-message.is-success { border-color: #a7e3d5; background: #edfffa; color: #08755f; }
        .landing-scroll-cue { display: flex; align-items: center; gap: 8px; color: rgba(218,230,229,.46); font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
        .landing-news-preview { background: #020303; color: white; padding: 0 0 72px; }
        .landing-news-preview-panel { border: 1px solid rgba(255,255,255,.12); border-radius: 26px; background: linear-gradient(135deg, rgba(13,32,39,.92), rgba(6,11,14,.96)); box-shadow: 0 28px 70px rgba(0,0,0,.24); padding: clamp(22px, 4vw, 42px); }
        .landing-news-preview-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 24px; }
        .landing-news-preview-head h2 { max-width: 560px; margin: 0; font-size: clamp(27px, 3vw, 42px); font-weight: 850; letter-spacing: -.045em; line-height: 1.08; }
        .landing-news-preview-head a { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(141,245,250,.24); border-radius: 999px; background: rgba(141,245,250,.1); color: #9cf5f9; font-size: 13px; font-weight: 850; text-decoration: none; padding: 12px 16px; white-space: nowrap; }
        .landing-news-preview-head a:hover { background: rgba(141,245,250,.16); color: white; }
        .landing-news-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .landing-news-card { overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 20px; background: rgba(255,255,255,.055); color: white; text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,.05); transition: transform .2s ease, border-color .2s ease, background .2s ease; }
        .landing-news-card:hover { border-color: rgba(137,240,247,.34); background: rgba(255,255,255,.08); transform: translateY(-3px); }
        .landing-news-card.is-loading { min-height: 330px; background: linear-gradient(100deg, rgba(255,255,255,.06), rgba(255,255,255,.12), rgba(255,255,255,.06)); background-size: 220% 100%; animation: landing-news-shimmer 1.4s ease-in-out infinite; }
        .landing-news-card-image { aspect-ratio: 1.9; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,.09); background: #0c1b20; }
        .landing-news-card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s cubic-bezier(.2,.7,.2,1); }
        .landing-news-card:hover .landing-news-card-image img { transform: scale(1.04); }
        .landing-news-image-fallback { display: grid; width: 100%; height: 100%; place-items: center; background: radial-gradient(circle at 60% 35%, rgba(83,221,230,.2), transparent 42%), #0b1b20; color: #86eef6; }
        .landing-news-card-body { padding: 18px; }
        .landing-news-card-body > p { margin: 0 0 9px; color: #8eeef5; font-size: 10px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }
        .landing-news-card-body h3 { min-height: 3.1em; margin: 0; display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: 16px; font-weight: 850; letter-spacing: -.02em; line-height: 1.35; }
        .landing-news-card-meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; margin-top: 15px; color: rgba(220,232,232,.62); font-size: 11px; font-weight: 800; }
        .landing-news-card-meta span { display: inline-flex; align-items: center; gap: 5px; }
        .landing-news-preview-error { border: 1px solid rgba(251,191,36,.28); border-radius: 16px; background: rgba(251,191,36,.09); color: #fde68a; font-size: 13px; font-weight: 800; padding: 14px 16px; }
        .landing-tone-transition { position: relative; height: clamp(76px, 7vw, 126px); overflow: hidden; }
        .landing-tone-transition:after { position: absolute; inset: -20% -10%; background: radial-gradient(ellipse 48% 110% at 50% 50%, rgba(112,184,187,.12), transparent 70%); animation: landing-transition-breathe 12s ease-in-out infinite alternate; content: ''; pointer-events: none; }
        .landing-tone-transition.is-dark-to-light { background: linear-gradient(180deg, #020303 0%, #0c1a1e 24%, #3d5355 57%, #c7d1d0 84%, #f7f8f8 100%); }
        .landing-tone-transition.is-light-to-dark { background: linear-gradient(180deg, #f7f8f8 0%, #c7d1d0 16%, #3d5355 45%, #0c1a1e 76%, #090c0e 100%); }
        .landing-tone-transition.is-global-to-light { height: clamp(72px, 6vw, 108px); background: linear-gradient(180deg, #020303 0%, #12262d 25%, #496568 58%, #cad3d2 85%, #f7f8f8 100%); }
        .landing-sections { background: #f7f8f8; }
        .landing-container { width: min(100% - 48px, 1200px); margin: 0 auto; }
        .landing-intro { display: grid; grid-template-columns: minmax(0,.95fr) minmax(0,1.05fr); gap: clamp(42px, 8vw, 112px); align-items: center; padding: 120px 0; }
        .landing-label { margin: 0; color: #07889c; font-size: 11px; font-weight: 900; letter-spacing: .17em; text-transform: uppercase; }
        .landing-intro h2, .landing-quality-copy h2, .landing-panelist-heading h2 { margin: 14px 0 0; color: #0c1217; font-size: clamp(31px, 4vw, 52px); font-weight: 800; letter-spacing: -.05em; line-height: 1.08; }
        .landing-intro > p, .landing-quality-copy > p, .landing-panelist-heading > p { color: #5e6a72; font-size: 16px; line-height: 1.8; }
        .landing-intro > p { margin: 0; }
        .landing-photo-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 16px; padding-bottom: 120px; }
        .landing-photo { position: relative; min-height: 350px; overflow: hidden; border-radius: 22px; background: #102126; content-visibility: auto; contain-intrinsic-size: 390px; }
        .landing-photo-loading { position: absolute; z-index: 0; inset: 0; display: grid; place-items: center; background: radial-gradient(circle at 70% 20%, rgba(104, 187, 190, .2), transparent 34%), linear-gradient(135deg, #173539, #0a161a 72%); opacity: 1; transition: opacity .45s ease; }
        .landing-photo.is-short .landing-photo-loading { background: radial-gradient(circle at 26% 72%, rgba(176, 157, 97, .24), transparent 33%), linear-gradient(135deg, #26343a, #141b20 76%); }
        .landing-photo.is-wide .landing-photo-loading { background: radial-gradient(circle at 78% 26%, rgba(109, 151, 157, .2), transparent 31%), linear-gradient(135deg, #253336, #111819 76%); }
        .landing-photo-loading:before, .landing-photo-loading:after, .landing-photo-loading span { width: 35%; height: 1px; background: rgba(223, 244, 241, .2); content: ''; transform: translateY(-11px); }
        .landing-photo-loading:after { width: 21%; transform: translateY(11px); }
        .landing-photo-loading span { width: 6px; height: 6px; border-radius: 50%; background: rgba(221, 246, 243, .56); box-shadow: 0 0 0 7px rgba(217, 244, 240, .08); transform: none; }
        .landing-photo img { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 1; transform: scale(1.001); transition: opacity .45s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
        .landing-photo.is-loading img, .landing-photo.is-error img { opacity: 0; }
        .landing-photo.is-loaded .landing-photo-loading { opacity: 0; }
        .landing-photo-fallback { position: absolute; z-index: 1; inset: 0; display: grid; place-items: center; background: radial-gradient(circle at 54% 38%, rgba(99, 184, 187, .14), transparent 38%), linear-gradient(135deg, #132b30, #071013); color: rgba(222, 237, 234, .63); font-size: 11px; font-weight: 800; letter-spacing: .12em; opacity: 0; text-align: center; text-transform: uppercase; transition: opacity .25s ease; }
        .landing-photo-fallback span { max-width: 190px; line-height: 1.6; }
        .landing-photo.is-error .landing-photo-loading { opacity: 0; }
        .landing-photo.is-error .landing-photo-fallback { opacity: 1; }
        .landing-photo:hover img { transform: scale(1.035); }
        .landing-photo.is-short { min-height: 350px; }
        .landing-photo.is-wide { grid-column: 1 / -1; min-height: 390px; }
        .landing-photo-caption { position: absolute; z-index: 2; right: 18px; bottom: 18px; left: 18px; border: 1px solid rgba(255,255,255,.2); border-radius: 15px; background: rgba(8,14,17,.76); color: white; padding: 16px; backdrop-filter: blur(10px); }
        .landing-photo-caption p { margin: 0; color: #84edf5; font-size: 10px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }
        .landing-photo-caption strong { display: block; margin-top: 5px; font-size: 16px; line-height: 1.3; }
        .landing-quality { background: #090c0e; color: white; padding: 118px 0; }
        .landing-quality-grid { display: grid; grid-template-columns: minmax(0,.85fr) minmax(0,1.15fr); gap: clamp(45px, 8vw, 112px); }
        .landing-quality-copy h2 { color: white; }
        .landing-quality-copy > p { color: rgba(255,255,255,.62); }
        .landing-quality-list { display: grid; border-top: 1px solid rgba(255,255,255,.2); }
        .landing-quality-item { display: grid; grid-template-columns: 44px 1fr; gap: 18px; border-bottom: 1px solid rgba(255,255,255,.2); padding: 25px 0; }
        .landing-quality-icon { display: grid; width: 39px; height: 39px; place-items: center; border: 1px solid rgba(255,255,255,.24); border-radius: 50%; color: rgba(231,241,239,.9); }
        .landing-quality-item h3 { margin: 0; font-size: 18px; }
        .landing-quality-item p { max-width: 455px; margin: 8px 0 0; color: rgba(255,255,255,.62); font-size: 14px; line-height: 1.7; }
        .landing-global-section { position: relative; overflow: hidden; background: radial-gradient(circle at 44% 54%, #12262d 0%, #081216 27%, #050708 53%, #020303 100%); color: white; }
        .landing-global-section:before, .landing-global-section:after { content: none; }
        .landing-global { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: clamp(34px, 5vw, 78px); min-height: 680px; align-items: center; padding: 60px 0; }
        .landing-global-copy { max-width: 500px; padding: 36px 0; }
        .landing-global-copy .landing-label { color: rgba(217, 232, 230, .62); }
        .landing-global-copy h2 { margin: 14px 0 0; color: #f5f9f8; font-size: clamp(34px, 4.1vw, 58px); font-weight: 800; letter-spacing: -.055em; line-height: 1.04; }
        .landing-global-copy p { max-width: 470px; color: rgba(223,233,232,.66); font-size: 16px; line-height: 1.85; }
        .landing-global-visual { position: relative; min-height: 570px; }
        .landing-map-frame { position: absolute; inset: 0; display: grid; min-height: 0; place-items: center; overflow: visible; border: 0; border-radius: 0; background: transparent; box-shadow: none; content-visibility: auto; contain-intrinsic-size: 640px; }
        .landing-map-frame:before, .landing-map-frame:after { content: none; }
        .landing-global-globe { position: relative; z-index: 1; display: block; width: min(90%, 560px); max-width: 560px; aspect-ratio: 1; filter: drop-shadow(0 28px 40px rgba(0,0,0,.38)); transform: translate(0, 1%); }
        .landing-global-globe-canvas { display: block; width: 100%; height: 100%; cursor: grab; touch-action: pan-y; }
        .landing-global-globe-canvas:active { cursor: grabbing; }
        .landing-panelists { padding: 118px 0; }
        .landing-panelist-heading { max-width: 655px; }
        .landing-panelist-heading > p { margin: 18px 0 0; }
        .landing-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 55px; }
        .landing-step { min-height: 220px; border: 1px solid #dce3e5; border-radius: 19px; background: white; padding: 25px; }
        .landing-step > span { color: #0799ac; font-size: 12px; font-weight: 900; letter-spacing: .12em; }
        .landing-step h3 { margin: 48px 0 0; color: #0b1217; font-size: 19px; }
        .landing-step p { margin: 10px 0 0; color: #65727a; font-size: 14px; line-height: 1.7; }
        .landing-reward-banner { position: relative; min-height: 410px; overflow: hidden; border-radius: 24px; background: #0b1317; margin-top: 72px; }
        .landing-reward-banner img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .55; }
        .landing-reward-banner:after { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(4,9,12,.9), rgba(4,9,12,.3)); content: ''; }
        .landing-reward-copy { position: relative; z-index: 1; max-width: 570px; color: white; padding: 70px; }
        .landing-reward-copy h2 { margin: 14px 0 0; font-size: clamp(30px, 4vw, 48px); font-weight: 800; letter-spacing: -.05em; line-height: 1.08; }
        .landing-reward-copy p { color: rgba(255,255,255,.7); font-size: 15px; line-height: 1.8; }
        .landing-reward-copy a { display: inline-flex; align-items: center; gap: 7px; color: #7debf5; font-size: 14px; font-weight: 800; text-decoration: none; }
        .landing-footer { overflow: hidden; background: #0c1629; color: white; }
        .landing-footer-grid { display: grid; grid-template-columns: minmax(280px, .9fr) minmax(0, 1.1fr); min-height: 310px; }
        .landing-footer-brand { position: relative; display: flex; flex-direction: column; justify-content: center; overflow: hidden; border-right: 1px solid rgba(255,255,255,.1); padding: 54px clamp(28px, 5vw, 72px); }
        .landing-footer-brand:before { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0, 214, 229, .13), transparent 44%), repeating-linear-gradient(-12deg, transparent 0 16px, rgba(71,228,240,.055) 17px 18px); content: ''; }
        .landing-footer-brand img, .landing-footer-brand p { position: relative; z-index: 1; }
        .landing-footer-identity { position: relative; z-index: 1; display: flex; align-items: center; gap: 14px; }
        .landing-footer-logo-mark { width: 47px; height: 47px; object-fit: contain; mix-blend-mode: screen; }
        .landing-footer-brand p { max-width: 420px; margin: 20px 0 0; color: #98a8bf; font-size: 15px; line-height: 1.75; }
        .landing-footer-contact { display: flex; flex-direction: column; justify-content: center; padding: 54px clamp(28px, 5vw, 72px); }
        .landing-footer-contact h2 { margin: 0; color: #40d5e4; font-size: 14px; font-weight: 800; letter-spacing: .08em; }
        .landing-footer-contact p { max-width: 490px; margin: 18px 0 0; color: #9aa9c0; font-size: 15px; line-height: 1.75; }
        .landing-footer-email { display: inline-flex; width: max-content; margin-top: 15px; color: white; font-size: clamp(19px, 2vw, 25px); font-weight: 750; letter-spacing: -.02em; text-decoration: none; }
        .landing-footer-email:hover { color: #78edf5; }
        .landing-social-links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .landing-social-link { display: grid; width: 54px; height: 54px; place-items: center; border: 1px solid rgba(255,255,255,.1); border-radius: 14px; background: rgba(255,255,255,.075); color: #f8fbfb; text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 16px 34px rgba(0,0,0,.18); transition: transform .18s ease, border-color .18s ease, background .18s ease, color .18s ease; }
        .landing-social-link svg { width: 28px; height: 28px; display: block; }
        .landing-social-link:hover { border-color: rgba(120,237,245,.38); background: rgba(120,237,245,.13); color: #86f3fa; transform: translateY(-2px); }
        .landing-footer-bottom { display: flex; align-items: center; justify-content: space-between; gap: 24px; border-top: 1px solid rgba(255,255,255,.1); padding: 28px 0; }
        .landing-footer-bottom p { margin: 0; color: #8493ab; font-size: 13px; }
        .landing-footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 24px; }
        .landing-footer-links a { color: #9dacc0; font-size: 13px; font-weight: 700; text-decoration: none; }
        .landing-footer-links a:hover { color: #78edf5; }
        [data-reveal] { opacity: 0; filter: blur(5px); transform: translate3d(0, 34px, 0); transition: opacity .78s cubic-bezier(.2,.8,.2,1), filter .78s cubic-bezier(.2,.8,.2,1), transform .78s cubic-bezier(.2,.8,.2,1); }
        [data-reveal] > * { opacity: 0; transform: translate3d(0, 16px, 0); transition: opacity .72s cubic-bezier(.2,.8,.2,1), transform .72s cubic-bezier(.2,.8,.2,1); }
        [data-reveal].is-visible { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
        [data-reveal].is-visible > * { opacity: 1; transform: translate3d(0, 0, 0); }
        [data-reveal].is-visible > :nth-child(2) { transition-delay: .12s; }
        [data-reveal].is-visible > :nth-child(3) { transition-delay: .2s; }
        .landing-quality-item { opacity: 0; transform: translate3d(0, 12px, 0); transition: opacity .62s cubic-bezier(.2,.8,.2,1), transform .62s cubic-bezier(.2,.8,.2,1); }
        [data-reveal].is-visible .landing-quality-item { opacity: 1; transform: translate3d(0, 0, 0); }
        [data-reveal].is-visible .landing-quality-item:nth-child(1) { transition-delay: .16s; }
        [data-reveal].is-visible .landing-quality-item:nth-child(2) { transition-delay: .25s; }
        [data-reveal].is-visible .landing-quality-item:nth-child(3) { transition-delay: .34s; }
        [data-reveal].is-visible .landing-steps .landing-step { opacity: 1; transform: translate3d(0, 0, 0); }
        .landing-steps .landing-step { opacity: 0; transform: translate3d(0, 18px, 0); transition: opacity .68s cubic-bezier(.2,.8,.2,1), transform .68s cubic-bezier(.2,.8,.2,1), box-shadow .28s ease, border-color .28s ease; }
        [data-reveal].is-visible .landing-steps .landing-step:nth-child(1) { transition-delay: .14s; }
        [data-reveal].is-visible .landing-steps .landing-step:nth-child(2) { transition-delay: .23s; }
        [data-reveal].is-visible .landing-steps .landing-step:nth-child(3) { transition-delay: .32s; }
        @media (hover: hover) { .landing-step:hover { border-color: #c4d4d6; box-shadow: 0 18px 36px rgba(21,45,48,.09); transform: translate3d(0, -4px, 0) !important; } }
        @keyframes landing-enter-soft { from { opacity: 0; transform: translate3d(0, 18px, 0); filter: blur(5px); } to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); } }
        @keyframes landing-access-in { from { opacity: 0; transform: translate3d(28px, 0, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
        @keyframes landing-transition-breathe { from { transform: translate3d(-3%, -1%, 0) scale(1); opacity: .42; } to { transform: translate3d(3%, 1%, 0) scale(1.06); opacity: .9; } }
        @keyframes landing-aurora { from { transform: translate3d(-1.5%, -1%, 0) scale(1); } to { transform: translate3d(1.5%, 1%, 0) scale(1.06); } }
        @keyframes landing-mark-drift { 0%, 100% { transform: translate(-50%, -50%) translate3d(0, 0, 0) rotate(-4deg); filter: drop-shadow(0 0 0 rgba(79,231,242,0)); } 50% { transform: translate(-50%, -50%) translate3d(-10px, -18px, 0) rotate(3deg); filter: drop-shadow(0 18px 26px rgba(79,231,242,.13)); } }
        @keyframes landing-news-shimmer { from { background-position: 120% 0; } to { background-position: -120% 0; } }
        @media (prefers-reduced-motion: reduce) { *, *:before, *:after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; } }
        @media (max-width: 1180px) { .landing-shell { display: grid; height: auto; min-height: 0; overflow: visible; grid-template-columns: 1fr; } .landing-brand, .landing-access { min-height: auto; height: auto; } .landing-brand { width: auto; min-height: 680px; } .landing-access { position: static; width: auto; min-width: 0; overflow: visible; border: 0; border-radius: 0; box-shadow: none; padding-bottom: 68px; } .landing-access-nav { justify-content: space-between; } .landing-access-inner { overflow: visible; padding: 54px 0 12px; } .landing-brand-mark { top: 33%; left: 52%; width: min(80vw, 540px); } .landing-news-grid { grid-template-columns: 1fr; } .landing-news-card-body h3 { min-height: 0; } .landing-footer-grid { grid-template-columns: 1fr; } .landing-footer-brand { border-right: 0; border-bottom: 1px solid rgba(255,255,255,.1); } }
        @media (max-width: 700px) { .landing-brand { min-height: 625px; padding: 25px 24px 31px; } .landing-brand-kicker { display: none; } .landing-brand-content h1 { font-size: 39px; } .landing-brand-content > p { font-size: 14px; line-height: 1.65; } .landing-brand-proof { grid-template-columns: 1fr; gap: 2px; margin-top: 24px; } .landing-brand-proof span { min-height: 0; padding-top: 8px; } .landing-brand-mark { top: 35%; left: 54%; width: 100vw; } .landing-access { padding: 20px 24px 36px; } .landing-access-nav { font-size: 12px; gap: 12px; } .landing-access-inner { padding-top: 40px; } .public-auth-content h2 { font-size: 30px; } .landing-container { width: min(100% - 40px, 1200px); } .landing-news-preview { padding-bottom: 54px; } .landing-news-preview-head { align-items: flex-start; flex-direction: column; } .landing-intro, .landing-quality-grid, .landing-global { grid-template-columns: 1fr; gap: 28px; padding: 78px 0; } .landing-intro > p { font-size: 15px; } .landing-photo-grid { grid-template-columns: 1fr; padding-bottom: 78px; } .landing-photo, .landing-photo.is-short, .landing-photo.is-wide { grid-column: auto; min-height: 315px; } .landing-quality, .landing-panelists { padding: 78px 0; } .landing-global { min-height: 0; } .landing-global-visual { order: 2; min-height: 385px; } .landing-global-copy { order: 1; padding: 0; } .landing-map-frame { min-height: 0; } .landing-global-globe { width: min(88%, 350px); transform: translate(0, 1%); } .landing-steps { grid-template-columns: 1fr; gap: 12px; margin-top: 38px; } .landing-step { min-height: 0; } .landing-step h3 { margin-top: 25px; } .landing-reward-banner { min-height: 470px; margin-top: 45px; } .landing-reward-copy { padding: 44px 28px; } .landing-footer-brand, .landing-footer-contact { padding: 44px 28px; } .landing-footer-bottom { align-items: flex-start; flex-direction: column; padding: 24px 0; } .landing-footer-links { justify-content: flex-start; } }
      `}</style>

      <section className="landing-shell">
        <section className="landing-brand" aria-labelledby="landing-title">
          <div className="landing-brand-header">
            <Link to="/" aria-label="GuanyiSearch home"><Logo size="md" variant="light" /></Link>
            <span className="landing-brand-kicker">Research participation platform</span>
          </div>
          <img className="landing-brand-mark" src="/guanyisearch-brand-mark.png" alt="" aria-hidden="true" />
          <div className="landing-brand-content">
            <h1 id="landing-title">Research participation, made more accountable.</h1>
            <p>GuanyiSearch connects paid research surveys, daily news signals, transparent rewards, and quality-aware operations in one carefully designed platform.</p>
            <div className="landing-brand-proof">
              <span><BadgeCheck size={16} /> Verified entry</span>
              <span><CircleDollarSign size={16} /> Reward visibility</span>
              <span><ShieldCheck size={16} /> Privacy-minded</span>
            </div>
          </div>
        </section>

        <section className="landing-access" aria-label="Account access">
          <nav className="landing-access-nav" aria-label="Public navigation">
            <a href="#platform">Platform</a>
            <Link to="/news">News Wall</Link>
            <a href="#quality">Quality</a>
            {authMode === 'login' ? <Link className="landing-nav-pill" to={{ pathname: '/register', search: location.search }}>Create account</Link> : <Link className="landing-nav-pill" to={{ pathname: '/login', search: location.search }}>Sign in</Link>}
          </nav>
          <div className="landing-access-inner"><PublicAuthPanel mode={authMode} onModeChange={setMode} /></div>
          <span className="landing-scroll-cue"><ArrowRight size={14} /> Explore the platform below</span>
        </section>
      </section>

      <LandingNewsPreview />

      <div className="landing-tone-transition is-dark-to-light" aria-hidden="true" />

      <div className="landing-sections">
        <section id="platform" className="landing-container landing-intro" data-reveal>
          <div><p className="landing-label">One operating foundation</p><h2>From a verified account to a clear reward record.</h2></div>
          <p>Panelists get a focused journey for registration, profile completion, surveys, records, and wallet activity. Operations teams get the context they need to diagnose delivery without exposing internal provider details to members.</p>
        </section>

        <section className="landing-container landing-photo-grid" aria-label="GuanyiSearch platform experience" data-reveal>
          <LandingPhoto priority src="/research-operations.jpg" alt="Research team collaborating around a planning board" eyebrow="Research operations" title="Thoughtful systems start with clear human context." />
          <LandingPhoto priority className="is-short" src="/panelist-mobile.jpg" alt="Person using a smartphone beside a tablet" eyebrow="Panelist reality" title="Designed around people, not faceless traffic." />
          <LandingPhoto className="is-wide" src="/global-audience.jpg" alt="People walking through a city intersection" eyebrow="Global perspective" title="Research begins with different lives, places, and points of view." />
        </section>

        <div className="landing-tone-transition is-light-to-dark" aria-hidden="true" />

        <section id="quality" className="landing-quality">
          <div className="landing-container landing-quality-grid" data-reveal>
            <div className="landing-quality-copy"><p className="landing-label">Research standards</p><h2>Research works better when people know where they stand.</h2><p>The experience is built around clear eligibility, respectful privacy, and visible records—so every person can take part with confidence.</p></div>
            <div className="landing-quality-list">{qualityControls.map(([title, description, Icon]) => <article key={title} className="landing-quality-item"><span className="landing-quality-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
          </div>
        </section>

        <section className="landing-global-section">
          <div className="landing-container landing-global" data-reveal>
            <div className="landing-global-visual" aria-hidden="true"><div className="landing-map-frame"><GlobalGlobe /></div></div>
            <div className="landing-global-copy"><p className="landing-label">Global perspective</p><h2>Research begins with people, in every context.</h2><p>A global view reminds us that every response comes from a different life, place, and point of view. The platform keeps each participation journey clear and considered from the first step to reward.</p></div>
          </div>
        </section>

        <div className="landing-tone-transition is-global-to-light" aria-hidden="true" />

        <section className="landing-container landing-panelists" data-reveal>
          <div className="landing-panelist-heading"><p className="landing-label">For panelists</p><h2>A simple journey with a visible record of value.</h2><p>There is no need to navigate a maze of disconnected tools. Your account, verification, profile, participation history, and rewards all begin in one place.</p></div>
          <div className="landing-steps">{panelistSteps.map(([number, title, description]) => <article key={number} className="landing-step"><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
          <article className="landing-reward-banner"><img src="/rewards-wallet.jpg" alt="Rewards and digital participation" loading="lazy" decoding="async" /><div className="landing-reward-copy"><p className="landing-label">Reward infrastructure</p><h2>Your wallet should be understandable at a glance.</h2><p>Follow coins, transactions, and redemption requests in a single place as the reward system expands.</p><Link to="/register">Create your account <ArrowRight size={17} /></Link></div></article>
        </section>
      </div>

      <footer className="landing-footer">
        <div className="landing-footer-grid">
          <div className="landing-footer-brand"><div className="landing-footer-identity"><img className="landing-footer-logo-mark" src="/guanyisearch-brand-mark.png" alt="" aria-hidden="true" /><Logo size="lg" variant="light" /></div><p>A trusted foundation for research participation, quality-aware operations, and transparent rewards.</p></div>
          <div className="landing-footer-contact">
            <h2>CONTACT &amp; INQUIRIES</h2>
            <p>Questions about panel eligibility, partnerships, or platform operations? Reach our team directly.</p>
            <a className="landing-footer-email" href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>
            <nav className="landing-social-links" aria-label="GuanyiSearch social links">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  className="landing-social-link"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <SocialGlyph id={social.id} />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="landing-container landing-footer-bottom"><p>© 2026 GuanyiSearch. All rights reserved.</p><div className="landing-footer-links"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link></div></div>
      </footer>
    </main>
  );
}

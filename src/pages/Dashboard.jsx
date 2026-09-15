import { useEffect, useState } from 'react';
import { ArrowUpRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDashboard, getNewsWall } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import { useProfileSurvey } from '../components/ProfileSurveyContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatCoinNumber } from '../utils/formatters';
import { isPanelistRole } from '../utils/roles';
import { formatUsdEstimate } from '../utils/wallet';
import { useLanguage, withLanguage } from '../components/LanguageContext';

function localGreeting(copy) {
  const hour = new Date().getHours();
  if (hour < 12) return copy.greeting.morning;
  if (hour < 18) return copy.greeting.afternoon;
  return copy.greeting.evening;
}

function newsDate(value, language, latestStory) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return latestStory;
  return date.toLocaleDateString(language, { month: 'short', day: 'numeric' });
}

function WelcomePrompt({ copy }) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activePrompt = copy.prompts[promptIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let delay = 52;
    let update;

    if (!isDeleting && characterCount < activePrompt.length) {
      update = () => setCharacterCount((currentCount) => currentCount + 1);
    } else if (!isDeleting) {
      delay = 1800;
      update = () => setIsDeleting(true);
    } else if (characterCount > 0) {
      delay = 30;
      update = () => setCharacterCount((currentCount) => currentCount - 1);
    } else {
      delay = 260;
      update = () => {
        setPromptIndex((currentIndex) => (currentIndex + 1) % copy.prompts.length);
        setIsDeleting(false);
      };
    }

    const timeoutId = window.setTimeout(update, delay);
    return () => window.clearTimeout(timeoutId);
  }, [activePrompt.length, characterCount, copy.prompts.length, isDeleting, prefersReducedMotion]);

  const visiblePrompt = prefersReducedMotion ? activePrompt : activePrompt.slice(0, characterCount);

  return (
    <div className="dashboard-welcome-prompt" aria-hidden="true">
      <span>{copy.begin}</span>
      <strong>{visiblePrompt}</strong>
      <i />
    </div>
  );
}

function HomeNewsCard({ article, language, copy }) {
  return (
    <article className="home-news-card">
      <Link to={withLanguage(`/news/${encodeURIComponent(article.id)}`, language)}>
        <div className="home-news-image">
          {article.imageUrl ? <img src={article.imageUrl} alt="" loading="lazy" /> : <Newspaper size={28} strokeWidth={1.4} />}
        </div>
        <div className="home-news-copy">
          <div>
            <span>{newsDate(article.publishedAt || article.createdAt || article.date, language, copy.latestStory)}</span>
            <em>{article.category || copy.news}</em>
          </div>
          <h2>{article.title}</h2>
          <b>{copy.readStory} <ArrowUpRight size={15} /></b>
        </div>
      </Link>
    </article>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.workspace.dashboard;
  const { panelProfile } = useProfileSurvey();
  const { data } = useAsyncData(getDashboard, []);
  const { data: homeNews, loading: newsLoading } = useAsyncData(() => getNewsWall({ limit: 3 }), []);
  const [greeting, setGreeting] = useState(() => localGreeting(copy));
  const completedOffers = data?.stats.completedOffers ?? 0;
  const isPanelist = isPanelistRole(user?.role);
  const displayName = user?.username || user?.displayName || copy.visitor;
  const balance = Number(user?.coins ?? user?.coinsBalance ?? 0);
  const balanceUsd = balance / 1000;
  const nextAction = completedOffers > 0
    ? copy.nextWithCompletions
    : copy.nextWithoutCompletions;

  useEffect(() => {
    setGreeting(localGreeting(copy));
    const intervalId = window.setInterval(() => setGreeting(localGreeting(copy)), 60_000);
    return () => window.clearInterval(intervalId);
  }, [copy]);

  return (
    <div className="dashboard-page">
      {isPanelist && (
        <section className="dashboard-welcome">
          <div className="dashboard-welcome-copy">
            <p>{copy.space}</p>
            <h1>{greeting}, {displayName}.</h1>
            <WelcomePrompt copy={copy} />
            <span>{copy.welcome}</span>
          </div>
          <div className="dashboard-balance-card" aria-label={copy.coinsAvailable.replace('{coins}', formatCoinNumber(balance))}>
            <span className="dashboard-balance-token" aria-hidden="true">◎</span>
            <span className="dashboard-balance-copy">
              <span>{copy.balance}</span>
              <strong>{formatCoinNumber(balance)} <em>Coins</em></strong>
            </span>
            <span className="dashboard-balance-estimate">≈ {formatUsdEstimate(balanceUsd, panelProfile?.country)}</span>
            <Link className="dashboard-balance-action" to={withLanguage('/wallet', language)}>{copy.openWallet} <ArrowUpRight size={14} /></Link>
          </div>
        </section>
      )}

      <section className="dashboard-board">
        <div className="dashboard-board-intro">
          <header className="dashboard-command">
            <div className="dashboard-command-copy">
              <p className="dashboard-command-kicker">{copy.startToday}</p>
              <h2>{copy.headline}</h2>
              <p>{nextAction}</p>
              <div className="dashboard-command-actions">
                <Link className="btn-primary" to={withLanguage('/partners', language)}>
                  {copy.findSurveys} <ArrowUpRight size={16} />
                </Link>
                {!isPanelist && (
                  <Link className="btn-secondary" to={withLanguage('/wallet', language)}>
                    {copy.openWallet}
                  </Link>
                )}
              </div>
            </div>
          </header>

          <aside className="dashboard-path-panel" aria-label={copy.rewardPath}>
            <div className="dashboard-path-head">
              <span>{copy.rewardPath}</span>
              <strong>{copy.rewardPathValue}</strong>
            </div>
            <div className="dashboard-path-steps">
              <article>
                <span>01</span>
                <strong>{copy.steps[0][0]}</strong>
                <p>{copy.steps[0][1]}</p>
              </article>
              <article>
                <span>02</span>
                <strong>{copy.steps[1][0]}</strong>
                <p>{copy.steps[1][1]}</p>
              </article>
              <article>
                <span>03</span>
                <strong>{copy.steps[2][0]}</strong>
                <p>{copy.steps[2][1]}</p>
              </article>
            </div>
            <p>{copy.tip}</p>
          </aside>
        </div>
      </section>

      {isPanelist && (
        <section className="home-news-guide" aria-labelledby="home-news-title">
          <div className="home-news-guide-head">
            <div>
              <p className="dashboard-command-kicker">{copy.newsWall}</p>
              <h2 id="home-news-title">{copy.newsTitle}</h2>
              <span>{copy.newsIntro}</span>
            </div>
            <Link className="home-news-guide-link" to={withLanguage('/news', language)}>{copy.exploreNews} <ArrowUpRight size={16} /></Link>
          </div>
          <div className="home-news-grid">
            {newsLoading && Array.from({ length: 3 }, (_, index) => <div key={index} className="home-news-card home-news-card-loading" aria-hidden="true" />)}
            {!newsLoading && homeNews?.slice(0, 3).map((article) => <HomeNewsCard key={article.id} article={article} language={language} copy={copy} />)}
            {!newsLoading && !homeNews?.length && (
              <div className="home-news-empty">
                <p>{copy.freshNews}</p>
                <Link to={withLanguage('/news', language)}>{copy.openNews} <ArrowUpRight size={15} /></Link>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

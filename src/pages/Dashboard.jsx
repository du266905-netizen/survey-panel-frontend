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

function localGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function newsDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Latest story';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const welcomePrompts = ['Browse news', 'Start a survey', 'Explore community'];

function WelcomePrompt() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activePrompt = welcomePrompts[promptIndex];

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
        setPromptIndex((currentIndex) => (currentIndex + 1) % welcomePrompts.length);
        setIsDeleting(false);
      };
    }

    const timeoutId = window.setTimeout(update, delay);
    return () => window.clearTimeout(timeoutId);
  }, [activePrompt.length, characterCount, isDeleting, prefersReducedMotion]);

  const visiblePrompt = prefersReducedMotion ? activePrompt : activePrompt.slice(0, characterCount);

  return (
    <div className="dashboard-welcome-prompt" aria-hidden="true">
      <span>Let’s begin:</span>
      <strong>{visiblePrompt}</strong>
      <i />
    </div>
  );
}

function HomeNewsCard({ article }) {
  return (
    <article className="home-news-card">
      <Link to={`/news/${encodeURIComponent(article.id)}`}>
        <div className="home-news-image">
          {article.imageUrl ? <img src={article.imageUrl} alt="" loading="lazy" /> : <Newspaper size={28} strokeWidth={1.4} />}
        </div>
        <div className="home-news-copy">
          <div>
            <span>{newsDate(article.publishedAt || article.createdAt || article.date)}</span>
            <em>{article.category || 'News'}</em>
          </div>
          <h2>{article.title}</h2>
          <b>Read story <ArrowUpRight size={15} /></b>
        </div>
      </Link>
    </article>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { panelProfile } = useProfileSurvey();
  const { data } = useAsyncData(getDashboard, []);
  const { data: homeNews, loading: newsLoading } = useAsyncData(() => getNewsWall({ limit: 3 }), []);
  const [greeting, setGreeting] = useState(localGreeting);
  const completedOffers = data?.stats.completedOffers ?? 0;
  const isPanelist = isPanelistRole(user?.role);
  const displayName = user?.username || user?.displayName || 'there';
  const balance = Number(user?.coins ?? user?.coinsBalance ?? 0);
  const balanceUsd = balance / 1000;
  const nextAction = completedOffers > 0
    ? 'New matches move throughout the day. Check the wall while survey inventory is fresh.'
    : 'Start with one verified completion. Once it clears, your reward record begins to build.';

  useEffect(() => {
    const intervalId = window.setInterval(() => setGreeting(localGreeting()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-page">
      {isPanelist && (
        <section className="dashboard-welcome">
          <div className="dashboard-welcome-copy">
            <p>Your space</p>
            <h1>{greeting}, {displayName}.</h1>
            <WelcomePrompt />
            <span>Explore at your own pace. Your next opportunity is ready when you are.</span>
          </div>
          <div className="dashboard-balance-card" aria-label={`${formatCoinNumber(balance)} Coins available`}>
            <span className="dashboard-balance-token" aria-hidden="true">◎</span>
            <span className="dashboard-balance-copy">
              <span>Coins balance</span>
              <strong>{formatCoinNumber(balance)} <em>Coins</em></strong>
            </span>
            <span className="dashboard-balance-estimate">≈ {formatUsdEstimate(balanceUsd, panelProfile?.country)}</span>
            <Link className="dashboard-balance-action" to="/wallet">Open wallet <ArrowUpRight size={14} /></Link>
          </div>
        </section>
      )}

      <section className="dashboard-board">
        <div className="dashboard-board-intro">
          <header className="dashboard-command">
            <div className="dashboard-command-copy">
              <p className="dashboard-command-kicker">Start earning today</p>
              <h2>One good survey can start the streak.</h2>
              <p>{nextAction}</p>
              <div className="dashboard-command-actions">
                <Link className="btn-primary" to="/partners">
                  Find surveys <ArrowUpRight size={16} />
                </Link>
                {!isPanelist && (
                  <Link className="btn-secondary" to="/wallet">
                    Open wallet
                  </Link>
                )}
              </div>
            </div>
          </header>

          <aside className="dashboard-path-panel" aria-label="Reward path">
            <div className="dashboard-path-head">
              <span>Reward path</span>
              <strong>Surveys → Coins → Gift cards</strong>
            </div>
            <div className="dashboard-path-steps">
              <article>
                <span>01</span>
                <strong>Find a live match</strong>
                <p>Survey availability changes during the day.</p>
              </article>
              <article>
                <span>02</span>
                <strong>Finish with quality</strong>
                <p>Partners validate completions before Coins clear.</p>
              </article>
              <article>
                <span>03</span>
                <strong>Build toward rewards</strong>
                <p>Gift card goals unlock from the $10 tier.</p>
              </article>
            </div>
            <p>Tip: finish your first survey and check back when the wall looks quiet — inventory rotates.</p>
          </aside>
        </div>
      </section>

      {isPanelist && (
        <section className="home-news-guide" aria-labelledby="home-news-title">
          <div className="home-news-guide-head">
            <div>
              <p className="dashboard-command-kicker">News Wall</p>
              <h2 id="home-news-title">A wider view, whenever you need it.</h2>
              <span>Follow the stories shaping the conversations behind tomorrow’s research.</span>
            </div>
            <Link className="home-news-guide-link" to="/news">Explore News Wall <ArrowUpRight size={16} /></Link>
          </div>
          <div className="home-news-grid">
            {newsLoading && Array.from({ length: 3 }, (_, index) => <div key={index} className="home-news-card home-news-card-loading" aria-hidden="true" />)}
            {!newsLoading && homeNews?.slice(0, 3).map((article) => <HomeNewsCard key={article.id} article={article} />)}
            {!newsLoading && !homeNews?.length && (
              <div className="home-news-empty">
                <p>Fresh reading will appear here as the News Wall updates.</p>
                <Link to="/news">Open News Wall <ArrowUpRight size={15} /></Link>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

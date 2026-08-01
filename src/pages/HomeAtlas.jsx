import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAuth } from '../components/AuthContext';
import { getNewsWall } from '../api/realApi';
import listeningRoom from '../assets/home/listening-room.jpg';
import personSignal from '../assets/home/person-signal.png';
import seaStudy from '../assets/home/sea-study.jpg';
import streetCrossing from '../assets/home/crosswalk.jpg';
import referralPeople from '../assets/referral-people.jpg';
import './HomeAtlas.css';

const navigation = [
  {
    label: 'Explore',
    items: [
      { to: '/news', eyebrow: 'World view', title: 'News Wall', note: 'Step outside your usual feed.' },
      { to: '/how-it-works', eyebrow: 'Approach', title: 'How it works', note: 'Understand surveys, rewards, and participation.' },
    ],
  },
  {
    label: 'Take part',
    items: [
      { to: '/partners', eyebrow: 'Participation', title: 'Available surveys', note: 'Find eligible opportunities and earn toward rewards.' },
      { to: '/wallet', eyebrow: 'Recognition', title: 'Rewards', note: 'Follow verified progress and available choices.' },
    ],
  },
  {
    label: 'Standards',
    items: [
      { to: '/privacy', eyebrow: 'People first', title: 'Your information', note: 'Plain-language commitments for real people.' },
      { to: '/terms', eyebrow: 'Terms', title: 'Participation terms', note: 'The shared ground rules.' },
    ],
  },
];

function articleExcerpt(article) {
  return article?.summary || article?.description || article?.content || 'Open the News Wall to read the latest published context.';
}

function AtlasNavigation({ user }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenus = () => setActiveMenu(null);

  return (
    <header className="atlas-navigation">
      <Link className="atlas-brand" to="/" aria-label="GuanyiSearch home">
        <Logo size="md" className="atlas-brand-logo" />
      </Link>

      <nav className="atlas-nav-links" aria-label="Primary navigation">
        {navigation.map((group) => (
          <div
            className="atlas-nav-group"
            key={group.label}
            onMouseEnter={() => setActiveMenu(group.label)}
            onMouseLeave={closeMenus}
            onFocus={() => setActiveMenu(group.label)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
            }}
          >
            <button
              className="atlas-nav-trigger"
              type="button"
              aria-expanded={activeMenu === group.label}
              onClick={() => setActiveMenu((current) => (current === group.label ? null : group.label))}
            >
              {group.label}
              <ChevronDown aria-hidden="true" size={15} strokeWidth={1.8} />
            </button>
            <div className={`atlas-nav-menu ${activeMenu === group.label ? 'is-open' : ''}`}>
              {group.items.map((item) => (
                <Link className="atlas-nav-menu-item" to={item.to} key={item.title} onClick={closeMenus}>
                  <span>{item.eyebrow}</span>
                  <strong>{item.title}</strong>
                  <small>{item.note}</small>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="atlas-nav-actions">
        {!user && <Link className="atlas-sign-in" to="/login">Sign in</Link>}
        <Link className="atlas-register" to={user ? '/dashboard' : '/register'}>
          {user ? 'Open workspace' : 'Join the panel'}
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </Link>
        <button
          className={`atlas-menu-button ${mobileOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`atlas-mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        {navigation.map((group) => (
          <div className="atlas-mobile-group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => (
              <Link to={item.to} key={item.title} onClick={() => setMobileOpen(false)}>
                {item.title}
                <ArrowUpRight size={16} strokeWidth={1.8} />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </header>
  );
}

function AtlasNode({ name, className, to, eyebrow, title, note, image, onActive, onInactive, children }) {
  const content = (
    <>
      <span className="atlas-node-image">
        <img src={image} alt="" />
      </span>
      <span className="atlas-node-copy">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        <small>{note}</small>
      </span>
      {children}
    </>
  );

  if (!to) {
    return (
      <article className={`atlas-node atlas-node--static ${className}`} aria-label={`${title} Coming soon.`}>
        {content}
      </article>
    );
  }

  return (
    <Link
      className={`atlas-node ${className}`}
      to={to}
      onMouseEnter={() => onActive(name)}
      onMouseLeave={onInactive}
      onFocus={() => onActive(name)}
      onBlur={onInactive}
    >
      {content}
    </Link>
  );
}

export default function HomeAtlas() {
  const { user } = useAuth();
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [activeNode, setActiveNode] = useState('');

  useEffect(() => {
    let active = true;

    getNewsWall({ country: 'US', limit: 1 })
      .then(({ data }) => {
        if (active) setFeaturedArticle(data?.[0] || null);
      })
      .catch(() => {
        if (active) setFeaturedArticle(null);
      });

    return () => {
      active = false;
    };
  }, []);

  const featuredTitle = featuredArticle?.title || 'Follow the signals worth discussing.';
  const featuredImage = featuredArticle?.imageUrl || seaStudy;
  const featuredLink = featuredArticle?.id ? `/news/${featuredArticle.id}` : '/news';
  const featuredSource = featuredArticle?.sourceName || 'News Wall';
  const featuredCategory = featuredArticle?.category || 'Today’s context';

  return (
    <main className={`home-atlas ${activeNode ? `is-${activeNode}` : ''}`}>
      <AtlasNavigation user={user} />

      <section className="atlas-stage" aria-labelledby="atlas-title">
        <div className="atlas-stage-heading">
          <p>GUANYISEARCH / PEOPLE IN THE PICTURE</p>
          <h1 id="atlas-title">Make time count.<br />Keep the world in view.</h1>
          <div className="atlas-introduction">
            <span className="atlas-introduction-rule" />
            <p>Take eligible surveys toward gift card rewards, read beyond your usual feed, and make room for perspectives worth sharing.</p>
          </div>
          <div className="atlas-primary-actions">
            <Link className="atlas-primary-link" to={user ? '/dashboard' : '/register'}>
              {user ? 'Open your workspace' : 'Start earning'}
              <ArrowUpRight size={19} strokeWidth={1.8} />
            </Link>
            <Link className="atlas-quiet-link" to="/news">Explore the News Wall <ArrowUpRight size={17} strokeWidth={1.8} /></Link>
          </div>
        </div>

        <div className="atlas-map" aria-label="Explore GuanyiSearch">
          <svg className="atlas-wires" viewBox="0 0 1200 790" preserveAspectRatio="none" aria-hidden="true">
            <path className="atlas-wire atlas-wire--news" d="M 592 404 C 499 336 461 262 290 231" />
            <path className="atlas-wire atlas-wire--part" d="M 597 409 C 709 320 809 250 993 220" />
            <path className="atlas-wire atlas-wire--survey" d="M 598 408 C 497 454 419 535 238 579" />
            <path className="atlas-wire atlas-wire--rewards" d="M 604 411 C 718 475 824 562 1001 609" />
            <path className="atlas-wire atlas-wire--standards" d="M 604 409 C 747 389 860 409 1093 406" />
          </svg>

          <AtlasNode
            name="news"
            className="atlas-node--news"
            to="/news"
            eyebrow="THE DAILY WALL"
            title="See beyond your feed."
            note="World signals gathered for a more considered read."
            image={streetCrossing}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="part"
            className="atlas-node--part"
            to="/privacy"
            eyebrow="PEOPLE FIRST"
            title="Not just data points."
            note="Technology should make participation clearer, not smaller."
            image={personSignal}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="survey"
            className="atlas-node--survey"
            to="/partners"
            eyebrow="TIME WELL SPENT"
            title="Earn toward rewards."
            note="Complete eligible surveys and work toward gift card choices."
            image={listeningRoom}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="rewards"
            className="atlas-node--rewards"
            to="/wallet"
            eyebrow="VERIFIED PROGRESS"
            title="See what you have built."
            note="Follow your activity and reward choices in one place."
            image={referralPeople}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="community"
            className="atlas-node--standards"
            eyebrow="COMMUNITY / SOON"
            title="A place for perspective."
            note="Bring a signal, question, or point of view into a thoughtful discussion."
            image="/human-manifesto/shoreline-painting.jpg"
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <Link
            className="atlas-featured-story"
            to={featuredLink}
            onMouseEnter={() => setActiveNode('feature')}
            onMouseLeave={() => setActiveNode('')}
            onFocus={() => setActiveNode('feature')}
            onBlur={() => setActiveNode('')}
          >
            <span className="atlas-featured-image">
              <img src={featuredImage} alt="" onError={(event) => { event.currentTarget.src = seaStudy; }} />
            </span>
            <span className="atlas-featured-copy">
            <span>{featuredCategory || 'TODAY\'S WORLD VIEW'}</span>
              <strong>{featuredTitle}</strong>
              <small>{articleExcerpt(featuredArticle)}</small>
              <em>From {featuredSource} <ArrowUpRight size={15} strokeWidth={1.8} /></em>
            </span>
          </Link>

          <span className="atlas-map-caption atlas-map-caption--left">EARN · READ · CONTRIBUTE</span>
          <span className="atlas-map-caption atlas-map-caption--right">PEOPLE BEFORE PROFILES</span>
        </div>
      </section>

      <section className="atlas-footer-bridge" aria-label="Explore GuanyiSearch">
        <p>Earn with purpose. Read with range. Speak when it matters.</p>
        <div>
          <Link to="/news">News Wall <ArrowUpRight size={16} /></Link>
          <Link to="/partners">Take part <ArrowUpRight size={16} /></Link>
          <Link to="/how-it-works">Our approach <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import HomeLegacySections from '../components/HomeLegacySections';
import { useAuth } from '../components/AuthContext';
import listeningRoom from '../assets/home/listening-room.jpg';
import seaStudy from '../assets/home/sea-study.jpg';
import streetCrossing from '../assets/home/crosswalk.jpg';
import './HomeAtlas.css';

const navigation = [
  {
    label: 'Explore',
    items: [
      { to: '/news', eyebrow: 'World view', title: 'News Wall' },
      { to: '/how-it-works', eyebrow: 'Approach', title: 'How it works' },
    ],
  },
  {
    label: 'Take part',
    items: [
      { to: '/partners', eyebrow: 'Participation', title: 'Available surveys' },
      { to: '/wallet', eyebrow: 'Recognition', title: 'Rewards' },
    ],
  },
  {
    label: 'Standards',
    items: [
      { to: '/privacy', eyebrow: 'People first', title: 'Your information' },
      { to: '/terms', eyebrow: 'Terms', title: 'Participation terms' },
    ],
  },
];

function AtlasNavigation({ user }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const closeMenus = () => setActiveMenu(null);
  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/news?search=${encodeURIComponent(query)}` : '/news');
    setMobileOpen(false);
  };

  const searchField = (className) => (
    <form className={className} role="search" onSubmit={handleSearch}>
      <Search aria-hidden="true" size={16} strokeWidth={1.9} />
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search the News Wall"
        aria-label="Search the News Wall"
      />
    </form>
  );

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
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="atlas-nav-actions">
        {searchField('atlas-nav-search')}
        {!user && <Link className="atlas-sign-in" to="/login">Sign in</Link>}
        <Link className="atlas-register" to={user ? '/dashboard' : '/register'}>
          {user ? 'Open workspace' : 'Join us'}
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
        {searchField('atlas-mobile-search')}
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

function AtlasNode({ name, className, to, eyebrow, title, image, onActive, onInactive, soon = false }) {
  const content = (
    <>
      <span className="atlas-node-image">
        <img src={image} alt="" />
      </span>
      <span className="atlas-node-copy">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        {soon && <em>Coming soon</em>}
      </span>
    </>
  );

  if (!to) {
    return <article className={`atlas-node atlas-node--static ${className}`} aria-label={`${title}. Coming soon.`}>{content}</article>;
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
  const [activeNode, setActiveNode] = useState('');

  return (
    <main className={`home-atlas ${activeNode ? `is-${activeNode}` : ''}`}>
      <AtlasNavigation user={user} />

      <section className="atlas-stage" aria-labelledby="atlas-title">
        <div className="atlas-stage-heading">
          <h1 id="atlas-title">Think independently.<br />Discern what matters.</h1>
          <div className="atlas-primary-actions">
            <Link className="atlas-primary-link" to={user ? '/dashboard' : '/register'}>
              {user ? 'Open workspace' : 'Join us'}
              <ArrowUpRight size={19} strokeWidth={1.8} />
            </Link>
            <Link className="atlas-quiet-link" to="/news">Open News Wall <ArrowUpRight size={17} strokeWidth={1.8} /></Link>
          </div>
        </div>

        <div className="atlas-map" aria-label="Ways to explore GuanyiSearch">
          <span className="atlas-orbit atlas-orbit--one" aria-hidden="true" />
          <span className="atlas-orbit atlas-orbit--two" aria-hidden="true" />
          <span className="atlas-signal atlas-signal--one" aria-hidden="true" />
          <span className="atlas-signal atlas-signal--two" aria-hidden="true" />
          <span className="atlas-signal atlas-signal--three" aria-hidden="true" />
          <svg className="atlas-wires" viewBox="0 0 1200 650" preserveAspectRatio="none" aria-hidden="true">
            <path className="atlas-wire atlas-wire--news" d="M 605 338 C 499 258 449 184 236 174" />
            <path className="atlas-wire atlas-wire--survey" d="M 603 340 C 722 430 827 487 1004 506" />
            <path className="atlas-wire atlas-wire--community" d="M 603 340 C 521 457 421 533 255 570" />
          </svg>

          <AtlasNode
            name="news"
            className="atlas-node--news"
            to="/news"
            eyebrow="NEWS WALL"
            title="See the wider picture."
            image={streetCrossing}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="survey"
            className="atlas-node--survey"
            to="/partners"
            eyebrow="SURVEYS"
            title="Make your time count."
            image={listeningRoom}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="community"
            className="atlas-node--community"
            eyebrow="COMMUNITY"
            title="A place for perspective."
            image={seaStudy}
            soon
          />
        </div>
      </section>
      <HomeLegacySections />
    </main>
  );
}

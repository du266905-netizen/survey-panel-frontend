import { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Logo from './Logo';
import { isBusinessRole } from '../utils/roles';
import './PublicSiteHeader.css';

const navigation = [
  {
    label: 'About us',
    items: [
      { to: '/how-it-works', eyebrow: 'The panel', title: 'How it works' },
      { to: '/our-approach', eyebrow: 'People first', title: 'Our approach' },
    ],
  },
  {
    label: 'Take part',
    items: [
      { to: '/partners', eyebrow: 'Participation', title: 'Available surveys' },
      { to: '/news', eyebrow: 'Daily brief', title: 'News Wall' },
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

export default function PublicSiteHeader({ heroOverlay = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const menuCloseTimer = useRef(null);

  const clearMenuCloseTimer = () => {
    if (menuCloseTimer.current === null) return;
    window.clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = null;
  };
  const closeMenus = () => {
    clearMenuCloseTimer();
    setActiveMenu(null);
  };
  const scheduleMenuClose = () => {
    clearMenuCloseTimer();
    menuCloseTimer.current = window.setTimeout(() => {
      menuCloseTimer.current = null;
      setActiveMenu(null);
    }, 180);
  };

  useEffect(() => {
    if (!heroOverlay) return undefined;

    const updateScrolledState = () => setIsScrolled(window.scrollY > 24);
    updateScrolledState();
    window.addEventListener('scroll', updateScrolledState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolledState);
  }, [heroOverlay]);

  useEffect(() => () => clearMenuCloseTimer(), []);

  const closeNavigation = () => {
    closeMenus();
    setMobileOpen(false);
  };
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
    <header className={`atlas-navigation public-site-header${heroOverlay ? ' is-hero-overlay' : ''}${isScrolled ? ' is-scrolled' : ''}`}>
      <Link className="atlas-brand" to="/" aria-label="GuanyiSearch home" onClick={closeNavigation}>
        <Logo size="md" variant={heroOverlay && !isScrolled ? 'light' : 'dark'} className="atlas-brand-logo" />
      </Link>

      <nav className="atlas-nav-links" aria-label="Primary navigation">
        {navigation.map((group) => (
          <Fragment key={group.label}>
            <div
              className="atlas-nav-group"
              onMouseEnter={() => {
                clearMenuCloseTimer();
                setActiveMenu(group.label);
              }}
              onMouseLeave={scheduleMenuClose}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
              }}
            >
              <button
                className="atlas-nav-trigger"
                type="button"
                aria-expanded={activeMenu === group.label}
                onClick={() => {
                  clearMenuCloseTimer();
                  setActiveMenu((current) => (current === group.label ? null : group.label));
                }}
              >
                {group.label}
                <ChevronDown aria-hidden="true" size={15} strokeWidth={1.8} />
              </button>
              <div
                className={`atlas-nav-menu ${activeMenu === group.label ? 'is-open' : ''}`}
                onMouseEnter={clearMenuCloseTimer}
                onMouseLeave={scheduleMenuClose}
              >
                {group.items.map((item) => (
                  <Link className="atlas-nav-menu-item" to={item.to} key={item.title} onClick={closeNavigation}>
                    <span>{item.eyebrow}</span>
                    <strong>{item.title}</strong>
                  </Link>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
        <Link className="atlas-nav-link atlas-nav-link--business" to="/business" onClick={closeNavigation}>For organisations</Link>
      </nav>

      <div className="atlas-nav-actions">
        {searchField('atlas-nav-search')}
        {!user && <Link className="atlas-sign-in" to="/login">Sign in</Link>}
        <Link className="atlas-register" to={user ? (isBusinessRole(user.role) ? '/business/workspace' : '/dashboard') : '/join'}>
          {user ? 'Open workspace' : 'Join us'}
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </Link>
        <button
          className={`atlas-menu-button ${mobileOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-controls="atlas-mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div id="atlas-mobile-menu" className={`atlas-mobile-menu ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen} inert={mobileOpen ? undefined : ''}>
        {searchField('atlas-mobile-search')}
        <Link className="atlas-mobile-direct-link" to="/business" onClick={closeNavigation}>For organisations <ArrowUpRight size={16} strokeWidth={1.8} /></Link>
        {navigation.map((group) => (
          <div className="atlas-mobile-group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => (
              <Link to={item.to} key={item.title} onClick={closeNavigation}>
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

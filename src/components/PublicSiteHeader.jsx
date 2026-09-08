import { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Globe2, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { isBusinessRole } from '../utils/roles';
import brandMarkLight from '../assets/home/guanyi-brand-mark-light.png';
import brandMarkDark from '../assets/home/guanyi-brand-mark-dark.png';
import { useLanguage } from './LanguageContext';
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
  const { language, languages, setLanguage, publicCopy } = useLanguage();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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
  const selectLanguage = (code) => {
    setLanguage(code);
    closeMenus();
  };
  return (
    <header className={`atlas-navigation public-site-header${heroOverlay ? ' is-hero-overlay' : ''}${isScrolled ? ' is-scrolled' : ''}`}>
      <Link className="atlas-brand" to="/" aria-label="GuanyiSearch home" onClick={closeNavigation}>
        <img className="atlas-brand-mark" src={heroOverlay && !isScrolled ? brandMarkLight : brandMarkDark} alt="" aria-hidden="true" />
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
                {publicCopy.navigation[{ 'About us': 'about', 'Take part': 'takePart', Standards: 'standards' }[group.label]] || group.label}
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
        <Link className="atlas-nav-link atlas-nav-link--business" to="/business" onClick={closeNavigation}>{publicCopy.navigation.organisations}</Link>
      </nav>

      <div className="atlas-nav-actions">
        <div
          className="atlas-language-group"
          onMouseEnter={() => {
            clearMenuCloseTimer();
            setActiveMenu('language');
          }}
          onMouseLeave={scheduleMenuClose}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
          }}
        >
          <button
            className="atlas-language-trigger"
            type="button"
            aria-label="Choose language"
            aria-expanded={activeMenu === 'language'}
            aria-haspopup="listbox"
            onClick={() => {
              clearMenuCloseTimer();
              setActiveMenu((current) => (current === 'language' ? null : 'language'));
            }}
          >
            <Globe2 aria-hidden="true" size={20} strokeWidth={1.8} />
            <ChevronDown aria-hidden="true" size={14} strokeWidth={1.8} />
          </button>
          <div className={`atlas-language-menu ${activeMenu === 'language' ? 'is-open' : ''}`} role="listbox" aria-label="Choose language">
            <div>
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={language === item.code}
                  className={language === item.code ? 'is-selected' : ''}
                  onClick={() => selectLanguage(item.code)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {!user && <Link className="atlas-sign-in" to="/login">{publicCopy.navigation.signIn}</Link>}
        <Link className="atlas-register" to={user ? (isBusinessRole(user.role) ? '/business/workspace' : '/dashboard') : '/join'}>
          {user ? publicCopy.navigation.workspace : publicCopy.navigation.join}
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
        <Link className="atlas-mobile-direct-link" to="/business" onClick={closeNavigation}>{publicCopy.navigation.organisations} <ArrowUpRight size={16} strokeWidth={1.8} /></Link>
        <div className="atlas-mobile-language">
          <p><Globe2 size={15} strokeWidth={1.8} /> Language</p>
          <div role="listbox" aria-label="Choose language">
            {languages.map((item) => (
              <button key={item.code} type="button" role="option" aria-selected={language === item.code} className={language === item.code ? 'is-selected' : ''} onClick={() => selectLanguage(item.code)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {navigation.map((group) => (
          <div className="atlas-mobile-group" key={group.label}>
            <p>{publicCopy.navigation[{ 'About us': 'about', 'Take part': 'takePart', Standards: 'standards' }[group.label]] || group.label}</p>
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

import { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { isBusinessRole } from '../utils/roles';
import brandMarkLight from '../assets/home/guanyi-brand-mark-light.png';
import brandMarkDark from '../assets/home/guanyi-brand-mark-dark.png';
import { useLanguage, withLanguage } from './LanguageContext';
import LanguageGlobe from './LanguageGlobe';
import './PublicSiteHeader.css';

const navigation = [
  {
    id: 'services',
    label: 'Research services',
    items: [
      { to: '/business', serviceWorkspace: true },
    ],
  },
  {
    id: 'participate',
    label: 'Take part',
    items: [
      { to: '/partners', eyebrow: 'Participation', title: 'Available surveys' },
      { to: '/wallet', eyebrow: 'Recognition', title: 'Rewards' },
      { to: '/news', eyebrow: 'Daily brief', title: 'News Wall' },
    ],
  },
  {
    id: 'about',
    label: 'About us',
    items: [
      { to: '/how-it-works', eyebrow: 'The panel', title: 'How it works' },
      { to: '/our-approach', eyebrow: 'People first', title: 'Our approach' },
    ],
  },
];

const itemCopyKey = {
  '/how-it-works': 'how',
  '/our-approach': 'approach',
  '/partners': 'surveys',
  '/news': 'news',
  '/wallet': 'rewards',
  '/privacy': 'privacy',
  '/terms': 'terms',
};

const researchServicesLabel = {
  en: 'Research services',
  'en-GB': 'Research services',
  'zh-CN': '研究服务',
  'zh-Hant': '研究服務',
};

const chinaMarketLabel = {
  'zh-CN': '中国市场洞察能力',
  'zh-Hant': '中國市場洞察能力',
};

const researchWorkspaceCopy = {
  'zh-CN': { label: '市场研究', title: '市场研究服务' },
  'zh-Hant': { label: '市場研究', title: '市場研究服務' },
  default: { label: 'Market research', title: 'Market research services' },
};

export default function PublicSiteHeader({ heroOverlay = false }) {
  const { user } = useAuth();
  const { language, languages, navigateToLanguage, publicCopy } = useLanguage();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuCloseTimer = useRef(null);
  const marketCapabilityLabel = chinaMarketLabel[language] || 'China market insights capability';
  const workspaceCopy = researchWorkspaceCopy[language] || researchWorkspaceCopy.default;
  const servicesLabel = workspaceCopy.label || researchServicesLabel[language] || 'Research services';
  const navigationLabel = (group) => {
    if (group.id === 'services') return servicesLabel;
    if (group.id === 'participate') return publicCopy.navigation.takePart;
    return publicCopy.navigation.about;
  };
  const navigationItemLabel = (item) => item.copyKey
    ? publicCopy.home.footer[item.copyKey]
    : publicCopy.navigation.items[itemCopyKey[item.to]] || item.title;
  const navigationItemContent = (item) => item.serviceWorkspace
    ? workspaceCopy
    : { eyebrow: item.eyebrow, title: navigationItemLabel(item) };

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
    closeMenus();
    navigateToLanguage(code);
  };
  return (
    <header className={`atlas-navigation public-site-header${heroOverlay ? ' is-hero-overlay' : ''}${isScrolled ? ' is-scrolled' : ''}`}>
      <Link className="atlas-brand" to={withLanguage('/', language)} aria-label="GuanyiSearch home" onClick={closeNavigation}>
        <img className="atlas-brand-mark" src={heroOverlay && !isScrolled ? brandMarkLight : brandMarkDark} alt="" aria-hidden="true" />
      </Link>

      <nav className="atlas-nav-links" aria-label="Primary navigation">
        {navigation.map((group) => (
          <Fragment key={group.id}>
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
                {navigationLabel(group)}
                <ChevronDown aria-hidden="true" size={15} strokeWidth={1.8} />
              </button>
              <div
                className={`atlas-nav-menu ${activeMenu === group.label ? 'is-open' : ''}`}
                onMouseEnter={clearMenuCloseTimer}
                onMouseLeave={scheduleMenuClose}
              >
                {group.items.map((item) => {
                  const content = navigationItemContent(item);
                  return (
                    <Link className="atlas-nav-menu-item" to={withLanguage(item.to, language)} key={`${item.to}-${content.title}`} onClick={closeNavigation}>
                      {content.eyebrow && <span>{content.eyebrow}</span>}
                      <strong>{content.title}</strong>
                      {content.description && <small>{content.description}</small>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </Fragment>
        ))}
        <Link className="atlas-nav-link" to={withLanguage('/china-market-insights', language)} onClick={closeNavigation}>{marketCapabilityLabel}</Link>
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
            <LanguageGlobe aria-hidden="true" size={21} strokeWidth={1.75} />
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
        {!user && <Link className="atlas-sign-in" to={withLanguage('/access', language)}>{publicCopy.navigation.signIn}</Link>}
        <Link className="atlas-register" to={withLanguage(user ? (isBusinessRole(user.role) ? '/business/workspace' : '/dashboard') : '/join', language)}>
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
        <div className="atlas-mobile-direct-links">
          <Link className="atlas-mobile-direct-link" to={withLanguage('/china-market-insights', language)} onClick={closeNavigation}>{marketCapabilityLabel} <ArrowUpRight size={16} strokeWidth={1.8} /></Link>
        </div>
        <div className="atlas-mobile-language">
          <p><LanguageGlobe size={16} strokeWidth={1.75} /> Language</p>
          <div role="listbox" aria-label="Choose language">
            {languages.map((item) => (
              <button key={item.code} type="button" role="option" aria-selected={language === item.code} className={language === item.code ? 'is-selected' : ''} onClick={() => selectLanguage(item.code)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {navigation.map((group) => (
          <div className="atlas-mobile-group" key={group.id}>
            <p>{navigationLabel(group)}</p>
            {group.items.map((item) => {
              const content = navigationItemContent(item);
              return <Link to={withLanguage(item.to, language)} key={`${item.to}-${content.title}`} onClick={closeNavigation}>{content.title}<ArrowUpRight size={16} strokeWidth={1.8} /></Link>;
            })}
          </div>
        ))}
      </div>
    </header>
  );
}

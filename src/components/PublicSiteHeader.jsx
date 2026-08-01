import { Fragment, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Logo from './Logo';
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

export default function PublicSiteHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const closeMenus = () => setActiveMenu(null);
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
    <header className="atlas-navigation public-site-header">
      <Link className="atlas-brand" to="/" aria-label="GuanyiSearch home" onClick={closeNavigation}>
        <Logo size="md" className="atlas-brand-logo" />
      </Link>

      <nav className="atlas-nav-links" aria-label="Primary navigation">
        {navigation.map((group, index) => (
          <Fragment key={group.label}>
            <div
              className="atlas-nav-group"
              onMouseEnter={() => setActiveMenu(group.label)}
              onMouseLeave={closeMenus}
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
                  <Link className="atlas-nav-menu-item" to={item.to} key={item.title} onClick={closeNavigation}>
                    <span>{item.eyebrow}</span>
                    <strong>{item.title}</strong>
                  </Link>
                ))}
              </div>
            </div>
            {index === 0 && <Link className="atlas-nav-link" to="/news" onClick={closeNavigation}>News Wall</Link>}
          </Fragment>
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
          aria-controls="atlas-mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div id="atlas-mobile-menu" className={`atlas-mobile-menu ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen} inert={mobileOpen ? undefined : ''}>
        {searchField('atlas-mobile-search')}
        <Link className="atlas-mobile-direct-link" to="/news" onClick={closeNavigation}>News Wall <ArrowUpRight size={16} strokeWidth={1.8} /></Link>
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

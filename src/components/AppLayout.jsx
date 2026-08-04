import { useEffect, useRef, useState } from 'react';
import { BarChart3, ChevronDown, ClipboardCheck, Compass, Database, Gift, House, Image, ListFilter, LogOut, MessageCircleMore, Newspaper, Settings, ShieldCheck, User, UserCog, UserPlus, Users, WalletCards } from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Logo from './Logo';
import { isAdminRole, isPanelistRole } from '../utils/roles';
import { ProfileSurveyProvider } from './ProfileSurveyContext';
import ReferralProgramWidget from './ReferralProgramWidget';
import WalletBalanceMenu from './WalletBalanceMenu';
import { HomeFooter } from './HomeLegacySections';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/partners#surveys', label: 'Surveys', icon: Users, hash: '#surveys' },
  { to: '/partners#more-opportunities', label: 'More survey opportunities', icon: Compass, hash: '#more-opportunities' },
  { to: '/news', label: 'News Wall', icon: Newspaper },
  { to: '/wallet', label: 'Wallet', icon: WalletCards },
];

const panelistNavItems = navItems
  .filter((item) => item.to !== '/wallet')
  .map((item) => (item.to === '/dashboard' ? { ...item, label: 'Home', icon: House } : item));

const panelistPrompts = ['Browse News Wall', 'Start a survey', 'Explore community'];

function PanelistPrompt() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activePrompt = panelistPrompts[promptIndex];

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
        setPromptIndex((currentIndex) => (currentIndex + 1) % panelistPrompts.length);
        setIsDeleting(false);
      };
    }

    const timeoutId = window.setTimeout(update, delay);
    return () => window.clearTimeout(timeoutId);
  }, [activePrompt.length, characterCount, isDeleting, prefersReducedMotion]);

  const visiblePrompt = prefersReducedMotion ? activePrompt : activePrompt.slice(0, characterCount);

  return (
    <span className="app-user-prompt" aria-hidden="true">
      <span>Let’s begin:</span>
      <span className="app-user-typed-word">{visiblePrompt}</span>
      <span className="app-user-typing-cursor" />
    </span>
  );
}

export default function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  const userMenuCloseTimerRef = useRef(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isAdmin = isAdminRole(user?.role);
  const isPanelist = isPanelistRole(user?.role);
  const roleLabel = isAdmin ? 'Admin' : user?.role === 'panelist' ? 'Panelist' : 'Member';
  const referralOpenRequested = new URLSearchParams(location.search).get('referral') === 'true';
  const usesEditorialWorkspaceSurface = location.pathname === '/dashboard' || location.pathname === '/activity';

  function cancelUserMenuClose() {
    if (userMenuCloseTimerRef.current) {
      window.clearTimeout(userMenuCloseTimerRef.current);
      userMenuCloseTimerRef.current = null;
    }
  }

  function closeUserMenuImmediately() {
    cancelUserMenuClose();
    setUserMenuOpen(false);
  }

  function openUserMenu() {
    cancelUserMenuClose();
    setUserMenuOpen(true);
  }

  function closeUserMenuWithDelay() {
    cancelUserMenuClose();
    userMenuCloseTimerRef.current = window.setTimeout(() => {
      setUserMenuOpen(false);
      userMenuCloseTimerRef.current = null;
    }, 180);
  }

  function toggleUserMenu() {
    cancelUserMenuClose();
    setUserMenuOpen((value) => !value);
  }

  useEffect(() => {
    closeUserMenuImmediately();
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!userMenuRef.current?.contains(event.target)) closeUserMenuImmediately();
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeUserMenuImmediately();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      cancelUserMenuClose();
    };
  }, []);

  const handleLogout = () => {
    closeUserMenuImmediately();
    logout();
    navigate('/login');
  };

  const goToProfile = () => {
    closeUserMenuImmediately();
    navigate('/profile');
  };

  const navigationLink = (item, className = 'app-nav-link') => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) => {
          const isSectionActive = item.hash
            ? location.pathname === '/partners' && (location.hash === item.hash || (!location.hash && item.hash === '#surveys'))
            : isActive;
          return `${className} ${isSectionActive ? 'is-active' : ''}`;
        }}
      >
        <Icon size={17} strokeWidth={1.8} />
        <span>{item.label}</span>
      </NavLink>
    );
  };

  const adminLink = (to, label, Icon, end = false) => (
    <NavLink key={to} to={to} end={end} className={({ isActive }) => `app-nav-link ${isActive ? 'is-active' : ''}`}>
      <Icon size={17} strokeWidth={1.8} />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <ProfileSurveyProvider enabled={isPanelist}>
      <div className="app-shell min-h-screen">
        <div className="app-shell-grain" aria-hidden="true" />
        <header className="app-topbar sticky top-0 z-30">
          <div className="flex h-[76px] items-center justify-between px-5 sm:px-7">
            <div className="flex items-center gap-4">
              <div className="app-brand-lockup" aria-label="GuanyiSearch">
                <Logo size="md" className="app-logo" />
              </div>
              {isAdmin && <span className="app-topbar-divider hidden sm:block" aria-hidden="true" />}
              {isAdmin && <p className="app-topbar-context hidden text-xs sm:block">Operations workspace</p>}
              {isPanelist && <nav className="app-panelist-nav hidden lg:flex" aria-label="Main navigation">{panelistNavItems.map((item) => navigationLink(item, 'app-panelist-nav-link'))}</nav>}
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              {isAdmin && <WalletBalanceMenu />}
              <div
                ref={userMenuRef}
                className="app-user-menu"
                onMouseEnter={openUserMenu}
                onMouseLeave={closeUserMenuWithDelay}
              >
              <button
                className={`app-user-trigger ${userMenuOpen ? 'is-open' : ''}`}
                type="button"
                onClick={toggleUserMenu}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <span className="app-user-summary text-right">
                  <span className="app-user-name-line">
                    <span className="app-user-name">{user?.username || 'Guest'}</span>
                    {isPanelist && <PanelistPrompt />}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">{roleLabel}</span>
                </span>
                <ChevronDown className="app-user-chevron" size={15} aria-hidden="true" />
              </button>
              {userMenuOpen && (
                <div className="app-user-dropdown" role="menu" aria-label="User menu">
                  <button className="app-user-menu-item" type="button" onClick={goToProfile} role="menuitem">
                    <User size={15} />
                    <span>View profile</span>
                  </button>
                  <button className="app-user-menu-item" type="button" onClick={goToProfile} role="menuitem">
                    <Settings size={15} />
                    <span>Account settings</span>
                  </button>
                  {isPanelist && (
                    <NavLink className="app-user-menu-item" to="/activity" onClick={closeUserMenuImmediately} role="menuitem">
                      <BarChart3 size={15} />
                      <span>Dashboard</span>
                    </NavLink>
                  )}
                  {isPanelist && (
                    <NavLink className="app-user-menu-item" to="/wallet" onClick={closeUserMenuImmediately} role="menuitem">
                      <Gift size={15} />
                      <span>Rewards & wallet</span>
                    </NavLink>
                  )}
                  {isPanelist && (
                    <NavLink className="app-user-menu-item" to="/dashboard?referral=true" onClick={closeUserMenuImmediately} role="menuitem">
                      <Users size={15} />
                      <span>Invite program</span>
                    </NavLink>
                  )}
                  <button className="app-user-menu-item is-danger" type="button" onClick={handleLogout} role="menuitem">
                    <LogOut size={15} />
                    <span>Log out</span>
                  </button>
                </div>
              )}
              </div>
            </div>
          </div>
        </header>

      <div className="app-frame flex">
        {isAdmin && (
          <aside className="app-sidebar w-[272px] shrink-0 px-4 py-6">
            <div className="app-sidebar-label">Workspace</div>
            <nav className="space-y-1">
              {navItems.map(navigationLink)}
              <div className="app-sidebar-label app-sidebar-label-secondary">Operations</div>
              {adminLink('/team', 'Team', UserPlus)}
              {adminLink('/workers', 'Orbit Operations', UserCog)}
              {adminLink('/orbit/settlement', 'Settlement Review', ClipboardCheck)}
              {adminLink('/admin/rewards', 'Reward Center', Gift)}
              {adminLink('/admin/panelists', 'Panel Profiles', ListFilter)}
              {adminLink('/admin/partners', 'Partners', Users)}
              {adminLink('/admin/database', 'Database', Database)}
              {adminLink('/admin/marketing-assets', 'Marketing Assets', Image)}
              {adminLink('/admin/support', 'Support Requests', MessageCircleMore)}
              {adminLink('/admin', 'Admin Dashboard', ShieldCheck, true)}
            </nav>
            <div className="app-sidebar-foot">
              <span className="app-sidebar-status" aria-hidden="true" />
              Secure workspace
            </div>
          </aside>
        )}
        <main className={`app-main min-w-0 flex-1 px-5 py-7 sm:px-8 lg:px-10 ${usesEditorialWorkspaceSurface ? 'app-main-dashboard' : ''} ${isPanelist ? 'app-main-panelist' : ''}`}>
          <div key={location.pathname} className="app-route-enter">
            {children || <Outlet />}
          </div>
        </main>
        </div>
        {isPanelist && <HomeFooter />}
        {isPanelist && <ReferralProgramWidget openFromRoute={referralOpenRequested} />}
      </div>
    </ProfileSurveyProvider>
  );
}

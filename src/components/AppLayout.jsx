import { useEffect, useRef, useState } from 'react';
import { BarChart3, ChevronDown, Database, Gift, LogOut, MonitorPlay, Newspaper, Settings, ShieldCheck, User, UserCog, UserPlus, Users, WalletCards } from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import CoinAmount from './CoinAmount';
import Logo from './Logo';
import { isAdminRole, isPanelistRole } from '../utils/roles';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/partners', label: 'Survey Wall', icon: Users },
  { to: '/news', label: 'News Wall', icon: Newspaper },
  { to: '/wallet', label: 'Wallet', icon: WalletCards },
];

export default function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isAdmin = isAdminRole(user?.role);
  const isPanelist = isPanelistRole(user?.role);
  const roleLabel = isAdmin ? 'Admin' : user?.role === 'panelist' ? 'Panelist' : 'Member';

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!userMenuRef.current?.contains(event.target)) setUserMenuOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setUserMenuOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    navigate('/login');
  };

  const goToProfile = () => {
    setUserMenuOpen(false);
    navigate('/profile');
  };

  const navigationLink = (item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) => `app-nav-link ${isActive ? 'is-active' : ''}`}
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
    <div className="app-shell min-h-screen">
      <div className="app-shell-grain" aria-hidden="true" />
      <header className="app-topbar sticky top-0 z-30">
        <div className="flex h-[76px] items-center justify-between px-5 sm:px-7">
          <div className="flex items-center gap-4">
            <div className="app-brand-lockup" aria-label="GuanyiSearch">
              <img className="app-brand-mark" src="/guanyisearch-favicon.png" alt="" aria-hidden="true" />
              <Logo size="md" variant="light" className="app-logo" />
            </div>
            <span className="app-topbar-divider hidden sm:block" aria-hidden="true" />
            <p className="app-topbar-context hidden text-xs sm:block">{isPanelist ? 'Panelist workspace' : 'Operations workspace'}</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="app-balance hidden px-3 py-2 text-sm font-semibold sm:block">
              <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.14em]">Coins</span>
              <CoinAmount value={user?.coins} />
            </div>
            <div ref={userMenuRef} className="app-user-menu">
              <button
                className={`app-user-trigger ${userMenuOpen ? 'is-open' : ''}`}
                type="button"
                onClick={() => setUserMenuOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <span className="app-user-summary text-right">
                  <span className="text-sm font-semibold">{user?.username || 'Guest'}</span>
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
        <aside className="app-sidebar w-[272px] shrink-0 px-4 py-6">
          <div className="app-sidebar-label">Workspace</div>
          <nav className="space-y-1">
            {navItems.map(navigationLink)}
            {isAdmin && (
              <>
                <div className="app-sidebar-label app-sidebar-label-secondary">Operations</div>
                {adminLink('/team', 'Team', UserPlus)}
                {adminLink('/workers', 'Member Monitor', UserCog)}
                {adminLink('/traffic', 'Traffic Console', MonitorPlay)}
                {adminLink('/admin/rewards', 'Reward Center', Gift)}
                {adminLink('/admin/partners', 'Partners', Users)}
                {adminLink('/admin/database', 'Database', Database)}
                {adminLink('/admin', 'Admin Dashboard', ShieldCheck, true)}
              </>
            )}
          </nav>
          <div className="app-sidebar-foot">
            <span className="app-sidebar-status" aria-hidden="true" />
            Secure workspace
          </div>
        </aside>
        <main className="app-main min-w-0 flex-1 px-5 py-7 sm:px-8 lg:px-10">
          <div key={location.pathname} className="app-route-enter">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}

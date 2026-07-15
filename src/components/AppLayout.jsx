import { BarChart3, Database, Gift, LogOut, MonitorPlay, Newspaper, Settings, ShieldCheck, User, UserCog, UserPlus, Users, WalletCards } from 'lucide-react';
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
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = isAdminRole(user?.role);
  const isPanelist = isPanelistRole(user?.role);
  const roleLabel = isAdmin ? 'Admin' : user?.role === 'panelist' ? 'Panelist' : 'Member';
  const visibleNavItems = navItems.filter((item) => item.to !== '/settings' || !isPanelist);

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            <div className="app-user-summary text-right">
              <p className="text-sm font-semibold">{user?.username || 'Guest'}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">{roleLabel}</p>
            </div>
            <button className="app-logout" type="button" onClick={handleLogout} aria-label="Log out">
              <LogOut size={16} />
              <span className="hidden lg:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="app-frame flex">
        <aside className="app-sidebar w-[272px] shrink-0 px-4 py-6">
          <div className="app-sidebar-label">Workspace</div>
          <nav className="space-y-1">
            {visibleNavItems.map(navigationLink)}
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
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

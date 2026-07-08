import { BarChart3, ClipboardList, LogOut, MonitorPlay, Settings, ShieldCheck, User, UserCog, UserPlus, Users } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import CoinAmount from './CoinAmount';
import Logo from './Logo';
import { isAdminRole } from '../utils/roles';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/partners', label: 'Survey Wall', icon: Users },
  { to: '/records', label: 'My Records', icon: ClipboardList },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = isAdminRole(user?.role);
  const roleLabel = isAdmin ? 'Admin' : 'Member';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef5f2_100%)]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <p className="hidden text-xs text-slate-500 sm:block">Survey operations console</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
              <span className="mr-2 text-xs font-bold uppercase tracking-wide text-amber-600">Coins Balance</span>
              <CoinAmount value={user?.coins} />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{user?.username || 'Guest'}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{roleLabel}</p>
            </div>
            <button className="btn-secondary" type="button" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="min-h-[calc(100vh-4rem)] w-64 border-r border-slate-200/80 bg-white/90 px-4 py-6">
          <div className="mb-6 border-b border-slate-100 pb-5">
            <Logo size="sm" />
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-green-50 text-green-700 shadow-sm' : 'text-slate-600 hover:bg-green-50/70 hover:text-green-700'
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );
            })}
            {isAdmin && (
              <>
                <NavLink
                  to="/team"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-green-50 text-green-700 shadow-sm' : 'text-slate-600 hover:bg-green-50/70 hover:text-green-700'
                    }`
                  }
                >
                  <UserPlus size={18} />
                  Team
                </NavLink>
                <NavLink
                  to="/workers"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-green-50 text-green-700 shadow-sm' : 'text-slate-600 hover:bg-green-50/70 hover:text-green-700'
                    }`
                  }
                >
                  <UserCog size={18} />
                  Member Monitor
                </NavLink>
                <NavLink
                  to="/traffic"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-green-50 text-green-700 shadow-sm' : 'text-slate-600 hover:bg-green-50/70 hover:text-green-700'
                    }`
                  }
                >
                  <MonitorPlay size={18} />
                  Traffic Console
                </NavLink>
                <NavLink
                  to="/admin/partners"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-green-50 text-green-700 shadow-sm' : 'text-slate-600 hover:bg-green-50/70 hover:text-green-700'
                    }`
                  }
                >
                  <Users size={18} />
                  Partners
                </NavLink>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-green-50 text-green-700 shadow-sm' : 'text-slate-600 hover:bg-green-50/70 hover:text-green-700'
                    }`
                  }
                >
                  <ShieldCheck size={18} />
                  Admin Dashboard
                </NavLink>
              </>
            )}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

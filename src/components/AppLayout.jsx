import { BarChart3, ClipboardList, LogOut, Settings, ShieldCheck, User, Users } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { formatCoins } from '../utils/formatters';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/partners', label: 'Survey Partners', icon: Users },
  { to: '/records', label: 'My Records', icon: ClipboardList },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-950">PanelPro</p>
              <p className="text-xs text-slate-500">Survey operations console</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
              {formatCoins(user?.coins)}
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{user?.username || 'Guest'}</p>
              <p className="text-xs text-slate-500">{user?.role || 'member'}</p>
            </div>
            <button className="btn-secondary" type="button" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="min-h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white px-4 py-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-green-50 text-green-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );
            })}
            {user?.role === 'admin' && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-green-50 text-green-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                  }`
                }
              >
                <ShieldCheck size={18} />
                Admin Dashboard
              </NavLink>
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

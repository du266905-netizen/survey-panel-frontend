import { useEffect, useRef, useState } from 'react';
import { BarChart3, BriefcaseBusiness, ChevronDown, ClipboardCheck, Compass, Database, FlaskConical, Gift, House, Image, ListFilter, LogOut, MessageCircleMore, Newspaper, Settings, ShieldCheck, User, UserCog, UserPlus, Users, WalletCards } from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Logo from './Logo';
import { isAdminRole, isPanelistRole } from '../utils/roles';
import { ProfileSurveyProvider } from './ProfileSurveyContext';
import ReferralProgramWidget from './ReferralProgramWidget';
import NotificationBell from './NotificationBell';
import { HomeFooter } from './HomeLegacySections';
import { useLanguage, withLanguage } from './LanguageContext';

const navItems = [
  { to: '/dashboard', labelKey: 'dashboard', icon: BarChart3 },
  { to: '/research', labelKey: 'research', icon: Compass },
  { to: '/partners#surveys', labelKey: 'surveys', icon: Users, hash: '#surveys' },
  { to: '/news', labelKey: 'news', icon: Newspaper },
  { to: '/wallet', labelKey: 'wallet', icon: WalletCards },
];

const panelistNavItems = navItems
  .filter((item) => item.to !== '/wallet')
  .map((item) => (item.to === '/dashboard' ? { ...item, labelKey: 'home', icon: House } : item));

export default function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const { language, publicCopy } = useLanguage();
  const workspaceCopy = publicCopy.workspace.nav;
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  const userMenuCloseTimerRef = useRef(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isAdmin = isAdminRole(user?.role);
  const isPanelist = isPanelistRole(user?.role);
  const roleLabel = isAdmin ? '管理员' : user?.role === 'panelist' ? '参与者' : '成员';
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
    navigate(withLanguage('/login', language));
  };

  const goToProfile = () => {
    closeUserMenuImmediately();
    navigate(withLanguage('/profile', language));
  };

  const navigationLink = (item, className = 'app-nav-link') => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={withLanguage(item.to, language)}
        className={({ isActive }) => {
          const isSectionActive = item.hash
            ? location.pathname === '/partners' && (location.hash === item.hash || (!location.hash && item.hash === '#surveys'))
            : isActive;
          return `${className} ${isSectionActive ? 'is-active' : ''}`;
        }}
      >
        <Icon size={17} strokeWidth={1.8} />
        <span>{workspaceCopy[item.labelKey]}</span>
      </NavLink>
    );
  };

  const adminLink = (to, label, Icon, end = false) => (
    <NavLink key={to} to={withLanguage(to, language)} end={end} className={({ isActive }) => `app-nav-link ${isActive ? 'is-active' : ''}`}>
      <Icon size={17} strokeWidth={1.8} />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <ProfileSurveyProvider enabled={isPanelist}>
      <div className={`app-shell notranslate min-h-screen${isAdmin ? ' app-shell-admin' : ''}${isPanelist ? ' app-shell-panelist' : ''}`} translate="no" data-translate="no">
        <div className="app-shell-grain" aria-hidden="true" />
        <header className="app-topbar sticky top-0 z-30">
          <div className="flex h-[76px] items-center justify-between px-5 sm:px-7">
            <div className="flex items-center gap-4">
              <div className="app-brand-lockup" aria-label="GuanyiSearch">
                <Logo size="md" className="app-logo" />
              </div>
              {isAdmin && <span className="app-topbar-divider hidden sm:block" aria-hidden="true" />}
              {isAdmin && <p className="app-topbar-context hidden text-xs sm:block">运营工作区</p>}
              {isPanelist && <nav className="app-panelist-nav hidden lg:flex" aria-label="Main navigation">{panelistNavItems.map((item) => navigationLink(item, 'app-panelist-nav-link'))}</nav>}
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              {isAdmin && <NotificationBell />}
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
                  <span className="text-sm font-semibold">{user?.username || 'Guest'}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">{roleLabel}</span>
                </span>
                <ChevronDown className="app-user-chevron" size={15} aria-hidden="true" />
              </button>
              {userMenuOpen && (
                <div className="app-user-dropdown" role="menu" aria-label="User menu">
                  {!isAdmin && <>
                    <button className="app-user-menu-item" type="button" onClick={goToProfile} role="menuitem">
                      <User size={15} />
                      <span>{workspaceCopy.profile}</span>
                    </button>
                    <button className="app-user-menu-item" type="button" onClick={goToProfile} role="menuitem">
                      <Settings size={15} />
                      <span>{workspaceCopy.settings}</span>
                    </button>
                  </>}
                  {isPanelist && (
                    <NavLink className="app-user-menu-item" to={withLanguage('/activity', language)} onClick={closeUserMenuImmediately} role="menuitem">
                      <BarChart3 size={15} />
                      <span>{workspaceCopy.dashboard}</span>
                    </NavLink>
                  )}
                  {isPanelist && (
                    <NavLink className="app-user-menu-item" to={withLanguage('/wallet', language)} onClick={closeUserMenuImmediately} role="menuitem">
                      <Gift size={15} />
                      <span>{workspaceCopy.wallet}</span>
                    </NavLink>
                  )}
                  {isPanelist && (
                    <NavLink className="app-user-menu-item" to={withLanguage('/dashboard?referral=true', language)} onClick={closeUserMenuImmediately} role="menuitem">
                      <Users size={15} />
                      <span>{workspaceCopy.invite}</span>
                    </NavLink>
                  )}
                  <button className="app-user-menu-item is-danger" type="button" onClick={handleLogout} role="menuitem">
                    <LogOut size={15} />
                    <span>{workspaceCopy.logout}</span>
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
            <div className="app-sidebar-label">运营</div>
            <nav className="space-y-1">
              {adminLink('/admin', '运营总览', ShieldCheck, true)}
              {adminLink('/admin/business-projects', '客户项目', BriefcaseBusiness)}
              {adminLink('/admin/business-questionnaires', '问卷审核', ClipboardCheck)}
              {adminLink('/admin/support', '销售与客服', MessageCircleMore)}
              <div className="app-sidebar-label app-sidebar-label-secondary">研究运营</div>
              {adminLink('/admin/research-opportunities', '研究机会', Compass)}
              {adminLink('/admin/panelists', '参与者资料', ListFilter)}
              {adminLink('/admin/rewards', '奖励与兑换', Gift)}
              {adminLink('/admin/partners', '问卷来源', Users)}
              <div className="app-sidebar-label app-sidebar-label-secondary">系统</div>
              {adminLink('/admin/sandbox', '沙盒发布', FlaskConical)}
              {adminLink('/team', '团队', UserPlus)}
              {adminLink('/workers', 'Orbit 运营', UserCog)}
              {adminLink('/orbit/settlement', '结算审核', ClipboardCheck)}
              {adminLink('/admin/database', '数据库', Database)}
              {adminLink('/admin/marketing-assets', '营销素材', Image)}
            </nav>
            <div className="app-sidebar-foot">
              <span className="app-sidebar-status" aria-hidden="true" />
              安全工作区
            </div>
          </aside>
        )}
        <main className={`app-main min-w-0 flex-1 px-5 py-7 sm:px-8 lg:px-10 ${usesEditorialWorkspaceSurface ? 'app-main-dashboard' : ''} ${isPanelist ? 'app-main-panelist' : ''} ${isAdmin ? 'app-main-admin' : ''}`}>
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

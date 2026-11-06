import { useState } from 'react';
import {
  BarChart3,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Receipt,
  Settings,
  Wallet,
  Sparkles,
  Sprout,
  ChevronDown,
  UserRound,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from './AuthContext';
import BusinessLanguagePicker from './BusinessLanguagePicker';
import { useLanguage, withLanguage } from './LanguageContext';
import { useBusinessAvatar } from '../utils/businessAvatar';
import './BusinessRail.css';

/* The one rail every authenticated business page renders.
 *
 * /business/workspace and /business/ai-brief each used to carry their own copy
 * of this markup, which is exactly how they drifted into two different
 * sidebars (a 248px labelled rail versus a 74px icon strip). Destinations,
 * labels, the language picker, the bell and the account menu now live here
 * once. Pages supply only two things: which entry is current, and what
 * clicking an entry should do.
 *
 * Every label comes from LanguageContext — this file carries no wording of its
 * own, so adding a language never means touching the rail.
 */

export default function BusinessRail({ activeId, onSelect, className = '', onReplayTour }) {
  const avatar = useBusinessAvatar();
  const { user, logout } = useAuth();
  const { language, publicCopy } = useLanguage();
  const navigate = useNavigate();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  /* The rail remounts on navigation; without this the group closed itself the
     moment you picked one of its entries. Keep the choice for the session, and
     open by default when the current page is one of them. */
  const settingsIds = ['personal', 'team', 'billing', 'budget'];
  const [settingsOpen, setSettingsOpen] = useState(() => {
    try {
      const stored = window.sessionStorage.getItem('guanyi.rail.settingsOpen');
      if (stored !== null) return stored === 'true';
    } catch { /* private mode */ }
    return settingsIds.includes(activeId);
  });

  // `publicCopy.workspace.business.rail` is deep-merged with the English base
  // in LanguageContext, so these strings are translated in every locale that
  // ships one and fall back to English otherwise.
  const rail = publicCopy?.workspace?.business?.rail || {};
  const billingCopy = publicCopy?.workspace?.business?.billing || {};
  const budgetCopy = publicCopy?.workspace?.business?.budget || {};
  const navigationLabel = rail.navigation || 'Workspace navigation';

  const groups = [
    { id: 'overview', label: rail.overview || 'Overview', items: [
      { id: 'home', label: rail.home || 'Overview', icon: LayoutDashboard },
    ] },
    { id: 'research', label: rail.research || 'Research', items: [
      { id: 'ai', label: rail.ai || 'AI research guide', icon: Sprout },
      { id: 'questionnaires', label: rail.questionnaires || 'Questionnaire editor', icon: ClipboardList },
    ] },
    { id: 'delivery', label: rail.delivery || 'Delivery', items: [
      { id: 'projects', label: rail.projects || 'Projects', icon: FileText },
      { id: 'results', label: rail.results || 'Questionnaire results', icon: BarChart3 },
    ] },
  ];

  const selectItem = (id) => {
    if (id === 'personal') { navigate(withLanguage('/business/account', language)); return; }
    if (id === 'billing') { navigate(withLanguage('/business/billing', language)); return; }
    onSelect?.(id);
  };

  return (
    <aside className={['business-workspace-rail', 'business-rail', className].filter(Boolean).join(' ')} aria-label={navigationLabel}>
      {/* 导轨顶部放站点字标，不用那个大 G：和顶栏、管理端的品牌写法保持一致。 */}
      <Logo size="sm" variant="dark" className="business-workspace-rail-brand" />

      <nav className="business-workspace-navgroups" aria-label={navigationLabel} data-tour="rail-nav">
        {groups.map((group) => {
          return (
            <div className="business-workspace-navgroup" key={group.id}>
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                const isActive = activeId === item.id;
                return (
                  <button key={item.id} className={`business-workspace-navitem${isActive ? ' is-active' : ''}`} type="button" title={item.label} aria-current={isActive ? 'page' : undefined} data-tour={`rail-${item.id}`} onClick={() => selectItem(item.id)}>
                    {ItemIcon && <ItemIcon size={17} />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          );
        })}

        {/* The account destinations used to hide behind the avatar; they are
            settings, so they live under one labelled group, collapsed by default
            like the rest of the rail's groups once were. */}
        <div className="business-workspace-navgroup business-workspace-navgroup-settings">
          <button
            className="business-workspace-navgroup-title"
            type="button"
            aria-expanded={settingsOpen}
            onClick={() => setSettingsOpen((value) => {
              const next = !value;
              try { window.sessionStorage.setItem('guanyi.rail.settingsOpen', String(next)); } catch { /* private mode */ }
              return next;
            })}
          >
            <Settings size={17} aria-hidden="true" />
            <span>{rail.settings || 'Settings'}</span>
            <ChevronDown
              size={13}
              style={{ marginLeft: 'auto', transform: settingsOpen ? 'none' : 'rotate(-90deg)', transition: 'transform .16s ease' }}
            />
          </button>
          {settingsOpen && [
            { id: 'personal', label: language === 'zh-CN' ? '个人设置' : language === 'zh-Hant' ? '個人設定' : (rail.account || 'Account'), icon: UserRound, path: '/business/account' },
            { id: 'team', label: language === 'zh-CN' ? '团队设置' : language === 'zh-Hant' ? '團隊設定' : 'Team settings', icon: Users, path: '/business/team' },
            { id: 'billing', label: billingCopy.title || 'Invoices and billing', icon: Receipt, path: '/business/billing' },
            { id: 'budget', label: budgetCopy.title || 'Account budget', icon: Wallet, path: '/business/budget' },
          ].map((item) => {
            const ItemIcon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                className={`business-workspace-navitem${isActive ? ' is-active' : ''}`}
                type="button"
                onClick={() => { navigate(withLanguage(item.path, language)); }}
              >
                <ItemIcon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Help sits outside the settings group: it is a destination, not a
            setting, and it opens the public help centre. */}
        <button
          type="button"
          className={`business-workspace-navitem business-workspace-navitem-help${activeId === 'help' ? ' is-active' : ''}`}
          onClick={() => navigate(withLanguage('/business/help', language))}
        >
          <LifeBuoy size={17} />
          <span>{language && language.startsWith('zh') ? '帮助中心' : 'Help centre'}</span>
        </button>
      </nav>

      <BusinessLanguagePicker />

      <div className="business-workspace-account">
        <button type="button" data-tour="rail-account" onClick={() => setAccountMenuOpen((value) => !value)} aria-label={rail.accountMenu || 'Account menu'} aria-expanded={accountMenuOpen}>
          {avatar
            ? <img className="business-workspace-account-photo" src={avatar} alt="" />
            : <UserRound size={20} />}
        </button>
        {accountMenuOpen && (
          <div>
            <strong>{user?.displayName || rail.clientAccount}</strong>
            <span>{user?.email}</span>
            {onReplayTour && <button type="button" onClick={() => { setAccountMenuOpen(false); onReplayTour(); }}><Sparkles size={15} /> {rail.tourReplay || 'Show the tour again'}</button>}
            <button type="button" onClick={() => { setAccountMenuOpen(false); logout(); navigate(withLanguage('/business/login', language)); }}><LogOut size={15} /> {rail.signOut}</button>
          </div>
        )}
      </div>
    </aside>
  );
}

import { useState } from 'react';
import {
  BarChart3,
  ChevronDown,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Receipt,
  Wallet,
  Sparkles,
  Sprout,
  UserRound,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const [collapsedGroups, setCollapsedGroups] = useState([]);

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

  const toggleGroup = (id) => setCollapsedGroups((current) => (
    current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
  ));

  return (
    <aside className={['business-workspace-rail', 'business-rail', className].filter(Boolean).join(' ')} aria-label={navigationLabel}>
      <img className="business-workspace-rail-mark" src="/guanyisearch-project-mark.png" alt="" />

      <nav className="business-workspace-navgroups" aria-label={navigationLabel} data-tour="rail-nav">
        {groups.map((group) => {
          const expanded = !collapsedGroups.includes(group.id);
          return (
            <div className="business-workspace-navgroup" key={group.id}>
              <button className="business-workspace-navgroup-title" type="button" aria-expanded={expanded} onClick={() => toggleGroup(group.id)}>
                <span>{group.label}</span>
                <ChevronDown size={14} />
              </button>
              {expanded && group.items.map((item) => {
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
            <button type="button" onClick={() => { setAccountMenuOpen(false); navigate(withLanguage('/business/account', language)); }}><UserRound size={15} /> {rail.account}</button>
            <button type="button" onClick={() => { setAccountMenuOpen(false); navigate(withLanguage('/business/billing', language)); }}><Receipt size={15} /> {billingCopy.title || 'Invoices and billing'}</button>
            <button type="button" onClick={() => { setAccountMenuOpen(false); navigate(withLanguage('/business/budget', language)); }}><Wallet size={15} /> {budgetCopy.title || 'Account budget'}</button>
            {onReplayTour && <button type="button" onClick={() => { setAccountMenuOpen(false); onReplayTour(); }}><Sparkles size={15} /> {rail.tourReplay || 'Show the tour again'}</button>}
            <button type="button" onClick={() => { setAccountMenuOpen(false); logout(); navigate(withLanguage('/business/login', language)); }}><LogOut size={15} /> {rail.signOut}</button>
          </div>
        )}
      </div>
    </aside>
  );
}

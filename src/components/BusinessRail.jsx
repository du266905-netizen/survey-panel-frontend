import { useState } from 'react';
import {
  BarChart3,
  ChevronDown,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import BusinessLanguagePicker from './BusinessLanguagePicker';
import { useLanguage, withLanguage } from './LanguageContext';
import './BusinessRail.css';

/* The one rail every authenticated business page renders.
 *
 * /business/workspace and /business/ai-brief each used to carry their own copy
 * of this markup, which is exactly how they drifted into two different
 * sidebars (a 248px labelled rail versus a 74px icon strip). Destinations,
 * labels, the language picker, the bell and the account menu now live here
 * once. Pages supply only two things: which entry is current, and what
 * clicking an entry should do.
 */

const railWords = {
  'zh-CN': { overview: '总览', research: '研究', delivery: '交付', home: '概览', ai: 'AI 研究引导', questionnaires: '问卷编辑器' },
  'zh-Hant': { overview: '總覽', research: '研究', delivery: '交付', home: '概覽', ai: 'AI 研究引導', questionnaires: '問卷編輯器' },
};

const railWordsFallback = {
  overview: 'Overview',
  research: 'Research',
  delivery: 'Delivery',
  home: 'Overview',
  ai: 'AI research guide',
  questionnaires: 'Questionnaire editor',
};

export default function BusinessRail({ activeId, onSelect, className = '' }) {
  const { user, logout } = useAuth();
  const { language, publicCopy } = useLanguage();
  const navigate = useNavigate();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState([]);

  // `publicCopy.workspace.business.rail` is deep-merged with the English base
  // in LanguageContext, so these strings are translated in every locale that
  // ships one and fall back to English otherwise.
  const rail = publicCopy?.workspace?.business?.rail || {};
  const words = railWords[language] || railWordsFallback;
  const navigationLabel = rail.navigation || 'Workspace navigation';

  const groups = [
    { id: 'overview', label: words.overview, items: [
      { id: 'home', label: words.home, icon: LayoutDashboard },
    ] },
    { id: 'research', label: words.research, items: [
      { id: 'ai', label: words.ai, icon: Sparkles },
      { id: 'questionnaires', label: words.questionnaires, icon: ClipboardList },
    ] },
    { id: 'delivery', label: words.delivery, items: [
      { id: 'projects', label: rail.projects || 'Projects', icon: FileText },
      { id: 'results', label: rail.results || 'Questionnaire results', icon: BarChart3 },
    ] },
  ];

  const toggleGroup = (id) => setCollapsedGroups((current) => (
    current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
  ));

  return (
    <aside className={['business-workspace-rail', 'business-rail', className].filter(Boolean).join(' ')} aria-label={navigationLabel}>
      <img className="business-workspace-rail-mark" src="/guanyisearch-project-mark.png" alt="" />

      <nav className="business-workspace-navgroups" aria-label={navigationLabel}>
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
                  <button key={item.id} className={`business-workspace-navitem${isActive ? ' is-active' : ''}`} type="button" title={item.label} aria-current={isActive ? 'page' : undefined} onClick={() => onSelect(item.id)}>
                    <ItemIcon size={17} />
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
        <button type="button" onClick={() => setAccountMenuOpen((value) => !value)} aria-label={rail.accountMenu || 'Account menu'} aria-expanded={accountMenuOpen}>
          <UserRound size={20} />
          <span>{String(user?.displayName || user?.email || 'A').trim().charAt(0).toUpperCase()}</span>
        </button>
        {accountMenuOpen && (
          <div>
            <strong>{user?.displayName || rail.clientAccount}</strong>
            <span>{user?.email}</span>
            <button type="button" onClick={() => { setAccountMenuOpen(false); navigate(withLanguage('/business/account', language)); }}><UserRound size={15} /> {rail.account}</button>
            <button type="button" onClick={() => { setAccountMenuOpen(false); logout(); navigate(withLanguage('/business/login', language)); }}><LogOut size={15} /> {rail.signOut}</button>
          </div>
        )}
      </div>
    </aside>
  );
}

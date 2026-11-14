import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Home, LifeBuoy, LogOut, Sparkles, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useBusinessAvatar } from '../utils/businessAvatar';
import { useLanguage, withLanguage } from './LanguageContext';
import { pick } from '../content/projectStatus';
import BusinessBalanceChip from './BusinessBalanceChip';
import BusinessAddFundsDialog from '../pages/BusinessAddFundsDialog';
import BusinessLanguagePicker from './BusinessLanguagePicker';
import NotificationBell from './NotificationBell';
import Logo from './Logo';
import './BusinessTopNav.css';

/* The research workspace's top navigation.
 *
 * One row: wordmark · Home · Research · Delivery · Settings · Help, then the
 * controls that used to be scattered between the old rail footer and the
 * topbar: balance, notifications, language, account.
 */

export default function BusinessTopNav({ activeId, onReplayTour }) {
  const { user, logout } = useAuth();
  const avatar = useBusinessAvatar();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [fundsOpen, setFundsOpen] = useState(false);
  const accountRef = useRef(null);
  /* Hover opens the group menus: leave a 140ms grace period so the pointer can
     cross the gap between the trigger and the panel without the menu closing.
     Clicking the trigger also opens it, which is what touch and keyboard use. */
  const closeTimer = useRef(0);
  const openGroup = (id) => {
    window.clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const closeGroup = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const t = (cn, en) => pick(language, cn, en, cn);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCondensed(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onDown = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) setAccountOpen(false);
      if (!event.target.closest('.business-topnav-group')) setOpen(null);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(null);
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const go = (path) => {
    setOpen(null);
    setAccountOpen(false);
    navigate(withLanguage(path, language));
  };

  const groups = [
    {
      id: 'delivery',
      label: t('交付', 'Delivery'),
      items: [
        { id: 'projects', label: t('项目', 'Projects'), to: '/business/projects' },
        { id: 'results', label: t('结果', 'Results'), to: '/business/results' },
      ],
    },
    {
      id: 'settings',
      label: t('设置', 'Settings'),
      items: [
        { id: 'account', label: t('个人设置', 'Personal settings'), to: '/business/account' },
        { id: 'team', label: t('团队设置', 'Team settings'), to: '/business/team' },
        { id: 'billing', label: t('账单与发票', 'Invoices and billing'), to: '/business/billing' },
        { id: 'budget', label: t('账户预算', 'Account budget'), to: '/business/budget' },
      ],
    },
  ];

  const groupForActive = groups.find((group) => group.items.some((item) => item.id === activeId));

  return (
    <>
    <header className={`business-topnav${condensed ? ' is-condensed' : ''}`}>
      <div className="business-topnav-inner">
        <button type="button" className="business-topnav-brand" onClick={() => go('/business/workspace')} aria-label="GuanyiSearch workspace home">
          <Logo size="sm" />
        </button>

        <nav className="business-topnav-links" aria-label={t('工作区导航', 'Workspace navigation')}>
          <button type="button" className={`business-topnav-link${activeId === 'home' ? ' is-active' : ''}`} onClick={() => go('/business/workspace')}>
            <Home size={16} strokeWidth={1.8} aria-hidden="true" />
            <span>Home</span>
          </button>

          <button type="button" className={`business-topnav-link${activeId === 'research' ? ' is-active' : ''}`} onClick={() => go('/business/research')}>
            <span>{t('研究', 'Research')}</span>
          </button>

          {groups.map((group) => {
            const isOpen = open === group.id;
            const isActive = groupForActive?.id === group.id;
            return (
              <div
                className={`business-topnav-group${isOpen ? ' is-open' : ''}`}
                key={group.id}
                onMouseEnter={() => openGroup(group.id)}
                onMouseLeave={closeGroup}
                onFocus={() => openGroup(group.id)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null);
                }}
              >
                <button
                  type="button"
                  className={`business-topnav-link${isActive ? ' is-active' : ''}`}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onClick={() => openGroup(group.id)}
                >
                  <span>{group.label}</span>
                  <ChevronDown size={13} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <div className="business-topnav-menu" role="menu" aria-hidden={!isOpen}>
                  {group.items.map((item) => (
                    <button key={item.id} type="button" role="menuitem" tabIndex={isOpen ? 0 : -1} onClick={() => go(item.to)}>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <button type="button" className={`business-topnav-link${activeId === 'help' ? ' is-active' : ''}`} onClick={() => go('/help')}>
            <LifeBuoy size={16} strokeWidth={1.8} aria-hidden="true" />
            <span>{t('帮助', 'Help')}</span>
          </button>
        </nav>

        <div className="business-topnav-actions business-workspace-topbar">
          <BusinessBalanceChip onAddFunds={() => setFundsOpen(true)} />
          <NotificationBell className="business-workspace-notification" />
          <BusinessLanguagePicker />
          <div className="business-topnav-account" ref={accountRef}>
            <button type="button" className="business-topnav-avatar" onClick={() => setAccountOpen((value) => !value)} aria-expanded={accountOpen} aria-label={t('账户菜单', 'Account menu')}>
              {avatar ? <img src={avatar} alt="" /> : <UserRound size={18} />}
            </button>
            {accountOpen && (
              <div className="business-topnav-account-menu">
                <strong>{user?.displayName || t('客户账户', 'Client account')}</strong>
                <span>{user?.email}</span>
                {onReplayTour && <button type="button" onClick={() => { setAccountOpen(false); onReplayTour(); }}><Sparkles size={15} /> {t('重新查看引导', 'Show the tour again')}</button>}
                <button type="button" onClick={() => { setAccountOpen(false); logout(); navigate(withLanguage('/business/login', language)); }}><LogOut size={15} /> {t('退出登录', 'Sign out')}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    {fundsOpen && <BusinessAddFundsDialog onClose={() => setFundsOpen(false)} />}
    </>
  );
}

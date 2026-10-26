import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, ChevronDown, CircleUserRound, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { isBusinessRole } from '../utils/roles';
import Logo from './Logo';
import LanguageGlobe from './LanguageGlobe';
import { useLanguage, withLanguage } from './LanguageContext';
import { publicNavigation } from '../constants/publicNavigation';
import './PublicSiteHeader.css';

const CLOSE_DELAY = 160;

/* One black bar for every public page.

   2026-10-22 the owner scrapped the old `atlas-*` header and asked for this
   one: black ground, the wordmark on the left, the four groups sitting next to
   it (about / solutions / industries / support), the real globe, English only
   for now. The four group names and their temporary pages live in
   `constants/publicNavigation.js`; the bar itself carries no page copy. */
export default function PublicSiteHeader({ stripStart = null }) {
  const { user } = useAuth();
  const { language, languages, navigateToLanguage, publicCopy } = useLanguage();
  const chrome = publicCopy.chrome;
  /* 两个登录入口共用 /access 表单里的标签；下面那行说明只写三语
     （zh-CN / zh-Hant / en），其余语言回落英文，与站点其它文案的回落一致。 */
  const accessForm = publicCopy.pages.access.form;
  const signInCopy = {
    participant: accessForm.participant,
    researcher: accessForm.researcher,
    participantHint: accessForm.participantHint || 'Take part in studies',
    researcherHint: accessForm.researcherHint || 'Commission a research project',
  };
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  /* 登录下拉：只有点击才展开（2026-10-26 用户要求）。 */
  const [signInOpen, setSignInOpen] = useState(false);
  const signInRef = useRef(null);

  useEffect(() => {
    if (!signInOpen) return undefined;
    const onDown = (event) => {
      if (signInRef.current && !signInRef.current.contains(event.target)) setSignInOpen(false);
    };
    const onKey = (event) => { if (event.key === 'Escape') setSignInOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [signInOpen]);
  const closeTimer = useRef(null);

  const clearTimer = () => {
    if (closeTimer.current === null) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const closeAll = () => {
    clearTimer();
    setOpenMenu(null);
  };
  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      setOpenMenu(null);
    }, CLOSE_DELAY);
  };
  const selectLanguage = (code) => {
    closeAll();
    navigateToLanguage(code);
  };

  useEffect(() => () => clearTimer(), []);
  useEffect(() => {
    closeAll();
    setMobileOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      closeAll();
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const workspaceHref = user ? withLanguage(isBusinessRole(user.role) ? '/business/workspace' : '/dashboard', language) : withLanguage('/access', language);
  const ctaLabel = user ? chrome.header.workspace : chrome.header.join;

  return (
    <header className="psn">
      <div className="psn-bar">
        <Link className="psn-brand" to={withLanguage('/', language)} aria-label="GuanyiSearch home" onClick={closeAll}>
          <Logo size="md" variant="light" />
        </Link>

        <nav className="psn-groups" aria-label="Primary navigation">
          {publicNavigation.map((group) => {
            const hasItems = (group.items || []).length > 0;
            const isOpen = openMenu === group.id;
            return (
              <div
                className="psn-group"
                key={group.id}
                onMouseEnter={() => { if (!hasItems) return; clearTimer(); setOpenMenu(group.id); }}
                onMouseLeave={() => { if (hasItems) scheduleClose(); }}
              >
                {group.to ? (
                  <Link className="psn-trigger" to={withLanguage(group.to, language)} onClick={closeAll}>{chrome.groups[group.id] || group.label}</Link>
                ) : hasItems ? (
                  <button
                    className={`psn-trigger${isOpen ? ' is-open' : ''}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`psn-panel-${group.id}`}
                    onClick={() => {
                      clearTimer();
                      setOpenMenu((current) => (current === group.id ? null : group.id));
                    }}
                  >
                    {chrome.groups[group.id] || group.label}
                    <ChevronDown aria-hidden="true" size={14} strokeWidth={1.9} />
                  </button>
                ) : (
                  <span className="psn-trigger is-static">{chrome.groups[group.id] || group.label}</span>
                )}

                {hasItems && (
                  <div id={`psn-panel-${group.id}`} className={`psn-panel${isOpen ? ' is-open' : ''}${group.items.length > 5 ? ' is-wide' : ''}`}>
                    <div className="psn-panel-inner">
                      <p className="psn-panel-label">{chrome.groups[group.id] || group.label}</p>
                      {/* More than five entries flow into a second column, five rows each. */}
                      <div
                        className={`psn-items${group.items.length > 5 ? ' psn-items--two' : ''}`}
                        style={group.items.length > 5 ? { gridTemplateRows: `repeat(${Math.ceil(group.items.length / 2)}, auto)` } : undefined}
                      >
                        {group.items.map((item) => (
                          <Link className="psn-item" to={withLanguage(item.to, language)} key={item.to} onClick={closeAll}>
                            <span>
                              <strong>{chrome.items[item.to]?.title || item.title}</strong>
                              <small>{chrome.items[item.to]?.note || item.note}</small>
                            </span>
                            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.7} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="psn-actions">
          <div
            className="psn-lang"
            onMouseEnter={() => { clearTimer(); setOpenMenu('language'); }}
            onMouseLeave={scheduleClose}
          >
            <button
              className="psn-lang-trigger"
              type="button"
              aria-label="Choose language"
              aria-expanded={openMenu === 'language'}
              aria-haspopup="listbox"
              onClick={() => {
                clearTimer();
                setOpenMenu((current) => (current === 'language' ? null : 'language'));
              }}
            >
              <LanguageGlobe aria-hidden="true" size={19} strokeWidth={1.7} />
              <ChevronDown aria-hidden="true" size={12} strokeWidth={1.9} />
            </button>
            <div className={`psn-lang-menu${openMenu === 'language' ? ' is-open' : ''}`} role="listbox" aria-label="Choose language">
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={language === item.code}
                  className={language === item.code ? 'is-selected' : ''}
                  onClick={() => selectLanguage(item.code)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

                    {!user && (
            <div className="psn-signin-wrap" ref={signInRef}>
              <button
                type="button"
                className={`psn-signin${signInOpen ? ' is-open' : ''}`}
                aria-expanded={signInOpen}
                aria-haspopup="menu"
                onClick={() => setSignInOpen((open) => !open)}
              >
                {chrome.header.signIn}
                <ChevronDown aria-hidden="true" size={12} strokeWidth={1.9} />
              </button>
              {signInOpen && (
                <div className="psn-signin-menu" role="menu">
                  <Link role="menuitem" to={withLanguage('/login', language)} onClick={() => setSignInOpen(false)}>
                    <span className="psn-signin-avatar" aria-hidden="true">
                      <CircleUserRound size={18} strokeWidth={1.6} />
                    </span>
                    <span className="psn-signin-text">
                      <span className="psn-signin-title">{signInCopy.participant}</span>
                      <span className="psn-signin-desc">{signInCopy.participantHint}</span>
                    </span>
                    <ArrowUpRight className="psn-signin-arrow" aria-hidden="true" size={14} strokeWidth={1.7} />
                  </Link>
                  <Link role="menuitem" className="is-research" to={withLanguage('/business/login', language)} onClick={() => setSignInOpen(false)}>
                    <span className="psn-signin-avatar" aria-hidden="true">
                      <BriefcaseBusiness size={18} strokeWidth={1.6} />
                    </span>
                    <span className="psn-signin-text">
                      <span className="psn-signin-title">{signInCopy.researcher}</span>
                      <span className="psn-signin-desc">{signInCopy.researcherHint}</span>
                    </span>
                    <ArrowUpRight className="psn-signin-arrow" aria-hidden="true" size={14} strokeWidth={1.7} />
                  </Link>
                </div>
              )}
            </div>
          )}
          <Link className="psn-cta" to={workspaceHref}>
            {ctaLabel}
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
          </Link>
          <button
            className="psn-burger"
            type="button"
            aria-label={mobileOpen ? chrome.header.menuClose : chrome.header.menuOpen}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Utility strip under the bar: one dark rule with the two service links
          on the right. It is not a second navigation — the five groups stay in
          the black bar above. */}
      <div className="psn-strip">
        <div className="psn-strip-inner">
          {stripStart ? <div className="psn-strip-start">{stripStart}</div> : null}
          <Link className="psn-strip-link" to={withLanguage('/business/access', language)}>{chrome.header.contactSales}</Link>
          <Link className="psn-strip-link" to={withLanguage('/how-it-works', language)}>{chrome.header.helpCentre}</Link>
        </div>
      </div>

      <div className={`psn-mobile${mobileOpen ? ' is-open' : ''}`}>
        {publicNavigation.map((group) => (
          <div className="psn-mobile-group" key={group.id}>
            <p>{chrome.groups[group.id] || group.label}</p>
            {group.to ? (
            <Link to={withLanguage(group.to, language)} onClick={closeAll}>
              {chrome.groups[group.id] || group.label}
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.7} />
            </Link>
          ) : (group.items || []).length ? group.items.map((item) => (
              <Link key={item.to} to={withLanguage(item.to, language)} onClick={closeAll}>
                {chrome.items[item.to]?.title || item.title}
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.7} />
              </Link>
            )) : <span className="psn-mobile-empty">{'Coming soon'}</span>}
          </div>
        ))}
        <div className="psn-mobile-lang">
          <p>Language</p>
          <div role="listbox" aria-label="Choose language">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={language === item.code}
                className={language === item.code ? 'is-selected' : ''}
                onClick={() => selectLanguage(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

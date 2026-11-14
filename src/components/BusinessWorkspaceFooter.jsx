import { ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, withLanguage } from './LanguageContext';
import { pick } from '../content/projectStatus';
import './BusinessWorkspaceFooter.css';

/* Legal footer for the research workspace. Dark, one row: copyright and the
   four documents a researcher actually needs on this side, the cookie
   preference re-opener, then the contact CTA and back-to-top. The legal
   entries are the existing PDF routes, not new pages. */
export default function BusinessWorkspaceFooter() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const links = [
    { label: pick(language, '研究服务条款', 'Research terms', '研究服務條款'), to: '/business/terms' },
    { label: pick(language, '隐私政策', 'Privacy policy', '隱私政策'), to: '/privacy' },
    { label: pick(language, '使用条款', 'Terms of service', '使用條款'), to: '/terms' },
    { label: pick(language, '可接受使用', 'Acceptable use', '可接受使用'), to: '/legal/acceptable-use' },
  ];

  const openCookieSettings = (event) => {
    event.preventDefault();
    if (typeof window === 'undefined') return;
    if (typeof window.CookieConsent?.showPreferences === 'function') {
      window.CookieConsent.showPreferences();
      return;
    }
    if (typeof window.Cookiebot?.renew === 'function') window.Cookiebot.renew();
  };

  return (
    <footer className="business-workspace-footer">
      <div className="business-workspace-footer-inner">
        <div className="business-workspace-footer-legal">
          <span className="business-workspace-footer-copy">
            © {new Date().getFullYear()} GuanyiSearch. {pick(language, '保留所有权利。', 'All rights reserved.', '保留所有權利。')}
          </span>
          <nav className="business-workspace-footer-links" aria-label={pick(language, '法务', 'Legal', '法務')}>
            {links.map((link) => (
              <button key={link.to} type="button" onClick={() => navigate(withLanguage(link.to, language))}>{link.label}</button>
            ))}
            <button type="button" onClick={openCookieSettings}>{pick(language, 'Cookie 设置', 'Cookie settings', 'Cookie 設定')}</button>
          </nav>
        </div>
        <div className="business-workspace-footer-actions">
          <button type="button" className="business-workspace-footer-contact" onClick={() => navigate(withLanguage('/business/access', language))}>
            {pick(language, '联系我们', 'Contact us', '聯絡我們')}
          </button>
          <button
            type="button"
            className="business-workspace-footer-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={pick(language, '回到顶部', 'Back to top', '回到頂部')}
          >
            <ArrowUp size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

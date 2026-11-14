import { ArrowUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { pick } from '../content/projectStatus';
import './BusinessWorkspaceFooter.css';

/* Legal footer for the research workspace. Dark, one row: copyright and the
   four documents a researcher actually needs on this side, the cookie
   preference re-opener, then the contact CTA and back-to-top. The legal
   entries are the existing PDF routes, not new pages. */
export default function BusinessWorkspaceFooter() {
  const { language } = useLanguage();
  const zh = /^zh/i.test(language || '');

  /* Each entry is the PDF itself, opened in a new tab: the workspace keeps its
     state, and there is no SPA history entry that comes back blank. */
  const links = [
    { label: pick(language, '研究服务条款', 'Research terms', '研究服務條款'), pdf: zh ? '/legal/guanyisearch-research-terms-2026-09-zh.pdf' : '/legal/guanyisearch-research-terms-2026-09-en.pdf' },
    { label: pick(language, '隐私政策', 'Privacy policy', '隱私政策'), pdf: zh ? '/legal/guanyisearch-privacy-2026-09-zh.pdf' : '/legal/guanyisearch-privacy-2026-09-en.pdf' },
    { label: pick(language, '使用条款', 'Terms of service', '使用條款'), pdf: zh ? '/legal/guanyisearch-terms-of-service-2026-09-zh.pdf' : '/legal/guanyisearch-terms-of-service-2026-09-en.pdf' },
    { label: pick(language, '可接受使用', 'Acceptable use', '可接受使用'), pdf: zh ? '/legal/guanyisearch-acceptable-use-2026-09-zh.pdf' : '/legal/guanyisearch-acceptable-use-2026-09-en.pdf' },
  ];

  return (
    <footer className="business-workspace-footer">
      <div className="business-workspace-footer-inner">
        <div className="business-workspace-footer-legal">
          <span className="business-workspace-footer-copy">
            © {new Date().getFullYear()} GuanyiSearch. {pick(language, '保留所有权利。', 'All rights reserved.', '保留所有權利。')}
          </span>
          <nav className="business-workspace-footer-links" aria-label={pick(language, '法务', 'Legal', '法務')}>
            {links.map((link) => (
              <a key={link.pdf} href={link.pdf} target="_blank" rel="noopener noreferrer">{link.label}</a>
            ))}
          </nav>
        </div>
        <div className="business-workspace-footer-actions">
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

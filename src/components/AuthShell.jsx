import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage, withLanguage } from './LanguageContext';
import '../pages/JoinAccess.css';

/* The chrome shared by the entry pages: dimmed photograph, way back, the
   wordmark, and one white card. The card's own contents differ. */
export default function AuthShell({ children, footer = null, cardClassName = '' }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isCjk = /^(zh|ja|ko)/i.test(language || '');

  return (
    <main className="join-screen">
      <img className="join-screen-bg" src="/access-bg.jpg" alt="" aria-hidden="true" />
      <div className="join-screen-veil" aria-hidden="true" />
      <button
        type="button"
        className="join-back"
        aria-label={isCjk ? '返回' : 'Back'}
        onClick={() => { if (window.history.length > 1) navigate(-1); else navigate(withLanguage('/', language)); }}
      >
        <ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <Link className="join-brand" to={withLanguage('/', language)} aria-label="guanyisearch">
        <img src="/guanyisearch-wordmark.png" alt="guanyisearch" />
      </Link>
      <section className={`join-card ${cardClassName}`.trim()}>{children}</section>
      {footer}
    </main>
  );
}

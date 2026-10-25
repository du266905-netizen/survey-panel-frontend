import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from './LanguageContext';
import './AuthTopBar.css';

/* The only chrome on the account pages (2026-10-26).

   The owner asked for the full navigation to go: a mark at the left, a way
   back at the right, nothing else. Both the participant and the research entry
   pages use this bar so the two stay identical. */
export default function AuthTopBar({ backLabel = 'Back' }) {
  const { language } = useLanguage();
  return (
    <div className="auth-topbar">
      <Link className="auth-topbar-brand" to={withLanguage('/', language)} aria-label="GuanyiSearch home">
        <img src="/guanyisearch-wordmark.png" alt="" width="178" height="27" />
      </Link>
      <Link className="auth-topbar-back" to={withLanguage('/', language)}>
        {backLabel}
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}

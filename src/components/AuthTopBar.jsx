import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import LanguageGlobe from './LanguageGlobe';
import { useLanguage, withLanguage } from './LanguageContext';
import './AuthTopBar.css';

/* The only chrome on the account pages (2026-10-26).

   The full navigation is gone: a wordmark at the left, a language picker at
   the right edge of the white column, and a way back at the far right. Both the
   participant and the research entry pages use this bar, so the two stay
   identical. */
export default function AuthTopBar({ backLabel = 'Back' }) {
  const { language, languages, navigateToLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="auth-topbar">
        <Link className="auth-topbar-brand" to={withLanguage('/', language)} aria-label="GuanyiSearch home">
          <img src="/guanyisearch-wordmark.png" alt="" width="178" height="27" />
        </Link>
        <div className={`auth-topbar-lang${open ? ' is-open' : ''}`}>
          <button
            type="button"
            className="auth-lang-trigger"
            aria-label="Choose language"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            <LanguageGlobe aria-hidden="true" size={19} strokeWidth={1.7} />
            <ChevronDown aria-hidden="true" size={11} strokeWidth={1.9} />
          </button>
          {open && (
            <div className="auth-lang-menu" role="listbox" aria-label="Choose language">
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={language === item.code}
                  className={language === item.code ? 'is-selected' : ''}
                  onClick={() => { setOpen(false); navigateToLanguage(item.code); }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Link className="auth-topbar-back" to={withLanguage('/', language)}>
        {backLabel}
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </>
  );
}

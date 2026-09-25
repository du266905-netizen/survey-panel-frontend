import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import LanguageGlobe from './LanguageGlobe';

const flagByLanguage = {
  'en-US': '🇺🇸', 'en-GB': '🇬🇧', 'zh-Hant': '🇹🇼', 'zh-CN': '🇨🇳',
  de: '🇩🇪', fr: '🇫🇷', nl: '🇳🇱', da: '🇩🇰', es: '🇪🇸', fi: '🇫🇮',
  it: '🇮🇹', ja: '🇯🇵', ko: '🇰🇷', no: '🇳🇴', pt: '🇵🇹', ru: '🇷🇺',
  sv: '🇸🇪', tr: '🇹🇷',
};

export default function BusinessLanguagePicker() {
  const { activeLanguage, language, languages, navigateToLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const closeWhenLeaving = (event) => {
      if (!pickerRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', closeWhenLeaving);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeWhenLeaving);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const selectLanguage = (code) => {
    setOpen(false);
    navigateToLanguage(code);
  };

  return <div className="business-language-picker" ref={pickerRef}>
    <button type="button" title="Choose language" aria-label="Choose language" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((current) => !current)}>
      <LanguageGlobe size={19} strokeWidth={1.8} aria-hidden="true" />
      <span>{activeLanguage.shortLabel}</span>
      <ChevronDown className={open ? 'is-open' : ''} size={13} aria-hidden="true" />
    </button>
    {open && <div className="business-language-picker-menu" role="listbox" aria-label="Choose language">
      <p>Language</p>
      <div>
        {languages.map((item) => <button key={item.code} type="button" role="option" aria-selected={language === item.code} className={language === item.code ? 'is-selected' : ''} onClick={() => selectLanguage(item.code)}><span className="business-language-flag" aria-hidden="true">{flagByLanguage[item.code] || '🌐'}</span><span>{item.label}</span></button>)}
      </div>
    </div>}
  </div>;
}

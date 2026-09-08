import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_STORAGE_KEY = 'guanyisearch-language';

export const languages = [
  { code: 'en-US', label: 'English (US)', shortLabel: 'EN-US' },
  { code: 'en-GB', label: 'English (UK)', shortLabel: 'EN-GB' },
  { code: 'zh-Hant', label: '中文（繁體）', shortLabel: '繁中' },
  { code: 'zh-CN', label: '中文（简体）', shortLabel: '简中' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE' },
  { code: 'fr', label: 'Français', shortLabel: 'FR' },
  { code: 'nl', label: 'Nederlands', shortLabel: 'NL' },
  { code: 'da', label: 'Dansk', shortLabel: 'DA' },
  { code: 'es', label: 'Español', shortLabel: 'ES' },
  { code: 'fi', label: 'Suomi', shortLabel: 'FI' },
  { code: 'it', label: 'Italiano', shortLabel: 'IT' },
  { code: 'ja', label: '日本語', shortLabel: 'JA' },
  { code: 'ko', label: '한국어', shortLabel: 'KO' },
  { code: 'no', label: 'Norsk', shortLabel: 'NO' },
  { code: 'pt', label: 'Português', shortLabel: 'PT' },
  { code: 'ru', label: 'Русский', shortLabel: 'RU' },
  { code: 'sv', label: 'Svenska', shortLabel: 'SV' },
  { code: 'tr', label: 'Türkçe', shortLabel: 'TR' },
];

const LanguageContext = createContext(null);

function getInitialLanguage() {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return languages.some((language) => language.code === saved) ? saved : 'en-US';
  } catch {
    return 'en-US';
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    const activeLanguage = languages.find((item) => item.code === language) || languages[0];
    document.documentElement.lang = activeLanguage.code;
    document.documentElement.dataset.language = activeLanguage.code;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLanguage.code);
    } catch {
      // A private browsing setting can block storage; the current-session choice still works.
    }
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    languages,
    activeLanguage: languages.find((item) => item.code === language) || languages[0],
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

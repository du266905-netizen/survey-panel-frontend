import { useEffect } from 'react';
import { useLanguage } from '../components/LanguageContext';

/* 2026-11-12: the legal pages were removed. Old links (footer, sign-in terms,
   bookmarks) land here and go straight to the PDF in the visitor's language. */
export default function LegalPdfRedirect({ en, zh }) {
  const { language } = useLanguage();
  useEffect(() => {
    window.location.replace(/^zh/i.test(language || '') ? zh : en);
  }, [language, en, zh]);
  return null;
}

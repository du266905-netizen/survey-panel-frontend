import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import LanguageGlobe from './LanguageGlobe';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function BusinessLanguagePicker() {
  const { activeLanguage, language, languages, navigateToLanguage, publicCopy } = useLanguage();
  // Copy that used to be hardcoded English in this file now comes from the
  // language library, keyed by language.
  const workspaceStaticMap = publicCopy?.workspace?.business?.workspaceStatic || {};
  const ws = workspaceStaticMap[language] || workspaceStaticMap['en-GB'] || {};
  const [open, setOpen] = useState(false);

  const selectLanguage = (code) => {
    setOpen(false);
    navigateToLanguage(code);
  };
  const languageTitle = {
    'zh-CN': '语言', 'zh-Hant': '語言', de: 'Sprache', fr: 'Langue', es: 'Idioma', it: 'Lingua',
    nl: 'Taal', da: 'Sprog', fi: 'Kieli', no: 'Språk', pt: 'Idioma', ru: 'Язык', sv: 'Språk',
    tr: 'Dil', ko: '언어', ja: '言語',
  }[language] || ws.picker.languageTitle;

  return <div className="business-language-picker">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" title={ws.picker.chooseLanguage} aria-label={ws.picker.chooseLanguage} aria-haspopup="listbox">
          <LanguageGlobe size={19} strokeWidth={1.8} aria-hidden="true" />
          <span>{activeLanguage.shortLabel}</span>
          <ChevronDown className={open ? 'is-open' : ''} size={13} aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52 p-2" role="listbox" aria-label={ws.picker.chooseLanguage}>
        <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8D948D]">{languageTitle}</p>
        <div className="grid gap-0.5">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={language === item.code}
              onClick={() => selectLanguage(item.code)}
              className={`flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent ${language === item.code ? 'bg-accent font-medium' : ''}`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  </div>
}

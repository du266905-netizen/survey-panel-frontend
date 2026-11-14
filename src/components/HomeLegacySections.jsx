import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalGlobe from './GlobalGlobe';
import brandMarkLight from '../assets/home/guanyi-brand-mark-light.png';
import { footerIdentityTranslations, globalTranslations, navigationLabels } from '../constants/homepageTranslations';
import { publicNavigation } from '../constants/publicNavigation';
import { solutionNavCopy } from '../constants/solutionNavCopy';
import { useLanguage, withLanguage } from './LanguageContext';
import LanguageGlobe from './LanguageGlobe';
import AtlasTypewriter from './AtlasTypewriter';
import NewsletterForm from './NewsletterForm';
import './HomeLegacySections.css';

function buildFooterColumns(publicCopy, language) {
  const chrome = publicCopy?.chrome || {};
  const groups = chrome.groups || {};
  const items = chrome.items || {};
  const group = (id) => publicNavigation.find((entry) => entry.id === id);
  const local = solutionNavCopy[language] || {};
  const zh = /^zh/i.test(language || '');
  const zhHant = /^zh-hant/i.test(language || '');
  const t = (cn, hant, en) => (zhHant ? hant : zh ? cn : en);
  const link = (item) => (item.pdf
    ? { label: items[item.id]?.title || (zh ? item.titleZh : null) || item.title, to: zh ? item.pdf.zh : item.pdf.en, external: true }
    : { label: item.label || items[item.id]?.title || items[item.to]?.title || local[item.id]?.title || local[item.to]?.title || item.title, to: item.to });
  const allItems = (groupId) => {
    const entry = group(groupId);
    if (!entry) return [];
    return entry.sections ? entry.sections.flatMap((section) => section.items) : (entry.items || []);
  };
  const find = (groupId, path) => allItems(groupId).find((item) => item.to === path);
  const label = (path, fallback) => items[path]?.title || fallback;
  /* 2026-11-12: five columns, five links at most each. The footer is a fallback,
     not a site map — full lists stay in the header. */
  return [
    {
      id: 'company',
      label: local.__company || groups.about || 'Company',
      blocks: [{
        links: [
          { label: label('/about', 'About us'), to: '/about' },
          { label: local.__jobSearch || 'Search jobs', to: '/careers' },
          { label: t('接触', '接觸', 'Contact'), to: '/business/access' },
        ],
      }],
    },
    {
      id: 'solutions',
      label: groups.solutions || 'Solutions',
      blocks: [{
        links: [
          find('solutions', '/solutions/market-entry'),
          find('solutions', '/china-market-insights'),
          find('solutions', '/solutions/audience'),
          find('solutions', '/solutions/product-pricing'),
          find('solutions', '/solutions/brand-comms'),
          find('solutions', '/solutions/channel-retail'),
        ].filter(Boolean).map(link),
      }],
    },
    {
      id: 'services',
      label: t('服务', '服務', 'Services'),
      blocks: [{
        links: [
          { label: t('在线研究', '線上研究', 'Online research'), to: '/business/register' },
          find('solutions', '/solutions/quantitative'),
          find('solutions', '/solutions/qualitative'),
          find('solutions', '/solutions/mixed'),
          { label: t('人工智能助手', '人工智慧助手', 'AI assistant'), to: '/business/register' },
        ].filter(Boolean).map(link),
      }],
    },
    {
      id: 'participants',
      label: groups.participants || 'Participants',
      blocks: [{
        links: [
          find('participants', '/register'),
          find('participants', '/partners'),
          { label: t('帮助', '幫助', 'Help'), to: '/contact' },
        ].filter(Boolean).map(link),
      }],
    },
    {
      id: 'support',
      label: groups.support || 'Support',
      blocks: [{ links: (group('support')?.items || []).map(link) }],
    },
  ];
}

const socialLinks = [
  { id: 'x', label: 'X / Twitter', href: 'https://x.com/GUANYISEARCH' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/guanyisearch/' },
];

const languageLabel = { 'zh-CN': '语言', 'zh-Hant': '語言', ja: '言語', ko: '언어', de: 'Sprache', fr: 'Langue', es: 'Idioma', it: 'Lingua', pt: 'Idioma', ru: 'Язык', tr: 'Dil', nl: 'Taal', da: 'Sprog', fi: 'Kieli', no: 'Språk', sv: 'Språk' };

const footerIdentity = {
  'en-US': {
    title: 'About GuanyiSearch',
    description: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
  },
  'en-GB': {
    title: 'About GuanyiSearch',
    description: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
  },
  'zh-CN': {
    title: '关于 GuanyiSearch',
    description: '我们是一家跨区域的信息洞察研究公司，致力于打造开放、共生、可持续的生态社区。我们连接参与者、研究发起人与组织，围绕商业、文化、日常生活与公共议题，让真实的声音转化为清晰的判断——为更好的决策，也为更好的世界。',
  },
  'zh-Hant': {
    title: '關於 GuanyiSearch',
    description: '我們是一家跨區域的資訊洞察研究公司，致力於打造開放、共生、可持續的生態社區。我們連結參與者、研究發起人與組織，圍繞商業、文化、日常生活與公共議題，讓真實的聲音轉化為清晰的判斷——為更好的決策，也為更好的世界。',
  },
};

function SocialGlyph({ id }) {
  if (id === 'linkedin') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.15 7.25A2.6 2.6 0 1 1 5.18 2a2.6 2.6 0 0 1-.03 5.25ZM2.78 22V9.22h4.78V22H2.78Zm7.12 0V9.22h4.58v1.75h.06c.64-1.12 2.08-2.14 4.17-2.14 4.1 0 5.02 2.7 5.02 6.2V22h-4.78v-6.25c0-1.5-.03-3.43-2.1-3.43-2.1 0-2.18 1.67-2.18 3.34V22H9.9Z" /></svg>;
  }

  if (id === 'whatsapp') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a9.5 9.5 0 0 0-8.13 14.4L2.7 21.3l5.04-1.13A9.5 9.5 0 1 0 12 2Zm0 17.34a7.8 7.8 0 0 1-3.98-1.09l-.29-.17-2.99.67.72-2.9-.19-.3A7.81 7.81 0 1 1 12 19.34Zm4.28-5.85c-.23-.12-1.37-.68-1.58-.76-.21-.08-.36-.12-.51.12-.15.23-.59.76-.72.91-.13.15-.26.17-.49.06-1.34-.67-2.22-1.2-3.1-2.72-.23-.4.23-.37.67-1.23.08-.17.04-.31-.02-.43-.06-.11-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39h-.43c-.15 0-.39.06-.59.29-.2.23-.77.75-.77 1.83s.79 2.12.9 2.27c.11.15 1.56 2.38 3.78 3.34.53.23.94.36 1.26.46.53.17 1.01.15 1.39.09.42-.06 1.37-.56 1.56-1.1.19-.54.19-1 .13-1.1-.05-.09-.2-.15-.43-.26Z" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" /></svg>;
}

function ManifestoSprout() {
  return (
    <div className="home-continuation-sprout" aria-hidden="true">
      <svg viewBox="0 0 220 220" fill="none">
        <circle className="home-sprout-sun" cx="155" cy="67" r="41" />
        <path className="home-sprout-line home-sprout-ground" d="M34 173c27-10 111-10 148 0" />
        <path className="home-sprout-line home-sprout-stem" d="M104 170c2-28 3-56-2-86" />
        <path className="home-sprout-leaf home-sprout-leaf-left" d="M101 116C71 108 57 84 64 58c28 4 44 25 38 58Z" />
        <path className="home-sprout-leaf home-sprout-leaf-right" d="M105 92c12-29 36-42 65-31-5 30-29 45-65 31Z" />
        <path className="home-sprout-line home-sprout-vein-left" d="M99 112 69 66" />
        <path className="home-sprout-line home-sprout-vein-right" d="m109 89 53-23" />
        <path className="home-sprout-line home-sprout-root" d="M104 169c-14-1-25 3-34 10M105 169c12 0 24 4 35 10" />
      </svg>
    </div>
  );
}

export function HumanManifesto({ headingLevel = 'h1' }) {
  const { publicCopy } = useLanguage();
  const copy = publicCopy.approach;
  const Heading = headingLevel;
  return (
    <section id="human-manifesto" className="home-manifesto" aria-labelledby="home-manifesto-title">
      <div className="home-continuation-container">
        <div className="home-manifesto-masthead">
          <div>
            <p className="home-section-label">{copy.principle}</p>
            <Heading id="home-manifesto-title">{copy.title}</Heading>
            <p className="home-manifesto-deck">{copy.deck}</p>
          </div>
          <div className="home-manifesto-mark"><ManifestoSprout /><div><strong>{copy.mark[0]}<br />{copy.mark[1]}</strong><p>{copy.markBody}</p></div></div>
        </div>

        <div className="home-manifesto-spread">
          <figure className="home-manifesto-art"><img src="/human-manifesto/shoreline-painting.jpg" alt={copy.imageAlt} loading="lazy" decoding="async" /><figcaption><strong>{copy.imageCaption}</strong></figcaption></figure>
          <div className="home-manifesto-copy">
            <p className="home-manifesto-lede">{copy.lede}</p>
            <div className="home-manifesto-card-grid"><article className="home-manifesto-card home-manifesto-card--voices"><span>{copy.voices}</span><p>{copy.voicesBody}</p></article><article className="home-manifesto-card home-manifesto-card--technology"><span>{copy.technology}</span><p>{copy.technologyBody}</p></article></div>
            <p className="home-manifesto-principle"><span>{copy.principleLabel}</span>{copy.principleBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFooter() {
  const { language, languages, navigateToLanguage, publicCopy } = useLanguage();
  /* 2026-11-12: two quiet interactions — the link underline sweeps in, and the
     page offers a way back up once you are past the first screen. */
  const navRef = useRef(null);
  const langRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const [desktop, setDesktop] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShowTop(window.scrollY > 600);
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    if (!langOpen) return undefined;
    const onDown = (event) => { if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false); };
    const onKey = (event) => { if (event.key === 'Escape') setLangOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [langOpen]);

  const copy = publicCopy.home.footer;
  const tr = (cn, hant, en) => (/^zh-hant/i.test(language || '') ? hant : /^zh/i.test(language || '') ? cn : en);
  const identity = footerIdentity[language] || { title: copy.about, description: copy.description };
  const footerColumns = buildFooterColumns(publicCopy, language);
  const cookieSettingsLabel = {
    'zh-CN': 'Cookie 设置',
    'zh-Hant': 'Cookie 設定',
    'en-US': 'Cookie settings',
    'en-GB': 'Cookie settings',
    de: 'Cookie-Einstellungen',
    fr: 'Paramètres des cookies',
    nl: 'Cookie-instellingen',
    da: 'Cookieindstillinger',
    es: 'Configuración de cookies',
    fi: 'Evästeasetukset',
    it: 'Impostazioni dei cookie',
    ja: 'Cookie 設定',
    ko: '쿠키 설정',
    no: 'Innstillinger for informasjonskapsler',
    pt: 'Definições de cookies',
    ru: 'Настройки cookie',
    sv: 'Cookieinställningar',
    tr: 'Çerez ayarları',
  }[language] || 'Cookie settings';
  const openCookieSettings = (event) => {
    event.preventDefault();
    if (typeof window === 'undefined') return;
    if (typeof window.CookieConsent?.showPreferences === 'function') {
      window.CookieConsent.showPreferences();
      return;
    }
    if (typeof window.Cookiebot?.renew === 'function') {
      window.Cookiebot.renew();
    }
  };
  return (
    <footer className="home-footer">
      <div className="home-continuation-container home-footer-main">
        <div className="home-footer-brand">
          <div className="home-footer-topline">
            <img className="home-footer-wordmark" src="/guanyisearch-wordmark.png" alt="GuanyiSearch" />
            <div className="home-footer-quick">
              <nav className="home-social-links" aria-label="GuanyiSearch social links">{socialLinks.map((social) => <a key={social.id} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}><SocialGlyph id={social.id} /></a>)}</nav>
              <div
                className="home-footer-lang psn-lang"
                ref={langRef}
                onMouseEnter={() => setLangOpen(true)}
                onMouseLeave={() => setLangOpen(false)}
              >
                <button
                  type="button"
                  className="psn-lang-trigger"
                  aria-label={languageLabel[language] || 'Choose language'}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  onClick={() => setLangOpen((open) => !open)}
                >
                  <LanguageGlobe size={19} strokeWidth={1.7} aria-hidden="true" />
                  <ChevronDown size={12} strokeWidth={1.9} aria-hidden="true" />
                </button>
                <div className={`psn-lang-menu${langOpen ? ' is-open' : ''}`} role="listbox" aria-label={languageLabel[language] || 'Language'}>
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      role="option"
                      aria-selected={item.code === language}
                      className={item.code === language ? 'is-selected' : ''}
                      onClick={() => { navigateToLanguage(item.code); setLangOpen(false); }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="home-footer-intro">{identity.description}</p>
        </div>
        <nav ref={navRef} className="home-footer-nav" aria-label="Footer navigation">{footerColumns.map((column, columnIndex) => <details key={column.id} className="home-footer-group" open={desktop || undefined}><summary>{column.label}<ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" /></summary>{column.blocks.map((block, index) => <div className="home-footer-block" key={block.label || index}>{block.label && <p className="home-footer-sublabel">{block.label}</p>}{block.links.map((item) => (item.external ? <a key={item.to} href={item.to} target="_blank" rel="noopener noreferrer">{item.label}</a> : <Link key={item.to} to={withLanguage(item.to, language)}>{item.label}</Link>))}</div>)}</details>)}</nav>
      </div>
      <div className="home-continuation-container home-footer-bottom">
        <div className="home-footer-legal">
          <p>{copy.rights}</p>
          <a href="#cookie-settings" onClick={openCookieSettings}>{cookieSettingsLabel}</a>
        </div>
        <button type="button" className={`home-footer-top${showTop ? ' is-on' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="回到顶部">
          <svg className="home-footer-top-ring" viewBox="0 0 36 36" aria-hidden="true">
            <circle className="home-footer-top-track" cx="18" cy="18" r="17" />
            <circle className="home-footer-top-bar" cx="18" cy="18" r="17" style={{ strokeDashoffset: 106.8 - 106.8 * progress }} />
          </svg>
          <span className="home-footer-top-arrow" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="13" height="13"><path d="M8 12V4.4M4.4 8 8 4.4 11.6 8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="home-footer-top-label">{tr('回到顶部', '回到頂部', 'Back to top')}</span>
        </button>
      </div>
    </footer>
  );
}

const globalBandCopy = {
  'en-US': {
    label: 'Global perspective',
    title: 'Cross-regional research.\nShared insight, shared growth.',
    body: 'Consumer behaviour, brands and culture move across borders. We connect research networks across Greater China, Asia-Pacific, the Middle East, Europe and North America—helping teams connect cross-regional opportunity with local action, and turn shared consumer signals into practical next steps for entry, collaboration and sustained growth.',
  },
  'en-GB': {
    label: 'Global perspective',
    title: 'Cross-regional research.\nShared insight, shared growth.',
    body: 'Consumer behaviour, brands and culture move across borders. We connect research networks across Greater China, Asia-Pacific, the Middle East, Europe and North America—helping teams connect cross-regional opportunity with local action, and turn shared consumer signals into practical next steps for entry, collaboration and sustained growth.',
  },
  'zh-CN': {
    label: '全球视野',
    title: '跨区域研究。\n共享洞察，共享增长。',
    body: '消费行为、品牌与文化跨越国界。我们连接大中华区、亚太、中东、欧洲与北美的研究网络，帮助团队把跨区域机会与本地行动连接起来，将共享的消费信号转化为进入市场、协作与持续增长的务实下一步。',
  },
  'zh-Hant': {
    label: '全球視野',
    title: '跨區域研究。\n共享洞察，共享增長。',
    body: '消費行為、品牌與文化跨越國界。我們連結大中華區、亞太、中東、歐洲與北美的研究網絡，幫助團隊把跨區域機會與本地行動連結起來，將共享的消費訊號轉化為進入市場、協作與持續增長的務實下一步。',
  },
};

export function HomeGlobalBand() {
  const { language } = useLanguage();
  const copy = globalBandCopy[language] || globalBandCopy['en-US'];
  /* CJK joins without a space; the newline in the title was a layout break, not
     a separator. */
  const isCjk = /^(zh|ja|ko)/i.test(language);
  const bandLead = copy.title.replace(/\n/g, isCjk ? '' : ' ').trim();
  const bandSeparator = isCjk ? '' : ' ';
  return (
    <section className="home-global-band" aria-label={copy.title.replace(/\n/g, ' ')}>
      {/* 2026-11-12: the paragraph is withdrawn for now — it is kept in
          globalBandCopy below for the next pass at this page. */}
      <div className="home-global-band-inner" aria-hidden="true" />
      {/* 2026-11-12: the globe as a faint horizon under the copy — Stripe's
          treatment, not a ball beside the text. It still turns. */}
      <div className="home-global-band-arc" aria-hidden="true">
        <div className="home-global-band-arc-globe"><GlobalGlobe tone="horizon" /></div>
      </div>
    </section>
  );
}

/* The dark closing band: typed line, two actions, newsletter card. The home
   page and About both use it; each passes its own pair of actions. */
export function HomeCommunityCta({
  copy,
  navigation,
  language,
  actions,
  id = 'community',
  ariaLabel = 'Join the community or run research with us',
  className = '',
}) {
  const items = actions || [
    { label: navigation.meetCommunity, to: '/join', primary: true, arrow: true },
    { label: navigation.runResearch, to: '/business/access', primary: false, arrow: true },
  ];
  return (
    <section className={`home-community-cta ${className}`.trim()} id={id} aria-label={ariaLabel}>
      <div className="home-community-cta-inner">
        <AtlasTypewriter begin={copy.begin} prompts={copy.prompts} />
        <div className="home-community-cta-actions">
          {items.map((item) => (
            <Link
              key={`${item.to}${item.label}`}
              className={`home-community-cta-button ${item.primary ? 'is-primary' : 'is-secondary'}`}
              to={withLanguage(item.to, language)}
            >
              {item.label}
              {item.arrow ? <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /> : null}
            </Link>
          ))}
        </div>
        <NewsletterForm language={language} />
      </div>
    </section>
  );
}

/* The withdrawn hero statement, set the way the careers and China pages set a
   passage: 38px, full measure, on paper. It sits under the rotating hero and
   the globe, independent of both — the carousel never touches it. */
export function HomeStatement() {
  const { language, publicCopy } = useLanguage();
  const hero = publicCopy.hero || {};
  const line = (hero.lines && hero.lines[0]) || '';
  const body = hero.description || '';
  if (!line && !body) return null;
  return (
    <section className="home-statement" aria-label={line || undefined}>
      <div className="home-statement-inner">
        <p className="home-statement-body">
          {line ? <strong className="home-statement-lead">{line}</strong> : null}
          {line && body ? ' ' : null}
          {body}
        </p>
      </div>
    </section>
  );
}

export default function HomeLegacySections({ afterGlobe = null }) {
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.home;
  return (
    <div className="home-continuation">
      <HomeStatement />
      <HomeGlobalBand />

      {/* Slot: the home page passes the sign-in chooser in here, after the
          globe. Keeping the import in the page avoids a provider cycle. */}
      {afterGlobe}

      <HomeCommunityCta copy={copy} navigation={publicCopy.navigation} language={language} />

      <HomeFooter />
    </div>
  );
}

import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalGlobe from './GlobalGlobe';
import Logo from './Logo';
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
  const sections = chrome.sections || {};
  const group = (id) => publicNavigation.find((entry) => entry.id === id);
  const local = solutionNavCopy[language] || {};
  const link = (item) => ({ label: items[item.id]?.title || items[item.to]?.title || local[item.id]?.title || local[item.to]?.title || item.title, to: item.to });
  const solutions = group('solutions');
  return [
    {
      label: groups.solutions || 'Solutions',
      blocks: (solutions?.sections || []).map((section) => ({
        label: sections[section.id] || section.label,
        links: section.items.map(link),
      })),
    },
    {
      label: groups.industries || 'Industries',
      blocks: [{ links: (group('industries')?.items || []).map(link) }],
    },
    {
      label: groups.participants || 'Participants',
      blocks: [{ links: (group('participants')?.items || []).map(link) }],
    },
    {
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
  const copy = publicCopy.home.footer;
  const identity = footerIdentity[language] || { title: copy.about, description: copy.description };
  const footerColumns = buildFooterColumns(publicCopy, language);
  const cookieSettingsLabel = language === 'zh-CN' ? 'Cookie 设置' : language === 'zh-Hant' ? 'Cookie 設定' : 'Cookie settings';
  const openCookieSettings = (event) => {
    event.preventDefault();
    if (typeof window !== 'undefined' && typeof window.Cookiebot?.renew === 'function') {
      window.Cookiebot.renew();
    }
  };
  return (
    <footer className="home-footer">
      <div className="home-continuation-container home-footer-main">
        <div className="home-footer-brand">
          <div className="home-footer-identity">
            <img className="home-footer-mark" src={brandMarkLight} alt="" aria-hidden="true" />
            <Logo size="lg" variant="light" className="home-footer-wordmark" />
          </div>
          <div className="home-footer-about"><p className="home-footer-about-title"><Link to={withLanguage('/about', language)}>{identity.title}</Link></p><p>{identity.description}</p></div>
          <nav className="home-social-links" aria-label="GuanyiSearch social links">{socialLinks.map((social) => <a key={social.id} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}><SocialGlyph id={social.id} /></a>)}</nav>
          <label className="home-footer-language"><LanguageGlobe size={20} strokeWidth={1.75} aria-hidden="true" /><span className="sr-only">{languageLabel[language] || 'Language'}</span><select value={language} onChange={(event) => navigateToLanguage(event.target.value)} aria-label={languageLabel[language] || 'Choose language'}>{languages.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select><ChevronDown size={17} strokeWidth={1.8} aria-hidden="true" /></label>
        </div>
        <nav className="home-footer-nav" aria-label="Footer navigation">{footerColumns.map((column) => <section key={column.label}><p>{column.label}</p>{column.blocks.map((block, index) => <div className="home-footer-block" key={block.label || index}>{block.label && <p className="home-footer-sublabel">{block.label}</p>}{block.links.map((item) => <Link key={item.to} to={withLanguage(item.to, language)}>{item.label}</Link>)}</div>)}</section>)}</nav>
      </div>
      <div className="home-continuation-container home-footer-bottom"><p>{copy.rights}</p><div><Link to={withLanguage('/privacy', language)}>{copy.privacyPolicy}</Link><Link to={withLanguage('/terms', language)}>{copy.termsService}</Link><a href="#cookie-settings" onClick={openCookieSettings}>{cookieSettingsLabel}</a></div></div>
    </footer>
  );
}

const globalContent = {
  en: {
    label: 'Cross-regional consumer research',
    title: 'Cross-regional research.\nShared insight, shared growth.',
    body: 'Consumer behaviour, brands and culture move across borders. We connect research networks across Greater China, Asia-Pacific, the Middle East, Europe and North America—helping teams connect cross-regional opportunity with local action, and turn shared consumer signals into practical next steps for entry, collaboration and sustained growth.',
  },
  'zh-CN': {
    label: '跨区域消费研究',
    title: '跨区域消费，让洞察共享，让发展共进。',
    body: '消费、品牌与文化不会止步于单一市场。我们连接大中华区、亚太、中东、欧洲与北美的研究网络，帮助团队将跨区域机会与本地行动连接起来，并把共享的消费信号转化为进入、协同与持续发展的下一步。',
  },
  'zh-Hant': {
    label: '跨區域消費研究',
    title: '跨區域消費，讓洞察共享，讓發展共進。',
    body: '消費、品牌與文化不會止步於單一市場。我們連結大中華區、亞太、中東、歐洲與北美的研究網絡，協助團隊把跨區域機會與在地行動連結起來，並把共享的消費訊號轉化為進入、協同與持續發展的下一步。',
  },
};

// the remaining languages live in constants/homepageTranslations.js
Object.assign(globalContent, globalTranslations);
Object.assign(footerIdentity, footerIdentityTranslations);

export function HomeGlobalSection() {
  const { language } = useLanguage();
  const copy = globalContent[language] || globalContent.en;

  return (
    <section className="home-global-section" aria-labelledby="home-global-title">
      <div className="home-continuation-container home-global-layout">
        <div className="home-global-visual"><div className="home-globe-frame"><GlobalGlobe /></div></div>
        <div className="home-global-copy"><h2 id="home-global-title">{copy.title}</h2><p>{copy.body}</p></div>
      </div>
    </section>
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
  return (
    <section className="home-global-band" aria-labelledby="home-global-band-title">
      <div className="home-global-band-inner">
        <div className="home-global-band-visual" aria-hidden="true"><GlobalGlobe tone="dark" /></div>
        <div className="home-global-band-copy">
          <h2 id="home-global-band-title">{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
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

export default function HomeLegacySections() {
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.home;
  return (
    <div className="home-continuation">
      <HomeGlobalBand />

      <HomeCommunityCta copy={copy} navigation={publicCopy.navigation} language={language} />

      <HomeFooter />
    </div>
  );
}

import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalGlobe from './GlobalGlobe';
import Logo from './Logo';
import { useLanguage, withLanguage } from './LanguageContext';
import LanguageGlobe from './LanguageGlobe';
import './HomeLegacySections.css';

function getFooterGroups(copy, marketCapabilityLabel) {
  return [
  {
    label: copy.about,
    links: [
      { label: copy.how, to: '/how-it-works' },
      { label: copy.approach, to: '/our-approach' },
    ],
  },
  {
    label: copy.explore,
    links: [
      { label: copy.news, to: '/news' },
    ],
  },
  {
    label: copy.participate,
    links: [
      { label: copy.surveys, to: '/partners' },
      { label: copy.wallet, to: '/wallet' },
      { label: copy.invite, to: '/referrals' },
    ],
  },
  {
    label: copy.organisations,
    links: [
      { label: copy.questionnaires, to: '/business' },
      { label: copy.studies, to: '/business' },
      { label: marketCapabilityLabel, to: '/china-market-insights' },
    ],
  },
  {
    label: copy.standards,
    links: [
      { label: copy.privacy, to: '/privacy' },
      { label: copy.terms, to: '/terms' },
    ],
  },
  ];
}

const socialLinks = [
  { id: 'x', label: 'X / Twitter', href: 'https://x.com/GUANYISEARCH' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/guanyisearch/' },
  { id: 'whatsapp', label: 'Join our community', href: 'https://whatsapp.com/channel/0029Vb8T5zhJf05W6ZZmi83F' },
];

const languageLabel = { 'zh-CN': '语言', 'zh-Hant': '語言', ja: '言語', ko: '언어', de: 'Sprache', fr: 'Langue', es: 'Idioma', it: 'Lingua', pt: 'Idioma', ru: 'Язык', tr: 'Dil', nl: 'Taal', da: 'Sprog', fi: 'Kieli', no: 'Språk', sv: 'Språk' };

const footerIdentity = {
  'en-US': {
    title: 'About GuanyiSearch',
    description: 'A consumer-insight collaboration network for decisions across markets. We connect participants, research initiators, and organisations around business, culture, everyday life, and public-interest questions—turning consented, thoughtfully screened local feedback into clearer decisions across regions.',
  },
  'en-GB': {
    title: 'About GuanyiSearch',
    description: 'A consumer-insight collaboration network for decisions across markets. We connect participants, research initiators, and organisations around business, culture, everyday life, and public-interest questions—turning consented, thoughtfully screened local feedback into clearer decisions across regions.',
  },
  'zh-CN': {
    title: '关于 GuanyiSearch',
    description: '我们是一个服务于跨区域经营决策的消费者洞察协作网络。我们连接参与者、研究发起人与组织，围绕商业、文化、日常生活与公共议题，将经过许可、审慎筛选的本地反馈转化为更清晰的跨区域判断。',
  },
  'zh-Hant': {
    title: '關於 GuanyiSearch',
    description: '我們是一個服務跨區域經營決策的消費者洞察協作網絡。我們連結參與者、研究發起人與組織，圍繞商業、文化、日常生活與公共議題，將經過許可、審慎篩選的在地回饋轉化為更清晰的跨區域判斷。',
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

function GiftSketch() {
  return (
    <div className="home-reward-sketch" aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none">
        <g className="home-gift-sparkles"><path d="M48 72v18M39 81h18M172 77v14M165 84h14" /><path d="m64 51 5 9 9 5-9 5-5 9-5-9-9-5 9-5 5-9Z" /></g>
        <path className="home-gift-fill" d="M65 94h94v58H65z" />
        <path className="home-sketch-line" d="M65 93h94v59H65zM111 94v58" />
        <g className="home-gift-lid"><path className="home-gift-lid-fill" d="M57 79h110v19H57z" /><path className="home-sketch-line" d="M57 79h110v19H57zM111 79v19" /><path className="home-sketch-line" d="M109 79c-19-2-31-13-28-25 16-2 27 6 30 25Zm4 0c19-2 31-13 28-25-16-2-27 6-30 25Z" /></g>
        <path className="home-sketch-line" d="M65 98h94M111 98v54" />
        <path className="home-gift-shadow" d="M50 160c31 8 88 8 120 0" />
      </svg>
    </div>
  );
}

function TokenSketch() {
  return (
    <div className="home-reward-sketch" aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none">
        <path className="home-token-orbit" d="M48 118c12-43 93-72 133-34 28 26-2 61-43 70" />
        <g className="home-token-dot"><circle cx="166" cy="69" r="8" /></g>
        <g className="home-token-coin"><ellipse className="home-token-fill" cx="111" cy="110" rx="43" ry="25" /><path className="home-sketch-line" d="M68 110v18c0 14 86 14 86 0v-18M68 110c0 14 86 14 86 0s-86-14-86 0Z" /><path className="home-sketch-line home-token-mark" d="M95 108h32M111 95v26" /></g>
      </svg>
    </div>
  );
}

function CartSketch() {
  return (
    <div className="home-reward-sketch" aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none">
        <g className="home-cart-breeze"><path d="M14 76h31c9 0 15 4 19 11" /><path d="M8 97h39c9 0 15 4 19 11" /><path d="M19 118h28c9 0 15 4 19 11" /></g>
        <g className="home-cart-motion"><circle className="home-cart-accent" cx="165" cy="61" r="25" /><path className="home-cart-line" d="M63 56h27c8 0 13 5 15 15l15 68c3 13 10 20 24 20h39c14 0 22-6 25-20l13-57H105" /><path className="home-cart-line" d="M108 139h76" /><path className="home-cart-line home-cart-handle" d="M42 56h21" /><g className="home-cart-wheel"><circle className="home-cart-line" cx="127" cy="177" r="13" /><path className="home-cart-spoke" d="M114 177h26M127 164v26" /></g><g className="home-cart-wheel home-cart-wheel-right"><circle className="home-cart-line" cx="181" cy="177" r="13" /><path className="home-cart-spoke" d="M168 177h26M181 164v26" /></g><path className="home-cart-ground" d="M83 187c36 5 90 5 126 0" /></g>
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
  const marketCapabilityLabel = language === 'zh-CN' ? '中国市场洞察能力' : language === 'zh-Hant' ? '中國市場洞察能力' : 'China market insights capability';
  const footerGroups = getFooterGroups(copy, marketCapabilityLabel);
  return (
    <footer className="home-footer">
      <div className="home-continuation-container home-footer-main">
        <div className="home-footer-brand">
          <div className="home-footer-identity"><Logo size="lg" variant="light" className="home-footer-wordmark" /></div>
          <div className="home-footer-about"><p className="home-footer-about-title">{identity.title}</p><p>{identity.description}</p></div>
          <nav className="home-social-links" aria-label="GuanyiSearch social links">{socialLinks.map((social) => <a key={social.id} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}><SocialGlyph id={social.id} /></a>)}</nav>
          <label className="home-footer-language"><LanguageGlobe size={20} strokeWidth={1.75} aria-hidden="true" /><span className="sr-only">{languageLabel[language] || 'Language'}</span><select value={language} onChange={(event) => navigateToLanguage(event.target.value)} aria-label={languageLabel[language] || 'Choose language'}>{languages.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select><ChevronDown size={17} strokeWidth={1.8} aria-hidden="true" /></label>
        </div>
        <nav className="home-footer-nav" aria-label="Footer navigation">{footerGroups.map((group) => <section key={group.label}><p>{group.label}</p>{group.links.map((item) => item.href ? <a key={item.label} href={item.href}>{item.label}</a> : <Link key={item.label} to={withLanguage(item.to, language)}>{item.label}</Link>)}</section>)}</nav>
      </div>
      <div className="home-continuation-container home-footer-bottom"><p>{copy.rights}</p><div><Link to={withLanguage('/privacy', language)}>{copy.privacyPolicy}</Link><Link to={withLanguage('/terms', language)}>{copy.termsService}</Link></div></div>
    </footer>
  );
}

const globalContent = {
  en: {
    label: 'Cross-regional consumer research',
    title: 'Cross-regional consumption. Shared insight, shared growth.',
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

export function HomeGlobalSection() {
  const { language } = useLanguage();
  const copy = globalContent[language] || globalContent.en;

  return (
    <section className="home-global-section" aria-labelledby="home-global-title">
      <div className="home-continuation-container home-global-layout">
        <div className="home-global-visual"><div className="home-globe-frame"><GlobalGlobe /></div></div>
        <div className="home-global-copy"><p className="home-section-label">{copy.label}</p><h2 id="home-global-title">{copy.title}</h2><p>{copy.body}</p></div>
      </div>
    </section>
  );
}

export default function HomeLegacySections() {
  const { publicCopy } = useLanguage();
  const copy = publicCopy.home;
  return (
    <div className="home-continuation">
      <section className="home-rewards-section" aria-labelledby="home-rewards-title">
        <div className="home-continuation-container home-rewards-layout">
          <div className="home-rewards-heading"><p className="home-section-label">{copy.rewardsLabel}</p><h2 id="home-rewards-title">{copy.rewardsTitle}</h2><p>{copy.rewardsBody}</p></div>
          <div className="home-reward-grid">
            <article className="home-reward-card home-reward-gift"><GiftSketch /><div><span>{copy.rewardCards[0][0]}</span><h3>{copy.rewardCards[0][1]}</h3><p>{copy.rewardCards[0][2]}</p></div></article>
            <article className="home-reward-card home-reward-token"><TokenSketch /><div><span>{copy.rewardCards[1][0]}</span><h3>{copy.rewardCards[1][1]}</h3><p>{copy.rewardCards[1][2]}</p></div></article>
            <article className="home-reward-card home-reward-panel"><CartSketch /><div><span>{copy.rewardCards[2][0]}</span><h3>{copy.rewardCards[2][1]}</h3><p>{copy.rewardCards[2][2]}</p></div></article>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}

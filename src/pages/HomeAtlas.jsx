import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeLegacySections from '../components/HomeLegacySections';
import { useLanguage } from '../components/LanguageContext';
import PublicSiteHeader from '../components/PublicSiteHeader';
import HomeHeroCarousel from '../components/HomeHeroCarousel';
import HomeChoiceSection from '../components/HomeChoiceSection';
import HeroRotationToggle from '../components/HeroRotationToggle';
import communityIllustration from '../assets/home/community-illustration.png';
import businessHandshake from '../assets/illustrations/business-handshake.jpg';
import newsWallIllustration from '../assets/home/news-wall-illustration.png';
import surveyParticipationIllustration from '../assets/home/survey-participation-illustration.png';
import './HomeAtlas.css';


/* Homepage hero copy, one entry per frame. 2026-11-12: the owner set the two
   centred lines; English is the working translation until the copy is final. */
const HERO_COPY = {
  en: {
    one: { title: 'Beyond the obvious.', note: 'Every judgement grounded in evidence.' },
    two: { title: 'Every voice has its echo.', note: 'Ready to join us? Together we build an open, interconnected and sustainable research ecosystem.' },
  },
  'zh-CN': {
    one: { title: '不止于表象', note: '让每一次判断都有事实依据' },
    two: { title: '每一个声音，都有回响', note: '准备好加入我们了吗？一起构建开放、互联、可持续的研究生态。' },
  },
  'zh-Hant': {
    one: { title: '不止於表象', note: '讓每一次判斷都有事實依據' },
    two: { title: '每一個聲音，都有回響', note: '準備好加入我們了嗎？一起建構開放、互聯、可持續的研究生態。' },
  },
};

function heroFor(language) {
  const code = String(language || '').toLowerCase();
  if (/hant|tw|hk/.test(code)) return HERO_COPY['zh-Hant'];
  if (code.startsWith('zh')) return HERO_COPY['zh-CN'];
  return HERO_COPY.en;
}

function AtlasNode({ name, className, to, eyebrow, title, image, onActive, onInactive, soon = false }) {
  const content = (
    <>
      <span className="atlas-node-image">
        <img src={image} alt="" />
      </span>
      <span className="atlas-node-copy">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        {soon && <em>Coming soon</em>}
      </span>
    </>
  );

  if (!to) {
    return <article className={`atlas-node atlas-node--static ${className}`} aria-label={title}>{content}</article>;
  }

  return (
    <Link
      className={`atlas-node ${className}`}
      to={to}
      onMouseEnter={() => onActive(name)}
      onMouseLeave={onInactive}
      onFocus={() => onActive(name)}
      onBlur={onInactive}
    >
      {content}
    </Link>
  );
}

export default function HomeAtlas() {
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.home;
  const [heroStopped, setHeroStopped] = useState(false);
  const { hash } = useLocation();

  /* /access hands over one flag; the glide starts after the page has painted so
     the target has its final position. */
  useEffect(() => {
    let requested = false;
    try {
      requested = window.sessionStorage.getItem('gs:scroll-to-join') === '1';
      if (requested) window.sessionStorage.removeItem('gs:scroll-to-join');
    } catch { /* storage blocked */ }
    if (!requested) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => {
      document.getElementById('join')?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  const rotationLabel = heroStopped
    ? (publicCopy.chrome.header.playRotation || 'Play rotation')
    : (publicCopy.chrome.header.pauseRotation || 'Pause rotation');
  const hero = heroFor(language);
  return (
    <main className="home-atlas">
      <div className="home-atlas-frame" aria-hidden="true" />
      <PublicSiteHeader
        stripStart={(
          <HeroRotationToggle
            stopped={heroStopped}
            onToggle={() => setHeroStopped((stopped) => !stopped)}
            label={rotationLabel}
          />
        )}
      />

      {/* Photograph hero: two frames, both centred — 56px line, sans note, one
          white action. The account chooser moved to /access on 2026-10-25. */}
      <HomeHeroCarousel
        heroOne={hero.one}
        heroTwo={hero.two}
        learnMore={publicCopy.homeSlide.learnMore}
        communityLabel={publicCopy.navigation.meetCommunity}
        stopped={heroStopped}
      />

      <HomeLegacySections
        afterGlobe={(
          <div className="home-join-section" id="join">
            <HomeChoiceSection />
          </div>
        )}
      />
    </main>
  );
}

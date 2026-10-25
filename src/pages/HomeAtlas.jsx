import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeLegacySections from '../components/HomeLegacySections';
import { useLanguage } from '../components/LanguageContext';
import PublicSiteHeader from '../components/PublicSiteHeader';
import HomeHeroCarousel from '../components/HomeHeroCarousel';
import HeroRotationToggle from '../components/HeroRotationToggle';
import communityIllustration from '../assets/home/community-illustration.png';
import businessHandshake from '../assets/illustrations/business-handshake.jpg';
import newsWallIllustration from '../assets/home/news-wall-illustration.png';
import surveyParticipationIllustration from '../assets/home/survey-participation-illustration.png';
import './HomeAtlas.css';

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
  const rotationLabel = heroStopped
    ? (publicCopy.chrome.header.playRotation || 'Play rotation')
    : (publicCopy.chrome.header.pauseRotation || 'Pause rotation');
  const [heroLead, ...heroRest] = publicCopy.hero.lines;
  const heroLines = [heroLead, heroRest.join(['zh-CN', 'zh-Hant', 'ja', 'ko'].includes(language) ? '' : ' ')].filter(Boolean);
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

      {/* Photograph hero: statement bottom-left, one white action to its right.
          The account chooser that used to sit below the hero moved out to its
          own page (/access) on 2026-10-25; the home page no longer carries it. */}
      <HomeHeroCarousel
        lead={heroLines[0]}
        rest={heroLines[1]}
        body={publicCopy.hero.description}
        line={publicCopy.homeSlide.line}
        learnMore={publicCopy.homeSlide.learnMore}
        communityLabel={publicCopy.navigation.meetCommunity}
        stopped={heroStopped}
      />

      <HomeLegacySections />
    </main>
  );
}

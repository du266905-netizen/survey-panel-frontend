import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HomeLegacySections from '../components/HomeLegacySections';
import { useAuth } from '../components/AuthContext';
import PublicSiteHeader from '../components/PublicSiteHeader';
import communityIllustration from '../assets/home/community-illustration.png';
import listeningRoom from '../assets/home/listening-room.jpg';
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
    return <article className={`atlas-node atlas-node--static ${className}`} aria-label={`${title}. Coming soon.`}>{content}</article>;
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
  const { user } = useAuth();
  const [activeNode, setActiveNode] = useState('');

  return (
    <main className={`home-atlas ${activeNode ? `is-${activeNode}` : ''}`}>
      <PublicSiteHeader />

      <section className="video-hero-section" aria-labelledby="video-hero-title">
        <div className="video-hero">
          <div className="video-hero-media" aria-hidden="true">
            <img className="video-hero-poster" src={listeningRoom} alt="" />
          </div>
          <div className="video-hero-scrim" aria-hidden="true" />
          <div className="video-hero-content">
            <p className="video-hero-eyebrow">Every voice leaves an echo.</p>
            <h1 id="video-hero-title">Your opinion<br />shapes the world.</h1>
            <p className="video-hero-description">Discover global perspectives, share what you think, and earn rewards by taking surveys.</p>
            <Link className="atlas-primary-link video-hero-cta" to={user ? '/dashboard' : '/register'}>
              Join us
              <ArrowUpRight size={19} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>

      <section className="atlas-stage" aria-labelledby="atlas-title">
        <div className="atlas-stage-heading">
          <h2 id="atlas-title">Think independently.<br />Discern what matters.</h2>
          <div className="atlas-primary-actions">
            <Link className="atlas-primary-link" to={user ? '/dashboard' : '/register'}>
              {user ? 'Open workspace' : 'Join us'}
              <ArrowUpRight size={19} strokeWidth={1.8} />
            </Link>
            <Link className="atlas-quiet-link" to="/news">Open News Wall <ArrowUpRight size={17} strokeWidth={1.8} /></Link>
          </div>
        </div>

        <div className="atlas-map" aria-label="Ways to explore GuanyiSearch">
          <span className="atlas-orbit atlas-orbit--one" aria-hidden="true" />
          <span className="atlas-orbit atlas-orbit--two" aria-hidden="true" />
          <span className="atlas-signal atlas-signal--one" aria-hidden="true" />
          <span className="atlas-signal atlas-signal--two" aria-hidden="true" />
          <span className="atlas-signal atlas-signal--three" aria-hidden="true" />
          <svg className="atlas-wires" viewBox="0 0 1200 650" preserveAspectRatio="none" aria-hidden="true">
            <path className="atlas-wire atlas-wire--news" d="M 605 338 C 499 258 449 184 236 174" />
            <path className="atlas-wire atlas-wire--survey" d="M 603 340 C 722 430 827 487 1004 506" />
            <path className="atlas-wire atlas-wire--community" d="M 603 340 C 521 457 421 533 255 570" />
          </svg>

          <AtlasNode
            name="news"
            className="atlas-node--news"
            to="/news"
            eyebrow="NEWS WALL"
            title="See the world's perspective. Stay up to date."
            image={newsWallIllustration}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="survey"
            className="atlas-node--survey"
            to="/partners"
            eyebrow="SURVEYS"
            title="Take surveys and earn gift cards and more."
            image={surveyParticipationIllustration}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="community"
            className="atlas-node--community"
            eyebrow="COMMUNITY"
            title="A place for perspective."
            image={communityIllustration}
            soon
          />
        </div>
      </section>
      <HomeLegacySections />
    </main>
  );
}

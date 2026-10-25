import { useEffect, useState } from 'react';
import HomeHero from './HomeHero';
import HomeHeroLake from './HomeHeroLake';
import './HomeHeroCarousel.css';

/* Homepage first screen: two frames, no controls.

   The owner asked for a rotating first screen (2026-10-26) without arrows:
   the window photograph, then the lake. Frames cross-fade on a timer, the
   timer pauses while the pointer or keyboard focus is inside, and readers who
   set "reduce motion" get the first frame only. */
const FRAME_MS = 7000;

export default function HomeHeroCarousel({ lead, rest, body, line, learnMore, communityLabel }) {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (paused || still) return undefined;
    const id = window.setInterval(() => setFrame((current) => (current + 1) % 2), FRAME_MS);
    return () => window.clearInterval(id);
  }, [paused, still]);

  return (
    <div
      className={`home-hero-carousel${still ? ' is-still' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={`home-hero-frame${frame === 0 ? ' is-active' : ''}`} aria-hidden={frame !== 0} {...(frame !== 0 ? { inert: '' } : {})}>
        <HomeHero lead={lead} rest={rest} body={body} ctaLabel={learnMore} />
      </div>
      <div className={`home-hero-frame${frame === 1 ? ' is-active' : ''}`} aria-hidden={frame !== 1} {...(frame !== 1 ? { inert: '' } : {})}>
        <HomeHeroLake line={line} cta={communityLabel} />
      </div>
    </div>
  );
}

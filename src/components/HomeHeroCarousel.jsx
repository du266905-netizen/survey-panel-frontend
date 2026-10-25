import { useEffect, useRef, useState } from 'react';
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
  const barRef = useRef(null);
  const elapsedRef = useRef(0);
  const lastRef = useRef(0);
  const frameRef = useRef(0);
  const paintedRef = useRef(-1);
  const visibleRef = useRef(true);
  const hostRef = useRef(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  /* One clock for both the lime line and the frame change: the line is the
     timer, so it can never disagree with the picture. Hovering pauses the
     clock where it stands instead of restarting it. */
  /* Off-screen the clock stops: a reader halfway down the page should not pay
     for a bar they cannot see. */
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (still) return undefined;
    lastRef.current = performance.now();
    let raf = 0;
    const tick = (now) => {
      const delta = now - lastRef.current;
      lastRef.current = now;
      if (!paused && visibleRef.current) elapsedRef.current += delta;
      const progress = Math.min(elapsedRef.current / FRAME_MS, 1);
      // Half-percent steps: the bar moves in ~7px increments at 1440 wide,
      // which reads as smooth, at roughly half the style writes.
      const step = Math.round(progress * 200) / 200;
      if (barRef.current && step !== paintedRef.current) {
        barRef.current.style.transform = `scaleX(${step})`;
        paintedRef.current = step;
      }
      if (progress >= 1) {
        elapsedRef.current = 0;
        if (barRef.current) barRef.current.style.transform = 'scaleX(0)';
        paintedRef.current = 0;
        frameRef.current = (frameRef.current + 1) % 2;
        setFrame(frameRef.current);
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [paused, still]);

  return (
    <div
      ref={hostRef}
      className={`home-hero-carousel${still ? ' is-still' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="home-hero-progress" aria-hidden="true">
        <span ref={barRef} />
      </div>
      <div className={`home-hero-frame${frame === 0 ? ' is-active' : ''}`} aria-hidden={frame !== 0} {...(frame !== 0 ? { inert: '' } : {})}>
        <HomeHero lead={lead} rest={rest} body={body} ctaLabel={learnMore} />
      </div>
      <div className={`home-hero-frame${frame === 1 ? ' is-active' : ''}`} aria-hidden={frame !== 1} {...(frame !== 1 ? { inert: '' } : {})}>
        <HomeHeroLake line={line} cta={communityLabel} />
      </div>
    </div>
  );
}

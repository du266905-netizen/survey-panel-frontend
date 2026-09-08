import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageMotion.css';

const REVEAL_SELECTOR = [
  '.public-site-layout main > section',
  '.public-site-layout main > article',
  '.home-atlas > section:not(.video-hero-section)',
  '.business-public-page > section',
  '.join-choice-page > section',
  '.legal-page > :not(.legal-page-grain)',
  '.news-wall-public > :not(style)',
  '.news-reading-page > :not(style)',
  '.how-page > section',
  '.home-continuation > *',
  '.landing-page > section',
].join(', ');

export default function PageMotion({ children }) {
  const { pathname } = useLocation();
  const shellRef = useRef(null);

  useEffect(() => {
    const root = shellRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const targets = [...root.querySelectorAll(REVEAL_SELECTOR)]
      .filter((element) => !element.closest('.video-hero-section'));
    if (!targets.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('page-motion-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8%', threshold: 0.08 });

    targets.forEach((element, index) => {
      element.classList.add('page-motion-reveal');
      element.style.setProperty('--page-motion-delay', `${Math.min(index, 3) * 55}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return <div className="page-motion-shell" key={pathname} ref={shellRef}>{children}</div>;
}

import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

export default function RouteScrollManager() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';

    if (!location.hash) {
      scrollToTop();
      const frame = window.requestAnimationFrame(scrollToTop);
      return () => window.cancelAnimationFrame(frame);
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.key, location.pathname]);

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted && !window.location.hash) scrollToTop();
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return null;
}

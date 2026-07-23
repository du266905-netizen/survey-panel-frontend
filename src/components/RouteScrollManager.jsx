import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteScrollManager() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';

    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.key, location.pathname]);

  return null;
}

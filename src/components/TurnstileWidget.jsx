import { useEffect, useRef, useState } from 'react';

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let scriptLoadingPromise = null;

function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${TURNSTILE_SCRIPT_SRC}"]`);

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Turnstile script failed to load')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Turnstile script failed to load'));
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

export default function TurnstileWidget({ onVerify, onExpire, onError }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;

        const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
        if (!sitekey) {
          throw new Error('VITE_TURNSTILE_SITE_KEY is not configured');
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey,
          callback: (token) => {
            setStatus('ready');
            onVerify(token);
          },
          'expired-callback': () => {
            onExpire?.();
          },
          'error-callback': () => {
            setStatus('error');
            onError?.();
          },
        });
        setStatus('ready');
      })
      .catch(() => {
        setStatus('error');
        onError?.();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onError, onExpire, onVerify]);

  return (
    <div>
      <div ref={containerRef} />
      {status === 'error' && (
        <p className="mt-2 text-sm font-medium text-red-600">
          Verification failed to load. Please refresh and try again.
        </p>
      )}
    </div>
  );
}

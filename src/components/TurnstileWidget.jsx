import { useEffect, useRef, useState } from 'react';

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const turnstileLoadTimeout = 12000;

let scriptLoadingPromise = null;

function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  const existingScript = document.querySelector(`script[src="${TURNSTILE_SCRIPT_SRC}"]`);
  const script = existingScript || document.createElement('script');

  if (!existingScript) {
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.dataset.turnstileLoader = 'true';
    document.head.appendChild(script);
  }

  const pendingLoad = new Promise((resolve, reject) => {
    let settled = false;
    const finish = (callback, value) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      callback(value);
    };
    const handleLoad = () => {
      if (window.turnstile) finish(resolve);
      else finish(reject, new Error('Turnstile did not initialise'));
    };
    const handleError = () => finish(reject, new Error('Turnstile script failed to load'));
    const timeoutId = window.setTimeout(() => {
      if (!window.turnstile && script.dataset.turnstileLoader === 'true') script.remove();
      finish(reject, new Error('Turnstile script timed out'));
    }, turnstileLoadTimeout);

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    // The script could have completed between the initial window check and listener setup.
    if (window.turnstile) finish(resolve);
  });

  scriptLoadingPromise = pendingLoad.catch((error) => {
    scriptLoadingPromise = null;
    throw error;
  });

  return scriptLoadingPromise;
}

export default function TurnstileWidget({ onVerify, onExpire, onError, theme = 'auto' }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const callbacksRef = useRef({ onVerify, onExpire, onError });
  const [renderVersion, setRenderVersion] = useState(0);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    callbacksRef.current = { onVerify, onExpire, onError };
  }, [onError, onExpire, onVerify]);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setMessage('');

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;

        const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
        if (!sitekey) {
          throw new Error('VITE_TURNSTILE_SITE_KEY is not configured');
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey,
          theme,
          size: 'flexible',
          retry: 'never',
          callback: (token) => {
            if (cancelled) return;
            setStatus('verified');
            setMessage('');
            callbacksRef.current.onVerify?.(token);
          },
          'expired-callback': () => {
            if (cancelled) return;
            setStatus('ready');
            setMessage('Verification expired. Please complete the check again.');
            callbacksRef.current.onExpire?.();
          },
          'timeout-callback': () => {
            if (cancelled) return;
            setStatus('error');
            setMessage('The security check timed out. Please try again.');
            callbacksRef.current.onExpire?.();
          },
          'error-callback': (errorCode) => {
            if (cancelled) return true;
            setStatus('error');
            setMessage(`Verification could not be completed${errorCode ? ` (${errorCode})` : ''}.`);
            callbacksRef.current.onError?.(errorCode);
            return true;
          },
        });
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
        setMessage('Verification could not load. Check your connection and try again.');
        callbacksRef.current.onError?.('script-load');
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderVersion, theme]);

  const retry = () => {
    callbacksRef.current.onExpire?.();
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }
    setRenderVersion((value) => value + 1);
  };

  return (
    <div className={`turnstile-widget is-${status}`}>
      <div ref={containerRef} className="turnstile-widget-frame" />
      {status === 'loading' && <p className="turnstile-widget-status">Loading security check…</p>}
      {status === 'error' && (
        <div className="turnstile-widget-error" role="alert">
          <p>{message}</p>
          <button type="button" onClick={retry}>Retry verification</button>
        </div>
      )}
      {status === 'ready' && message && <p className="turnstile-widget-status">{message}</p>}
    </div>
  );
}

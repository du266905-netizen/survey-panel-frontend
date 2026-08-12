import { useState } from 'react';
import { ChevronDown, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'guanyisearch-cookie-consent-v1';

function readStoredConsent() {
  try {
    return Boolean(window.localStorage.getItem(CONSENT_KEY));
  } catch {
    return false;
  }
}

function storeConsent(preferences) {
  const consent = {
    necessary: true,
    analytics: Boolean(preferences.analytics),
    advertising: Boolean(preferences.advertising),
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // The choice only controls optional browser features, so a blocked storage area is safe to ignore.
  }

  window.dispatchEvent(new CustomEvent('guanyisearch:cookie-consent', { detail: consent }));
}

export default function CookieConsentBanner() {
  const [hasChoice, setHasChoice] = useState(readStoredConsent);
  const [isManaging, setIsManaging] = useState(false);
  const [preferences, setPreferences] = useState({ analytics: false, advertising: false });

  const save = (nextPreferences) => {
    storeConsent(nextPreferences);
    setHasChoice(true);
  };

  if (hasChoice) {
    return (
      <button className="cookie-consent-reopen" type="button" onClick={() => { setHasChoice(false); setIsManaging(true); }}>
        Cookie settings
      </button>
    );
  }

  return (
    <section className="cookie-consent" aria-label="Cookie preferences">
      <div className="cookie-consent-copy">
        <span className="cookie-consent-mark" aria-hidden="true"><ShieldCheck size={17} strokeWidth={1.8} /></span>
        <div>
          <p className="cookie-consent-eyebrow">YOUR CHOICE</p>
          <h2>Cookies, with a clear purpose.</h2>
        <p>We use necessary browser storage to keep the site secure and working. Analytics and personalized advertising stay off unless you choose them. <Link to="/privacy#cookies">Privacy &amp; Cookie Policy</Link></p>
        </div>
      </div>

      <div className="cookie-consent-actions">
        <button className="cookie-consent-manage" type="button" onClick={() => setIsManaging((current) => !current)} aria-expanded={isManaging}>
          Manage settings <ChevronDown size={16} aria-hidden="true" />
        </button>
        <button className="cookie-consent-secondary" type="button" onClick={() => save({ analytics: false, advertising: false })}>Necessary only</button>
        <button className="cookie-consent-primary" type="button" onClick={() => save({ analytics: true, advertising: true })}>Accept all</button>
      </div>

      {isManaging && (
        <div className="cookie-consent-preferences">
          <p>Choose the optional categories you are comfortable with. You can keep both off.</p>
          <label>
            <input type="checkbox" checked readOnly />
            <span><strong>Necessary</strong><small>Security, sign-in and essential site preferences.</small></span>
          </label>
          <label>
            <input type="checkbox" checked={preferences.analytics} onChange={(event) => setPreferences((current) => ({ ...current, analytics: event.target.checked }))} />
            <span><strong>Analytics</strong><small>Help us understand which parts of the site work well.</small></span>
          </label>
          <label>
            <input type="checkbox" checked={preferences.advertising} onChange={(event) => setPreferences((current) => ({ ...current, advertising: event.target.checked }))} />
            <span><strong>Personalized advertising</strong><small>Allow relevant campaign measurement and advertising.</small></span>
          </label>
          <button className="cookie-consent-save" type="button" onClick={() => save(preferences)}>Save choices</button>
        </div>
      )}

      <button className="cookie-consent-close" type="button" onClick={() => save({ analytics: false, advertising: false })} aria-label="Use necessary cookies only and close"><X size={17} /></button>
    </section>
  );
}

import './HeroRotationToggle.css';

/* Pause / play for the first screen.

   The rotation stops on hover, which on a full-bleed hero can look like a
   frozen page. This control is the explanation and the way out: one small icon
   at the left of the utility strip, no arrows. */
export default function HeroRotationToggle({ stopped, onToggle, label }) {
  return (
    <button
      type="button"
      className={`psn-rotation-toggle${stopped ? ' is-stopped' : ''}`}
      aria-label={label}
      title={label}
      aria-pressed={stopped}
      onClick={onToggle}
    >
      {stopped ? (
        <svg width="12" height="12" viewBox="0 0 11 11" aria-hidden="true" focusable="false">
          <path d="M2 1.2 9.4 5.5 2 9.8Z" fill="currentColor" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 11 11" aria-hidden="true" focusable="false">
          <rect x="2" y="1.4" width="2.4" height="8.2" fill="currentColor" />
          <rect x="6.6" y="1.4" width="2.4" height="8.2" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}

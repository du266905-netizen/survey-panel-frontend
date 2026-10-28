import './BusinessPageLoader.css';

/**
 * Shared business-page loading state.
 *
 * Three ink bars pulse instead of a spinner, so the draft list and a
 * draft-to-editor navigation use the same calm, reusable surface.
 */
export default function BusinessPageLoader({ label, full = false }) {
  return (
    <div className={`business-page-loader${full ? ' is-full' : ''}`} role="status" aria-live="polite">
      <span className="business-page-loader-mark" aria-hidden="true">
        <i /><i /><i />
      </span>
      <span className="business-page-loader-label">{label}</span>
    </div>
  );
}

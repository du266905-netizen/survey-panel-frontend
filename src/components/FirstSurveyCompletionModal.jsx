import { Check, Coins, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function FirstSurveyCompletionModal({ open, awardedCoins, onClose }) {
  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="first-survey-completion-backdrop" role="dialog" aria-modal="true" aria-labelledby="first-survey-completion-title">
      <section className="first-survey-completion-card">
        <button className="first-survey-completion-close" type="button" onClick={onClose} aria-label="Close completion message"><X size={18} /></button>
        <span className="first-survey-completion-mark"><Check size={24} strokeWidth={3} /></span>
        <p className="first-survey-completion-kicker">Research profile complete</p>
        <h2 id="first-survey-completion-title">Your profile reward is ready.</h2>
        <p>Your answers help us match you with relevant research. We will notify you when a suitable opportunity becomes available.</p>
        <div className="first-survey-completion-reward"><Coins size={19} /><strong>{awardedCoins.toLocaleString()} Coins</strong> added to your wallet</div>
        <button className="first-survey-completion-action" type="button" onClick={onClose}>Continue to dashboard</button>
      </section>
    </div>,
    document.body
  );
}

import { ArrowRight, Check, CircleAlert, Coins, Sparkles, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import CoinAmount from './CoinAmount';

const resultCopy = {
  completed: {
    icon: Check,
    eyebrow: 'Survey complete',
    title: 'Congratulations — your survey is complete.',
    description: 'Your reward is now available in your wallet.',
    action: 'Explore next surveys',
    tone: 'success',
  },
  participation: {
    icon: Coins,
    eyebrow: 'Thank you for taking part',
    title: 'Thanks for sharing your time.',
    description: 'A participation reward has been added to your wallet.',
    action: 'Explore next surveys',
    tone: 'reward',
  },
  unavailable: {
    icon: Sparkles,
    eyebrow: 'New opportunities',
    title: 'This survey session has ended.',
    description: 'Fresh research opportunities are ready for you to explore.',
    action: 'See opportunities',
    tone: 'refresh',
  },
  interrupted: {
    icon: CircleAlert,
    eyebrow: 'Ready when you are',
    title: 'This survey was not completed.',
    description: 'You can return anytime to explore another opportunity.',
    action: 'Continue exploring',
    tone: 'neutral',
  },
};

export default function SurveyResultModal({ notice, recommendations = [], startingId, onClose, onStart }) {
  if (!notice || typeof document === 'undefined') return null;

  const copy = resultCopy[notice.type] || resultCopy.interrupted;
  const Icon = copy.icon;
  const hasReward = Number(notice.coins) > 0;

  return createPortal(
    <div className="survey-result-backdrop" role="dialog" aria-modal="true" aria-labelledby="survey-result-title">
      <section className={`survey-result-card is-${copy.tone}`}>
        <button className="survey-result-close" type="button" onClick={onClose} aria-label="Close survey result">
          <X size={18} />
        </button>

        <span className="survey-result-mark"><Icon size={25} strokeWidth={2.5} /></span>
        <p className="survey-result-eyebrow">{copy.eyebrow}</p>
        <h2 id="survey-result-title">{copy.title}</h2>
        <p>{copy.description}</p>

        {hasReward && (
          <div className="survey-result-reward">
            <Coins size={20} aria-hidden="true" />
            <span>{notice.type === 'participation' ? 'Participation reward' : 'Reward added'}</span>
            <strong><CoinAmount value={notice.coins} /></strong>
          </div>
        )}

        {recommendations.length > 0 ? (
          <div className="survey-result-next">
            <div className="survey-result-next-heading">
              <span>Suggested for you</span>
              <p>Choose a new opportunity when you are ready.</p>
            </div>
            <div className="survey-result-next-list">
              {recommendations.map((item) => (
                <button
                  className="survey-result-next-card"
                  key={item.id}
                  type="button"
                  disabled={Boolean(startingId)}
                  onClick={() => onStart(item)}
                >
                  <span>
                    <b>{item.displayName}</b>
                    <small>{item.loi ? `About ${item.loi} min` : 'New opportunity'}</small>
                  </span>
                  <strong>Est. <CoinAmount value={item.reward} /></strong>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="survey-result-empty">New opportunities are updating. Please check back shortly.</p>
        )}

        <button className="survey-result-action" type="button" onClick={onClose}>
          {copy.action}
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>
    </div>,
    document.body
  );
}

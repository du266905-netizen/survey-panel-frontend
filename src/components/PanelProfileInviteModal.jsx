import { ArrowUpRight, Coins, Compass, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

export default function PanelProfileInviteModal({ open, profile, rewardCoins, onClose }) {
  const navigate = useNavigate();
  if (!open || typeof document === 'undefined') return null;

  const started = Boolean(profile?.profileStartedAt);

  return createPortal(
    <div className="profile-invite-backdrop" role="dialog" aria-modal="true" aria-labelledby="profile-invite-title">
      <section className="profile-invite-card">
        <button className="profile-invite-close" type="button" onClick={onClose} aria-label="Close profile invitation"><X size={20} /></button>
        <div className="profile-invite-art" aria-hidden="true">
          <img src="/panel-profile/horizon-oil.jpg" alt="" />
        </div>
        <div className="profile-invite-content">
          <div className="profile-invite-content-head">
            <span className="profile-invite-icon"><Compass size={22} /></span>
            <p className="profile-invite-kicker">Your first research step</p>
          </div>
          <h2 id="profile-invite-title">{started ? 'Continue your first survey' : 'Start your first survey'}</h2>
          <p className="profile-invite-copy">
            {started
              ? 'Your answers are saved. Return whenever you are ready to continue.'
              : 'A few short questions help us introduce research that is more relevant to you.'}
          </p>
          {!profile?.isComplete && <div className="profile-invite-reward"><Coins size={17} /> Complete it once to receive <strong>{rewardCoins} Coins</strong></div>}
          <button className="profile-invite-action" type="button" onClick={() => navigate('/panel-profile')}>
            {started ? 'Continue survey' : 'Start survey'} <ArrowUpRight size={17} />
          </button>
          <button className="profile-invite-later" type="button" onClick={onClose}>Maybe later</button>
        </div>
      </section>
    </div>,
    document.body
  );
}

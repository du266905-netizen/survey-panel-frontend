import { ArrowUpRight, Check, Copy, Gift, Link as LinkIcon, ShieldCheck, Sparkles, Users, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import referralPeopleImage from '../assets/referral-people.jpg';
import referralCommunityImage from '../assets/referral-community.jpg';
import { useNavigate } from 'react-router-dom';
import { getReferralSummary } from '../api/realApi';
import CoinAmount from './CoinAmount';

function inviteUrl(referralCode) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://guanyi-media.com';
  return referralCode ? `${origin}/register?ref=${encodeURIComponent(referralCode)}` : '';
}

function ReferralPeopleArtwork({ className = '', imageSrc = referralPeopleImage }) {
  return (
    <div className={`referral-photo-art ${className}`} aria-hidden="true">
      <img src={imageSrc} alt="" />
    </div>
  );
}

export default function ReferralProgramWidget({ openFromRoute = false }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(openFromRoute);
  const [launcherVisible, setLauncherVisible] = useState(true);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (openFromRoute) setOpen(true);
  }, [openFromRoute]);

  useEffect(() => {
    if (!open) return undefined;

    let cancelled = false;
    async function loadReferrals() {
      setLoading(true);
      setError('');
      try {
        const response = await getReferralSummary();
        if (!cancelled) setSummary(response.data);
      } catch (caughtError) {
        if (!cancelled) setError(caughtError.response?.data?.message || 'Your invite details are unavailable right now.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReferrals();
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeProgram();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, openFromRoute]);

  const referralLink = useMemo(() => inviteUrl(summary?.referralCode), [summary?.referralCode]);
  const referrerReward = summary?.referrerRewardCoins || 500;
  const referredReward = summary?.referredRewardCoins || 300;

  function closeProgram() {
    setOpen(false);
    if (openFromRoute) navigate('/dashboard', { replace: true });
  }

  async function copyInviteLink() {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError('Copying is unavailable in this browser.');
    }
  }

  return (
    <>
      {launcherVisible && (
        <aside className="referral-launcher" aria-label="Invite program">
          <div className="referral-launcher-copy">
            <span>Invite program</span>
            <strong>Share a<br />good match.</strong>
            <p>Bring someone thoughtful into the panel.</p>
          </div>
          <ReferralPeopleArtwork className="referral-launcher-art" />
          <button className="referral-launcher-action" type="button" onClick={() => setOpen(true)}>
            Invite someone <ArrowUpRight size={14} />
          </button>
          <button className="referral-launcher-dismiss" type="button" onClick={() => setLauncherVisible(false)} aria-label="Dismiss invite prompt">
            <X size={15} />
          </button>
        </aside>
      )}

      {open && typeof document !== 'undefined' && createPortal(
        <div className="referral-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeProgram()}>
          <section className="referral-modal" role="dialog" aria-modal="true" aria-labelledby="referral-modal-title">
            <header className="referral-modal-header">
              <div>
                <span className="referral-modal-brand">GUANYISEARCH</span>
                <span className="referral-modal-label">Invite program</span>
              </div>
              <button className="referral-modal-close" type="button" onClick={closeProgram} aria-label="Close invite program"><X size={20} /></button>
            </header>

            <div className="referral-modal-scroll">
              <section className="referral-modal-hero">
                <div className="referral-modal-hero-copy">
                  <p className="referral-modal-kicker"><Sparkles size={15} /> A considered introduction</p>
                  <h2 id="referral-modal-title">Invite good people in.<br />Reward real participation.</h2>
                  <p>Share a personal link with someone who would value taking part. Rewards unlock after their first validated survey is complete.</p>
                </div>
                <div className="referral-modal-reward">
                  <ReferralPeopleArtwork className="referral-modal-art" imageSrc={referralCommunityImage} />
                  <div className="referral-modal-reward-copy">
                    <span>For a qualified first completion</span>
                    <strong>{referrerReward.toLocaleString('en-US')} Coins</strong>
                  </div>
                </div>
              </section>

              {error && <p className="referral-modal-error" role="alert">{error}</p>}

              <section className="referral-modal-summary">
                <article className="referral-modal-link-card">
                  <div className="referral-modal-card-head">
                    <span><LinkIcon size={18} /></span>
                    <div>
                      <h3>Your invite link</h3>
                      <p>Send it only to people you think would enjoy contributing.</p>
                    </div>
                  </div>
                  <div className="referral-modal-link-box">
                    <code>{loading ? 'Preparing your link…' : referralLink || 'Invite code unavailable'}</code>
                    <button type="button" onClick={copyInviteLink} disabled={!referralLink}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied' : 'Copy link'}
                    </button>
                  </div>
                  <p className="referral-modal-note">A reward is not issued for sign-up alone. It follows a completed, validated first survey.</p>
                </article>

                <div className="referral-modal-stats">
                  <article>
                    <Users size={19} />
                    <span>Successful invites</span>
                    <strong>{loading ? '—' : Number(summary?.successfulInvites || 0).toLocaleString('en-US')}</strong>
                  </article>
                  <article>
                    <Gift size={19} />
                    <span>Invite Coins earned</span>
                    <strong><CoinAmount value={summary?.coinsEarned || 0} /></strong>
                  </article>
                </div>
              </section>

              <section className="referral-modal-rules">
                <div className="referral-modal-card-head">
                  <span><ShieldCheck size={18} /></span>
                  <div>
                    <h3>How rewards unlock</h3>
                    <p>A simple process built around real participation.</p>
                  </div>
                </div>
                <ol>
                  <li><span>01</span><div><strong>Share your link</strong><p>Your friend joins through your personal invite code.</p></div></li>
                  <li><span>02</span><div><strong>They complete a survey</strong><p>The first survey must be completed and validated.</p></div></li>
                  <li><span>03</span><div><strong>Both sides receive Coins</strong><p>You receive {referrerReward} Coins; your friend receives {referredReward} Coins.</p></div></li>
                </ol>
              </section>
            </div>
          </section>
        </div>,
        document.body
      )}
    </>
  );
}

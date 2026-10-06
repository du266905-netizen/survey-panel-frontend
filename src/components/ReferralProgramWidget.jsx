import { ArrowUpRight, Check, Copy, Gift, Link as LinkIcon, ShieldCheck, Sparkles, Users, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import referralPeopleImage from '../assets/referral-people.jpg';
import referralCommunityImage from '../assets/referral-community.jpg';
import { useNavigate } from 'react-router-dom';
import { getReferralSummary } from '../api/realApi';
import CoinAmount from './CoinAmount';
import Logo from './Logo';

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
  const commissionPercent = summary?.referrerCommissionPercent || 5;
  const referredWelcomeCoins = summary?.referredWelcomeCoins || 1000;

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
      {launcherVisible && typeof document !== 'undefined' && createPortal(
        <aside className="referral-launcher" aria-label="Invite program">
          <div className="referral-launcher-copy">
            <span>Invite someone</span>
            <strong>Share a<br />real survey.</strong>
          </div>
          <ReferralPeopleArtwork className="referral-launcher-art" />
          <button className="referral-launcher-action" type="button" onClick={() => setOpen(true)}>
            Invite someone <ArrowUpRight size={14} />
          </button>
          <button className="referral-launcher-dismiss" type="button" onClick={() => setLauncherVisible(false)} aria-label="Dismiss invite prompt">
            <X size={15} />
          </button>
        </aside>,
        document.body
      )}

      {open && typeof document !== 'undefined' && createPortal(
        <div className="referral-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeProgram()}>
          <section className="referral-modal" role="dialog" aria-modal="true" aria-labelledby="referral-modal-title">
            <header className="referral-modal-header">
              <div>
                <Logo size="sm" className="referral-modal-brand" />
                <span className="referral-modal-label">Invite someone</span>
              </div>
              <button className="referral-modal-close" type="button" onClick={closeProgram} aria-label="Close invite program"><X size={20} /></button>
            </header>

            <div className="referral-modal-scroll">
              <section className="referral-modal-hero">
                <div className="referral-modal-hero-copy">
                  <p className="referral-modal-kicker"><Sparkles size={15} /> One genuine introduction</p>
                  <h2 id="referral-modal-title">Invite someone who will<br />genuinely take part.</h2>
                  <p>Invite someone who genuinely wants to take part. They receive a welcome boost when they join and another when they complete their profile; you share in {commissionPercent}% of their eligible survey Coins as they keep participating.</p>
                </div>
                <div className="referral-modal-reward">
                  <ReferralPeopleArtwork className="referral-modal-art" imageSrc={referralCommunityImage} />
                  <div className="referral-modal-reward-copy">
                    <span>Welcome boost at each step</span>
                    <strong>{referredWelcomeCoins.toLocaleString('en-US')} + {referredWelcomeCoins.toLocaleString('en-US')} Coins</strong>
                  </div>
                </div>
              </section>

              {error && <p className="referral-modal-error" role="alert">{error}</p>}

              <section className="referral-modal-summary">
                <article className="referral-modal-link-card">
                  <div className="referral-modal-card-head">
                    <span><LinkIcon size={18} /></span>
                    <div>
                      <h3>Your personal link</h3>
                      <p>Share it with one person who would genuinely enjoy taking surveys.</p>
                    </div>
                  </div>
                  <div className="referral-modal-link-box">
                    <code>{loading ? 'Preparing your link…' : referralLink || 'Invite code unavailable'}</code>
                    <button type="button" onClick={copyInviteLink} disabled={!referralLink}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied' : 'Copy link'}
                    </button>
                  </div>
                  <p className="referral-modal-note">A successful registration through your link gives them {referredWelcomeCoins.toLocaleString('en-US')} Coins. Completing their profile unlocks a further {referredWelcomeCoins.toLocaleString('en-US')} Coins. One account can be linked to one inviter only.</p>
                </article>

                <div className="referral-modal-stats">
                  <article>
                    <Users size={19} />
                    <span>Successful invites</span>
                    <strong>{loading ? '—' : Number(summary?.successfulInvites || 0).toLocaleString('en-US')}</strong>
                  </article>
                  <article>
                    <Gift size={19} />
                    <span>Commission Coins earned</span>
                    <strong><CoinAmount value={summary?.coinsEarned || 0} /></strong>
                  </article>
                </div>
              </section>

              <section className="referral-modal-rules">
                <div className="referral-modal-card-head">
                  <span><ShieldCheck size={18} /></span>
                  <div>
                    <h3>How this works</h3>
                    <p>Built around a real, ongoing participation relationship.</p>
                  </div>
                </div>
                <ol>
                  <li><span>01</span><div><strong>Invite one person</strong><p>They join through your personal link. An account cannot be attached to multiple inviters.</p></div></li>
                  <li><span>02</span><div><strong>They receive two welcome boosts</strong><p>They receive {referredWelcomeCoins.toLocaleString('en-US')} Coins after a successful sign-up and another {referredWelcomeCoins.toLocaleString('en-US')} Coins after completing their profile.</p></div></li>
                  <li><span>03</span><div><strong>Earn with their real activity</strong><p>You receive {commissionPercent}% of the Coins they earn from eligible validated surveys. Profile-completion Coins are theirs in full and are never part of your commission.</p></div></li>
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

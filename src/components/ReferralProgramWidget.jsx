import { Check, Copy, Gift, Link as LinkIcon, ShieldCheck, Sparkles, Users, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReferralSummary } from '../api/realApi';
import CoinAmount from './CoinAmount';

function inviteUrl(referralCode) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://guanyi-media.com';
  return referralCode ? `${origin}/register?ref=${encodeURIComponent(referralCode)}` : '';
}

function ReferralPixelArtwork({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 360 220" fill="none" aria-hidden="true">
      <g className="referral-pixel-art-shadow">
        <rect x="24" y="177" width="112" height="7" />
        <rect x="229" y="177" width="106" height="7" />
      </g>
      <g className="referral-pixel-person referral-pixel-person-left">
        <rect x="55" y="35" width="31" height="31" />
        <rect x="47" y="43" width="47" height="16" />
        <rect x="39" y="76" width="63" height="15" />
        <rect x="31" y="91" width="79" height="16" />
        <rect x="23" y="108" width="95" height="39" />
        <rect x="15" y="123" width="16" height="24" />
        <rect x="110" y="123" width="16" height="24" />
      </g>
      <g className="referral-pixel-gift">
        <rect x="113" y="22" width="51" height="13" />
        <rect x="121" y="35" width="35" height="39" />
        <rect x="135" y="22" width="8" height="52" />
        <rect x="119" y="10" width="14" height="14" />
        <rect x="145" y="10" width="14" height="14" />
      </g>
      <g className="referral-pixel-arrow">
        <rect x="143" y="109" width="75" height="12" />
        <rect x="211" y="101" width="14" height="28" />
        <rect x="224" y="93" width="14" height="44" />
        <rect x="237" y="101" width="14" height="28" />
      </g>
      <g className="referral-pixel-person referral-pixel-person-right">
        <rect x="275" y="35" width="31" height="31" />
        <rect x="267" y="43" width="47" height="16" />
        <rect x="259" y="76" width="63" height="15" />
        <rect x="251" y="91" width="79" height="16" />
        <rect x="243" y="108" width="95" height="39" />
        <rect x="235" y="123" width="16" height="24" />
        <rect x="330" y="123" width="16" height="24" />
      </g>
      <g className="referral-pixel-spark">
        <rect x="314" y="72" width="12" height="12" />
        <rect x="304" y="82" width="32" height="12" />
        <rect x="314" y="94" width="12" height="12" />
        <rect x="82" y="153" width="8" height="8" />
        <rect x="75" y="160" width="22" height="8" />
        <rect x="82" y="168" width="8" height="8" />
      </g>
    </svg>
  );
}

function SpiralArrow() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M33.8 12.5c-9.4-5.9-21.6-1.9-24.4 8.2-2.8 10.2 5.7 19.9 15.9 18.1 7.4-1.3 12.3-7.8 11.4-15.1-.7-5.5-5.3-9.8-10.8-10.1-4.2-.2-7.9 2.5-8.9 6.5-.9 3.8 1.7 7.5 5.5 8.1 2.9.5 5.7-1.3 6.5-4.1" />
      <path d="m29.7 21.5-1 4.7 4.8-.8" />
    </svg>
  );
}

export default function ReferralProgramWidget({ openFromRoute = false }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(openFromRoute);
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
      <aside className="referral-launcher" aria-label="Invite program">
        <div className="referral-launcher-copy">
          <span>Invite program</span>
          <strong>Pass on a good match.</strong>
          <p>Share your link when someone would value the panel.</p>
        </div>
        <ReferralPixelArtwork className="referral-launcher-art" />
        <button className="referral-launcher-orbit" type="button" onClick={() => setOpen(true)} aria-label="Open invite program">
          <SpiralArrow />
        </button>
      </aside>

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
                  <h2 id="referral-modal-title">Invite friends.<br />Reward real participation.</h2>
                  <p>Share a personal link with someone who would value taking part. Rewards unlock after their first validated survey is complete.</p>
                </div>
                <div className="referral-modal-reward">
                  <ReferralPixelArtwork className="referral-modal-art" />
                  <span>For a qualified first completion</span>
                  <strong>{referrerReward.toLocaleString('en-US')} Coins</strong>
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

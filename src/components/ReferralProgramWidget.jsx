import { ArrowUpRight, Check, Copy, Gift, Link as LinkIcon, ShieldCheck, Sparkles, Users, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import referralPeopleImage from '../assets/referral-people.jpg';
import referralCommunityImage from '../assets/referral-community.jpg';
import { useNavigate } from 'react-router-dom';
import { getReferralSummary } from '../api/realApi';
import CoinAmount from './CoinAmount';
import { useLanguage } from './LanguageContext';
import Logo from './Logo';
import { interpolate } from '../utils/interpolate';

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
  const { publicCopy } = useLanguage();
  const copy = publicCopy?.panelistUi?.referral || {};
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
        if (!cancelled) setError(caughtError.response?.data?.message || copy.errorUnavailable);
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
      setError(copy.errorCopy);
    }
  }

  return (
    <>
      {launcherVisible && typeof document !== 'undefined' && createPortal(
        <aside className="referral-launcher" aria-label={publicCopy?.workspace?.nav?.invite}>
          <div className="referral-launcher-copy">
            <span>{copy.inviteSomeone}</span>
            <strong>{copy.launcherTitle}</strong>
          </div>
          <ReferralPeopleArtwork className="referral-launcher-art" />
          <button className="referral-launcher-action" type="button" onClick={() => setOpen(true)}>
            {copy.inviteSomeone} <ArrowUpRight size={14} />
          </button>
          <button className="referral-launcher-dismiss" type="button" onClick={() => setLauncherVisible(false)} aria-label={copy.dismissPrompt}>
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
                <span className="referral-modal-label">{copy.inviteSomeone}</span>
              </div>
              <button className="referral-modal-close" type="button" onClick={closeProgram} aria-label={copy.closeProgram}><X size={20} /></button>
            </header>

            <div className="referral-modal-scroll">
              <section className="referral-modal-hero">
                <div className="referral-modal-hero-copy">
                  <p className="referral-modal-kicker"><Sparkles size={15} /> {copy.heroKicker}</p>
                  <h2 id="referral-modal-title">{copy.heroTitle}</h2>
                  <p>{interpolate(copy.heroBody, { percent: Number(commissionPercent).toLocaleString() })}</p>
                </div>
                <div className="referral-modal-reward">
                  <ReferralPeopleArtwork className="referral-modal-art" imageSrc={referralCommunityImage} />
                  <div className="referral-modal-reward-copy">
                    <span>{copy.rewardKicker}</span>
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
                      <h3>{copy.linkTitle}</h3>
                      <p>{copy.linkBody}</p>
                    </div>
                  </div>
                  <div className="referral-modal-link-box">
                    <code>{loading ? copy.linkLoading : referralLink || copy.linkUnavailable}</code>
                    <button type="button" onClick={copyInviteLink} disabled={!referralLink}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? copy.copied : copy.copyLink}
                    </button>
                  </div>
                  <p className="referral-modal-note">{interpolate(copy.linkNote, { coins: referredWelcomeCoins.toLocaleString() })}</p>
                </article>

                <div className="referral-modal-stats">
                  <article>
                    <Users size={19} />
                    <span>{copy.statsInvites}</span>
                    <strong>{loading ? '—' : Number(summary?.successfulInvites || 0).toLocaleString('en-US')}</strong>
                  </article>
                  <article>
                    <Gift size={19} />
                    <span>{copy.statsCoins}</span>
                    <strong><CoinAmount value={summary?.coinsEarned || 0} /></strong>
                  </article>
                </div>
              </section>

              <section className="referral-modal-rules">
                <div className="referral-modal-card-head">
                  <span><ShieldCheck size={18} /></span>
                  <div>
                    <h3>{copy.rulesTitle}</h3>
                    <p>{copy.rulesBody}</p>
                  </div>
                </div>
                <ol>
                  <li><span>01</span><div><strong>{copy.step1Title}</strong><p>{copy.step1Body}</p></div></li>
                  <li><span>02</span><div><strong>{copy.step2Title}</strong><p>{interpolate(copy.step2Body, { coins: referredWelcomeCoins.toLocaleString() })}</p></div></li>
                  <li><span>03</span><div><strong>{copy.step3Title}</strong><p>{interpolate(copy.step3Body, { percent: Number(commissionPercent).toLocaleString() })}</p></div></li>
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

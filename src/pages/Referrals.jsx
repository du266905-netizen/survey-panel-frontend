import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Gift, Link as LinkIcon, ShieldCheck, Sparkles, Star, Users } from 'lucide-react';
import CoinAmount from '../components/CoinAmount';
import { getReferralSummary } from '../api/realApi';

function inviteUrl(referralCode) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://guanyi-media.com';
  return referralCode ? `${origin}/register?ref=${encodeURIComponent(referralCode)}` : '';
}

export default function Referrals() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadReferrals() {
      setLoading(true);
      setError('');
      try {
        const response = await getReferralSummary();
        if (!cancelled) setSummary(response.data);
      } catch (caughtError) {
        if (!cancelled) setError(caughtError.response?.data?.message || 'Unable to load your invite program.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadReferrals();
    return () => {
      cancelled = true;
    };
  }, []);

  const referralLink = useMemo(() => inviteUrl(summary?.referralCode), [summary?.referralCode]);

  const copyInviteLink = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="referral-page space-y-6">
      <section className="referral-hero">
        <div>
          <p className="referral-kicker"><Star size={14} /> Invite program</p>
          <h1>Invite friends. Reward real participation.</h1>
          <p>
            Share your personal invite link. Rewards unlock only after the invited panelist completes a validated first survey, keeping the program clean and sustainable.
          </p>
        </div>
        <div className="referral-hero-card">
          <Sparkles size={22} />
          <strong>{summary?.referrerRewardCoins || 500} Coins</strong>
          <span>for you after a qualified first completion</span>
        </div>
      </section>

      {error && <div className="rounded-xl border border-red-300/25 bg-red-500/10 p-3 text-sm font-bold text-red-200">{error}</div>}

      <section className="referral-grid">
        <article className="referral-link-card">
          <div className="referral-card-head">
            <span><LinkIcon size={18} /></span>
            <div>
              <h2>Your invite link</h2>
              <p>Send this link to friends who want to join GuanyiSearch.</p>
            </div>
          </div>
          <div className="referral-link-box">
            <code>{loading ? 'Loading your invite link…' : referralLink || 'Invite code unavailable'}</code>
            <button className="btn-primary" type="button" onClick={copyInviteLink} disabled={!referralLink}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="referral-note">Invite rewards are not paid for signups alone. The invited panelist must complete their first validated survey.</p>
        </article>

        <article className="referral-stat-card">
          <Users size={20} />
          <span>Successful invites</span>
          <strong>{loading ? '—' : Number(summary?.successfulInvites || 0).toLocaleString('en-US')}</strong>
        </article>

        <article className="referral-stat-card">
          <Gift size={20} />
          <span>Invite Coins earned</span>
          <strong><CoinAmount value={summary?.coinsEarned || 0} /></strong>
        </article>
      </section>

      <section className="referral-rules card p-5">
        <div className="referral-card-head">
          <span><ShieldCheck size={18} /></span>
          <div>
            <h2>How rewards unlock</h2>
            <p>Built to reward real participation, not empty signups.</p>
          </div>
        </div>
        <div className="referral-rule-list">
          <article>
            <strong>1. Share your invite link</strong>
            <p>Your friend registers through your personal invite code.</p>
          </article>
          <article>
            <strong>2. They complete a real survey</strong>
            <p>The reward triggers only after their first survey becomes completed and validated.</p>
          </article>
          <article>
            <strong>3. Both sides receive Coins</strong>
            <p>You receive {summary?.referrerRewardCoins || 500} Coins. Your invited friend receives {summary?.referredRewardCoins || 300} Coins.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { ChevronRight, ChevronUp, CreditCard, Sparkles, User, X } from 'lucide-react';
import { apiClient } from '../api/client';
import { useBusinessAvatar } from '../utils/businessAvatar';
import './AiCredits.css';

/* AI credits, shown wherever they are spent.
 *
 * Balance and purchase both need the backend (/ai/credits), which does not
 * exist yet, so the badge degrades to a dash instead of inventing a number.
 * Buying goes through the existing balance, never a second payment flow. */

export const AI_CREDIT_PACKS = [
  { id: 'pack-100', credits: 100, price: 5 },
  { id: 'pack-300', credits: 300, price: 12 },
  { id: 'pack-1000', credits: 1000, price: 35 },
];

export async function fetchAiCredits() {
  const response = await apiClient.get('/api/business/ai/credits');
  return response.data;
}

export async function purchaseAiCredits(packId) {
  const response = await apiClient.post('/api/business/ai/credits/purchase', { packId });
  return response.data;
}

const copy = {
  'zh-CN': {
    label: 'AI 剩余', unit: '次', unavailable: '额度接口未接', buy: '加购',
    title: '加购 AI 次数', hint: '从账户余额扣除，不足时先充值。', confirm: '确认购买',
    loading: '处理中…', failed: '购买失败，请稍后再试。', done: '已到账', close: '关闭',
    upgrade: '升级套餐', learnMore: '了解更多', privacy: '隐私政策', terms: '服务条款', help: '帮助中心',
  },
  en: {
    label: 'AI credits', unit: '', unavailable: 'Credits endpoint pending', buy: 'Buy',
    title: 'Buy AI credits', hint: 'Paid from your balance; top up first if short.', confirm: 'Buy',
    loading: 'Working…', failed: 'Could not buy. Try again.', done: 'Added', close: 'Close',
    upgrade: 'Upgrade plan', learnMore: 'Learn more', privacy: 'Privacy', terms: 'Terms', help: 'Help centre',
  },
};

export function AiCreditsMenu({ language = 'zh-CN', onNavigate }) {
  const text = copy[language] || copy.en;
  const avatar = useBusinessAvatar();
  const [credits, setCredits] = useState(null);
  const [plan, setPlan] = useState('');
  const [unavailable, setUnavailable] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    fetchAiCredits()
      .then((data) => {
        setCredits(Number(data?.balance ?? data?.credits ?? 0));
        setPlan(String(data?.plan || '').toLowerCase());
        setUnavailable(false);
      })
      .catch(() => setUnavailable(true));
  }, []);

  const go = (path) => { setOpen(false); onNavigate?.(path); };
  const planLabel = plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : 'Free';

  return (
    <div className={`ai-menu${open ? ' is-open' : ''}`}>
      {open ? (
        <div className="ai-menu-pop" role="menu">
          <div className="ai-menu-balance">
            <span>{text.label}</span>
            <strong>{unavailable ? '—' : (credits ?? '—')} {text.unit}</strong>
          </div>
          <button type="button" role="menuitem" className="ai-menu-row" onClick={() => go('/business/plans')}>
            <span>{text.upgrade}</span>
            <ChevronRight size={13} aria-hidden="true" />
          </button>
          <button
            type="button"
            role="menuitem"
            className="ai-menu-row"
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen((value) => !value)}
          >
            <span>{text.learnMore}</span>
            <ChevronRight size={13} aria-hidden="true" className={moreOpen ? 'is-open' : ''} />
          </button>
          {moreOpen ? (
            <div className="ai-menu-more">
              <button type="button" onClick={() => go('/privacy')}>{text.privacy}</button>
              <button type="button" onClick={() => go('/terms')}>{text.terms}</button>
              <button type="button" onClick={() => go('/help')}>{text.help}</button>
            </div>
          ) : null}
        </div>
      ) : null}
      <button type="button" className="ai-menu-trigger" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span className="ai-menu-avatar" aria-hidden="true">
          {avatar ? <img src={avatar} alt="" /> : <User size={13} />}
        </span>
        <span className="ai-menu-plan">{planLabel}</span>
        <ChevronUp size={14} aria-hidden="true" className={`ai-menu-chevron${open ? ' is-open' : ''}`} />
      </button>
    </div>
  );
}

export default function AiCreditsBadge({ language = 'zh-CN', onChanged, compact = false, showBuy = true }) {
  const text = copy[language] || copy.en;
  const [credits, setCredits] = useState(null);
  const [unavailable, setUnavailable] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState('');
  const [note, setNote] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await fetchAiCredits();
      setCredits(Number(data?.balance ?? data?.credits ?? 0));
      setUnavailable(false);
    } catch {
      setUnavailable(true);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const buy = async (packId) => {
    setBusy(packId);
    setNote('');
    try {
      await purchaseAiCredits(packId);
      await load();
      setNote(text.done);
      onChanged?.();
    } catch {
      setNote(text.failed);
    } finally {
      setBusy('');
    }
  };

  return (
    <div className={`ai-credits${compact ? ' is-compact' : ''}`}>
      <span className="ai-credits-badge">
        <Sparkles size={14} aria-hidden="true" />
        {text.label}
        <strong>{unavailable ? '—' : (credits ?? '—')}</strong>
        {text.unit}
      </span>
      {showBuy ? (
        <button type="button" className="ai-credits-buy" onClick={() => setOpen(true)} disabled={unavailable}>
          <CreditCard size={14} aria-hidden="true" /> {text.buy}
        </button>
      ) : null}

      {open ? (
        <div className="ai-credits-modal" role="dialog" aria-modal="true" aria-label={text.title}>
          <button type="button" className="ai-credits-scrim" aria-label={text.close} onClick={() => setOpen(false)} />
          <section className="ai-credits-card">
            <header>
              <strong>{text.title}</strong>
              <button type="button" className="ai-credits-x" onClick={() => setOpen(false)} aria-label={text.close}>
                <X size={16} aria-hidden="true" />
              </button>
            </header>
            <p className="ai-credits-hint">{text.hint}</p>
            <div className="ai-credits-packs">
              {AI_CREDIT_PACKS.map((pack) => (
                <button
                  key={pack.id}
                  type="button"
                  className="ai-credits-pack"
                  onClick={() => buy(pack.id)}
                  disabled={Boolean(busy)}
                >
                  <strong>{pack.credits} {text.unit}</strong>
                  <span>${pack.price}</span>
                  <em>{busy === pack.id ? text.loading : text.confirm}</em>
                </button>
              ))}
            </div>
            {note ? <p className={note === text.done ? 'ai-credits-ok' : 'ai-credits-error'}>{note}</p> : null}
          </section>
        </div>
      ) : null}
    </div>
  );
}

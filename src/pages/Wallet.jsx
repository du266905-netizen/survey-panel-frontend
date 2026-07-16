import { useEffect, useState } from 'react';
import { ChevronDown, Gift, X } from 'lucide-react';
import { getWallet } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../components/AuthContext';
import { giftCardImageSources, giftCardOptions } from '../config/giftCardOptions';
import { formatCoinNumber, titleCase } from '../utils/formatters';

const giftCardDenominations = [10, 25, 50];
const giftCardRedemptionMinimum = 10000;

function usd(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function transactionStatus(status) {
  return String(status || '').toLowerCase();
}

export default function Wallet() {
  const { user, setUser } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [giftCardPreview, setGiftCardPreview] = useState(null);
  const [giftCardNotice, setGiftCardNotice] = useState(null);
  const [expandedGiftCards, setExpandedGiftCards] = useState(() => new Set());
  const [selectedDenominations, setSelectedDenominations] = useState(() => (
    giftCardOptions.reduce((current, option) => ({ ...current, [option.id]: giftCardDenominations[0] }), {})
  ));

  const loadWallet = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getWallet();
      setData(response.data);
      if (response.data.wallet) {
        setUser({ ...user, coinsBalance: response.data.wallet.balance, coins: response.data.wallet.balance });
      }
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to load wallet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const wallet = data?.wallet;
  const exchangeRate = data?.exchangeRate || { coinsPerUsd: 1000, balanceUsd: 0, lockedUsd: 0 };
  const availableCoins = Number(wallet?.balance || 0);
  const coinsPerUsd = Number(exchangeRate.coinsPerUsd || 1000);
  const giftCardMinimumRemaining = Math.max(0, giftCardRedemptionMinimum - availableCoins);
  const hasGiftCardRedemptionAccess = giftCardMinimumRemaining === 0;

  const giftCardTier = (amountUsd) => {
    const requiredCoins = Math.round(amountUsd * coinsPerUsd);
    const remainingCoins = Math.max(0, requiredCoins - availableCoins);
    return {
      amountUsd,
      requiredCoins,
      remainingCoins,
      unlocked: remainingCoins === 0,
    };
  };

  const toggleGiftCard = (optionId) => {
    setExpandedGiftCards((current) => {
      const next = new Set(current);
      if (next.has(optionId)) next.delete(optionId);
      else next.add(optionId);
      return next;
    });
  };

  const selectGiftCardDenomination = (optionId, amountUsd) => {
    setGiftCardNotice(null);
    setSelectedDenominations((current) => ({ ...current, [optionId]: Number(amountUsd) }));
  };

  const handleGiftCardRedeem = (option) => {
    const amountUsd = selectedDenominations[option.id] || giftCardDenominations[0];
    const tier = giftCardTier(amountUsd);

    if (!hasGiftCardRedemptionAccess) {
      setGiftCardNotice({
        optionId: option.id,
        message: `Need ${formatCoinNumber(giftCardMinimumRemaining)} more Coins to unlock gift card redemption.`,
      });
      return;
    }

    if (!tier.unlocked) {
      setGiftCardNotice({
        optionId: option.id,
        message: `Need ${formatCoinNumber(tier.remainingCoins)} more Coins to unlock the ${usd(tier.amountUsd)} ${option.name} gift card.`,
      });
      return;
    }

    setGiftCardNotice(null);
    setGiftCardPreview({ ...tier, option });
  };

  const transactionColumns = [
    { key: 'type', header: 'Type', render: (row) => titleCase(row.type) },
    { key: 'description', header: 'Description', render: (row) => row.description || '-' },
    {
      key: 'coins',
      header: 'Coins',
      render: (row) => (
        <span className={Number(row.coins) >= 0 ? 'font-bold text-cyan-700' : 'font-bold text-red-700'}>
          {Number(row.coins) >= 0 ? '+' : ''}
          {formatCoinNumber(row.coins)}
        </span>
      ),
    },
    { key: 'balanceAfter', header: 'Balance After', render: (row) => <CoinAmount value={row.balanceAfter} /> },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={transactionStatus(row.status)} /> },
    { key: 'createdAt', header: 'Created', render: (row) => new Date(row.createdAt).toLocaleString() },
  ];

  const orderColumns = [
    { key: 'rewardType', header: 'Reward', render: (row) => titleCase(row.rewardType) },
    { key: 'provider', header: 'Provider', render: (row) => titleCase(row.provider) },
    { key: 'amountCoins', header: 'Coins', render: (row) => <CoinAmount value={row.amountCoins} /> },
    { key: 'amountUSD', header: 'USD', render: (row) => usd(row.amountUSD) },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={transactionStatus(row.status)} /> },
    { key: 'createdAt', header: 'Created', render: (row) => new Date(row.createdAt).toLocaleString() },
  ];

  return (
    <>
      <section className="wallet-hero mb-6">
        <div className="wallet-hero-copy">
          <p className="wallet-hero-kicker">Reward wallet</p>
          <h1>Choose the reward you want next.</h1>
          <p>Select a gift card brand, choose a value, and we’ll show whether your current Coins balance meets the target.</p>
          <div className="wallet-hero-actions">
            <span>1,000 Coins = $1 USD</span>
            <span>Minimum redemption: $10</span>
          </div>
        </div>
      </section>

      {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
      <div>
        <div className="space-y-6">
          <section className="wallet-showcase card p-5">
            <div className="wallet-showcase-head">
              <div>
                <h2>
                  <Gift size={18} className="text-amber-600" />
                  Gift card catalog
                </h2>
                <p>Pick a target amount and keep building toward it. Coins are not deducted until a real redemption request is submitted.</p>
              </div>
            </div>

            <div className="gift-card-dropdown-list">
              {giftCardOptions.map((option) => {
                const expanded = expandedGiftCards.has(option.id);
                const amountUsd = selectedDenominations[option.id] || giftCardDenominations[0];
                const tier = giftCardTier(amountUsd);
                return (
                  <article key={option.id} className={`gift-card-option ${expanded ? 'is-expanded' : ''}`}>
                    <button className="gift-card-summary" type="button" onClick={() => toggleGiftCard(option.id)} aria-expanded={expanded}>
                      <span className="gift-card-summary-image">
                        <img src={giftCardImageSources[option.image]} alt="" />
                      </span>
                      <span className="gift-card-summary-copy">
                        <strong>{option.name}</strong>
                        <span>{option.region} · $10 / $25 / $50</span>
                      </span>
                      <ChevronDown className="gift-card-summary-chevron" size={18} aria-hidden="true" />
                    </button>

                    {expanded && (
                      <div className="gift-card-dropdown">
                        <div className="gift-card-image-shell">
                          <div>
                            <img src={giftCardImageSources[option.image]} alt={`${option.name} gift card`} />
                          </div>
                        </div>
                        <div className="gift-card-controls">
                          <label>
                            <span>Gift card value</span>
                            <select className="field" value={amountUsd} onChange={(event) => selectGiftCardDenomination(option.id, event.target.value)}>
                              {giftCardDenominations.map((denomination) => (
                                <option key={denomination} value={denomination}>{usd(denomination)} · {formatCoinNumber(giftCardTier(denomination).requiredCoins)} Coins</option>
                              ))}
                            </select>
                          </label>
                          <div className="gift-card-selected-tier">
                            <span>{usd(amountUsd)}</span>
                            <strong>{formatCoinNumber(tier.requiredCoins)} Coins</strong>
                          </div>
                          <button className="btn-primary gift-card-redeem-button" type="button" onClick={() => handleGiftCardRedeem(option)}>
                            Redeem
                          </button>
                          {giftCardNotice?.optionId === option.id && (
                            <p className="gift-card-redeem-caption">{giftCardNotice.message}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">Transactions</h2>
              <p className="text-sm text-slate-500">{data?.transactions?.length || 0} latest entries</p>
            </div>
            <DataTable columns={transactionColumns} rows={data?.transactions || []} loading={loading} emptyMessage="No wallet transactions yet." />
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">Reward requests</h2>
              <p className="text-sm text-slate-500">{data?.orders?.length || 0} requests</p>
            </div>
            <DataTable columns={orderColumns} rows={data?.orders || []} loading={loading} emptyMessage="No reward requests yet." />
          </section>
        </div>

      </div>

      {giftCardPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="gift-card-goal-title">
          <section className="card w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Gift card goal</p>
                <h2 id="gift-card-goal-title" className="mt-1 text-xl font-bold text-slate-950">{giftCardPreview.option.name} {usd(giftCardPreview.amountUsd)}</h2>
              </div>
              <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" type="button" onClick={() => setGiftCardPreview(null)} aria-label="Close gift card goal">
                <X size={18} />
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">This is a reward target preview. No redemption request was submitted and no Coins were deducted from your wallet.</p>
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-900">
              Future goal: {formatCoinNumber(giftCardPreview.requiredCoins)} Coins for {usd(giftCardPreview.amountUsd)}.
            </div>
            <button className="btn-primary mt-5 w-full" type="button" onClick={() => setGiftCardPreview(null)}>
              Got it
            </button>
          </section>
        </div>
      )}
    </>
  );
}

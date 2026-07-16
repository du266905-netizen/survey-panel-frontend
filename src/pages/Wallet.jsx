import { useEffect, useMemo, useState } from 'react';
import { Check, Gift, RefreshCcw, X } from 'lucide-react';
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
  const lockedCoins = Number(wallet?.lockedBalance || 0);
  const coinsPerUsd = Number(exchangeRate.coinsPerUsd || 1000);
  const giftCardMinimumRemaining = Math.max(0, giftCardRedemptionMinimum - availableCoins);
  const hasGiftCardRedemptionAccess = giftCardMinimumRemaining === 0;
  const giftCardMinimumProgress = Math.min(100, Math.round((availableCoins / giftCardRedemptionMinimum) * 100));
  const redemptionMessage = hasGiftCardRedemptionAccess
    ? 'You have enough Coins for the first redemption tier.'
    : `${formatCoinNumber(giftCardMinimumRemaining)} Coins until gift cards unlock.`;

  const giftCardTier = (amountUsd) => {
    const requiredCoins = Math.round(amountUsd * coinsPerUsd);
    const remainingCoins = Math.max(0, requiredCoins - availableCoins);
    return {
      amountUsd,
      requiredCoins,
      remainingCoins,
      unlocked: remainingCoins === 0,
      progress: requiredCoins ? Math.min(100, Math.round((availableCoins / requiredCoins) * 100)) : 0,
    };
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
          <h1>Build toward a real reward.</h1>
          <p>{redemptionMessage} Gift card delivery is being prepared, so this page is your reward goal tracker for now.</p>
          <div className="wallet-hero-actions">
            <span>1,000 Coins = $1 USD</span>
            <span>Minimum redemption: $10</span>
          </div>
        </div>
        <div className="wallet-goal-card">
          <div className="wallet-goal-card-head">
            <span>Gift card threshold</span>
            <strong>{formatCoinNumber(Math.min(availableCoins, giftCardRedemptionMinimum))} / {formatCoinNumber(giftCardRedemptionMinimum)}</strong>
          </div>
          <div className="wallet-goal-meter" aria-hidden="true">
            <i style={{ width: `${giftCardMinimumProgress}%` }} />
          </div>
          <div className="wallet-goal-stats">
            <div>
              <span>Available</span>
              <strong><CoinAmount value={availableCoins} /></strong>
            </div>
            <div>
              <span>Locked</span>
              <strong><CoinAmount value={lockedCoins} /></strong>
            </div>
          </div>
          <button className="btn-secondary" type="button" onClick={loadWallet} disabled={loading}>
            <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </section>

      {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
      <div>
        <div className="space-y-6">
          <section className="wallet-metrics grid gap-4 md:grid-cols-3">
            <div>
              <p>Available Coins</p>
              <div>
                <CoinAmount value={wallet?.balance} />
              </div>
              <span>≈ {usd(exchangeRate.balanceUsd)}</span>
            </div>
            <div>
              <p>Locked Coins</p>
              <div>
                <CoinAmount value={wallet?.lockedBalance} />
              </div>
              <span>Pending redemption: {usd(exchangeRate.lockedUsd)}</span>
            </div>
            <div>
              <p>Exchange Rate</p>
              <div>{formatCoinNumber(exchangeRate.coinsPerUsd)}</div>
              <span>Coins = $1 USD</span>
            </div>
          </section>

          <section className="wallet-showcase card p-5">
            <div className="wallet-showcase-head">
              <div>
                <h2>
                  <Gift size={18} className="text-amber-600" />
                  Gift card catalog
                </h2>
                <p>Pick a target. Real gift card fulfillment will be connected separately before live redemption opens.</p>
              </div>
              <span className="wallet-showcase-note">Coming soon · no Coins deducted</span>
            </div>

            <div className="wallet-unlock-strip">
              <div>
                <p>
                  {hasGiftCardRedemptionAccess
                    ? 'Gift card redemption is unlocked.'
                    : `Earn ${formatCoinNumber(giftCardMinimumRemaining)} more Coins to unlock redemption.`}
                </p>
                <span>Current progress: {giftCardMinimumProgress}%</span>
              </div>
              <div className="wallet-unlock-meter" aria-hidden="true">
                <i style={{ width: `${giftCardMinimumProgress}%` }} />
              </div>
            </div>

            <div className="gift-card-catalog grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {giftCardOptions.map((option) => (
                <article key={option.id} className="gift-card-option">
                  <div className="gift-card-image-shell">
                    <div>
                      <img src={giftCardImageSources[option.image]} alt={`${option.name} gift card`} />
                    </div>
                  </div>
                  <div className="gift-card-body">
                    <div className="gift-card-title-row">
                      <h3>{option.name}</h3>
                      <span>{option.region}</span>
                    </div>
                    <div className="space-y-3">
                      {giftCardDenominations.map((amountUsd) => {
                        const tier = giftCardTier(amountUsd);
                        const tierUnlocked = hasGiftCardRedemptionAccess && tier.unlocked;
                        return (
                          <button
                            key={amountUsd}
                            className={`gift-card-tier ${tierUnlocked ? 'is-ready' : ''}`}
                            type="button"
                            disabled={!tierUnlocked}
                            onClick={() => setGiftCardPreview({ ...tier, option })}
                            aria-label={`${option.name} ${usd(amountUsd)} gift card`}
                          >
                            <span className="gift-card-tier-head">
                              <span>{usd(amountUsd)}</span>
                              <span>{formatCoinNumber(tier.requiredCoins)} Coins</span>
                            </span>
                            <span className="gift-card-tier-meter">
                              <i style={{ width: `${tier.progress}%` }} />
                            </span>
                            <span className="gift-card-tier-status">
                              {tierUnlocked ? <><Check size={13} strokeWidth={3} /> Ready to redeem</> : `Need ${formatCoinNumber(tier.remainingCoins)} more`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </article>
              ))}
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
              <h2 className="text-lg font-bold text-slate-950">Redemption Orders</h2>
              <p className="text-sm text-slate-500">Manual provider first</p>
            </div>
            <DataTable columns={orderColumns} rows={data?.orders || []} loading={loading} emptyMessage="No redemption orders yet." />
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
            <p className="mt-4 text-sm leading-6 text-slate-600">Gift card redemption is coming soon. No redemption request was submitted and no Coins were deducted from your wallet.</p>
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

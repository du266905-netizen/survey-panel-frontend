import { useEffect, useMemo, useState } from 'react';
import { Check, Gift, RefreshCcw, X } from 'lucide-react';
import { getWallet } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
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
  const coinsPerUsd = Number(exchangeRate.coinsPerUsd || 1000);
  const giftCardMinimumRemaining = Math.max(0, giftCardRedemptionMinimum - availableCoins);
  const hasGiftCardRedemptionAccess = giftCardMinimumRemaining === 0;
  const giftCardMinimumProgress = Math.min(100, Math.round((availableCoins / giftCardRedemptionMinimum) * 100));

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
      <PageHeader
        title="Wallet"
        description="Coins, redemption requests, and reward history."
        action={
          <button className="btn-secondary" type="button" onClick={loadWallet} disabled={loading}>
            <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        }
      />

      {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
      <div>
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Available Coins</p>
              <div className="mt-3 text-2xl font-black text-amber-900">
                <CoinAmount value={wallet?.balance} />
              </div>
              <p className="mt-2 text-sm font-semibold text-amber-800">≈ {usd(exchangeRate.balanceUsd)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Locked Coins</p>
              <div className="mt-3 text-2xl font-black text-slate-950">
                <CoinAmount value={wallet?.lockedBalance} />
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-500">Pending redemption: {usd(exchangeRate.lockedUsd)}</p>
            </div>
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Exchange Rate</p>
              <p className="mt-3 text-2xl font-black text-cyan-950">{formatCoinNumber(exchangeRate.coinsPerUsd)}</p>
              <p className="mt-2 text-sm font-semibold text-cyan-800">Coins = $1 USD</p>
            </div>
          </section>

          <section className="card p-5">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950">
                  <Gift size={18} className="text-amber-600" />
                  Gift Card Options
                </h2>
                <p className="mt-1 text-sm text-slate-500">Choose a future reward goal. Gift card delivery is not available yet.</p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">Preview only</span>
            </div>

            <div className="mb-5 rounded-xl border border-cyan-100 bg-cyan-50/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold text-cyan-950">
                  {hasGiftCardRedemptionAccess
                    ? 'Gift card redemption is unlocked.'
                    : `Earn ${formatCoinNumber(giftCardMinimumRemaining)} more Coins to unlock redemption.`}
                </p>
                <span className="text-xs font-bold text-cyan-800">{formatCoinNumber(Math.min(availableCoins, giftCardRedemptionMinimum))} / {formatCoinNumber(giftCardRedemptionMinimum)}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-cyan-100">
                <div className="h-full rounded-full bg-cyan-600 transition-[width]" style={{ width: `${giftCardMinimumProgress}%` }} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {giftCardOptions.map((option) => (
                <article key={option.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.09)] transition-shadow hover:shadow-[0_14px_34px_rgba(15,23,42,0.13)]">
                  <div className="m-3 aspect-[1.58] overflow-hidden rounded-xl bg-slate-900 p-2 shadow-inner">
                    <div className="h-full w-full overflow-hidden rounded-lg [clip-path:inset(0_round_0.5rem)]">
                      <img className="h-full w-full scale-[1.045] rounded-lg object-cover" src={giftCardImageSources[option.image]} alt={`${option.name} gift card`} />
                    </div>
                  </div>
                  <div className="border-t border-slate-100 p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-950">{option.name}</h3>
                      <span className="rounded-full bg-cyan-100/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-800 ring-1 ring-inset ring-cyan-200">{option.region}</span>
                    </div>
                    <div className="space-y-3">
                      {giftCardDenominations.map((amountUsd) => {
                        const tier = giftCardTier(amountUsd);
                        const tierUnlocked = hasGiftCardRedemptionAccess && tier.unlocked;
                        return (
                          <button
                            key={amountUsd}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60"
                            type="button"
                            disabled={!tierUnlocked}
                            onClick={() => setGiftCardPreview({ ...tier, option })}
                            aria-label={`${option.name} ${usd(amountUsd)} gift card`}
                          >
                            <span className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-950">{usd(amountUsd)}</span>
                              <span className="text-xs font-semibold text-slate-600">{formatCoinNumber(tier.requiredCoins)} Coins</span>
                            </span>
                            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-slate-200">
                              <span className="block h-full rounded-full bg-cyan-500" style={{ width: `${tier.progress}%` }} />
                            </span>
                            <span className={`mt-2 flex items-center gap-1 text-xs font-bold ${tierUnlocked ? 'text-cyan-700' : 'text-slate-500'}`}>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="gift-card-preview-title">
          <section className="card w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Gift card preview</p>
                <h2 id="gift-card-preview-title" className="mt-1 text-xl font-bold text-slate-950">{giftCardPreview.option.name} {usd(giftCardPreview.amountUsd)}</h2>
              </div>
              <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" type="button" onClick={() => setGiftCardPreview(null)} aria-label="Close gift card preview">
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

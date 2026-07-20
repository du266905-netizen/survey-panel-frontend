import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Gift, X } from 'lucide-react';
import { getWallet } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../components/AuthContext';
import { giftCardImageSources, giftCardOptions } from '../config/giftCardOptions';
import { formatCoinNumber, titleCase } from '../utils/formatters';

const defaultGiftCardDenominations = [10, 25, 50];
const giftCardRedemptionMinimum = 10000;
const rewardSlides = [
  {
    id: 'gift-cards',
    title: 'Gift card redemption',
    description: 'Select a gift card brand, choose a value, and we’ll show whether your current Coins balance meets the target.',
  },
  {
    id: 'crypto',
    title: 'Cryptocurrency',
    description: 'Coming soon. Stay tuned for future payout options.',
    variant: 'crypto',
  },
];

function usd(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function transactionStatus(status) {
  return String(status || '').toLowerCase();
}

function giftCardAmounts(option) {
  return Array.isArray(option?.amounts) && option.amounts.length ? option.amounts : defaultGiftCardDenominations;
}

function giftCardAmountLabel(option) {
  return giftCardAmounts(option).map((amount) => `$${amount}`).join(' / ');
}

export default function Wallet() {
  const { user, setUser } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeGiftCard, setActiveGiftCard] = useState(null);
  const [giftCardModalOffset, setGiftCardModalOffset] = useState({ x: 0, y: 0 });
  const [giftCardNotice, setGiftCardNotice] = useState(null);
  const [rewardSlideIndex, setRewardSlideIndex] = useState(0);
  const [selectedDenominations, setSelectedDenominations] = useState(() => (
    giftCardOptions.reduce((current, option) => ({ ...current, [option.id]: giftCardAmounts(option)[0] }), {})
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

  useEffect(() => {
    if (!activeGiftCard) return undefined;
    const previousOverflow = document.body.style.overflow;
    const updateModalPosition = () => {
      const appMain = document.querySelector('.app-main');
      if (!appMain) {
        setGiftCardModalOffset({ x: 0, y: 0 });
        return;
      }

      const bounds = appMain.getBoundingClientRect();
      const visibleLeft = Math.max(0, bounds.left);
      const visibleTop = Math.max(0, bounds.top);
      const visibleRight = Math.min(window.innerWidth, bounds.right);
      const visibleBottom = Math.min(window.innerHeight, bounds.bottom);
      const visibleWidth = Math.max(0, visibleRight - visibleLeft);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      setGiftCardModalOffset({
        x: visibleWidth ? visibleLeft + visibleWidth / 2 - window.innerWidth / 2 : 0,
        y: visibleHeight ? visibleTop + visibleHeight / 2 - window.innerHeight / 2 : 0,
      });
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeGiftCardModal();
    };

    document.body.style.overflow = 'hidden';
    updateModalPosition();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updateModalPosition);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateModalPosition);
    };
  }, [activeGiftCard]);

  const wallet = data?.wallet;
  const exchangeRate = data?.exchangeRate || { coinsPerUsd: 1000, balanceUsd: 0, lockedUsd: 0 };
  const availableCoins = Number(wallet?.balance || 0);
  const coinsPerUsd = Number(exchangeRate.coinsPerUsd || 1000);
  const giftCardMinimumRemaining = Math.max(0, giftCardRedemptionMinimum - availableCoins);
  const hasGiftCardRedemptionAccess = giftCardMinimumRemaining === 0;
  const activeRewardSlide = rewardSlides[rewardSlideIndex] || rewardSlides[0];

  const shiftRewardSlide = (direction) => {
    setRewardSlideIndex((current) => (current + direction + rewardSlides.length) % rewardSlides.length);
  };

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

  const openGiftCardModal = (option) => {
    setGiftCardNotice(null);
    setActiveGiftCard(option);
  };

  const closeGiftCardModal = () => {
    setGiftCardNotice(null);
    setActiveGiftCard(null);
  };

  const selectGiftCardDenomination = (optionId, amountUsd) => {
    setGiftCardNotice(null);
    setSelectedDenominations((current) => ({ ...current, [optionId]: Number(amountUsd) }));
  };

  const handleGiftCardRedeem = (option) => {
    const amountUsd = selectedDenominations[option.id] || giftCardAmounts(option)[0];
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

    setGiftCardNotice({
      optionId: option.id,
      kind: 'ready',
      message: `${option.name} ${usd(tier.amountUsd)} is within your current Coins balance. Real fulfillment is not submitted here yet, so no Coins were deducted.`,
    });
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
    <section className="wallet-page">
      <section className="wallet-hero mb-6">
        <div className="wallet-hero-copy">
          <p className="wallet-hero-kicker">Reward wallet</p>
          <h1>Choose the reward you want next.</h1>
          <div className="wallet-hero-actions">
            <span>1,000 Coins = $1 USD</span>
            <span>Minimum redemption: $10</span>
          </div>
        </div>
        <div className="wallet-reward-stage" aria-label="Reward options preview">
          <button className="wallet-reward-nav is-left" type="button" onClick={() => shiftRewardSlide(-1)} aria-label="Previous reward option">
            <ChevronLeft size={18} />
          </button>
          <article className={`wallet-reward-slide ${activeRewardSlide.variant === 'crypto' ? 'is-crypto' : ''}`}>
            <div className="wallet-reward-orbit" aria-hidden="true" />
            <div className="wallet-reward-card-face">
              <span>{activeRewardSlide.title}</span>
            </div>
            <p>{activeRewardSlide.description}</p>
          </article>
          <button className="wallet-reward-nav is-right" type="button" onClick={() => shiftRewardSlide(1)} aria-label="Next reward option">
            <ChevronRight size={18} />
          </button>
          <div className="wallet-reward-dots" aria-label="Reward option slides">
            {rewardSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={index === rewardSlideIndex ? 'is-active' : ''}
                type="button"
                onClick={() => setRewardSlideIndex(index)}
                aria-label={`Show ${slide.title}`}
              />
            ))}
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
                return (
                  <article key={option.id} className="gift-card-option">
                    <button className="gift-card-summary" type="button" onClick={() => openGiftCardModal(option)} aria-label={`Open ${option.name} redemption options`}>
                      <span className="gift-card-summary-image">
                        <img src={giftCardImageSources[option.image]} alt="" />
                      </span>
                      <span className="gift-card-summary-copy">
                        <strong>{option.name}</strong>
                        <span>{option.region} · {giftCardAmountLabel(option)}</span>
                      </span>
                      <span className="gift-card-summary-action">
                        Open
                        <ChevronRight size={16} aria-hidden="true" />
                      </span>
                    </button>
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

      {activeGiftCard && (() => {
        const amounts = giftCardAmounts(activeGiftCard);
        const amountUsd = selectedDenominations[activeGiftCard.id] || amounts[0];
        const tier = giftCardTier(amountUsd);
        return createPortal(
          <div className="gift-card-modal-backdrop" role="presentation" onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGiftCardModal();
          }}>
            <section
              className="gift-card-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="gift-card-modal-title"
              style={{ transform: `translate(${giftCardModalOffset.x}px, ${giftCardModalOffset.y}px)` }}
            >
              <div className="gift-card-modal-head">
                <div>
                  <p>Gift card target</p>
                  <h2 id="gift-card-modal-title">{activeGiftCard.name}</h2>
                  <span>{activeGiftCard.region} · {giftCardAmountLabel(activeGiftCard)}</span>
                </div>
                <button type="button" onClick={closeGiftCardModal} aria-label="Close gift card dialog">
                  <X size={18} />
                </button>
              </div>

              <div className="gift-card-modal-body">
                <div className="gift-card-image-shell is-modal">
                  <div>
                    <img src={giftCardImageSources[activeGiftCard.image]} alt={`${activeGiftCard.name} gift card`} />
                  </div>
                </div>

                <div className="gift-card-controls">
                  <label>
                    <span>Gift card value</span>
                    <select className="field" value={amountUsd} onChange={(event) => selectGiftCardDenomination(activeGiftCard.id, event.target.value)}>
                      {amounts.map((denomination) => (
                        <option key={denomination} value={denomination}>{usd(denomination)} · {formatCoinNumber(giftCardTier(denomination).requiredCoins)} Coins</option>
                      ))}
                    </select>
                  </label>
                  <div className="gift-card-selected-tier">
                    <span>{usd(amountUsd)}</span>
                    <strong>{formatCoinNumber(tier.requiredCoins)} Coins</strong>
                  </div>
                  <button className="btn-primary gift-card-redeem-button" type="button" onClick={() => handleGiftCardRedeem(activeGiftCard)}>
                    Redeem
                  </button>
                  {giftCardNotice?.optionId === activeGiftCard.id && (
                    <p className={`gift-card-redeem-caption ${giftCardNotice.kind === 'ready' ? 'is-ready' : ''}`}>{giftCardNotice.message}</p>
                  )}
                  <p className="gift-card-modal-note">Gift card delivery details will be requested only when live redemption is enabled. This screen does not deduct Coins.</p>
                </div>
              </div>
            </section>
          </div>,
          document.body
        );
      })()}
    </section>
  );
}

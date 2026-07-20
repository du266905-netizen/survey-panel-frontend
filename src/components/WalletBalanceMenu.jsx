import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWallet } from '../api/realApi';
import { useAuth } from './AuthContext';
import { useProfileSurvey } from './ProfileSurveyContext';
import { formatCoinNumber } from '../utils/formatters';
import { formatUsdEstimate, walletTransactionLabel } from '../utils/wallet';

function transactionTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function WalletBalanceMenu() {
  const { user, setUser } = useAuth();
  const { panelProfile } = useProfileSurvey();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    let active = true;
    setLoading(true);
    setLoadError(false);
    getWallet()
      .then((response) => {
        if (!active) return;
        setWalletData(response.data);
        if (response.data.wallet) {
          setUser({ ...user, coinsBalance: response.data.wallet.balance, coins: response.data.wallet.balance });
        }
      })
      .catch(() => {
        if (active) {
          setWalletData(null);
          setLoadError(true);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [open]);

  const balance = Number(walletData?.wallet?.balance ?? user?.coins ?? 0);
  const coinsPerUsd = Number(walletData?.exchangeRate?.coinsPerUsd || 1000);
  const balanceUsd = Number(walletData?.exchangeRate?.balanceUsd ?? balance / coinsPerUsd);
  const transactions = walletData?.transactions || [];

  return (
    <div ref={menuRef} className="app-wallet-menu hidden sm:block">
      <button
        className={`app-balance app-balance-trigger ${open ? 'is-open' : ''}`}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="app-balance-token" aria-hidden="true">
          <span className="coin-icon">◎</span>
        </span>
        <span className="app-balance-copy">
          <span className="app-balance-label">Coins balance</span>
          <span className="app-balance-amount"><strong>{formatCoinNumber(balance)}</strong><em>Coins</em></span>
        </span>
        <span className="app-balance-side">
          <span className="app-balance-estimate">≈ {formatUsdEstimate(balanceUsd, panelProfile?.country)}</span>
          <ChevronDown className="app-balance-chevron" size={15} aria-hidden="true" />
        </span>
      </button>

      {open && (
        <div className="app-wallet-dropdown" role="menu" aria-label="Wallet activity">
          <div className="app-wallet-dropdown-head">
            <div>
              <span>Recent activity</span>
              <strong>{formatCoinNumber(balance)} Coins available</strong>
            </div>
            <span>{formatUsdEstimate(balanceUsd, panelProfile?.country)}</span>
          </div>

          <div className="app-wallet-activity-list">
            {loading && <p className="app-wallet-dropdown-empty">Loading recent activity…</p>}
            {!loading && loadError && <p className="app-wallet-dropdown-empty">Wallet activity is temporarily unavailable.</p>}
            {!loading && !loadError && !transactions.length && <p className="app-wallet-dropdown-empty">No wallet activity yet.</p>}
            {!loading && !loadError && transactions.slice(0, 4).map((transaction) => {
              const coins = Number(transaction.coins || 0);
              return (
                <div key={transaction.id} className="app-wallet-activity-item">
                  <div>
                    <strong>{walletTransactionLabel(transaction)}</strong>
                    <span>{transactionTime(transaction.createdAt)}</span>
                  </div>
                  <b className={coins >= 0 ? 'is-positive' : 'is-negative'}>{coins >= 0 ? '+' : ''}{formatCoinNumber(coins)}</b>
                </div>
              );
            })}
          </div>

          <Link className="app-wallet-dropdown-link" to="/wallet" onClick={() => setOpen(false)} role="menuitem">
            Open reward wallet
          </Link>
        </div>
      )}
    </div>
  );
}

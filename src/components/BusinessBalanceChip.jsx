import { useEffect, useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import BusinessAddFundsModal from './BusinessAddFundsModal';
import { getBusinessAccountBalance } from '../api/realApi';
import { useLanguage } from './LanguageContext';

/* Account balance, shown in the research top bar just left of the notification
 * bell. Two lines: the label and amount on the left, the top-up action on the
 * right. Clicking anywhere opens the add-funds dialog, which carries the amount
 * field and the payment routes.
 *
 * The endpoint behind this figure is GET /api/business/account/balance, which the
 * backend already serves (businessCryptoBalanceRoutes.js); Codex's 2026-10-10 audit
 * corrected an earlier note here that claimed otherwise. PLACEHOLDER_BALANCE is only
 * the first-paint value — the fetched amount replaces it, and a failed or missing
 * response shows a dash rather than a misleading $0.00. */
const PLACEHOLDER_BALANCE = { amount: '$0.00', currency: 'USD' };

/* The backend returns `balance` already as a 2-decimal string plus a currency
 * code (see serializeBalance in businessCryptoBalanceService.js). */
function formatAmount(value, currency = 'USD') {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(numeric);
  } catch {
    return `$${numeric.toFixed(2)}`;
  }
}

export default function BusinessBalanceChip({ className = '' }) {
  const { language, publicCopy } = useLanguage();
  const uiMap = publicCopy?.workspace?.business?.workspaceUi || {};
  const ui = uiMap[language] || uiMap['en-US'] || {};

  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getBusinessAccountBalance()
      .then((payload) => {
        if (cancelled) return;
        const raw = payload?.balance;
        const amount = formatAmount(raw?.balance, raw?.currency);
        if (amount) setBalance({ amount, currency: raw.currency || 'USD' });
        else setUnavailable(true);
      })
      .catch(() => {
        // Not signed in, or the endpoint is not deployed yet. Show a dash rather
        // than "$0.00", which would read as a real zero balance.
        if (!cancelled) setUnavailable(true);
      });
    return () => { cancelled = true; };
  }, []);

  const shown = balance ? balance.amount : (unavailable ? '\u2014' : PLACEHOLDER_BALANCE.amount);
  const currency = balance ? balance.currency : (unavailable ? '' : PLACEHOLDER_BALANCE.currency);
  const label = (ui.balanceAria || 'Balance {amount}. Add funds.').replace('{amount}', shown);

  return (
    <>
    <button
      type="button"
      className={`business-workspace-balance ${className}`.trim()}
      onClick={() => setOpen(true)}
      aria-label={label}
    >
      <span className="business-workspace-balance-figure">
        <span className="business-workspace-balance-label">
          <Wallet size={12} aria-hidden="true" />
          {ui.balanceLabel || 'Balance'}
        </span>
        <span className="business-workspace-balance-amount">
          {shown}
          {currency ? (
            <span className="business-workspace-balance-currency">{currency}</span>
          ) : null}
        </span>
      </span>
      <span className="business-workspace-balance-add">
        <Plus size={12} aria-hidden="true" />
        <span className="business-workspace-balance-add-label">{ui.addFunds || 'Add funds'}</span>
      </span>
    </button>
    <BusinessAddFundsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

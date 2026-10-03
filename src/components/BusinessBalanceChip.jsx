import { useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import BusinessAddFundsModal from './BusinessAddFundsModal';
import { useLanguage } from './LanguageContext';

/* Account balance, shown in the research top bar just left of the notification
 * bell. Two lines: the label and amount on the left, the top-up action on the
 * right. Clicking anywhere opens the add-funds dialog, which carries the amount
 * field and the payment routes.
 *
 * The amount is still a placeholder: the client balance endpoint does not exist
 * yet. When it lands, replace PLACEHOLDER_BALANCE with the fetched value and
 * drop the TODO — nothing else in this component needs to change. */
const PLACEHOLDER_BALANCE = { amount: '$0.00', currency: 'USD' };

function formatAmount(balance) {
  return balance.amount;
}

export default function BusinessBalanceChip({ className = '' }) {
  const { language, publicCopy } = useLanguage();
  const uiMap = publicCopy?.workspace?.business?.workspaceUi || {};
  const ui = uiMap[language] || uiMap['en-US'] || {};

  const [open, setOpen] = useState(false);
  const balance = PLACEHOLDER_BALANCE;
  const shown = formatAmount(balance);
  // TODO: fetch the real balance once the endpoint exists; fall back to the
  // placeholder so the top bar never renders empty.
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
          {balance.currency ? (
            <span className="business-workspace-balance-currency">{balance.currency}</span>
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

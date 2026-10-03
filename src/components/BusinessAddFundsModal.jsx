import { useEffect, useRef, useState } from 'react';
import { Lock, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { createAlipayRecharge, createCryptoRecharge } from '../api/realApi';

/* "Add funds" dialog, modelled on the top-up sheet the client asked for: the
 * amount first (with quick picks), then the payment routes, then the security
 * note. It replaces the old standalone payment page as the in-app entry point;
 * the balance chip in the top bar opens it.
 *
 * Crypto and Alipay rows are live; bank transfer and PayPal still carry a data-method hook
 * so the real PayPal / Cryptomus / bank URLs can be dropped in without touching
 * the layout. The SSL note and the card marks mirror what the site already
 * claims elsewhere, and no card data is collected here: the routes hand off to
 * the provider. */

const QUICK_AMOUNTS = [100, 250, 500, 1000];
const MIN_TOP_UP = 100;

/* Official Cryptomus cube, pulled from their own CDN sprite
 * (cryptomus.com/public/sprites/shared-logo.*.svg). It is a single currentColor
 * path, so it inherits whatever colour we set. */
function CryptomusMark({ size = 13 }) {
  return (
    <svg width={size * 0.89} height={size} viewBox="0 0 32 36" fill="currentColor" aria-hidden="true">
      <path d="M30.611 8.507 16.935.61a2.01 2.01 0 0 0-2.005 0L1.254 8.507A2.01 2.01 0 0 0 .25 10.245v15.791c0 .713.384 1.378 1.004 1.738L14.93 35.67a2.03 2.03 0 0 0 2.008 0l13.677-7.896a2.01 2.01 0 0 0 1.004-1.738V10.245c0-.713-.385-1.378-1.004-1.738zM16.242 17.16a.62.62 0 0 1-.62 0L2.328 9.487l13.296-7.675a.64.64 0 0 1 .62 0l13.295 7.675zm-1.312 1.197q.146.084.312.142v15.743l-13.296-7.67a.62.62 0 0 1-.311-.537V10.684z" />
    </svg>
  );
}

/* Official marks, served from public/pay/. Each sits in an equal-sized box so
 * the row stays even despite wildly different aspect ratios (Visa is 3.1:1,
 * Mastercard 1.3:1). Cryptomus stays inline — it is a single currentColor path
 * taken from their own CDN sprite. */
const CARD_MARKS = [
  { src: '/pay/visa.svg', alt: 'Visa' },
  { src: '/pay/mastercard.png', alt: 'Mastercard' },
  { src: '/pay/amex.svg', alt: 'American Express' },
  { src: '/pay/paypal.svg', alt: 'PayPal' },
];

function CardMarks() {
  return (
    <span className="business-funds-cards">
      {CARD_MARKS.map((mark) => (
        <span className="business-funds-cardbox" key={mark.alt}>
          <img src={mark.src} alt={mark.alt} loading="lazy" />
        </span>
      ))}
      <span className="business-funds-cardbox is-cryptomus" title="Cryptomus">
        <CryptomusMark size={14} />
      </span>
    </span>
  );
}

export default function BusinessAddFundsModal({ open, onClose }) {
  const { language, publicCopy } = useLanguage();
  const uiMap = publicCopy?.workspace?.business?.workspaceUi || {};
  const ui = uiMap[language] || uiMap['en-US'] || {};

  const [amount, setAmount] = useState(String(MIN_TOP_UP));
  const [touched, setTouched] = useState(false);
  const [custom, setCustom] = useState(false);
  const [submitting, setSubmitting] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const numeric = Number(String(amount).replace(/[^0-9.]/g, ''));
  const valid = Number.isFinite(numeric) && numeric >= MIN_TOP_UP;

  return (
    <div className="business-funds-modal" role="dialog" aria-modal="true" aria-labelledby="business-funds-title">
      <button type="button" className="business-funds-scrim" aria-label={ui.closeDialog || 'Close'} onClick={onClose} />
      <section className="business-funds-panel">
        <button type="button" className="business-funds-close" onClick={onClose} aria-label={ui.closeDialog || 'Close'}>
          <X size={18} aria-hidden="true" />
        </button>

        <img className="business-funds-wordmark" src="/guanyisearch-wordmark.png" alt="GUANYISEARCH" />

        <header className="business-funds-head">
          <h2 id="business-funds-title">{ui.addFunds || 'Add funds'}</h2>
          <p>{ui.addFundsSubtitle || 'Top up your account to pay for research services.'}</p>
        </header>

        <div className="business-funds-amount">
          <label htmlFor="business-funds-input">{ui.amountLabel || 'Amount (USD)'}</label>
          <div className={`business-funds-input${touched && !valid ? ' is-invalid' : ''}`}>
            <span aria-hidden="true">$</span>
            <input
              id="business-funds-input"
              ref={inputRef}
              inputMode="decimal"
              placeholder={ui.customAmountPlaceholder || 'Enter an amount'}
              value={amount}
              onChange={(event) => { setAmount(event.target.value); setCustom(true); setTouched(true); }}
              onBlur={() => setTouched(true)}
            />
          </div>
          <div className="business-funds-quick">
            {QUICK_AMOUNTS.map((value) => (
              <button
                key={value}
                type="button"
                className={Number(amount) === value ? 'is-active' : ''}
                onClick={() => { setAmount(String(value)); setCustom(false); setTouched(true); }}
              >
                US${value}
              </button>
            ))}
            <button
              type="button"
              className={custom ? 'is-active' : ''}
              onClick={() => {
                setCustom(true);
                setAmount('');
                setTouched(false);
                inputRef.current?.focus();
              }}
            >
              {ui.customAmount || 'Custom'}
            </button>
          </div>
          <p className="business-funds-min">
            {(ui.minTopUp || 'Minimum top-up {amount}.').replace('{amount}', `US$${MIN_TOP_UP}`)}
          </p>
        </div>

        <div className="business-funds-routes">
          <a href="#" data-method="bank-transfer">
            <span className="business-funds-route-mark" aria-hidden="true">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18M12 3l9 5H3l9-5Z" /></svg>
            </span>
            <span className="business-funds-route-copy">
              <strong>Bank transfer</strong>
            </span>
            <span className="business-funds-route-go" aria-hidden="true">›</span>
          </a>
          <a href="#" data-method="paypal">
            <span className="business-funds-route-mark is-paypal" aria-hidden="true">
              <img src="/pay/paypal-monogram.png" alt="" />
            </span>
            <span className="business-funds-route-copy">
              <strong>PayPal or credit card</strong>
            </span>
            <span className="business-funds-route-go" aria-hidden="true">›</span>
          </a>
          {/* Crypto and Alipay are wired: each creates a recharge order and
              hands off to the provider cashier. Bank transfer and PayPal are
              still placeholders (no backend route yet). */}
          <button
            type="button"
            data-method="crypto"
            onClick={() => startPayment('crypto')}
            disabled={!valid || Boolean(submitting)}
          >
            <span className="business-funds-route-mark is-cryptomus" aria-hidden="true">
              <CryptomusMark size={19} />
            </span>
            <span className="business-funds-route-copy">
              <strong>Cryptocurrency</strong>
            </span>
            <span className="business-funds-route-go" aria-hidden="true">
              {submitting === 'crypto' ? '…' : '›'}
            </span>
          </button>
          <button
            type="button"
            data-method="alipay"
            onClick={() => startPayment('alipay')}
            disabled={!valid || Boolean(submitting)}
          >
            <span className="business-funds-route-mark is-alipay" aria-hidden="true">
              <img src="/pay/alipay.png" alt="" />
            </span>
            <span className="business-funds-route-copy">
              <strong>Alipay</strong>
            </span>
            <span className="business-funds-route-go" aria-hidden="true">
              {submitting === 'alipay' ? '…' : '›'}
            </span>
          </button>
        </div>

        {error ? <p className="business-funds-error" role="alert">{error}</p> : null}

        <footer className="business-funds-secure">
          <Lock size={17} aria-hidden="true" />
          <span className="business-funds-secure-copy">
            <strong>{ui.securePaymentTitle || 'SSL secure payment'}</strong>
            <small>{ui.securePaymentBody || 'Your information is protected by 256-bit SSL encryption.'}</small>
          </span>
          <CardMarks />
        </footer>
      </section>
    </div>
  );
}

export { MIN_TOP_UP };

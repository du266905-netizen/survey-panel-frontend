import { useEffect, useRef, useState } from 'react';
import { Lock, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { createCryptoRecharge } from '../api/realApi';
import PayPalCheckout from './PayPalCheckout';


/* "Add funds" dialog, modelled on the top-up sheet the client asked for: the
 * amount first (with quick picks), then the payment routes, then the security
 * note. It replaces the old standalone payment page as the in-app entry point;
 * the balance chip in the top bar opens it.
 *
 * Crypto, Alipay and PayPal rows are live; bank transfer and card remain
 * placeholders until their backend routes and provider contracts exist. The SSL note and the card marks mirror what the site already
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
  // UnionPay third, PayPal fourth, at the client's instruction.
  { src: '/pay/unionpay.webp', alt: 'UnionPay' },
  { src: '/pay/paypal.svg', alt: 'PayPal' },
  { src: '/pay/amex.svg', alt: 'American Express' },
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
  // Copy that used to be hardcoded English in this file now comes from the
  // language library, keyed by language.
  const workspaceStaticMap = publicCopy?.workspace?.business?.workspaceStatic || {};
  const ws = workspaceStaticMap[language] || workspaceStaticMap['en-GB'] || {};

  const [amount, setAmount] = useState(String(MIN_TOP_UP));
  const [touched, setTouched] = useState(false);
  const [custom, setCustom] = useState(false);
  const [submitting, setSubmitting] = useState('');
  const [cardOpen, setCardOpen] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
  }, [open]);

  if (!open) return null;

  /* Both payment lines do the same thing: create an order on the backend, then
   * hand the buyer to the provider's cashier. Nothing is credited here — the
   * backend only credits on a signature-verified async notification or a
   * verified trade query, so this is purely a redirect. */
  /* 只剩加密货币需要跳转收银台；银行卡交给 PayPal 的托管组件，
     银行电汇仍是人工确认，都不走这个函数。 */
  const startPayment = async (method) => {
    if (!valid || submitting || method !== 'crypto') return;
    setError('');
    setSubmitting(method);
    try {
      const amountUsd = numeric.toFixed(2);
      const payload = await createCryptoRecharge({
        amountUsd,
        idempotencyKey: `crypto:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`,
      });
      const checkoutUrl = payload?.payment?.checkoutUrl;
      if (!checkoutUrl) throw new Error('NO_CHECKOUT_URL');
      window.location.href = checkoutUrl;
    } catch {
      setError(ui.paymentFailed || 'We could not start this payment. Please try again.');
    } finally {
      setSubmitting('');
    }
  };

  const numeric = Number(String(amount).replace(/[^0-9.]/g, ''));
  const valid = Number.isFinite(numeric) && numeric >= MIN_TOP_UP;

  return (
    <div className="business-funds-modal" role="dialog" aria-modal="true" aria-labelledby="business-funds-title">
      <button type="button" className="business-funds-scrim" aria-label={ui.closeDialog || ws.funds.close} onClick={onClose} />
      <section className="business-funds-panel">
        <button type="button" className="business-funds-close" onClick={onClose} aria-label={ui.closeDialog || ws.funds.close}>
          <X size={18} aria-hidden="true" />
        </button>

        <img className="business-funds-wordmark" src="/guanyisearch-wordmark.png" alt="GUANYISEARCH" />

        <header className="business-funds-head">
          <h2 id="business-funds-title">{ui.addFunds || 'Add funds'}</h2>
          <p>{ui.addFundsSubtitle || ws.funds.subtitle}</p>
        </header>

        <div className="business-funds-amount">
          <label htmlFor="business-funds-input">{ui.amountLabel || ws.funds.amountLabel}</label>
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
            {(ui.minTopUp || ws.funds.minTopUp).replace('{amount}', `US$${MIN_TOP_UP}`)}
          </p>
        </div>

        <div className="business-funds-routes">
          {/* 电汇要走线下汇款指令，这条链路还没接：明确标成暂不可用，
              不摆一个点不动的 href="#"。 */}
          <button
            type="button"
            data-method="bank-transfer"
            disabled
            aria-disabled="true"
            title="Bank transfer is not available from this screen yet."
          >
            <span className="business-funds-route-mark" aria-hidden="true">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18" /><path d="M5 10V8l7-4 7 4v2" /><path d="M6 10v8" /><path d="M10 10v8" /><path d="M14 10v8" /><path d="M18 10v8" /><path d="M3 20h18" /></svg>
            </span>
            <span className="business-funds-route-copy">
              <strong>{ws.funds.bankTransfer}</strong>
              <small>Not available from this screen yet.</small>
            </span>
            <span className="business-funds-route-go" aria-hidden="true">—</span>
          </button>
          {/* PayPal 不再是独立一行：它的官方组件（Buttons + CardFields）
              就是“信用卡 / 银行卡”这一条的实现，合并成一行。 */}
          <button
            type="button"
            data-method="card"
            onClick={() => setCardOpen((value) => !value)}
            disabled={!valid || Boolean(submitting)}
            aria-expanded={cardOpen}
          >
            <span className="business-funds-route-mark" aria-hidden="true">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
            </span>
            <span className="business-funds-route-copy">
              <strong>{ws.funds.card || 'Credit or debit card'}</strong>
            </span>
            <span className="business-funds-route-go" aria-hidden="true">{cardOpen ? '⌃' : '›'}</span>
          </button>
          {/* Crypto, Alipay and PayPal are wired: each creates a recharge
              order and hands off to the provider cashier. Bank transfer and
              card are still placeholders. */}
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
              <strong>{ws.funds.crypto}</strong>
            </span>
            <span className="business-funds-route-go" aria-hidden="true">
              {submitting === 'crypto' ? '…' : '›'}
            </span>
          </button>
        </div>

        {cardOpen && (
          <div className="business-funds-cardpanel">
            <PayPalCheckout
              amountUsd={valid ? numeric.toFixed(2) : ''}
              disabled={!valid}
              copy={PAYPAL_COPY}
              onPaid={() => { setCardOpen(false); setError(''); onClose(); }}
              onError={(message) => setError(message)}
            />
          </div>
        )}

        {error ? <p className="business-funds-error" role="alert">{error}</p> : null}

        <footer className="business-funds-secure">
          <Lock size={17} aria-hidden="true" />
          <span className="business-funds-secure-copy">
            <strong>{ui.securePaymentTitle || ws.funds.secureTitle}</strong>
            <small>{ui.securePaymentBody || ws.funds.secureBody}</small>
          </span>
          <CardMarks />
        </footer>
      </section>
    </div>
  );
}

/** PayPal 托管组件自己的文案；卡字段附近必须有隐私告知（PayPal 要求）。 */
const PAYPAL_COPY = {
  loading: 'Loading PayPal…',
  unavailable: 'PayPal is not available right now. Please try again later, or reach us from the help chat.',
  cardUnavailable: 'Card entry is not enabled for this account yet — you can still pay with PayPal.',
  privacy: 'Card details are entered in PayPal’s secure fields and never on this site. See',
  privacyLink: 'PayPal’s privacy statement',
  startFailed: 'We could not start the PayPal payment. Please try again.',
  captureFailed: 'PayPal did not complete the payment. Nothing was added to your balance.',
  cancelled: 'PayPal payment cancelled.',
};

export { MIN_TOP_UP };

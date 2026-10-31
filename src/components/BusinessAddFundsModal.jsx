import { useEffect, useRef, useState } from 'react';
import { Lock, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { createAlipayRecharge, createAirwallexRecharge, createCryptoRecharge, createPaypalRecharge, getAirwallexCapability, getPaypalRecharge } from '../api/realApi';
import { createPaypalAttemptTracker } from './paypalAttempt';

/* "Add funds" dialog, modelled on the top-up sheet the client asked for: the
 * amount first (with quick picks), then the payment routes, then the security
 * note. It replaces the old standalone payment page as the in-app entry point;
 * the balance chip in the top bar opens it.
 *
 * Crypto, Alipay and PayPal rows are live. Card and bank transfer are Airwallex
 * routes: they only appear when the server reports the method as enabled, and
 * both hand off (card) or show transfer instructions (bank). No card data is
 * collected here. See docs/AIRWALLEX-TOPUP-v1-contract.md. */

const QUICK_AMOUNTS = [100, 250, 500, 1000];
const MIN_TOP_UP = 100;

/* Bank transfer is the only route where the buyer leaves the modal with a
 * second task (send the money, quote the reference). Keep its copy next to the
 * flow it belongs to; zh/en are the two reviewed locales, other locales fall
 * back to English until the language library catches up. */
const TRANSFER_COPY = {
  zh: {
    title: '银行电汇信息',
    intro: '请通过网银或柜台汇款。附言/汇款用途里必须填写下面的参考号，否则我们可能无法把这笔钱记到你的账户。',
    reference: '参考号（必填）',
    beneficiary: '收款人',
    bank: '开户行',
    account: '账号 / IBAN',
    swift: 'SWIFT / BIC',
    amount: '汇款金额',
    expires: '请在此时间前完成汇款',
    copy: '复制',
    copied: '已复制',
    note: '电汇到账后余额会自动更新，通常需要 1–3 个工作日；这笔订单在到账前保持“待付款”。',
    done: '完成',
    unavailable: '这个支付方式暂不可用。',
  },
  en: {
    title: 'Bank transfer details',
    intro: 'Send the transfer from your bank. The reference below must appear in the payment reference, or we may not be able to credit your account.',
    reference: 'Reference (required)',
    beneficiary: 'Beneficiary',
    bank: 'Bank',
    account: 'Account / IBAN',
    swift: 'SWIFT / BIC',
    amount: 'Amount',
    expires: 'Send before',
    copy: 'Copy',
    copied: 'Copied',
    note: 'Your balance updates once the transfer arrives, usually within 1–3 business days. The order stays pending until then.',
    done: 'Done',
    unavailable: 'This payment method is not available right now.',
  },
};

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
  const [error, setError] = useState('');
  const [capability, setCapability] = useState(null);
  const [transfer, setTransfer] = useState(null);
  const [copied, setCopied] = useState('');
  const inputRef = useRef(null);
  const paypalAttempt = useRef(null);
  if (!paypalAttempt.current) paypalAttempt.current = createPaypalAttemptTracker();

  const text = language?.startsWith('zh') ? TRANSFER_COPY.zh : TRANSFER_COPY.en;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  /* Which Airwallex routes exist is a server fact, not a UI guess: an unopened
   * method must not render a button that cannot work. A failed lookup hides the
   * rows rather than showing them as "available". */
  useEffect(() => {
    if (!open) return undefined;
    let active = true;
    getAirwallexCapability()
      .then((data) => { if (active) setCapability(data || null); })
      .catch(() => { if (active) setCapability(null); });
    return () => { active = false; };
  }, [open]);

  useEffect(() => {
    if (!open && paypalAttempt.current) paypalAttempt.current.reset();
  }, [open]);

  if (!open) return null;

  /* Both payment lines do the same thing: create an order on the backend, then
   * hand the buyer to the provider's cashier. Nothing is credited here — the
   * backend only credits on a signature-verified async notification or a
   * verified trade query, so this is purely a redirect. */
  const startPayment = async (method) => {
    if (!valid || submitting) return;
    const isPaypal = method === 'paypal';
    // React state cannot stop a second click in the same tick. The tracker's
    // synchronous lock does; its key also survives a retry for the same amount.
    if (isPaypal && !paypalAttempt.current.begin()) return;
    setError('');
    setSubmitting(method);
    try {
      const amountUsd = numeric.toFixed(2);
      if (isPaypal) {
        const idempotencyKey = paypalAttempt.current.keyFor(amountUsd);
        const payload = await createPaypalRecharge({ amountUsd, idempotencyKey });
        let payment = payload?.payment;
        // If the create response is missing the approval link, query the
        // order once by its local order id before treating it as a failure.
        if (!payment?.approveUrl && payment?.orderId) {
          const queried = await getPaypalRecharge(payment.orderId);
          payment = queried?.payment || payment;
        }
        if (!payment?.approveUrl) throw new Error('NO_APPROVE_URL');
        window.location.assign(payment.approveUrl);
        return;
      }

      if (method === 'airwallex-card' || method === 'airwallex-bank') {
        const payment = (await createAirwallexRecharge({
          amountUsd: numeric.toFixed(2),
          method: method === 'airwallex-card' ? 'card' : 'bank_transfer',
          returnUrl: `${window.location.origin}/business/workspace?recharge=return`,
          idempotencyKey: `airwallex:${method}:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`,
        }))?.payment;
        if (method === 'airwallex-bank') {
          // The buyer stays here: the money moves bank-to-bank, and the order
          // only becomes "paid" when the provider or finance confirms it.
          if (!payment?.transfer?.reference) throw new Error('NO_TRANSFER_DETAILS');
          setTransfer(payment.transfer);
          return;
        }
        if (!payment?.checkoutUrl) throw new Error('NO_CHECKOUT_URL');
        window.location.assign(payment.checkoutUrl);
        return;
      }

      const payload = method === 'alipay'
        ? await createAlipayRecharge({
            amountUsd,
            description: ui.addFunds || 'Account top-up',
            returnUrl: `${window.location.origin}/business/workspace`,
            idempotencyKey: `alipay:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`,
          })
        : await createCryptoRecharge({
            amountUsd,
            idempotencyKey: `crypto:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`,
          });

      const checkoutUrl = payload?.payment?.checkoutUrl;
      if (!checkoutUrl) throw new Error('NO_CHECKOUT_URL');
      window.location.href = checkoutUrl;
    } catch (failure) {
      const code = failure?.response?.data?.code;
      if (code === 'ALIPAY_NOT_CONFIGURED') setError(ui.alipayUnavailable || 'Alipay is not available yet.');
      else if (code === 'AIRWALLEX_NOT_CONFIGURED' || code === 'AIRWALLEX_METHOD_UNAVAILABLE') setError(text.unavailable);
      else setError(ui.paymentFailed || 'We could not start this payment. Please try again.');
    } finally {
      if (isPaypal) paypalAttempt.current.end();
      setSubmitting('');
    }
  };

  const numeric = Number(String(amount).replace(/[^0-9.]/g, ''));
  const valid = Number.isFinite(numeric) && numeric >= MIN_TOP_UP;
  const methodEnabled = (id) => Boolean(capability?.enabled)
    && Boolean((capability?.methods || []).find((item) => item.id === id)?.enabled);
  const copyValue = async (field, value) => {
    try {
      await navigator.clipboard.writeText(String(value || ''));
      setCopied(field);
      window.setTimeout(() => setCopied(''), 1500);
    } catch { /* Clipboard permission is optional. */ }
  };

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

        {transfer ? (
          <section className="business-funds-transfer">
            <header>
              <h3>{text.title}</h3>
              <p>{text.intro}</p>
            </header>
            <dl>
              <div>
                <dt>{text.amount}</dt>
                <dd>{transfer.currency} {transfer.amount}</dd>
              </div>
              <div className="is-reference">
                <dt>{text.reference}</dt>
                <dd>{transfer.reference}</dd>
                <button type="button" onClick={() => copyValue('reference', transfer.reference)}>{copied === 'reference' ? text.copied : text.copy}</button>
              </div>
              <div>
                <dt>{text.beneficiary}</dt>
                <dd>{transfer.beneficiaryName}</dd>
              </div>
              <div>
                <dt>{text.bank}</dt>
                <dd>{transfer.bankName}</dd>
              </div>
              <div>
                <dt>{text.account}</dt>
                <dd>{transfer.accountNumber}</dd>
                <button type="button" onClick={() => copyValue('account', transfer.accountNumber)}>{copied === 'account' ? text.copied : text.copy}</button>
              </div>
              <div>
                <dt>{text.swift}</dt>
                <dd>{transfer.swiftCode}</dd>
              </div>
              {transfer.expiresAt ? (
                <div>
                  <dt>{text.expires}</dt>
                  <dd>{new Date(transfer.expiresAt).toLocaleString(language)}</dd>
                </div>
              ) : null}
            </dl>
            <p className="business-funds-transfer-note">{text.note}</p>
            <button type="button" className="business-funds-transfer-done" onClick={() => { setTransfer(null); onClose(); }}>{text.done}</button>
          </section>
        ) : (
        <div className="business-funds-routes">
          {methodEnabled('bank_transfer') && (
            <button
              type="button"
              data-method="bank-transfer"
              onClick={() => startPayment('airwallex-bank')}
              disabled={!valid || Boolean(submitting)}
            >
              <span className="business-funds-route-mark" aria-hidden="true">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18M12 3l9 5H3l9-5Z" /></svg>
              </span>
              <span className="business-funds-route-copy">
                <strong>{ws.funds.bankTransfer}</strong>
              </span>
              <span className="business-funds-route-go" aria-hidden="true">{submitting === 'airwallex-bank' ? '…' : '›'}</span>
            </button>
          )}
          <button
            type="button"
            data-method="paypal"
            onClick={() => startPayment('paypal')}
            disabled={!valid || Boolean(submitting)}
          >
            <span className="business-funds-route-mark is-paypal" aria-hidden="true">
              <img src="/pay/paypal-monogram.png" alt="" />
            </span>
            <span className="business-funds-route-copy">
              <strong>{ws.funds.paypal || 'PayPal'}</strong>
            </span>
            <span className="business-funds-route-go" aria-hidden="true">
              {submitting === 'paypal' ? '…' : '›'}
            </span>
          </button>
          {/* PayPal and card used to share one row ("PayPal or credit card").
              The client asked for them split, so each now has its own route. */}
          {methodEnabled('card') && (
            <button
              type="button"
              data-method="card"
              onClick={() => startPayment('airwallex-card')}
              disabled={!valid || Boolean(submitting)}
            >
              <span className="business-funds-route-mark" aria-hidden="true">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
              </span>
              <span className="business-funds-route-copy">
                <strong>{ws.funds.card || 'Credit or debit card'}</strong>
              </span>
              <span className="business-funds-route-go" aria-hidden="true">{submitting === 'airwallex-card' ? '…' : '›'}</span>
            </button>
          )}
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
              <strong>{ws.funds.alipay}</strong>
            </span>
            <span className="business-funds-route-go" aria-hidden="true">
              {submitting === 'alipay' ? '…' : '›'}
            </span>
          </button>
          {/* Crypto, Alipay and PayPal are wired: each creates a recharge
              order and hands off to the provider cashier. Card and bank
              transfer are server-gated Airwallex routes. */}
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

export { MIN_TOP_UP };

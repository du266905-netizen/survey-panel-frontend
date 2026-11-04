import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Landmark, Link2, Lock, X } from 'lucide-react';
import BusinessRail from '../components/BusinessRail';
import PayPalCheckout from '../components/PayPalCheckout';
import CryptomusMark from '../components/CryptomusMark';
import BusinessBillingProfile, { isBillingComplete, useBillingProfile } from '../components/BusinessBillingProfile';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { createCryptoRecharge, createPaymentLink, getBusinessAccountBalance } from '../api/realApi';
import { loadPaymentChannels } from '../api/paymentChannels';
import { MIN_TOP_UP } from '../constants/fundsLimits';
import { PAYPAL_COPY } from '../constants/paypalCheckoutCopy';
import './BusinessAddFunds.css';

/* The add-funds dialog.
 *
 * One sheet over the workspace: the choices on the left, the account on the
 * right — balance, what this top-up adds, the security note and marks the
 * account rail always carried, and a single "agree and pay". The payer chooses
 * how to pay, but there is one button, and when something is missing it says
 * what and walks them to the field instead of sitting disabled.
 *
 * Card is shown but shut: the row is greyed with the upgrade note and no
 * provider component is mounted. Nothing is credited here — crypto hands off
 * to the hosted cashier, bank transfer continues on its own page, and a link
 * is created server-side and shown in a second, smaller dialog on top. */
const QUICK_AMOUNTS = [100, 250, 500, 1000];

const PAYMENT_MARKS = [
  { src: '/pay/visa.svg', alt: 'Visa' },
  { src: '/pay/mastercard.png', alt: 'Mastercard' },
  { src: '/pay/amex.svg', alt: 'American Express' },
  { src: '/pay/unionpay.webp', alt: 'UnionPay' },
  { src: '/pay/paypal.svg', alt: 'PayPal' },
];

const pageCopy = {
  'zh-CN': {
    back: '返回',
    close: '关闭',
    amountSection: '充值金额',
    amountOnce: '一次性充值',
    customAmount: '自定义金额',
    customPlaceholder: '输入金额',
    methodTitle: '付款方式',
    methodCard: '银行卡',
    methodCardOff: '通道升级中，暂不可用',
    methodCardHint: '借记卡或信用卡',
    methodBank: '银行转账',
    methodBankHint: '从您的银行账户汇出，适合较大金额',
    methodLink: '付款链接',
    methodLinkHint: '生成后发给付款方，24 小时内有效',
    methodCrypto: '加密货币',
    methodCryptoHint: '为习惯数字资产结算的付款方保留，收款由托管方完成',
    rowBalance: '余额',
    rowAmount: '本次充值',
    rowDue: '应付金额',
    agreePay: '同意支付',
    invoiceNote: '每笔完成的付款都会自动开具发票，可在「发票与账单」中下载。',
    amountInvalid: '请输入不低于最低充值额的金额。',
    completeForm: '请先完成账单信息。',
    needBillingHint: '带红框的字段还没填。',
    linkTitle: '付款链接已创建',
    linkBody: '把链接发给付款方，金额已经固定，24 小时内有效。',
    linkCopy: '复制链接',
    linkCopied: '已复制',
    linkDone: '完成',
    linkFailed: '生成失败，请稍后再试。',
    paymentFailed: '暂时无法发起这笔付款，请稍后再试。',
    opening: '正在打开…',
    creating: '正在生成…',
  },
};

const pageCopyEn = {
  back: 'Back',
  close: 'Close',
  amountSection: 'Amount',
  amountOnce: 'one-time top-up',
  customAmount: 'Custom amount',
  customPlaceholder: 'Enter an amount',
  methodTitle: 'Payment method',
  methodCard: 'Card',
  methodCardOff: 'Channel being upgraded — not available yet',
  methodCardHint: 'Debit or credit card',
  methodBank: 'Bank transfer',
  methodBankHint: 'Paid from your bank account; suits larger amounts',
  methodLink: 'Payment link',
  methodLinkHint: 'Send it to whoever is paying; valid for 24 hours',
  methodCrypto: 'Cryptocurrency',
  methodCryptoHint: 'Kept for payers who settle in digital assets; collected by a custodian',
  rowBalance: 'Balance',
  rowAmount: 'This top-up',
  rowDue: 'Amount due',
  agreePay: 'Agree and pay',
  invoiceNote: 'Every completed payment issues an invoice, downloadable under Invoices and billing.',
  amountInvalid: 'Enter an amount at or above the minimum.',
  completeForm: 'Complete the billing details first.',
  needBillingHint: 'The outlined fields are still empty.',
  linkTitle: 'Payment link created',
  linkBody: 'Send it to whoever is paying. The amount is fixed and the link lasts 24 hours.',
  linkCopy: 'Copy link',
  linkCopied: 'Copied',
  linkDone: 'Done',
  linkFailed: 'Could not create the link. Try again in a moment.',
  paymentFailed: 'We could not start this payment. Please try again.',
  opening: 'Opening…',
  creating: 'Creating…',
};

function readBalance(payload) {
  const raw = payload?.balance;
  const value = Number(raw?.balance);
  if (!Number.isFinite(value)) return null;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: raw.currency || 'USD' }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export default function BusinessAddFunds() {
  const navigate = useNavigate();
  const { language, publicCopy } = useLanguage();
  const uiMap = publicCopy?.workspace?.business?.workspaceUi || {};
  const ui = uiMap[language] || uiMap['en-US'] || {};
  const workspaceStaticMap = publicCopy?.workspace?.business?.workspaceStatic || {};
  const ws = workspaceStaticMap[language] || workspaceStaticMap['en-GB'] || {};
  const copy = pageCopy[language] || pageCopyEn;

  const [amount, setAmount] = useState(String(MIN_TOP_UP));
  const [custom, setCustom] = useState(false);
  const [touched, setTouched] = useState(false);
  const [method, setMethod] = useState('bank');
  const [channels, setChannels] = useState({ card: false, crypto: true, bankTransfer: true });
  const [submitting, setSubmitting] = useState('');
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkBusy, setLinkBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [billingMissing, setBillingMissing] = useState(false);
  const billing = useBillingProfile();
  const inputRef = useRef(null);
  const amountRef = useRef(null);
  const billingRef = useRef(null);

  const close = () => navigate(withLanguage('/business/workspace', language));

  useEffect(() => {
    let alive = true;
    getBusinessAccountBalance()
      .then((payload) => { if (alive) setBalance(readBalance(payload)); })
      .catch(() => { /* show a dash; the dialog still works */ });
    loadPaymentChannels().then((methods) => {
      if (!alive) return;
      setChannels(methods);
      if (!methods.card) setMethod((current) => (current === 'card' ? 'bank' : current));
    });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const billingReady = isBillingComplete(billing.profile);
  const numeric = Number(String(amount).replace(/[^0-9.]/g, ''));
  const valid = Number.isFinite(numeric) && numeric >= MIN_TOP_UP;
  const money = useMemo(
    () => new Intl.NumberFormat(language, { style: 'currency', currency: 'USD' }),
    [language],
  );
  const amountLabel = valid ? money.format(numeric) : '—';
  const methodLabel = method === 'bank' ? copy.methodBank
    : method === 'link' ? copy.methodLink
      : method === 'card' ? copy.methodCard
        : copy.methodCrypto;

  /* Once the fields are complete the outlines go away by themselves. */
  useEffect(() => {
    if (billingReady && billingMissing) setBillingMissing(false);
  }, [billingReady, billingMissing]);

  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  const startCrypto = async () => {
    setError('');
    setSubmitting('crypto');
    try {
      const payload = await createCryptoRecharge({
        amountUsd: numeric.toFixed(2),
        idempotencyKey: `crypto:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`,
      });
      const checkoutUrl = payload?.payment?.checkoutUrl;
      if (!checkoutUrl) throw new Error('NO_CHECKOUT_URL');
      window.location.href = checkoutUrl;
    } catch {
      setError(copy.paymentFailed);
    } finally {
      setSubmitting('');
    }
  };

  const createLink = async () => {
    setError('');
    setLinkBusy(true);
    try {
      /* One day, set by us: a link is for topping up, and 24h is long enough
         for the payer to open it. */
      const expiresAt = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
      const payload = await createPaymentLink({
        amountCents: Math.round(numeric * 100),
        currency: 'USD',
        purpose: '余额充值',
        expiresAt,
      }, `link:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`);
      setLinkUrl(payload?.url || '');
      setCopied(false);
    } catch (failure) {
      setError(failure?.response?.data?.code === 'BILLING_PROFILE_REQUIRED' ? copy.completeForm : copy.linkFailed);
    } finally {
      setLinkBusy(false);
    }
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const field = document.createElement('textarea');
      field.value = text;
      document.body.appendChild(field);
      field.select();
      const done = document.execCommand('copy');
      field.remove();
      return done;
    }
  };

  const goBankTransfer = () => {
    navigate(withLanguage(`/business/add-funds/bank-transfer${valid ? `?amount=${numeric}` : ''}`, language));
  };

  /* One button. What it does depends on what is still missing, and when the
     billing profile is the gap it walks the payer to the field rather than
     leaving a disabled button to explain nothing. */
  const handleSubmit = () => {
    if (submitting || linkBusy) return;

    if (!valid) {
      setTouched(true);
      setError(copy.amountInvalid);
      amountRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      inputRef.current?.focus();
      return;
    }

    if (!billingReady) {
      setBillingMissing(true);
      setError(`${copy.completeForm} ${copy.needBillingHint}`);
      billingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const first = billingRef.current?.querySelector('.is-missing input, .is-missing select');
      first?.focus({ preventScroll: true });
      return;
    }

    setError('');
    if (method === 'bank') { goBankTransfer(); return; }
    if (method === 'link') { createLink(); return; }
    if (method === 'card') {
      document.querySelector('.business-topup-cardpanel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    startCrypto();
  };

  const finishLink = () => {
    setLinkUrl('');
    close();
  };

  return (
    <main className="business-account-page business-topup-screen">
      <BusinessRail activeId="billing" onSelect={handleRailSelect} />

      <div className="business-topup-dialog" role="dialog" aria-modal="true" aria-labelledby="business-topup-title">
        <button type="button" className="business-topup-scrim" aria-label={copy.close} onClick={close} />
        <section className="business-topup-card">
          <div className="business-topup-main">
            <div className="business-topup-top">
              <button type="button" className="business-topup-back" onClick={close}>
                <ArrowLeft size={16} aria-hidden="true" /> {copy.back}
              </button>
              <button type="button" className="business-topup-close" onClick={close} aria-label={copy.close}>
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <h2 id="business-topup-title" className="business-topup-title">{ui.addFunds || 'Add funds'}</h2>
            <p className="business-topup-subtitle">{ui.addFundsSubtitle || ws.funds.subtitle}</p>

            <section className="business-topup-section" ref={amountRef}>
              <div className="business-topup-label">{copy.amountSection}</div>
              <div className="business-topup-amounts">
                {QUICK_AMOUNTS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`business-topup-amount${!custom && Number(amount) === value ? ' is-active' : ''}`}
                    onClick={() => { setAmount(String(value)); setCustom(false); setTouched(true); setError(''); }}
                  >
                    <strong>{money.format(value)}</strong>
                    <small>{copy.amountOnce}</small>
                  </button>
                ))}
              </div>

              <label className="business-topup-custom">
                <span>{copy.customAmount}</span>
                <span className={`business-topup-input${touched && !valid ? ' is-invalid' : ''}`}>
                  <i aria-hidden="true">$</i>
                  <input
                    ref={inputRef}
                    inputMode="decimal"
                    placeholder={copy.customPlaceholder}
                    value={custom ? amount : ''}
                    onFocus={() => setCustom(true)}
                    onChange={(event) => { setAmount(event.target.value); setCustom(true); setTouched(true); }}
                    onBlur={() => setTouched(true)}
                  />
                </span>
              </label>

              <div className="business-topup-hint">
                {(ui.minTopUp || ws.funds.minTopUp || '').replace('{amount}', money.format(MIN_TOP_UP))}
              </div>
            </section>

            <section className="business-topup-section">
              <div className="business-topup-label">{copy.methodTitle}</div>
              <div className="business-topup-methods" role="radiogroup" aria-label={copy.methodTitle}>
                {/* The card row is shown, not hidden, and it does not pretend to
                    work: no provider component is mounted while the channel is
                    closed. */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={method === 'card'}
                  aria-disabled={!channels.card}
                  disabled={!channels.card}
                  className={`business-topup-method${method === 'card' ? ' is-active' : ''}`}
                  onClick={() => setMethod('card')}
                >
                  <span className="business-topup-method-mark" aria-hidden="true"><CreditCard size={17} /></span>
                  <span className="business-topup-method-copy">
                    <strong>{copy.methodCard}</strong>
                    <small>{channels.card ? copy.methodCardHint : copy.methodCardOff}</small>
                  </span>
                  <span className="business-topup-radio" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={method === 'bank'}
                  className={`business-topup-method${method === 'bank' ? ' is-active' : ''}`}
                  onClick={() => setMethod('bank')}
                >
                  <span className="business-topup-method-mark" aria-hidden="true"><Landmark size={17} /></span>
                  <span className="business-topup-method-copy">
                    <strong>{copy.methodBank}</strong>
                    <small>{copy.methodBankHint}</small>
                  </span>
                  <span className="business-topup-radio" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={method === 'link'}
                  className={`business-topup-method${method === 'link' ? ' is-active' : ''}`}
                  onClick={() => setMethod('link')}
                >
                  <span className="business-topup-method-mark" aria-hidden="true"><Link2 size={17} /></span>
                  <span className="business-topup-method-copy">
                    <strong>{copy.methodLink}</strong>
                    <small>{copy.methodLinkHint}</small>
                  </span>
                  <span className="business-topup-radio" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={method === 'crypto'}
                  className={`business-topup-method${method === 'crypto' ? ' is-active' : ''}`}
                  onClick={() => setMethod('crypto')}
                >
                  <span className="business-topup-method-mark is-cryptomus" aria-hidden="true"><CryptomusMark size={17} /></span>
                  <span className="business-topup-method-copy">
                    <strong>{copy.methodCrypto}</strong>
                    <small>{copy.methodCryptoHint}</small>
                  </span>
                  <span className="business-topup-radio" aria-hidden="true" />
                </button>
              </div>

              {method === 'card' && channels.card ? (
                <div className="business-topup-cardpanel">
                  <PayPalCheckout
                    amountUsd={valid ? numeric.toFixed(2) : ''}
                    disabled={!valid || !billingReady}
                    copy={PAYPAL_COPY}
                    onPaid={() => { setError(''); close(); }}
                    onError={(message) => setError(message)}
                  />
                </div>
              ) : null}
            </section>

            <section className="business-topup-section" ref={billingRef}>
              <BusinessBillingProfile billing={billing} embedded highlightMissing={billingMissing} />
            </section>
          </div>

          <aside className="business-topup-summary">
            {/* The account rail the page always had: balance first, then what
                this top-up adds, then the lock and the accepted marks. */}
            <div>
              <div className="business-topup-label">{copy.rowBalance}</div>
              <div className="business-topup-balance">{balance || '—'}</div>
            </div>

            <dl className="business-topup-rows">
              <div><dt>{copy.rowAmount}</dt><dd>{amountLabel}</dd></div>
              <div><dt>{copy.methodTitle}</dt><dd>{methodLabel}</dd></div>
              <div><dt>{copy.rowDue}</dt><dd>{amountLabel}</dd></div>
            </dl>

            <div className="business-topup-secure">
              <p>
                <Lock size={14} aria-hidden="true" />
                <span>{ui.securePaymentBody || ws.funds.secureBody}</span>
              </p>
              <div className="business-topup-marks">
                {PAYMENT_MARKS.map((mark) => (
                  <span className="business-topup-mark" key={mark.src}>
                    <img src={mark.src} alt={mark.alt} loading="lazy" />
                  </span>
                ))}
                <span className="business-topup-mark is-cryptomus" aria-label="Cryptomus">
                  <CryptomusMark size={15} />
                </span>
              </div>
            </div>

            <span className="business-topup-gap" aria-hidden="true" />

            {error ? <p className="business-topup-error" role="alert">{error}</p> : null}

            <p className="business-topup-fineprint">{copy.invoiceNote}</p>

            <button
              type="button"
              className="business-button business-topup-cta"
              onClick={handleSubmit}
              disabled={Boolean(submitting) || linkBusy}
            >
              {submitting === 'crypto' ? copy.opening : linkBusy ? copy.creating : copy.agreePay}
            </button>
          </aside>
        </section>

        {linkUrl ? (
          <div className="business-topup-overlay" role="dialog" aria-modal="true" aria-labelledby="business-topup-link-title">
            <button type="button" className="business-topup-overlay-scrim" aria-label={copy.close} onClick={finishLink} />
            <section className="business-topup-linkmodal">
              <h3 id="business-topup-link-title">{copy.linkTitle}</h3>
              <p>{copy.linkBody}</p>
              <code className="business-topup-linkurl">{linkUrl}</code>
              <div className="business-topup-linkactions">
                <button
                  type="button"
                  className="business-topup-secondary"
                  onClick={async () => setCopied(await copyText(linkUrl))}
                >
                  {copied ? copy.linkCopied : copy.linkCopy}
                </button>
                <button type="button" className="business-button business-topup-cta" onClick={finishLink}>
                  {copy.linkDone}
                </button>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </main>
  );
}

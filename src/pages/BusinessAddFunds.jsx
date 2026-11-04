import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CreditCard, Landmark, Link2, Lock, X } from 'lucide-react';
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
 * A top-up is a decision about one number, so it opens over the workspace as a
 * single sheet: the choices on the left (amount, route, billing details), the
 * order on the right (what is being added, what it costs today, one button).
 * The right column never scrolls away from the button, so the action stays in
 * sight while the billing fields are filled in below.
 *
 * Nothing is credited here. Crypto hands off to the provider's cashier, bank
 * transfer continues on its own page (it must survive a reload), and a payment
 * link is created server-side and copied out. */
const QUICK_AMOUNTS = [100, 250, 500, 1000];

const pageCopy = {
  'zh-CN': {
    back: '返回',
    close: '关闭',
    amountSection: '充值金额',
    amountOnce: '一次性充值',
    customAmount: '自定义金额',
    methodTitle: '付款方式',
    methodCard: '银行卡',
    methodCrypto: '加密货币',
    methodBank: '银行转账',
    methodLink: '付款链接',
    methodLinkHint: '生成后发给付款方，24 小时内有效',
    methodCryptoHint: '在托管页完成付款',
    methodBankHint: '按收款信息汇款，我们人工核验',
    summaryLabel: '本次充值',
    oneTime: '一次性充值',
    rowBalance: '当前余额',
    rowAmount: '充值金额',
    rowDue: '应付金额',
    legal: '付款在所选通道的托管页完成；余额以服务端核验的结果为准。',
    ctaCrypto: '前往付款',
    ctaBank: '查看收款信息',
    ctaLink: '生成付款链接',
    ctaCard: '在下方完成卡片支付',
    needBilling: '先填完账单信息再继续。',
    linkTitle: '付款链接已创建',
    linkBody: '把链接发给付款方，金额已经固定，24 小时内有效。',
    linkCopy: '复制链接',
    linkCopied: '已复制',
    linkDone: '完成',
    linkFailed: '生成失败，请稍后再试。',
    cardNote: '卡片通道升级中，可用银行转账或加密货币。',
    paymentFailed: '暂时无法发起这笔付款，请稍后再试。',
    opening: '正在打开…',
    creating: '正在生成…',
    customPlaceholder: '输入金额',
  },
};

const pageCopyEn = {
  back: 'Back',
  close: 'Close',
  amountSection: 'Amount',
  amountOnce: 'one-time top-up',
  customAmount: 'Custom amount',
  methodTitle: 'Payment method',
  methodCard: 'Card',
  methodCrypto: 'Cryptocurrency',
  methodBank: 'Bank transfer',
  methodLink: 'Payment link',
  methodLinkHint: 'Send it to whoever is paying; valid for 24 hours',
  methodCryptoHint: 'Paid on the provider’s hosted page',
  methodBankHint: 'Transfer to our account; we verify it by hand',
  summaryLabel: 'This top-up',
  oneTime: 'One-time top-up',
  rowBalance: 'Current balance',
  rowAmount: 'Top-up amount',
  rowDue: 'Amount due',
  legal: 'The payment completes on the chosen route’s hosted page. The balance follows what the server verifies.',
  ctaCrypto: 'Continue to payment',
  ctaBank: 'View bank details',
  ctaLink: 'Create payment link',
  ctaCard: 'Complete the card payment below',
  needBilling: 'Add the billing details first.',
  linkTitle: 'Payment link created',
  linkBody: 'Send it to whoever is paying. The amount is fixed and the link lasts 24 hours.',
  linkCopy: 'Copy link',
  linkCopied: 'Copied',
  linkDone: 'Done',
  linkFailed: 'Could not create the link. Try again in a moment.',
  cardNote: 'Card payments are being upgraded. Bank transfer and cryptocurrency are available meanwhile.',
  paymentFailed: 'We could not start this payment. Please try again.',
  opening: 'Opening…',
  creating: 'Creating…',
  customPlaceholder: 'Enter an amount',
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
  const [method, setMethod] = useState('crypto');
  const [channels, setChannels] = useState({ card: false, crypto: true, bankTransfer: true });
  const [submitting, setSubmitting] = useState('');
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkBusy, setLinkBusy] = useState(false);
  const [linkError, setLinkError] = useState('');
  const [copied, setCopied] = useState(false);
  const billing = useBillingProfile();
  const inputRef = useRef(null);

  const close = () => navigate(withLanguage('/business/workspace', language));

  useEffect(() => {
    let alive = true;
    getBusinessAccountBalance()
      .then((payload) => { if (alive) setBalance(readBalance(payload)); })
      .catch(() => { /* show a dash; the dialog still works */ });
    loadPaymentChannels().then((methods) => {
      if (!alive) return;
      setChannels(methods);
      if (!methods.card) setMethod((current) => (current === 'card' ? 'crypto' : current));
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
    setLinkError('');
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
    } catch (failure) {
      setLinkError(failure?.response?.data?.code === 'BILLING_PROFILE_REQUIRED' ? copy.needBilling : copy.linkFailed);
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

  const methodLabel = method === 'bank' ? copy.methodBank
    : method === 'link' ? copy.methodLink
      : method === 'card' ? copy.methodCard
        : copy.methodCrypto;
  const ctaLabel = method === 'bank' ? copy.ctaBank
    : method === 'link' ? copy.ctaLink
      : method === 'card' ? copy.ctaCard
        : copy.ctaCrypto;
  const canSubmit = valid && !submitting && !linkBusy && method !== 'card'
    && (method === 'bank' || billingReady);

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (method === 'bank') { goBankTransfer(); return; }
    if (method === 'link') { createLink(); return; }
    startCrypto();
  };

  /* Card is off in production (PayPal was closed in November), so its row is
     not rendered at all and the provider's name never reaches the page. When a
     new gateway sets methods.card, the row returns with the hosted component. */
  const cardRow = channels.card ? (
    <button
      type="button"
      role="radio"
      aria-checked={method === 'card'}
      className={`business-funds-method${method === 'card' ? ' is-active' : ''}`}
      onClick={() => setMethod('card')}
    >
      <span className="business-funds-method-mark" aria-hidden="true"><CreditCard size={17} /></span>
      <span className="business-funds-method-copy">
        <strong>{copy.methodCard}</strong>
        <small>{ws.funds.paypalCard || 'Card'}</small>
      </span>
      <span className="business-funds-radio" aria-hidden="true" />
    </button>
  ) : null;

  return (
    <main className="business-account-page business-funds-screen">
      <BusinessRail activeId="billing" onSelect={handleRailSelect} />

      <div className="business-funds-dialog" role="dialog" aria-modal="true" aria-labelledby="business-funds-title">
        <button type="button" className="business-funds-scrim" aria-label={copy.close} onClick={close} />
        <section className="business-funds-card">
          <div className="business-funds-main">
            <div className="business-funds-top">
              <button type="button" className="business-funds-back" onClick={close}>
                <ArrowLeft size={16} aria-hidden="true" /> {copy.back}
              </button>
              <button type="button" className="business-funds-close" onClick={close} aria-label={copy.close}>
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <h2 id="business-funds-title" className="business-funds-title">{ui.addFunds || 'Add funds'}</h2>
            <p className="business-funds-subtitle">{ui.addFundsSubtitle || ws.funds.subtitle}</p>

            <section className="business-funds-section">
              <p className="business-funds-label">{copy.amountSection}</p>
              <div className="business-funds-amounts">
                {QUICK_AMOUNTS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`business-funds-amount${!custom && Number(amount) === value ? ' is-active' : ''}`}
                    onClick={() => { setAmount(String(value)); setCustom(false); setTouched(true); }}
                  >
                    <strong>{money.format(value)}</strong>
                    <small>{copy.amountOnce}</small>
                  </button>
                ))}
              </div>

              <label className="business-funds-custom">
                <span>{copy.customAmount}</span>
                <span className={`business-funds-input${touched && !valid ? ' is-invalid' : ''}`}>
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

              <p className="business-funds-hint">
                {(ui.minTopUp || ws.funds.minTopUp || '').replace('{amount}', money.format(MIN_TOP_UP))}
              </p>
            </section>

            <section className="business-funds-section">
              <p className="business-funds-label">{copy.methodTitle}</p>
              <div className="business-funds-methods" role="radiogroup" aria-label={copy.methodTitle}>
                {cardRow}

                {channels.crypto ? (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={method === 'crypto'}
                    className={`business-funds-method${method === 'crypto' ? ' is-active' : ''}`}
                    onClick={() => setMethod('crypto')}
                  >
                    <span className="business-funds-method-mark is-cryptomus" aria-hidden="true"><CryptomusMark size={17} /></span>
                    <span className="business-funds-method-copy">
                      <strong>{copy.methodCrypto}</strong>
                      <small>{copy.methodCryptoHint}</small>
                    </span>
                    <span className="business-funds-radio" aria-hidden="true" />
                  </button>
                ) : null}

                {channels.bankTransfer ? (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={method === 'bank'}
                    className={`business-funds-method${method === 'bank' ? ' is-active' : ''}`}
                    onClick={() => setMethod('bank')}
                  >
                    <span className="business-funds-method-mark" aria-hidden="true"><Landmark size={17} /></span>
                    <span className="business-funds-method-copy">
                      <strong>{copy.methodBank}</strong>
                      <small>{copy.methodBankHint}</small>
                    </span>
                    <span className="business-funds-radio" aria-hidden="true" />
                  </button>
                ) : null}

                <button
                  type="button"
                  role="radio"
                  aria-checked={method === 'link'}
                  className={`business-funds-method${method === 'link' ? ' is-active' : ''}`}
                  onClick={() => setMethod('link')}
                >
                  <span className="business-funds-method-mark" aria-hidden="true"><Link2 size={17} /></span>
                  <span className="business-funds-method-copy">
                    <strong>{copy.methodLink}</strong>
                    <small>{copy.methodLinkHint}</small>
                  </span>
                  <span className="business-funds-radio" aria-hidden="true" />
                </button>
              </div>

              {method === 'card' && channels.card ? (
                <div className="business-funds-cardpanel">
                  <PayPalCheckout
                    amountUsd={valid ? numeric.toFixed(2) : ''}
                    disabled={!valid || !billingReady}
                    copy={PAYPAL_COPY}
                    onPaid={() => { setError(''); close(); }}
                    onError={(message) => setError(message)}
                  />
                </div>
              ) : null}

              {!channels.card ? <p className="business-funds-note">{copy.cardNote}</p> : null}
            </section>

            <section className="business-funds-section">
              <BusinessBillingProfile billing={billing} embedded />
            </section>
          </div>

          <aside className="business-funds-summary">
            {linkUrl ? (
              <>
                <div>
                  <p className="business-funds-label">{copy.linkTitle}</p>
                  <p className="business-funds-linkurl">{linkUrl}</p>
                  <p className="business-funds-legal">{copy.linkBody}</p>
                </div>
                <div className="business-funds-linkacts">
                  <button type="button" className="business-funds-secondary" onClick={async () => setCopied(await copyText(linkUrl))}>
                    {copied ? copy.linkCopied : copy.linkCopy}
                  </button>
                  <button type="button" className="business-button business-funds-cta" onClick={close}>
                    {copy.linkDone}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="business-funds-label">{copy.summaryLabel}</p>
                  <p className="business-funds-total">{amountLabel}</p>
                  <p className="business-funds-total-note">{copy.oneTime}</p>
                </div>

                <dl className="business-funds-rows">
                  <div><dt>{copy.rowBalance}</dt><dd>{balance || '—'}</dd></div>
                  <div><dt>{copy.rowAmount}</dt><dd>{amountLabel}</dd></div>
                  <div><dt>{copy.methodTitle}</dt><dd>{methodLabel}</dd></div>
                  <div><dt>{copy.rowDue}</dt><dd>{amountLabel}</dd></div>
                </dl>

                {/* The order stays at the top; the note and the button sit on
                    the bottom edge of the panel, where the eye ends up. */}
                <span className="business-funds-gap" aria-hidden="true" />

                <p className="business-funds-legal">
                  <Lock size={13} aria-hidden="true" /> {copy.legal}
                </p>

                {error ? <p className="business-funds-error" role="alert">{error}</p> : null}
                {linkError ? <p className="business-funds-error" role="alert">{linkError}</p> : null}
                {method !== 'bank' && !billingReady ? <p className="business-funds-error">{copy.needBilling}</p> : null}

                {method !== 'card' ? (
                  <button
                    type="button"
                    className="business-button business-funds-cta"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                  >
                    {submitting === 'crypto' ? copy.opening : linkBusy ? copy.creating : ctaLabel}
                    {canSubmit ? <ArrowRight size={15} aria-hidden="true" /> : null}
                  </button>
                ) : (
                  <p className="business-funds-legal">{copy.ctaCard}</p>
                )}
              </>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

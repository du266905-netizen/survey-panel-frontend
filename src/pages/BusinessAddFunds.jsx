import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CreditCard, Landmark, Link2, Lock } from 'lucide-react';
import Logo from '../components/Logo';
import PayPalCheckout from '../components/PayPalCheckout';
import CryptomusMark from '../components/CryptomusMark';
import BusinessBillingProfile, { isBillingComplete, useBillingProfile } from '../components/BusinessBillingProfile';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { createCryptoRecharge, createPaymentLink, getBusinessAccountBalance } from '../api/realApi';
import { MIN_TOP_UP } from '../constants/fundsLimits';
import { PAYPAL_COPY } from '../constants/paypalCheckoutCopy';
import './BusinessAddFunds.css';

/* The add-funds page.
 *
 * Same job as the sheet it replaces — amount, then a route — but as a page: a
 * reload keeps the amount, the hosted card fields get real height, and the bank
 * transfer step stays inside one flow instead of jumping between two layouts.
 *
 * The right rail is deliberately not a calculator: it shows the balance as it
 * is now and what is about to be added. It does not print a "balance after",
 * because fees, refunds and partial credits would make that number a promise we
 * cannot keep.
 *
 * Each route has an empty description slot. The wording for those four lines is
 * a business decision (what we promise about timing, fees and whose cashier it
 * is), so the slot renders only when copy arrives. */

const QUICK_AMOUNTS = [100, 250, 500, 1000];

const pageCopy = {
  'zh-CN': {
    cryptoContinue: '继续',
    methodTitle: '付款方式',
    linkPurpose: '用途',
    linkPurposeHint: '付给人看的一句话，例如：研究额度充值',
    linkExpiry: '有效期（天）',
    linkCreate: '生成链接',
    linkCreating: '正在生成…',
    linkCopy: '复制链接',
    linkHint: '任何拿到链接的人都能打开这一页；金额与用途生成后不可修改。',
    linkCreated: '付款链接已创建',
    linkCreatedBody: '把链接发给付款方，金额和用途已经固定。',
    linkCreatedDone: '完成',
    linkFailed: '生成失败，请稍后再试。',
    needBilling: '请先填完账单信息。',
    opening: '正在打开…',
  },
};
const pageCopyEn = {
  cryptoContinue: 'Continue',
  methodTitle: 'Payment method',
  linkPurpose: 'What it is for',
  linkPurposeHint: 'One line the payer will read, e.g. research credits',
  linkExpiry: 'Valid for (days)',
  linkCreate: 'Create link',
  linkCreating: 'Creating…',
  linkCopy: 'Copy link',
  linkHint: 'Anyone with the link can open this page. Amount and purpose are fixed once created.',
  linkCreated: 'Payment link created',
  linkCreatedBody: 'Send the link to whoever is paying. Amount and purpose are already fixed.',
  linkCreatedDone: 'Done',
  linkFailed: 'Could not create the link. Try again in a moment.',
  needBilling: 'Add the billing details first.',
  opening: 'Opening…',
};

/* The six marks beside the security note, the same set the sheet carried in its
 * footer: four card schemes, PayPal, and the Cryptomus cube (drawn inline, it
 * ships as a single currentColor path). They sit in equal boxes because the
 * logos range from 3.1:1 to 1.3:1. */
const CARD_MARKS = [
  { src: '/pay/visa.svg', alt: 'Visa' },
  { src: '/pay/mastercard.png', alt: 'Mastercard' },
  { src: '/pay/amex.svg', alt: 'American Express' },
  { src: '/pay/unionpay.webp', alt: 'UnionPay' },
  { src: '/pay/paypal.svg', alt: 'PayPal' },
];

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
  const [submitting, setSubmitting] = useState('');
  const [openMethod, setOpenMethod] = useState('');
  const billing = useBillingProfile();
  const [linkPurpose, setLinkPurpose] = useState('');
  const [linkDays, setLinkDays] = useState('30');
  const [linkResult, setLinkResult] = useState('');
  const [linkModal, setLinkModal] = useState(false);
  const [linkBusy, setLinkBusy] = useState(false);
  const [linkError, setLinkError] = useState('');
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getBusinessAccountBalance()
      .then((payload) => {
        if (cancelled) return;
        setBalance(readBalance(payload));
      })
      .catch(() => { /* not signed in, or the endpoint is not deployed: show a dash */ });
    return () => { cancelled = true; };
  }, []);

  /* The action button is what the profile unlocks; the rows stay free so the
     fields are reachable in the first place. */
  const billingReady = isBillingComplete(billing.profile);

  const numeric = Number(String(amount).replace(/[^0-9.]/g, ''));
  const valid = Number.isFinite(numeric) && numeric >= MIN_TOP_UP;
  const amountLabel = Number.isFinite(numeric) && numeric > 0 ? `$${numeric.toFixed(2)}` : '—';

  /* Crypto is the only route that leaves the page for a cashier; card is handled
   * by PayPal's hosted component, bank transfer is confirmed by hand. */
  const startCrypto = async () => {
    if (!valid || submitting) return;
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
      setError(ui.paymentFailed || 'We could not start this payment. Please try again.');
    } finally {
      setSubmitting('');
    }
  };

  const goBankTransfer = () => {
    navigate(withLanguage(`/business/add-funds/bank-transfer${valid ? `?amount=${numeric}` : ''}`, language));
  };

  return (
    <main className="business-add-funds-page">
      <header className="business-add-funds-top">
        <div className="business-add-funds-top-inner">
          <Logo size="sm" />
          <button type="button" className="business-add-funds-back" onClick={() => navigate(withLanguage('/business/account', language))}>
            <ArrowLeft size={16} /> {ui.backToAccount || 'Back'}
          </button>
        </div>
      </header>

      <div className="business-add-funds-head">
        <p>{ui.addFundsSubtitle || ws.funds.subtitle}</p>
      </div>

      <div className="business-add-funds-grid">
        <div className="business-add-funds-main">
          <section className="business-add-funds-block business-add-funds-amount">
            <label htmlFor="business-add-funds-input">{ui.amountLabel || ws.funds.amountLabel}</label>
            <div className={`business-add-funds-input${touched && !valid ? ' is-invalid' : ''}`}>
              <span aria-hidden="true">$</span>
              <input
                id="business-add-funds-input"
                inputMode="decimal"
                placeholder={ui.customAmountPlaceholder || 'Enter an amount'}
                value={amount}
                onChange={(event) => { setAmount(event.target.value); setCustom(true); setTouched(true); }}
                onBlur={() => setTouched(true)}
              />
            </div>
            <div className="business-add-funds-quick">
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
                onClick={() => { setCustom(true); setAmount(''); setTouched(false); }}
              >
                {ui.customAmount || 'Custom'}
              </button>
            </div>
            <p className="business-add-funds-min">
              {(ui.minTopUp || ws.funds.minTopUp || '').replace('{amount}', `US$${MIN_TOP_UP}`)}
            </p>

          </section>

          <section className="business-add-funds-block">
            <h2 className="business-add-funds-block-title">{copy.methodTitle}</h2>

            <div className="business-add-funds-options">
              {/* The hosted card fields belong to this row, not to the end of the
                  list: opening the card option expands it in place. */}
              <div className={`business-add-funds-group${openMethod === 'card' ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="business-add-funds-option"
                  onClick={() => setOpenMethod((current) => (current === 'card' ? '' : 'card'))}
                  disabled={!valid || Boolean(submitting)}
                  aria-expanded={openMethod === 'card'}
                >
                  <span className="business-add-funds-option-mark" aria-hidden="true"><CreditCard size={19} /></span>
                  <span className="business-add-funds-option-copy">
                    <strong>{ws.funds.card || 'Credit or debit card'}</strong>
                  </span>
                  <span className="business-add-funds-option-go" aria-hidden="true"><ArrowRight size={15} /></span>
                </button>

                {openMethod === 'card' ? (
                  <div className="business-add-funds-panel-wrap">
                    <BusinessBillingProfile billing={billing} embedded />
                    <div className="business-add-funds-cardpanel">
                      <PayPalCheckout
                        amountUsd={valid ? numeric.toFixed(2) : ''}
                        disabled={!valid || !billingReady}
                        copy={PAYPAL_COPY}
                        onPaid={() => { setOpenMethod(''); setError(''); }}
                        onError={(message) => setError(message)}
                      />
                      {error ? <p className="business-add-funds-error" role="alert">{error}</p> : null}
                    </div>
                  </div>
                ) : null}

              </div>

              <div className={`business-add-funds-group${openMethod === 'crypto' ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="business-add-funds-option"
                  onClick={() => setOpenMethod((current) => (current === 'crypto' ? '' : 'crypto'))}
                  disabled={!valid || Boolean(submitting)}
                  aria-expanded={openMethod === 'crypto'}
                >
                  <span className="business-add-funds-option-mark is-cryptomus" aria-hidden="true">
                    <CryptomusMark size={17} />
                  </span>
                  <span className="business-add-funds-option-copy">
                    <strong>{ws.funds.crypto || 'Cryptocurrency'}</strong>
                  </span>
                  <span className="business-add-funds-option-go" aria-hidden="true">
                    {submitting === 'crypto' ? '…' : <ArrowRight size={15} />}
                  </span>
                </button>

                {openMethod === 'crypto' ? (
                  <div className="business-add-funds-panel-wrap">
                    <BusinessBillingProfile billing={billing} embedded />
                    <div className="business-add-funds-panel">
                      <button className="business-add-funds-continue" type="button" onClick={startCrypto} disabled={Boolean(submitting) || !billingReady}>
                        {submitting === 'crypto' ? copy.opening : copy.cryptoContinue}
                      </button>
                      {error ? <p className="business-add-funds-error" role="alert">{error}</p> : null}
                    </div>
                  </div>
                ) : null}

              </div>

              <button type="button" className="business-add-funds-option" onClick={goBankTransfer} disabled={!valid}>
                <span className="business-add-funds-option-mark" aria-hidden="true"><Landmark size={19} /></span>
                <span className="business-add-funds-option-copy">
                  <strong>{ws.funds.bankTransfer || 'Bank transfer'}</strong>
                </span>
                <span className="business-add-funds-option-go" aria-hidden="true"><ArrowRight size={15} /></span>
              </button>

              {/* Payment links are issued by a human, outside this page; the row
                  is here so the range of ways to pay reads as complete. It has
                  no action until the link mechanism exists. */}
              <div className={`business-add-funds-group${openMethod === 'link' ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="business-add-funds-option"
                  onClick={() => setOpenMethod((current) => (current === 'link' ? '' : 'link'))}
                  disabled={!valid}
                  aria-expanded={openMethod === 'link'}
                >
                  <span className="business-add-funds-option-mark" aria-hidden="true"><Link2 size={19} /></span>
                  <span className="business-add-funds-option-copy">
                    <strong>{ui.paymentLink || 'Payment link'}</strong>
                  </span>
                  <span className="business-add-funds-option-go" aria-hidden="true"><ArrowRight size={15} /></span>
                </button>

                {openMethod === 'link' ? (
                  <div className="business-add-funds-panel-wrap">
                    <div className="business-add-funds-panel">
                      {linkResult ? (
                        <>
                          <p className="business-add-funds-linkurl">{linkResult}</p>
                          <button
                            className="business-add-funds-continue"
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(linkResult)}
                          >
                            {copy.linkCopy}
                          </button>
                          <p className="business-add-funds-linkhint">{copy.linkHint}</p>
                        </>
                      ) : (
                        <>
                          <label className="business-add-funds-linkfield">
                            {copy.linkPurpose}
                            <input
                              value={linkPurpose}
                              onChange={(event) => setLinkPurpose(event.target.value)}
                              placeholder={copy.linkPurposeHint}
                              maxLength={120}
                            />
                          </label>
                          <label className="business-add-funds-linkfield">
                            {copy.linkExpiry}
                            <select value={linkDays} onChange={(event) => setLinkDays(event.target.value)}>
                              <option value="7">7</option>
                              <option value="14">14</option>
                              <option value="30">30</option>
                            </select>
                          </label>
                          {/* A link inherits the account's billing profile, so the
                              profile is collected here too — otherwise the button
                              below stays disabled with nothing on screen to fix. */}
                          <BusinessBillingProfile billing={billing} embedded />
                          <button
                            className="business-add-funds-continue"
                            type="button"
                            disabled={linkBusy || !billingReady}
                            onClick={async () => {
                              setLinkError('');
                              setLinkBusy(true);
                              try {
                                const expiresAt = new Date(Date.now() + Number(linkDays) * 86400000).toISOString();
                                const payload = await createPaymentLink({
                                  amountCents: Math.round(numeric * 100),
                                  currency: 'USD',
                                  purpose: linkPurpose.trim(),
                                  expiresAt,
                                }, `link:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`);
                                setLinkResult(payload?.url || '');
                                setLinkModal(true);
                              } catch (error) {
                                setLinkError(error?.response?.data?.code === 'BILLING_PROFILE_REQUIRED' ? copy.needBilling : copy.linkFailed);
                              } finally {
                                setLinkBusy(false);
                              }
                            }}
                          >
                            {linkBusy ? copy.linkCreating : copy.linkCreate}
                          </button>
                          {!billingReady ? <p className="business-add-funds-linkhint">{copy.needBilling}</p> : null}
                          {linkError ? <p className="business-add-funds-error">{linkError}</p> : null}
                        </>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>


          </section>

        </div>

        <aside className="business-add-funds-rail">
          <div className="business-add-funds-rail-card">
            <p className="business-add-funds-rail-label">{ui.balanceLabel || 'Current balance'}</p>
            <p className="business-add-funds-rail-balance">{balance || '—'}</p>

            <div className="business-add-funds-rail-row">
              <span>{ui.thisTopUp || 'This top-up'}</span>
              <span>{amountLabel}</span>
            </div>

            <div className="business-add-funds-rail-secure">
              <p className="business-add-funds-rail-note">
                <Lock size={14} aria-hidden="true" />
                <span>{ui.securePaymentBody || ws.funds.secureBody}</span>
              </p>
              <div className="business-add-funds-marks" aria-hidden="true">
                {CARD_MARKS.map((mark) => (
                  <span className="business-add-funds-mark" key={mark.src}>
                    <img src={mark.src} alt="" loading="lazy" />
                  </span>
                ))}
                <span className="business-add-funds-mark is-cryptomus">
                  <CryptomusMark size={15} />
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {linkResult && linkModal ? (
        <div className="business-add-funds-linkoverlay" role="dialog" aria-modal="true" aria-labelledby="business-add-funds-linkcreated">
          <section>
            <span className="business-add-funds-linkcreated-icon" aria-hidden="true"><Check size={44} strokeWidth={1.7} /></span>
            <h2 id="business-add-funds-linkcreated">{copy.linkCreated}</h2>
            <p>{copy.linkCreatedBody}</p>
            <code className="business-add-funds-linkcreated-url">{linkResult}</code>
            <div className="business-add-funds-linkcreated-actions">
              <button
                type="button"
                className="business-add-funds-continue"
                onClick={() => navigator.clipboard?.writeText(linkResult)}
              >
                {copy.linkCopy}
              </button>
              <button type="button" className="business-add-funds-linkcreated-done" onClick={() => setLinkModal(false)}>
                {copy.linkCreatedDone}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}

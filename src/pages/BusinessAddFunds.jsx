import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bitcoin, CreditCard, Landmark, Link2, Lock } from 'lucide-react';
import PayPalCheckout from '../components/PayPalCheckout';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { createCryptoRecharge, getBusinessAccountBalance } from '../api/realApi';
import { MIN_TOP_UP } from '../constants/fundsLimits';
import { PAYPAL_COPY } from '../constants/paypalCheckoutCopy';
import heroImage from '../assets/business/add-funds-hero.jpg';
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

/* Card marks live in public/pay — they were already on the site, in the sheet's
 * footer. Kept at one height so Visa (3.1:1) and Mastercard (1.3:1) sit on the
 * same line without one looking like a stamp. */
const CARD_MARKS = [
  { src: '/pay/visa.svg', alt: 'Visa' },
  { src: '/pay/mastercard.png', alt: 'Mastercard' },
  { src: '/pay/amex.svg', alt: 'American Express' },
  { src: '/pay/unionpay.webp', alt: 'UnionPay' },
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

  const [amount, setAmount] = useState(String(MIN_TOP_UP));
  const [custom, setCustom] = useState(false);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState('');
  const [cardOpen, setCardOpen] = useState(false);
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
      <section className="business-add-funds-hero">
        <img src={heroImage} alt="" decoding="async" />
        <div className="business-add-funds-hero-copy">
          <h1>{ui.addFunds || 'Add funds'}</h1>
          <p>{ui.addFundsSubtitle || ws.funds.subtitle}</p>
        </div>
      </section>

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
            <h2 className="business-add-funds-block-title">{ui.howToPay || 'How would you like to pay'}</h2>

            <div className="business-add-funds-options">
              <button
                type="button"
                className={`business-add-funds-option${cardOpen ? ' is-open' : ''}`}
                onClick={() => setCardOpen((value) => !value)}
                disabled={!valid || Boolean(submitting)}
                aria-expanded={cardOpen}
              >
                <span className="business-add-funds-option-mark" aria-hidden="true"><CreditCard size={19} /></span>
                <span className="business-add-funds-option-copy">
                  <strong>{ws.funds.card || 'Credit or debit card'}</strong>
                </span>
                <span className="business-add-funds-option-brands" aria-hidden="true">
                  {CARD_MARKS.map((mark) => (
                    <span className="business-add-funds-brand" key={mark.src}>
                      <img src={mark.src} alt="" loading="lazy" />
                    </span>
                  ))}
                </span>
                <span className="business-add-funds-option-go" aria-hidden="true"><ArrowRight size={15} /></span>
              </button>

              <button
                type="button"
                className="business-add-funds-option"
                onClick={startCrypto}
                disabled={!valid || Boolean(submitting)}
              >
                <span className="business-add-funds-option-mark" aria-hidden="true"><Bitcoin size={19} /></span>
                <span className="business-add-funds-option-copy">
                  <strong>{ws.funds.crypto || 'Cryptocurrency'}</strong>
                </span>
                <span className="business-add-funds-option-brands" aria-hidden="true" />
                <span className="business-add-funds-option-go" aria-hidden="true">
                  {submitting === 'crypto' ? '…' : <ArrowRight size={15} />}
                </span>
              </button>

              <button type="button" className="business-add-funds-option" onClick={goBankTransfer} disabled={!valid}>
                <span className="business-add-funds-option-mark" aria-hidden="true"><Landmark size={19} /></span>
                <span className="business-add-funds-option-copy">
                  <strong>{ws.funds.bankTransfer || 'Bank transfer'}</strong>
                </span>
                <span className="business-add-funds-option-brands" aria-hidden="true" />
                <span className="business-add-funds-option-go" aria-hidden="true"><ArrowRight size={15} /></span>
              </button>

              {/* Payment links are issued by a human, outside this page; the row
                  is here so the range of ways to pay reads as complete. It has
                  no action until the link mechanism exists. */}
              <button type="button" className="business-add-funds-option" disabled>
                <span className="business-add-funds-option-mark" aria-hidden="true"><Link2 size={19} /></span>
                <span className="business-add-funds-option-copy">
                  <strong>{ui.paymentLink || 'Payment link'}</strong>
                </span>
                <span className="business-add-funds-option-brands" aria-hidden="true" />
                <span className="business-add-funds-option-go" aria-hidden="true" />
              </button>
            </div>

            {cardOpen && (
              <div className="business-add-funds-cardpanel">
                <PayPalCheckout
                  amountUsd={valid ? numeric.toFixed(2) : ''}
                  disabled={!valid}
                  copy={PAYPAL_COPY}
                  onPaid={() => { setCardOpen(false); setError(''); }}
                  onError={(message) => setError(message)}
                />
              </div>
            )}

            {error ? <p className="business-add-funds-error" role="alert">{error}</p> : null}
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

            <p className="business-add-funds-rail-note">
              <Lock size={14} aria-hidden="true" />
              <span>{ui.securePaymentBody || ws.funds.secureBody}</span>
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

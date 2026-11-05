import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, Landmark, Link2, Lock, Wallet } from 'lucide-react';
import BusinessBillingProfile, { isBillingComplete, useBillingProfile } from '../components/BusinessBillingProfile';
import CryptomusMark from '../components/CryptomusMark';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { createCryptoRecharge, createPaymentLink, getBusinessAccountBalance, subscribePlan } from '../api/realApi';
import { loadPaymentChannels } from '../api/paymentChannels';
import { PLANS } from './BusinessPlans';
import './BusinessAddFunds.css';
import './BusinessPlanCheckout.css';

/* Buying a plan.
 *
 * The skin is the add-funds sheet, class for class: choices on the left, the
 * order on the right, the same lock, the same five accepted marks, the same
 * single "agree and pay". What changes is the top — two billing cycles where
 * the four amounts were — and the methods, which gain "account balance"
 * because a subscription can come straight out of the account. The other four
 * methods are the add-funds methods, wording and all.
 *
 * Nothing is validated before the click: the balance turns red only after
 * "agree and pay" finds it short, which is the order the payer actually lives.
 *
 * The one call that does not exist yet is subscribePlan (POST
 * /api/business/plans/subscribe). Contract: docs/接口-套餐订阅.md. Until Codex
 * lands it the button reports the server's message instead of pretending.
 */

const PAYMENT_MARKS = [
  { src: '/pay/visa.svg', alt: 'Visa' },
  { src: '/pay/mastercard.png', alt: 'Mastercard' },
  { src: '/pay/amex.svg', alt: 'American Express' },
  { src: '/pay/unionpay.webp', alt: 'UnionPay' },
  { src: '/pay/paypal.svg', alt: 'PayPal' },
];

const copy = {
  'zh-CN': {
    back: '返回套餐',
    title: '设置您的套餐',
    subtitle: '选计费周期和付款方式。余额够就直接抵扣；转账、付款链接和加密货币到账后开通。',
    cycleLabel: '计费周期',
    monthly: '按月计费',
    yearly: '按年计费',
    perMonth: '每月',
    perYear: '每年，一次付清',
    save: '省 20%',
    methodLabel: '付款方式',
    methodBalance: '余额扣除',
    methodBalanceHint: '余额 {balance}，可直接抵扣',
    methodCard: '银行卡',
    methodCardOff: '卡通道正在升级中，请使用其他支付方式',
    methodCardHint: '借记卡或信用卡',
    methodBank: '银行转账',
    methodBankHint: '从您的银行账户汇出，适合较大金额',
    methodLink: '付款链接',
    methodLinkHint: '生成后发给付款方，24 小时内有效',
    methodCrypto: '加密货币',
    methodCryptoHint: '为习惯数字资产结算的付款方保留，收款由托管方完成',
    orderTitle: '套餐',
    rowPlan: '套餐',
    rowCycle: '计费方式',
    rowSubtotal: '小计',
    rowDue: '今日应付总额',
    rowBalance: '账户余额',
    renew: '订阅将于下个周期自动续费，届时按当期价格收款。',
    upfront: '一次付清 12 个月，期间价格不变。',
    secure: '支付信息加密传输，卡号不经过我们的服务器。',
    agreePay: '同意支付',
    insufficient: '余额不足，请先充值，或换一种付款方式。',
    completeForm: '请先完成账单信息。',
    needBillingHint: '带红框的字段还没填。',
    linkTitle: '付款链接已创建',
    linkBody: '把链接发给付款方，金额已经固定，24 小时内有效。',
    linkCopy: '复制链接',
    linkCopied: '已复制',
    linkDone: '完成',
    linkFailed: '生成失败，请稍后再试。',
    paymentFailed: '暂时无法发起这笔付款，请稍后再试。',
    subscribeFailed: '订阅没有提交成功，请稍后再试。',
    opening: '正在打开…',
    creating: '正在生成…',
    paying: '正在支付…',
  },
  en: {
    back: 'Back to plans',
    title: 'Set up your plan',
    subtitle: 'Pick a cycle and how to pay. Balance comes straight off the account; transfers, links and crypto start the plan once they land.',
    cycleLabel: 'Billing cycle',
    monthly: 'Billed monthly',
    yearly: 'Billed yearly',
    perMonth: 'per month',
    perYear: 'per year, billed once',
    save: 'Save 20%',
    methodLabel: 'Payment method',
    methodBalance: 'Account balance',
    methodBalanceHint: 'Balance {balance} — deduct now',
    methodCard: 'Card',
    methodCardOff: 'Card payments are being upgraded — please use another method',
    methodCardHint: 'Debit or credit card',
    methodBank: 'Bank transfer',
    methodBankHint: 'Paid from your bank account; suits larger amounts',
    methodLink: 'Payment link',
    methodLinkHint: 'Send it to whoever is paying; valid for 24 hours',
    methodCrypto: 'Cryptocurrency',
    methodCryptoHint: 'Kept for payers who settle in digital assets; collected by a custodian',
    orderTitle: 'Order',
    rowPlan: 'Plan',
    rowCycle: 'Billing',
    rowSubtotal: 'Subtotal',
    rowDue: 'Due today',
    rowBalance: 'Balance',
    renew: 'Renews automatically each cycle at the price in force then.',
    upfront: 'Twelve months paid once; the price holds for the term.',
    secure: 'Payment details travel encrypted; card numbers never touch our servers.',
    agreePay: 'Agree and pay',
    insufficient: 'Not enough balance. Top up first, or pay another way.',
    completeForm: 'Complete the billing details first.',
    needBillingHint: 'The outlined fields are still empty.',
    linkTitle: 'Payment link created',
    linkBody: 'Send it to whoever is paying. The amount is fixed and the link lasts 24 hours.',
    linkCopy: 'Copy link',
    linkCopied: 'Copied',
    linkDone: 'Done',
    linkFailed: 'Could not create the link. Try again in a moment.',
    paymentFailed: 'We could not start this payment. Please try again.',
    subscribeFailed: 'The subscription did not go through. Try again in a moment.',
    opening: 'Opening…',
    creating: 'Creating…',
    paying: 'Paying…',
  },
};

function fill(template, values) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
}

export default function BusinessPlanCheckout() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;
  const billing = useBillingProfile();

  const requested = String(params.get('plan') || 'pro').toLowerCase();
  const plan = PLANS.find((item) => item.id === requested) || PLANS.find((item) => item.id === 'pro');
  const [cycle, setCycle] = useState(params.get('cycle') === 'yearly' ? 'yearly' : 'monthly');
  const [method, setMethod] = useState('balance');
  const [channels, setChannels] = useState({ card: false });
  const [balance, setBalance] = useState(null);
  const [submitting, setSubmitting] = useState('');
  const [error, setError] = useState('');
  const [billingMissing, setBillingMissing] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const methodRef = useRef(null);
  const billingRef = useRef(null);

  const money = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }),
    [],
  );

  useEffect(() => {
    let alive = true;
    getBusinessAccountBalance()
      .then((payload) => {
        const value = Number(payload?.balance?.balance);
        if (alive && Number.isFinite(value)) setBalance(value);
      })
      .catch(() => { /* the page still reads without a balance */ });
    loadPaymentChannels()
      .then((open) => { if (alive) setChannels(open); })
      .catch(() => { /* card stays closed */ });
    return () => { alive = false; };
  }, []);

  const due = cycle === 'yearly' ? plan.yearly : plan.monthly;
  const dueCents = Math.round(due * 100);
  const balanceText = balance === null ? '—' : money.format(balance);
  const billingReady = isBillingComplete(billing.profile);
  const busy = Boolean(submitting);

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const field = document.createElement('textarea');
      field.value = value;
      document.body.appendChild(field);
      field.select();
      const done = document.execCommand('copy');
      field.remove();
      return done;
    }
  };

  const createLink = async () => {
    setLinkUrl('');
    setSubmitting('link');
    try {
      const expiresAt = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
      const payload = await createPaymentLink({
        amountCents: dueCents,
        currency: 'USD',
        purpose: `${plan.name} · ${cycle === 'yearly' ? text.yearly : text.monthly}`,
        expiresAt,
      }, `plan-link:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`);
      setLinkUrl(payload?.url || '');
      setCopied(false);
    } catch (failure) {
      setError(failure?.response?.data?.code === 'BILLING_PROFILE_REQUIRED' ? text.completeForm : text.linkFailed);
    } finally {
      setSubmitting('');
    }
  };

  const startCrypto = async () => {
    setSubmitting('crypto');
    try {
      const payload = await createCryptoRecharge({
        amountUsd: due.toFixed(2),
        idempotencyKey: `plan-crypto:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`,
      });
      const checkoutUrl = payload?.payment?.checkoutUrl;
      if (!checkoutUrl) throw new Error('NO_CHECKOUT_URL');
      window.location.href = checkoutUrl;
    } catch {
      setError(text.paymentFailed);
    } finally {
      setSubmitting('');
    }
  };

  const payWithBalance = async () => {
    setSubmitting('balance');
    try {
      await subscribePlan({
        plan: plan.id,
        cycle,
        method: 'balance',
        amountCents: dueCents,
        currency: 'USD',
      }, `plan-balance:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`);
      navigate(withLanguage('/business/billing', language));
    } catch (failure) {
      setError(failure?.response?.data?.message || text.subscribeFailed);
    } finally {
      setSubmitting('');
    }
  };

  /* Nothing is red until this runs. The order is the one the payer lives:
     finish the form, press the button, get told what is missing. */
  const handleSubmit = () => {
    if (busy) return;

    if (!billingReady) {
      setBillingMissing(true);
      setError(`${text.completeForm} ${text.needBillingHint}`);
      billingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setBillingMissing(false);
    setError('');

    if (method === 'link') { createLink(); return; }
    if (method === 'crypto') { startCrypto(); return; }
    if (method === 'bank') {
      navigate(withLanguage(`/business/add-funds/bank-transfer?amount=${due}`, language));
      return;
    }
    if (method === 'card') return;

    if (balance === null || balance < due) {
      setError(text.insufficient);
      methodRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    payWithBalance();
  };

  return (
    <main className="business-account-page business-topup-screen is-page">
      <section className="business-topup-card">
        <div className="business-topup-main">
          <div className="business-topup-top">
            <button
              type="button"
              className="business-topup-back"
              onClick={() => navigate(withLanguage('/business/plans', language))}
              aria-label={text.back}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
          </div>

          <h2 className="business-topup-title">{text.title}</h2>
          <p className="business-topup-subtitle">{text.subtitle}</p>

          <section className="business-topup-section">
            <div className="business-topup-label">{text.cycleLabel}</div>
            <div className="business-topup-amounts pco-cycles" role="radiogroup" aria-label={text.cycleLabel}>
              {['monthly', 'yearly'].map((option) => {
                const price = option === 'yearly' ? plan.yearly : plan.monthly;
                const active = cycle === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={`business-topup-amount${active ? ' is-active' : ''}`}
                    onClick={() => setCycle(option)}
                  >
                    <small>{option === 'yearly' ? text.yearly : text.monthly}</small>
                    <strong>{money.format(price)}</strong>
                    <small>{option === 'yearly' ? text.perYear : text.perMonth}</small>
                    {option === 'yearly' ? <span className="pco-save">{text.save}</span> : null}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="business-topup-section" ref={methodRef}>
            <div className="business-topup-label">{text.methodLabel}</div>
            <div className="business-topup-methods" role="radiogroup" aria-label={text.methodLabel}>
              <button
                type="button"
                role="radio"
                aria-checked={method === 'balance'}
                className={`business-topup-method${method === 'balance' ? ' is-active' : ''}`}
                onClick={() => setMethod('balance')}
              >
                <span className="business-topup-method-mark" aria-hidden="true"><Wallet size={17} /></span>
                <span className="business-topup-method-copy">
                  <strong>{text.methodBalance}</strong>
                  <small className={error && method === 'balance' ? 'pco-short' : undefined}>
                    {fill(text.methodBalanceHint, { balance: balanceText })}
                  </small>
                </span>
                <span className="business-topup-radio" aria-hidden="true" />
              </button>

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
                  <strong>{text.methodCard}</strong>
                  <small>{channels.card ? text.methodCardHint : text.methodCardOff}</small>
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
                  <strong>{text.methodBank}</strong>
                  <small>{text.methodBankHint}</small>
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
                  <strong>{text.methodLink}</strong>
                  <small>{text.methodLinkHint}</small>
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
                  <strong>{text.methodCrypto}</strong>
                  <small>{text.methodCryptoHint}</small>
                </span>
                <span className="business-topup-radio" aria-hidden="true" />
              </button>
            </div>
          </section>

          <section className="business-topup-section is-billing" ref={billingRef}>
            <BusinessBillingProfile billing={billing} embedded highlightMissing={billingMissing} />
          </section>
        </div>

        <aside className="business-topup-summary">
          <div className="pco-summary-inner">
            <div>
              <div className="business-topup-label">{text.orderTitle}</div>
              <div className="business-topup-balance">{money.format(due)}</div>
            </div>

            <dl className="business-topup-rows">
              <div><dt>{text.rowPlan}</dt><dd>{plan.name}</dd></div>
              <div><dt>{text.rowCycle}</dt><dd>{cycle === 'yearly' ? text.yearly : text.monthly}</dd></div>
              <div><dt>{text.rowSubtotal}</dt><dd>{money.format(due)}</dd></div>
              <div><dt>{text.rowDue}</dt><dd>{money.format(due)}</dd></div>
              <div><dt>{text.rowBalance}</dt><dd>{balanceText}</dd></div>
            </dl>

            <div className="business-topup-secure">
              <p>
                <Lock size={14} aria-hidden="true" />
                <span>{text.secure}</span>
              </p>
              <div className="business-topup-marks">
                {PAYMENT_MARKS.map((mark) => (
                  <span className="business-topup-mark" key={mark.src}>
                    <img src={mark.src} alt={mark.alt} loading="lazy" />
                  </span>
                ))}
              </div>
            </div>

            <p className="business-topup-fineprint">{cycle === 'yearly' ? text.upfront : text.renew}</p>

            <span className="business-topup-gap" aria-hidden="true" />

            {error ? <p className="business-topup-error" role="alert">{error}</p> : null}

            <button
              type="button"
              className="business-button business-topup-cta"
              onClick={handleSubmit}
              disabled={busy}
            >
              {submitting === 'link' ? text.creating : submitting === 'crypto' ? text.opening : submitting === 'balance' ? text.paying : text.agreePay}
            </button>
          </div>
        </aside>
      </section>

      {linkUrl ? (
        <div className="business-topup-overlay" role="dialog" aria-modal="true" aria-labelledby="pco-link-title">
          <button
            type="button"
            className="business-topup-overlay-scrim"
            aria-label={text.linkDone}
            onClick={() => setLinkUrl('')}
          />
          <section className="business-topup-linkmodal">
            <h3 id="pco-link-title">{text.linkTitle}</h3>
            <p>{text.linkBody}</p>
            <code className="business-topup-linkurl">{linkUrl}</code>
            <div className="business-topup-linkactions">
              <button
                type="button"
                className="business-topup-secondary"
                onClick={async () => setCopied(await copyText(linkUrl))}
              >
                {copied ? text.linkCopied : text.linkCopy}
              </button>
              <button type="button" className="business-button business-topup-cta" onClick={() => setLinkUrl('')}>
                {text.linkDone}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}

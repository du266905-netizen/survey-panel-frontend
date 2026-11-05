import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Bitcoin, CreditCard, Landmark, Lock, Wallet } from 'lucide-react';
import BusinessBillingProfile, { isBillingComplete, useBillingProfile } from '../components/BusinessBillingProfile';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { getBusinessAccountBalance } from '../api/realApi';
import { loadPaymentChannels } from '../api/paymentChannels';
import { PLANS } from './BusinessPlans';
import './BusinessAddFunds.css';
import './BusinessPlanCheckout.css';

/* Buying a plan.
 *
 * The skin is the add-funds sheet, reused class for class: choices on the left,
 * the order on the right, the same lock, marks and single action. What changes
 * is the top: the four amount tiles become two billing cycles, and the methods
 * gain a balance row, because a subscription can be paid out of the account
 * instead of by transfer.
 *
 * What this page does NOT do yet: charge. There is no `plans/subscribe` on the
 * backend, so the action is disabled and says so. Adding a button that looks
 * live would be the exact thing that got the last checkout rolled back.
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
    subtitle: '选计费周期，再选付款方式。余额够就直接抵扣，其它方式到账后开通。',
    cycleLabel: '计费周期',
    monthly: '按月计费',
    yearly: '按年计费',
    perMonth: '每月',
    perYear: '每年，一次付清',
    save: '省 20%',
    methodLabel: '付款方式',
    methodBalance: '余额扣除',
    methodBalanceHint: '当前余额 {balance}',
    methodBalanceShort: '余额不足，先充值',
    methodCard: '银行卡',
    methodCardOff: '通道升级中，暂不可用',
    methodBank: '银行转账',
    methodBankHint: '转账到账后开通',
    methodCrypto: '加密货币',
    methodCryptoHint: '到账后开通',
    orderTitle: '套餐',
    rowPlan: '套餐',
    rowCycle: '计费方式',
    rowSubtotal: '小计',
    rowDue: '今日应付总额',
    rowBalance: '账户余额',
    renew: '订阅将于下个周期自动续费，届时按当期价格收款。',
    upfront: '一次付清 12 个月，期间价格不变。',
    secure: '支付信息加密传输，卡号不经过我们的服务器。',
    subscribe: '订阅 {plan}',
    notConnected: '接口未接：后端还没有 plans/subscribe，这一版只能看，不能买。',
    insufficient: '余额不足，先充值再订阅。',
    topUp: '去充值',
    freeCurrent: '这是你当前的套餐。',
  },
  en: {
    back: 'Back to plans',
    title: 'Set up your plan',
    subtitle: 'Pick a billing cycle, then how to pay. Balance comes straight off the account; transfers start the plan once they land.',
    cycleLabel: 'Billing cycle',
    monthly: 'Billed monthly',
    yearly: 'Billed yearly',
    perMonth: 'per month',
    perYear: 'per year, billed once',
    save: 'Save 20%',
    methodLabel: 'Payment method',
    methodBalance: 'Account balance',
    methodBalanceHint: 'Balance {balance}',
    methodBalanceShort: 'Not enough — top up first',
    methodCard: 'Card',
    methodCardOff: 'Channel upgrade, unavailable',
    methodBank: 'Bank transfer',
    methodBankHint: 'Starts once the transfer lands',
    methodCrypto: 'Crypto',
    methodCryptoHint: 'Starts once it lands',
    orderTitle: 'Order',
    rowPlan: 'Plan',
    rowCycle: 'Billing',
    rowSubtotal: 'Subtotal',
    rowDue: 'Due today',
    rowBalance: 'Balance',
    renew: 'Renews automatically each cycle at the price in force then.',
    upfront: 'Twelve months paid once; the price holds for the term.',
    secure: 'Payment details travel encrypted; card numbers never touch our servers.',
    subscribe: 'Subscribe to {plan}',
    notConnected: 'Not connected: the backend has no plans/subscribe yet, so this page cannot take money.',
    insufficient: 'Not enough balance. Top up first.',
    topUp: 'Add funds',
    freeCurrent: 'This is your current plan.',
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
  const balanceText = balance === null ? '—' : money.format(balance);
  const short = balance !== null && balance < due;
  const billingReady = isBillingComplete(billing.profile);

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

          <section className="business-topup-section">
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
                  <small className={short ? 'pco-short' : undefined}>
                    {short ? text.methodBalanceShort : fill(text.methodBalanceHint, { balance: balanceText })}
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
                  <small>{text.methodCardOff}</small>
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
                aria-checked={method === 'crypto'}
                className={`business-topup-method${method === 'crypto' ? ' is-active' : ''}`}
                onClick={() => setMethod('crypto')}
              >
                <span className="business-topup-method-mark" aria-hidden="true"><Bitcoin size={17} /></span>
                <span className="business-topup-method-copy">
                  <strong>{text.methodCrypto}</strong>
                  <small>{text.methodCryptoHint}</small>
                </span>
                <span className="business-topup-radio" aria-hidden="true" />
              </button>
            </div>
          </section>

          <section className="business-topup-section is-billing">
            {/* Nothing is red until the payer has tried to submit. */}
            <BusinessBillingProfile billing={billing} embedded highlightMissing={false} />
          </section>
        </div>

        <aside className="business-topup-summary">
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

          {/* Same spacer the sheet uses, so the action sits on the bottom edge
              however long the billing form on the left turns out to be. */}
          <span className="business-topup-gap" aria-hidden="true" />

          {short ? <p className="business-topup-error" role="status">{text.insufficient}</p> : null}

          <button type="button" className="business-button business-topup-cta" disabled>
            {fill(text.subscribe, { plan: plan.name })}
          </button>
          <p className="pco-note">{text.notConnected}</p>
        </aside>
      </section>
    </main>
  );
}

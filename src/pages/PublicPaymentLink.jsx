import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, CreditCard, Landmark } from 'lucide-react';
import PayPalCheckout from '../components/PayPalCheckout';
import CryptomusMark from '../components/CryptomusMark';
import { PAYPAL_COPY } from '../constants/paypalCheckoutCopy';
import {
  captureLinkPaypalOrder,
  createLinkBankClaim,
  createLinkCryptoPayment,
  createLinkPaypalOrder,
  getLinkBankAccount,
  getLinkPaypalConfig,
  getPublicPaymentLink,
} from '../api/realApi';
import './PublicPaymentLink.css';

/* The page a payer opens from a payment link.
 *
 * Public: no login, no navigation, no customer identity on screen. Everything
 * comes from GET /api/payment-links/:token, and every channel posts to a
 * token-scoped endpoint — the same providers, addressed by link instead of by
 * session.
 *
 * The page never decides that money moved. Card and crypto settle through the
 * provider's own confirmation; a bank claim only becomes a balance after a
 * human matches it. */

const copyByLanguage = {
  'zh-CN': {
    title: '付款',
    forWhat: '用途',
    expires: '有效期至',
    status: { active: '待付款', paid: '已支付', expired: '已过期', revoked: '已撤销' },
    card: '信用卡 / 借记卡',
    crypto: '加密货币',
    bank: '银行转账',
    continue: '继续',
    opening: '正在打开…',
    paidNote: '收到付款，无需再次支付。',
    expiredNote: '这个链接已经过期，请联系我们重新发送。',
    revokedNote: '这个链接已被撤销。',
    missing: '链接无效，或已经被删除。',
    loading: '加载中…',
    secure: '由 guanyisearch 提供服务',
    payer: '付款账户名称',
    date: '转账日期',
    amountSent: '转账金额',
    submitClaim: '我已转账',
    claimDone: '已收到你的申报，核对后入账。',
    claimFailed: '提交失败，请稍后再试。',
    cryptoFailed: '无法开始这笔付款，请稍后再试。',
    paidByCard: '付款已收到。',
  },
};

const en = {
  title: 'Payment',
  forWhat: 'For',
  expires: 'Valid until',
  status: { active: 'Awaiting payment', paid: 'Paid', expired: 'Expired', revoked: 'Cancelled' },
  card: 'Credit or debit card',
  crypto: 'Cryptocurrency',
  bank: 'Bank transfer',
  continue: 'Continue',
  opening: 'Opening…',
  paidNote: 'Payment received. Nothing further is needed.',
  expiredNote: 'This link has expired. Ask us to send a new one.',
  revokedNote: 'This link has been cancelled.',
  missing: 'This link is not valid, or it has been removed.',
  loading: 'Loading…',
  secure: 'Provided by guanyisearch',
  payer: 'Name on the sending account',
  date: 'Transfer date',
  amountSent: 'Amount you sent',
  submitClaim: "I've sent the transfer",
  claimDone: 'Claim received. It is credited once we match it.',
  claimFailed: 'Could not file the claim. Try again in a moment.',
  cryptoFailed: 'Could not start this payment. Try again in a moment.',
  paidByCard: 'Payment received.',
};

function money(amountCents, currency = 'USD', language = 'en') {
  const value = Number(amountCents);
  if (!Number.isFinite(value)) return '—';
  try {
    return new Intl.NumberFormat(language === 'zh-CN' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency,
    }).format(value / 100);
  } catch {
    return `$${(value / 100).toFixed(2)}`;
  }
}

const endpointFor = () => `link:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;

export default function PublicPaymentLink() {
  const { token } = useParams();
  const language = window.localStorage.getItem('guanyisearch-language') || 'en-US';
  const copy = copyByLanguage[language] || en;

  const [link, setLink] = useState(null);
  const [state, setState] = useState('loading');
  const [channel, setChannel] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [bank, setBank] = useState(null);
  const [bankDone, setBankDone] = useState(false);
  const [form, setForm] = useState({ payerName: '', transferDate: '', last4: '', note: '' });

  useEffect(() => {
    let cancelled = false;
    getPublicPaymentLink(token)
      .then((payload) => {
        if (cancelled) return;
        setLink(payload);
        setState('ready');
      })
      .catch(() => { if (!cancelled) setState('missing'); });
    return () => { cancelled = true; };
  }, [token]);

  const endpoints = useMemo(() => ({
    getConfig: () => getLinkPaypalConfig(token),
    createOrder: (payload) => createLinkPaypalOrder(token, payload),
    capture: (orderId) => captureLinkPaypalOrder(token, orderId),
  }), [token]);

  const openBank = () => {
    setChannel('bank');
    setError('');
    if (bank) return;
    getLinkBankAccount(token)
      .then((payload) => setBank(payload))
      .catch(() => setError(copy.claimFailed));
  };

  if (state === 'loading') {
    return <main className="pay-link-page"><p className="pay-link-muted">{copy.loading}</p></main>;
  }

  if (state === 'missing' || !link) {
    return (
      <main className="pay-link-page">
        <p className="pay-link-title">{copy.missing}</p>
        <p className="pay-link-foot">{copy.secure}</p>
      </main>
    );
  }

  const status = link.status || 'active';
  const amount = money(link.amountCents, link.currency, language);

  return (
    <main className="pay-link-page">
      <p className="pay-link-eyebrow">{copy.title}</p>
      <p className="pay-link-amount">{amount}</p>

      {link.purpose ? (
        <p className="pay-link-purpose"><span>{copy.forWhat}</span>{link.purpose}</p>
      ) : null}

      {link.expiresAt && status === 'active' ? (
        <p className="pay-link-expiry">
          {copy.expires} {new Date(link.expiresAt).toLocaleDateString(language === 'zh-CN' ? 'zh-CN' : 'en-GB')}
        </p>
      ) : null}

      {status !== 'active' ? (
        <>
          <p className={`pay-link-status is-${status}`}>{copy.status[status] || status}</p>
          <p className="pay-link-note">
            {status === 'paid' ? copy.paidNote : status === 'expired' ? copy.expiredNote : copy.revokedNote}
          </p>
        </>
      ) : null}

      {status === 'active' ? (
        <div className="pay-link-channels">
          <button
            type="button"
            className={`pay-link-channel${channel === 'card' ? ' is-open' : ''}`}
            onClick={() => { setChannel(channel === 'card' ? '' : 'card'); setError(''); }}
          >
            <span className="pay-link-channel-mark" aria-hidden="true"><CreditCard size={19} /></span>
            <strong>{copy.card}</strong>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          {channel === 'card' ? (
            <div className="pay-link-panel">
              <PayPalCheckout
                amountUsd={(link.amountCents / 100).toFixed(2)}
                disabled={false}
                copy={PAYPAL_COPY}
                endpoints={endpoints}
                onPaid={() => { setLink((current) => ({ ...current, status: 'paid' })); setChannel(''); }}
                onError={(message) => setError(message)}
              />
              {error ? <p className="pay-link-error" role="alert">{error}</p> : null}
            </div>
          ) : null}

          <button
            type="button"
            className={`pay-link-channel${channel === 'crypto' ? ' is-open' : ''}`}
            onClick={() => { setChannel(channel === 'crypto' ? '' : 'crypto'); setError(''); }}
          >
            <span className="pay-link-channel-mark" aria-hidden="true"><CryptomusMark size={17} /></span>
            <strong>{copy.crypto}</strong>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          {channel === 'crypto' ? (
            <div className="pay-link-panel">
              <button
                type="button"
                className="pay-link-continue"
                disabled={busy}
                onClick={async () => {
                  setError('');
                  setBusy(true);
                  try {
                    const payment = await createLinkCryptoPayment(token, endpointFor());
                    if (!payment?.checkoutUrl) throw new Error('NO_URL');
                    window.location.href = payment.checkoutUrl;
                  } catch {
                    setError(copy.cryptoFailed);
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                {busy ? copy.opening : copy.continue}
              </button>
              {error ? <p className="pay-link-error" role="alert">{error}</p> : null}
            </div>
          ) : null}

          <button
            type="button"
            className={`pay-link-channel${channel === 'bank' ? ' is-open' : ''}`}
            onClick={() => (channel === 'bank' ? setChannel('') : openBank())}
          >
            <span className="pay-link-channel-mark" aria-hidden="true"><Landmark size={19} /></span>
            <strong>{copy.bank}</strong>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          {channel === 'bank' ? (
            <div className="pay-link-panel">
              {bankDone ? (
                <p className="pay-link-note">{copy.claimDone}</p>
              ) : (
                <form
                  className="pay-link-bank"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    setError('');
                    setBusy(true);
                    try {
                      await createLinkBankClaim(token, {
                        amountUsd: (link.amountCents / 100).toFixed(2),
                        payerName: form.payerName.trim(),
                        transferDate: form.transferDate,
                        last4: form.last4 || undefined,
                        note: form.note || undefined,
                      }, endpointFor());
                      setBankDone(true);
                    } catch {
                      setError(copy.claimFailed);
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  {bank ? (
                    <dl className="pay-link-bankrows">
                      <div><dt>IBAN</dt><dd>{bank.iban || bank.ibanDisplay}</dd></div>
                      <div><dt>SWIFT / BIC</dt><dd>{bank.swift}</dd></div>
                      <div><dt>{copy.amountSent}</dt><dd>{amount}</dd></div>
                    </dl>
                  ) : null}

                  <label className="pay-link-field">
                    {copy.payer}
                    <input
                      value={form.payerName}
                      onChange={(event) => setForm((current) => ({ ...current, payerName: event.target.value }))}
                      required
                    />
                  </label>
                  <label className="pay-link-field">
                    {copy.date}
                    <input
                      type="date"
                      value={form.transferDate}
                      onChange={(event) => setForm((current) => ({ ...current, transferDate: event.target.value }))}
                      required
                    />
                  </label>

                  <button className="pay-link-continue" type="submit" disabled={busy}>
                    {busy ? copy.opening : copy.submitClaim}
                  </button>
                  {error ? <p className="pay-link-error" role="alert">{error}</p> : null}
                </form>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="pay-link-foot">{copy.secure}</p>
    </main>
  );
}

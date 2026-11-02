import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicPaymentLink } from '../api/realApi';
import './PublicPaymentLink.css';

/* The page a payer opens from a payment link.
 *
 * It is public: no login, no navigation, and it must not leak who the customer
 * is. Everything shown here comes from GET /api/payment-links/:token, and the
 * page never decides that money moved — the server does.
 *
 * The three channels cannot settle through a link yet (that adapter is a later
 * backend batch), so an active link shows what it is for and says plainly that
 * payment is not open, instead of rendering buttons that would fail. */

const copyByLanguage = {
  'zh-CN': {
    title: '付款',
    amountDue: '应付金额',
    forWhat: '用途',
    expires: '有效期至',
    status: { active: '待付款', paid: '已支付', expired: '已过期', revoked: '已撤销' },
    notOpen: '在线付款暂未开放。请联系我们完成这笔付款。',
    paidNote: '这笔款项已经付过了，无需再次支付。',
    expiredNote: '这个链接已经过期，请联系我们重新发送。',
    revokedNote: '这个链接已被撤销。',
    missing: '链接无效，或已经被删除。',
    loading: '加载中…',
    secure: '由 guanyisearch 提供服务',
  },
};

const en = {
  title: 'Payment',
  amountDue: 'Amount due',
  forWhat: 'For',
  expires: 'Valid until',
  status: { active: 'Awaiting payment', paid: 'Paid', expired: 'Expired', revoked: 'Cancelled' },
  notOpen: 'Online payment is not open for links yet. Please contact us to settle this.',
  paidNote: 'This has already been paid. No further payment is needed.',
  expiredNote: 'This link has expired. Ask us to send a new one.',
  revokedNote: 'This link has been cancelled.',
  missing: 'This link is not valid, or it has been removed.',
  loading: 'Loading…',
  secure: 'Provided by guanyisearch',
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

export default function PublicPaymentLink() {
  const { token } = useParams();
  const language = window.localStorage.getItem('guanyisearch-language') || 'en-US';
  const copy = copyByLanguage[language] || en;

  const [link, setLink] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    getPublicPaymentLink(token)
      .then((payload) => {
        if (cancelled) return;
        setLink(payload);
        setState('ready');
      })
      .catch(() => {
        if (!cancelled) setState('missing');
      });
    return () => { cancelled = true; };
  }, [token]);

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
  const note = status === 'paid' ? copy.paidNote
    : status === 'expired' ? copy.expiredNote
      : status === 'revoked' ? copy.revokedNote
        : copy.notOpen;

  return (
    <main className="pay-link-page">
      <p className="pay-link-eyebrow">{copy.title}</p>
      <p className="pay-link-amount">{money(link.amountCents, link.currency, language)}</p>

      {link.purpose ? (
        <p className="pay-link-purpose"><span>{copy.forWhat}</span>{link.purpose}</p>
      ) : null}

      {link.expiresAt && status === 'active' ? (
        <p className="pay-link-expiry">
          {copy.expires} {new Date(link.expiresAt).toLocaleDateString(language === 'zh-CN' ? 'zh-CN' : 'en-GB')}
        </p>
      ) : null}

      <p className={`pay-link-status is-${status}`}>{copy.status[status] || status}</p>
      <p className="pay-link-note">{note}</p>

      <p className="pay-link-foot">{copy.secure}</p>
    </main>
  );
}

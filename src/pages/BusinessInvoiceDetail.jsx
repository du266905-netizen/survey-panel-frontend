import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInvoice } from '../api/billing';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';
import './BusinessAccountShell.css';
import './BusinessBilling.css';
import './BusinessInvoiceDetail.css';

const FALLBACK_COPY = {
  back: 'Back to invoices',
  billedTo: 'Billed to',
  paymentMethod: 'Payment method',
  lineItems: 'Line items',
  description: 'Description',
  quantity: 'Qty',
  total: 'Total',
  downloadPdf: 'Download PDF',
  loadingInvoice: 'Loading invoice…',
  invoiceLoadFailed: 'This invoice could not be loaded.',
  invoiceNotFound: 'This invoice was not found.',
  issued: 'Issued',
  paid: 'Paid',
  taxId: 'Tax ID',
  methodBank: 'Bank transfer',
  methodCrypto: 'Cryptocurrency',
  methodCard: 'Card',
  statusPaid: 'Paid',
  statusVoid: 'Void',
  retry: 'Try again',
};

const STATUS_LABEL = {
  paid: 'statusPaid',
  void: 'statusVoid',
};

const METHOD_LABEL = {
  bank_transfer: 'methodBank',
  cryptocurrency: 'methodCrypto',
  card: 'methodCard',
};

/* One invoice, exactly as the server holds it: the billing profile and the line
 * items are the snapshots taken when the payment was verified, so editing the
 * account profile later does not rewrite this page. Nothing is computed here —
 * the number, the status and the amounts all come from the response. */
export default function BusinessInvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, publicCopy } = useLanguage();
  const text = { ...FALLBACK_COPY, ...(publicCopy?.workspace?.business?.billing || {}) };

  const [state, setState] = useState('loading'); // loading | ready | notfound | error
  const [invoice, setInvoice] = useState(null);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const data = await getInvoice(id);
      setInvoice(data);
      setState('ready');
    } catch (error) {
      setState(error?.response?.status === 404 ? 'notfound' : 'error');
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const money = useMemo(
    () => new Intl.NumberFormat(language, { style: 'currency', currency: invoice?.currency || 'USD' }),
    [language, invoice],
  );
  const date = useMemo(
    () => new Intl.DateTimeFormat(language, { dateStyle: 'medium' }),
    [language],
  );

  const handleRailSelect = (railId) => {
    if (railId === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (railId === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${railId}`, language));
  };

  const profile = invoice?.billingProfile || {};
  const lines = Array.isArray(invoice?.lineItems) ? invoice.lineItems : [];
  const statusKey = STATUS_LABEL[invoice?.status];
  const methodKey = METHOD_LABEL[invoice?.paymentMethod];

  return <main className="business-account-page">
    <BusinessRail activeId="billing" onSelect={handleRailSelect} />
    <div className="business-account-pane">
      <header>
        <NotificationBell />
      </header>

      <section className="business-billing-shell">
        <button
          className="business-invoice-back"
          type="button"
          onClick={() => navigate(withLanguage('/business/billing', language))}
        >
          <ArrowLeft size={15} /> {text.back}
        </button>

        {state === 'loading' ? (
          <p className="business-billing-note">{text.loadingInvoice}</p>
        ) : state === 'notfound' ? (
          <>
            <p className="business-billing-note is-error">{text.invoiceNotFound}</p>
            <button className="business-invoice-retry" type="button" onClick={() => navigate(withLanguage('/business/billing', language))}>
              {text.back}
            </button>
          </>
        ) : state === 'error' ? (
          <>
            <p className="business-billing-note is-error">{text.invoiceLoadFailed}</p>
            <button className="business-invoice-retry" type="button" onClick={load}>
              {text.retry}
            </button>
          </>
        ) : (
          <>
            <div className="business-invoice-heading">
              <h1>{invoice.number}</h1>
              <span className={`business-invoice-status is-${invoice.status || 'void'}`}>
                {statusKey ? text[statusKey] : invoice.status}
              </span>
            </div>

            <p className="business-invoice-meta">
              <span>{text.issued} {date.format(new Date(invoice.issuedAt))}</span>
              {invoice.paidAt ? <span>{text.paid} {date.format(new Date(invoice.paidAt))}</span> : null}
              <span>{text.total} <strong>{money.format((invoice.amountCents || 0) / 100)}</strong></span>
            </p>

            <div className="business-billing-card business-invoice-card">
              <div className="business-invoice-grid">
                <div className="business-invoice-block">
                  <h2>{text.billedTo}</h2>
                  <p className="business-invoice-address">
                    <strong>{profile.companyName || '—'}</strong>
                    {profile.addressLine1 ? <span>{profile.addressLine1}</span> : null}
                    {profile.addressLine2 ? <span>{profile.addressLine2}</span> : null}
                    {profile.city || profile.postalCode ? (
                      <span>{[profile.city, profile.postalCode].filter(Boolean).join(', ')}</span>
                    ) : null}
                    {profile.country ? <span>{profile.country}</span> : null}
                    {profile.vatNumber ? (
                      <span>{text.taxId} {[profile.taxIdType, profile.vatNumber].filter(Boolean).join(' ')}</span>
                    ) : null}
                    {profile.billingEmail ? <span>{profile.billingEmail}</span> : null}
                  </p>
                </div>

                <div className="business-invoice-block">
                  <h2>{text.paymentMethod}</h2>
                  <p className="business-invoice-address">
                    <span>{methodKey ? text[methodKey] : (invoice.paymentMethod || '—')}</span>
                    {invoice.paidAt ? <span>{text.paid} {date.format(new Date(invoice.paidAt))}</span> : null}
                  </p>
                </div>
              </div>

              <div className="business-invoice-lines">
                <table className="business-billing-table">
                  <thead>
                    <tr>
                      <th>{text.description}</th>
                      <th>{text.quantity}</th>
                      <th>{text.total}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.length === 0 ? (
                      <tr><td colSpan={3}>—</td></tr>
                    ) : lines.map((line, index) => (
                      <tr key={`${line.description}-${index}`}>
                        <td>{line.description}</td>
                        <td className="is-number">{line.quantity ?? 1}</td>
                        <td className="is-number">{money.format((line.amountCents || 0) / 100)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}>{text.total}</td>
                      <td className="is-number">{money.format((invoice.amountCents || 0) / 100)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="business-invoice-actions">
                {invoice.pdfUrl ? (
                  <a
                    className="business-button business-invoice-download"
                    href={invoice.pdfUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Download size={15} /> {text.downloadPdf}
                  </a>
                ) : null}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  </main>;
}

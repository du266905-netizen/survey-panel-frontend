import { useEffect, useMemo, useState } from 'react';
import { CalendarRange, ChevronLeft, ChevronRight, Receipt } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { listInvoices } from '../api/billing';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';
import './BusinessAccountShell.css';
import './BusinessBilling.css';

/* Every string comes from the language library (publicCopy.workspace.business
 * .billing); this fallback keeps a locale that has not been translated yet from
 * rendering a raw key, the same shape BusinessAvatarCropper uses. */
const FALLBACK_COPY = {
  title: 'Invoices and billing',
  intro: 'Invoices and monthly statements for this workspace appear here.',
  tabInvoices: 'Invoices',
  tabStatements: 'Monthly statements',
  emptyInvoices: 'No invoices yet.',
  emptyStatements: 'No statements for this date.',
  invoicesHint: 'Invoices appear here once a scope is confirmed and billed.',
  statementsHint: 'A monthly statement summarises the activity of that month.',
  prevMonth: 'Previous month',
  nextMonth: 'Next month',
};

/* The section itself carries no header, no balance and no top-up control: the
   account area owns those, and the client asked for the balance to stay in the
   top bar. What is left is the tab pair and, per tab, one row that says what is
   missing and what will appear there. */
export default function BusinessBilling() {
  const navigate = useNavigate();
  const { language, publicCopy } = useLanguage();
  const text = { ...FALLBACK_COPY, ...(publicCopy?.workspace?.business?.billing || {}) };
  const workspaceStaticMap = publicCopy?.workspace?.business?.workspaceStatic || {};
  const ws = workspaceStaticMap[language] || workspaceStaticMap['en-GB'] || {};

  const [tab, setTab] = useState('invoices');
  const [invoices, setInvoices] = useState([]);
  const [invoiceState, setInvoiceState] = useState('loading');
  const [invoiceError, setInvoiceError] = useState('');

  useEffect(() => {
    let alive = true;
    setInvoiceState('loading');
    listInvoices({ limit: 20 })
      .then(({ items }) => {
        if (!alive) return;
        setInvoices(items);
        setInvoiceState('ready');
      })
      .catch((error) => {
        if (!alive) return;
        setInvoiceError(error?.response?.status === 401 ? 'auth' : 'failed');
        setInvoiceState('error');
      });
    return () => { alive = false; };
  }, []);
  const [month, setMonth] = useState(() => new Date());

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(language, { month: 'long', year: 'numeric' }).format(month),
    [language, month],
  );
  const shiftMonth = (step) => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + step, 1));

  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  return <main className="business-account-page">
    <BusinessRail activeId="billing" onSelect={handleRailSelect} />
    <div className="business-account-pane">
      <header>
        <NotificationBell />
      </header>

      <section className="business-billing-shell">
      <div>
        <h1>{text.title}</h1>
        <p className="business-billing-intro">{text.intro}</p>
      </div>

      <div className="business-billing-card">
        <div className="business-billing-tabs" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={tab === 'invoices'}
        className={tab === 'invoices' ? 'is-active' : ''}
        onClick={() => setTab('invoices')}
      >
        {text.tabInvoices}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={tab === 'statements'}
        className={tab === 'statements' ? 'is-active' : ''}
        onClick={() => setTab('statements')}
      >
            {text.tabStatements}
          </button>
        </div>

        <div className="business-billing-panel" role="tabpanel">
      {tab === 'invoices' ? (
        invoiceState === 'loading' ? (
          <p className="business-billing-note">{text.loadingInvoices || 'Loading invoices…'}</p>
        ) : invoiceState === 'error' ? (
          <p className="business-billing-note is-error">
            {invoiceError === 'auth'
              ? (text.invoiceAuth || 'Sign in again to see invoices.')
              : (text.invoiceFailed || 'Invoices could not be loaded. Try again shortly.')}
          </p>
        ) : invoices.length === 0 ? (
          <div className="business-billing-empty">
            <span className="business-billing-empty-icon" aria-hidden="true"><Receipt size={17} /></span>
            <div>
              <p>{text.emptyInvoices}</p>
              <small>{text.invoicesHint}</small>
            </div>
          </div>
        ) : (
          <table className="business-billing-table">
            <thead>
              <tr>
                <th>{text.colNumber || 'Invoice'}</th>
                <th>{text.colIssued || 'Issued'}</th>
                <th>{text.colAmount || 'Amount'}</th>
                <th>{text.colStatus || 'Status'}</th>
                <th aria-label={text.colDownload || 'Download'} />
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.number}</td>
                  <td>{invoice.issuedAt ? new Date(invoice.issuedAt).toLocaleDateString(language) : '—'}</td>
                  <td>{new Intl.NumberFormat(language, { style: 'currency', currency: invoice.currency || 'USD' })
                    .format((invoice.amountCents || 0) / 100)}</td>
                  <td>{invoice.status}</td>
                  <td>
                    {invoice.pdfUrl ? (
                      <a href={invoice.pdfUrl} target="_blank" rel="noreferrer noopener">
                        {text.download || 'PDF'}
                      </a>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <>
            <div className="business-billing-month">
              <button type="button" onClick={() => shiftMonth(-1)} aria-label={text.prevMonth}>
                <ChevronLeft size={15} />
              </button>
              <strong>{monthLabel}</strong>
              <button type="button" onClick={() => shiftMonth(1)} aria-label={text.nextMonth}>
                <ChevronRight size={15} />
              </button>
            </div>
            <div className="business-billing-empty">
              <span className="business-billing-empty-icon" aria-hidden="true"><CalendarRange size={17} /></span>
              <div>
                <p>{text.emptyStatements}</p>
                <small>{text.statementsHint}</small>
              </div>
            </div>
          </>
        )}
        </div>
      </div>
      </section>
    </div>
  </main>;
}

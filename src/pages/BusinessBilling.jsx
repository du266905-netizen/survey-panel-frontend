import { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarRange, ChevronLeft, ChevronRight, Receipt } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  colNumber: 'Invoice',
  colIssued: 'Issued',
  colAmount: 'Amount',
  colStatus: 'Status',
  download: 'PDF',
  loadingInvoices: 'Loading invoices…',
  invoiceAuth: 'Sign in again to see invoices.',
  invoiceFailed: 'Invoices could not be loaded. Try again shortly.',
  invoiceRetry: 'Try again',
  loadMore: 'Load more',
  statusPaid: 'Paid',
  statusVoid: 'Void',
};

const STATUS_LABEL = { paid: 'statusPaid', void: 'statusVoid' };

/* The section itself carries no header, no balance and no top-up control: the
   account area owns those, and the client asked for the balance to stay in the
   top bar. What is left is the tab pair and, per tab, one row that says what is
   missing and what will appear there. */
export default function BusinessBilling() {
  const navigate = useNavigate();
  const { language, publicCopy } = useLanguage();
  const text = { ...FALLBACK_COPY, ...(publicCopy?.workspace?.business?.billing || {}) };

  const [tab, setTab] = useState('invoices');
  const [invoices, setInvoices] = useState([]);
  const [invoiceState, setInvoiceState] = useState('loading');
  const [invoiceError, setInvoiceError] = useState('');
  const [nextCursor, setNextCursor] = useState(null);
  const [appending, setAppending] = useState(false);

  /* The list is cursor-paged server-side: a client with years of invoices must
     be able to reach the older ones, so the page keeps the cursor instead of
     silently showing the first 20 forever. */
  const loadInvoices = useCallback(async ({ cursor, append = false } = {}) => {
    if (append) setAppending(true);
    else setInvoiceState('loading');
    try {
      const { items, nextCursor: next } = await listInvoices({ limit: 20, cursor });
      setInvoices((current) => (append ? [...current, ...items] : items));
      setNextCursor(next);
      setInvoiceState('ready');
    } catch (error) {
      setInvoiceError(error?.response?.status === 401 ? 'auth' : 'failed');
      if (!append) setInvoiceState('error');
    } finally {
      setAppending(false);
    }
  }, []);

  useEffect(() => { loadInvoices(); }, [loadInvoices]);

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
                <p className="business-billing-note">{text.loadingInvoices}</p>
              ) : invoiceState === 'error' ? (
                <>
                  <p className="business-billing-note is-error">
                    {invoiceError === 'auth' ? text.invoiceAuth : text.invoiceFailed}
                  </p>
                  <button className="business-billing-retry" type="button" onClick={() => loadInvoices()}>
                    {text.invoiceRetry}
                  </button>
                </>
              ) : invoices.length === 0 ? (
                <div className="business-billing-empty">
                  <span className="business-billing-empty-icon" aria-hidden="true"><Receipt size={17} /></span>
                  <div>
                    <p>{text.emptyInvoices}</p>
                    <small>{text.invoicesHint}</small>
                  </div>
                </div>
              ) : (
                <>
                  <table className="business-billing-table">
                    <thead>
                      <tr>
                        <th>{text.colNumber}</th>
                        <th>{text.colIssued}</th>
                        <th>{text.colAmount}</th>
                        <th>{text.colStatus}</th>
                        <th aria-label={text.download} />
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td>
                            <Link to={withLanguage(`/business/billing/invoices/${encodeURIComponent(invoice.id)}`, language)}>
                              {invoice.number}
                            </Link>
                          </td>
                          <td>{invoice.issuedAt ? new Date(invoice.issuedAt).toLocaleDateString(language) : '—'}</td>
                          <td>
                            {new Intl.NumberFormat(language, { style: 'currency', currency: invoice.currency || 'USD' })
                              .format((invoice.amountCents || 0) / 100)}
                          </td>
                          <td>{STATUS_LABEL[invoice.status] ? text[STATUS_LABEL[invoice.status]] : invoice.status}</td>
                          <td>
                            {invoice.pdfUrl ? (
                              <a href={invoice.pdfUrl} target="_blank" rel="noreferrer noopener">
                                {text.download}
                              </a>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {nextCursor ? (
                    <div className="business-billing-more">
                      <button type="button" disabled={appending} onClick={() => loadInvoices({ cursor: nextCursor, append: true })}>
                        {text.loadMore}
                      </button>
                    </div>
                  ) : null}
                </>
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

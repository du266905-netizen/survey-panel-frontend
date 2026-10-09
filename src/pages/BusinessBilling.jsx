import { useMemo, useState } from 'react';
import { CalendarRange, ChevronLeft, ChevronRight, Receipt } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    <BusinessRail onSelect={handleRailSelect} />
    <div className="business-account-pane">
      <header>
        <button type="button" onClick={() => navigate(withLanguage('/business/workspace', language))}>
          <ArrowLeft size={17} /> {ws.account?.backToProjects}
        </button>
        <NotificationBell />
      </header>

      <section className="business-billing-shell">
      <div>
        <p className="business-eyebrow">{ws.account?.eyebrow}</p>
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
        <div className="business-billing-empty">
          <span className="business-billing-empty-icon" aria-hidden="true"><Receipt size={17} /></span>
          <div>
            <p>{text.emptyInvoices}</p>
            <small>{text.invoicesHint}</small>
          </div>
        </div>
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

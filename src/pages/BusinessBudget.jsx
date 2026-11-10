import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createBudget, listBudgets, updateBudget } from '../api/billing';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';
import './BusinessAccountShell.css';
import './BusinessBudget.css';

/* Every string comes from the language library (publicCopy.workspace.business
 * .budget); this fallback keeps a locale that has not been translated yet from
 * rendering a raw key, the same shape the other account pages use. */
const FALLBACK_COPY = {
  title: 'Account budget',
  intro: 'An account budget caps what this workspace can spend over a period.',
  create: 'Create a budget',
  colName: 'Budget name', colPeriod: 'Period', colStart: 'Start date', colEnd: 'End date',
  colAmount: 'Budget amount', colSpent: 'Spent', colRemaining: 'Remaining',
  colStatus: 'Status', colActions: 'Actions',
  empty: 'No budgets yet.', emptyHint: 'A budget appears here once you create one.',
  planningNote: 'Spending is tracked against each budget; it does not block a purchase yet.',
  loading: 'Loading budgets…', loadFailed: 'Budgets could not be loaded.',
  retry: 'Try again', loadMore: 'Load more', saveFailed: "That didn't save. Try again.",
  noEndDate: 'No end date', startMonth: 'Start month',
  endHint: 'Leave the end date empty to cover the whole month.',
  endTitle: 'End this budget now?', endIntro: 'If you end this budget now:',
  endPoint1: 'Research already in progress is not affected.',
  endPoint2: 'This budget stops collecting spending.',
  endNote: 'You can create a new budget at any time.',
  endKeep: 'Keep the budget', endConfirm: 'End the budget',
  edit: 'Edit', editBudget: 'Edit budget',
  statusActive: 'Active', statusEnded: 'Ended', statusScheduled: 'Not started',
  save: 'Save budget', cancel: 'Cancel', end: 'End',
  newBudget: 'New budget', anyEnd: 'None', pickDate: 'Choose a date',
};

const pad2 = (value) => String(value).padStart(2, '0');

/* Budget periods are UTC months on the server: startsAt must be the first
   instant of a UTC month. Deriving the month from local time would put a
   November budget on 31 October for anyone west of Greenwich, so every
   boundary in this file is computed in UTC and the date inputs are formatted
   back with timeZone: 'UTC'. */
const utcMonthOf = (value) => {
  const date = new Date(value);
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}`;
};
const currentMonth = () => utcMonthOf(new Date());
const monthStartIso = (month) => `${month}-01T00:00:00.000Z`;
const monthEndIso = (month) => {
  const [year, monthNumber] = month.split('-').map(Number);
  return new Date(Date.UTC(year, monthNumber, 1)).toISOString();
};
const daysInMonth = (month) => {
  const [year, monthNumber] = month.split('-').map(Number);
  return new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
};

/* endsAt is exclusive: ending on day D means "up to the first instant of D+1",
   so spending on D is still counted. The last day of the month therefore maps
   to the month boundary, which the server accepts (endsAt <= next month). */
const endIsoFromDay = (month, day) => {
  const [year, monthNumber] = month.split('-').map(Number);
  return new Date(Date.UTC(year, monthNumber - 1, Number(day) + 1)).toISOString();
};
const dayFromEndIso = (month, endsAt) => {
  if (!endsAt || Date.parse(endsAt) === Date.parse(monthEndIso(month))) return '';
  const date = new Date(Date.parse(endsAt) - 86400000);
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
};

const newKey = () => (globalThis.crypto?.randomUUID?.()
  || `idem-${Date.now()}-${Math.random().toString(16).slice(2)}`);

/* Budgets live on the account, one per UTC month, and the server owns the
   list: amount and end date are writable, the month and the owner are not.
   `spentCents` is aggregated from the ledger on every read, so nothing here
   keeps its own running total. */
export default function BusinessBudget() {
  const navigate = useNavigate();
  const { language, publicCopy } = useLanguage();
  const text = { ...FALLBACK_COPY, ...(publicCopy?.workspace?.business?.budget || {}) };

  const [listState, setListState] = useState('loading'); // loading | ready | error
  const [budgets, setBudgets] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [notice, setNotice] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);   // the budget being edited, or null when creating
  const [endTarget, setEndTarget] = useState(null); // the budget awaiting "end this budget?"
  const [draft, setDraft] = useState({ name: '', amount: '', month: currentMonth(), endDay: '' });
  const [draftKey, setDraftKey] = useState(newKey);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const money = useMemo(
    () => new Intl.NumberFormat(language, { style: 'currency', currency: 'USD' }),
    [language],
  );
  const shortDate = useMemo(
    () => new Intl.DateTimeFormat(language, { month: 'numeric', day: 'numeric', timeZone: 'UTC' }),
    [language],
  );
  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(language, { month: 'long', year: 'numeric', timeZone: 'UTC' }),
    [language],
  );

  /* Kept free of `text`: depending on the copy object would give this callback
     a new identity on every render, and the effect below would refetch in a
     loop. The notice carries a reason, the render localises it. */
  const load = useCallback(async ({ cursor, append = false } = {}) => {
    if (!append) setListState('loading');
    setNotice('');
    try {
      const { items, nextCursor: next } = await listBudgets({ limit: 20, cursor });
      setBudgets((current) => (append ? [...current, ...items] : items));
      setNextCursor(next);
      setListState('ready');
    } catch {
      if (append) setNotice('loadFailed');
      else setListState('error');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  const openCreate = () => {
    setEditing(null);
    setDraft({ name: '', amount: '', month: currentMonth(), endDay: '' });
    setDraftKey(newKey());
    setFormError('');
    setDialogOpen(true);
  };

  const openEdit = (budget) => {
    const month = utcMonthOf(budget.startsAt);
    setEditing(budget);
    setDraft({
      name: budget.name,
      amount: String((budget.amountCents || 0) / 100),
      month,
      endDay: dayFromEndIso(month, budget.endsAt),
    });
    setDraftKey(newKey());
    setFormError('');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setFormError('');
    setSaving(false);
  };

  const draftMonth = editing ? utcMonthOf(editing.startsAt) : draft.month;
  const lastDay = draftMonth ? daysInMonth(draftMonth) : 31;
  const amountCents = Math.round(Number(draft.amount) * 100);
  const canSave = draft.name.trim().length > 0
    && Number.isFinite(amountCents) && amountCents > 0
    /* A cleared month input yields '', which would post a malformed startsAt. */
    && Boolean(editing || /^\d{4}-\d{2}$/.test(draft.month));

  const saveDraft = async (event) => {
    event.preventDefault();
    if (!canSave || saving) return;
    setSaving(true);
    setFormError('');
    try {
      if (editing) {
        /* Only the amount and the end date are writable: the month is fixed by
           the record, so moving a budget to another period is a new budget. */
        await updateBudget(editing.id, {
          amountCents,
          endsAt: draft.endDay ? endIsoFromDay(draftMonth, draft.endDay.slice(8, 10)) : monthEndIso(draftMonth),
        }, { key: draftKey });
      } else {
        await createBudget({
          name: draft.name.trim(),
          amountCents,
          startsAt: monthStartIso(draft.month),
          ...(draft.endDay ? { endsAt: endIsoFromDay(draft.month, draft.endDay.slice(8, 10)) } : {}),
        }, { key: draftKey });
      }
      closeDialog();
      await load();
    } catch {
      setFormError(text.saveFailed);
      setSaving(false);
    }
  };

  /* "End now" is a PATCH of endsAt to this instant: the server refuses an end
     before the start, so the action only shows for a budget that has begun. */
  const endBudget = async () => {
    if (!endTarget) return;
    const target = endTarget;
    setEndTarget(null);
    setNotice('');
    try {
      await updateBudget(target.id, { endsAt: new Date().toISOString() });
      await load();
    } catch {
      setNotice('saveFailed');
    }
  };

  const now = Date.now();
  const rows = budgets.map((budget) => {
    const month = utcMonthOf(budget.startsAt);
    const started = Date.parse(budget.startsAt) <= now;
    const ended = Date.parse(budget.endsAt) <= now;
    const spent = (budget.spentCents || 0) / 100;
    const amount = (budget.amountCents || 0) / 100;
    return {
      ...budget,
      month,
      started,
      ended,
      amount,
      spent,
      share: budget.amountCents > 0 ? Math.round(((budget.spentCents || 0) / budget.amountCents) * 100) : 0,
      endsFullMonth: Date.parse(budget.endsAt) === Date.parse(monthEndIso(month)),
    };
  });

  /* The toolbar totals only the budgets that are running right now: a past or
     a not-yet-started month would make the number mean two things at once. */
  const activeTotal = rows.reduce((total, budget) => (
    budget.started && !budget.ended
      ? { amount: total.amount + budget.amount, spent: total.spent + budget.spent }
      : total
  ), { amount: 0, spent: 0 });

  return <main className="business-account-page">
    <BusinessRail activeId="budget" onSelect={handleRailSelect} />
    <div className="business-account-pane">
      <header>
        <NotificationBell />
      </header>

      <section className="business-budget-shell">
        <div className="business-budget-heading">
          <div className="business-budget-heading-copy">
            <h1>{text.title}</h1>
            <p className="business-budget-intro">{text.intro}</p>
          </div>

          <button className="business-button business-budget-create" type="button" onClick={openCreate}>
            <Plus size={15} /> {text.create}
          </button>
        </div>

        <div className="business-budget-card">
          {activeTotal.amount > 0 ? (
            <div className="business-budget-totals">
              <p className="business-budget-total">
                <span>{text.colAmount} <strong>{money.format(activeTotal.amount)}</strong></span>
                <span>{text.colSpent} <strong>{money.format(activeTotal.spent)}</strong></span>
              </p>
            </div>
          ) : null}

          {notice ? (
            <p className="business-budget-notice" role="status">
              {notice === 'saveFailed' ? text.saveFailed : text.loadFailed}
            </p>
          ) : null}

          <div className="business-budget-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">{text.colName}</th>
                  <th scope="col">{text.colPeriod}</th>
                  <th scope="col" className="is-number">{text.colAmount}</th>
                  <th scope="col" className="is-number">{text.colSpent}</th>
                  <th scope="col" className="is-number is-remaining">{text.colRemaining}</th>
                  <th scope="col">{text.colStatus}</th>
                  <th scope="col">{text.colActions}</th>
                </tr>
              </thead>
              <tbody>
                {listState === 'loading' ? (
                  <tr className="business-budget-empty">
                    <td colSpan={7}><p className="business-budget-note">{text.loading}</p></td>
                  </tr>
                ) : listState === 'error' ? (
                  <tr className="business-budget-empty">
                    <td colSpan={7}>
                      <p className="business-budget-note is-error">{text.loadFailed}</p>
                      <button className="business-budget-retry" type="button" onClick={() => load()}>{text.retry}</button>
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr className="business-budget-empty">
                    <td colSpan={7}>
                      <div className="business-budget-empty-inner">
                        <span className="business-budget-empty-icon" aria-hidden="true"><Wallet size={17} /></span>
                        <div>
                          <strong>{text.empty}</strong>
                          <small>{text.emptyHint}</small>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : rows.map((budget) => (
                  <tr key={budget.id}>
                    <td>{budget.name}</td>
                    <td>
                      <span className="business-budget-period">{monthLabel.format(new Date(budget.startsAt))}</span>
                      {budget.endsFullMonth ? null : (
                        <small className="business-budget-period-end">
                          – {shortDate.format(new Date(budget.endsAt))}
                        </small>
                      )}
                    </td>
                    <td className="is-number">{money.format(budget.amount)}</td>
                    <td className="is-number">
                      {money.format(budget.spent)}
                      <span className="business-budget-share">{budget.share}%</span>
                    </td>
                    <td className="is-number is-remaining">{money.format((budget.remainingCents || 0) / 100)}</td>
                    <td>
                      <span className={`business-budget-status is-${budget.ended ? 'ended' : budget.started ? 'active' : 'scheduled'}`}>
                        {budget.ended ? text.statusEnded : budget.started ? text.statusActive : text.statusScheduled}
                      </span>
                    </td>
                    <td>
                      {budget.ended ? <span className="business-budget-none">—</span> : (
                        <span className="business-budget-actions">
                          <button type="button" className="business-budget-edit" onClick={() => openEdit(budget)}>{text.edit}</button>
                          {budget.started ? (
                            <>
                              <i aria-hidden="true">|</i>
                              <button type="button" className="business-budget-end" onClick={() => setEndTarget(budget)}>{text.end}</button>
                            </>
                          ) : null}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {nextCursor ? (
            <div className="business-budget-more">
              <button type="button" onClick={() => load({ cursor: nextCursor, append: true })}>{text.loadMore}</button>
            </div>
          ) : null}
        </div>
      </section>
    </div>

    {endTarget && (
      <div className="business-budget-modal" role="dialog" aria-modal="true" aria-labelledby="budget-end-title">
        <section>
          <h2 id="budget-end-title">{text.endTitle}</h2>
          <p>{text.endIntro}</p>
          <ul>
            <li>{text.endPoint1}</li>
            <li>{text.endPoint2}</li>
          </ul>
          <p className="business-budget-modal-note">{text.endNote}</p>
          <div className="business-budget-modal-actions">
            <button type="button" onClick={() => setEndTarget(null)}>{text.endKeep}</button>
            <button className="business-button" type="button" onClick={endBudget}>{text.endConfirm}</button>
          </div>
        </section>
      </div>
    )}

    {dialogOpen && (
      <div className="business-budget-modal" role="dialog" aria-modal="true" aria-labelledby="budget-new-title">
        <section>
          <h2 id="budget-new-title">{editing ? text.editBudget : text.newBudget}</h2>
          <form onSubmit={saveDraft}>
            <div className="business-budget-pair">
              <div className="business-budget-field">
                <label htmlFor="budget-name">{text.colName}</label>
                {/* Update only takes amountCents and endsAt: a name field here
                    would look editable and save nothing, so an existing budget
                    shows its name the same way it shows its month. */}
                {editing ? (
                  <p className="business-budget-fixed">{editing.name}</p>
                ) : (
                  <input
                    id="budget-name"
                    value={draft.name}
                    maxLength={180}
                    onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                  />
                )}
              </div>
              <div className="business-budget-field">
                <label htmlFor="budget-amount">{text.colAmount}</label>
                <input
                  id="budget-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  value={draft.amount}
                  onChange={(event) => setDraft((current) => ({ ...current, amount: event.target.value }))}
                />
              </div>
            </div>

            <div className="business-budget-pair business-budget-dates">
              <div className="business-budget-field">
                <label htmlFor="budget-month">{text.startMonth}</label>
                {/* The period is fixed for an existing budget: the server only
                    accepts an amount or an end date on update, so the month is
                    shown as text rather than offered as a control that would
                    silently do nothing. */}
                {editing ? (
                  <p className="business-budget-fixed">{monthLabel.format(new Date(monthStartIso(draftMonth)))}</p>
                ) : (
                  <input
                    id="budget-month"
                    type="month"
                    value={draft.month}
                    onChange={(event) => setDraft((current) => ({ ...current, month: event.target.value, endDay: '' }))}
                  />
                )}
              </div>
              <div className="business-budget-field">
                <label htmlFor="budget-end">{text.colEnd}</label>
                <input
                  id="budget-end"
                  type="date"
                  min={`${draftMonth}-01`}
                  max={`${draftMonth}-${pad2(lastDay)}`}
                  value={draft.endDay}
                  onChange={(event) => setDraft((current) => ({ ...current, endDay: event.target.value }))}
                />
                <small className="business-budget-field-hint">{text.endHint}</small>
              </div>
            </div>

            {formError ? <p className="business-budget-form-error" role="alert">{formError}</p> : null}

            <div className="business-budget-modal-actions">
              <button type="button" onClick={closeDialog}>{text.cancel}</button>
              <button className="business-button" type="submit" disabled={!canSave || saving}>
                {text.save}
              </button>
            </div>
          </form>
        </section>
      </div>
    )}
  </main>;
}

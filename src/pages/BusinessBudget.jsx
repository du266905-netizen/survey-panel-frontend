import { useMemo, useState } from 'react';
import { ArrowLeft, Plus, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import { useAuth } from '../components/AuthContext';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';
import './BusinessAccountShell.css';
import './BusinessBudget.css';

/* Every string comes from the language library (publicCopy.workspace.business
 * .budget); this fallback keeps a locale that has not been translated yet from
 * rendering a raw key, the same shape the other account pages use. */
const FALLBACK_COPY = {
  title: 'Account budget',
  intro: 'An account budget caps what this workspace can spend over a period. You can also cap each team member within that period.',
  create: 'Create a budget',
  colName: 'Budget name', colStart: 'Start date', colEnd: 'End date',
  colAmount: 'Budget amount', colSpent: 'Spent', colStatus: 'Status', colActions: 'Actions',
  empty: 'No budgets yet.', emptyOff: 'No budget items.',
  emptyHint: 'A budget appears here once you create one.', noEndDate: 'No end date',
  planningNote: 'Budgets are planning only for now: they do not limit spending yet.',
  endTitle: 'End this budget now?', endIntro: 'If you end this budget now:',
  endPoint1: 'Research already in progress is not affected.',
  endPoint2: 'Your team can no longer use this budget.',
  endNote: 'You can create a new budget or turn off the account budget at any time.',
  endKeep: 'Keep the budget', endConfirm: 'End the budget',
  edit: 'Edit', editBudget: 'Edit budget',
  statusActive: 'Active', statusEnded: 'Ended', save: 'Save budget', cancel: 'Cancel', end: 'End',
  disableTitle: 'Turn off the account budget?',
  disableIntro: 'If you turn off the account budget:',
  disablePoint1: 'Nothing caps what you spend over a period.',
  disablePoint2: 'Everyone on the team can spend without a budget limit.',
  disableNote: 'You can turn budget limits back on at any time.',
  disableKeep: 'Keep the account budget',
  disableConfirm: 'Turn off the account budget',
  newBudget: 'New budget',
  now: 'Now', anyEnd: 'None', pickDate: 'Choose a date',
  memberLimits: 'Budget limits', memberName: 'Name', memberEmail: 'Email', memberLimit: 'Budget limit',
};

/* Local calendar day, not the UTC one: toISOString() is a day behind for
   everyone east of Greenwich in the morning (and west of it in the evening). */
const today = () => {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

/* The frontend is complete; the store is not. `POST /api/business/budgets` does
   not exist yet, so budgets live in this component's state: the dialogs, the
   table, the percentage and the "end" action all work, and everything is gone on
   reload. When the endpoint lands, replace the state writes with the call and
   read the list from the response — nothing else in this file changes. */
export default function BusinessBudget() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, publicCopy } = useLanguage();
  const text = { ...FALLBACK_COPY, ...(publicCopy?.workspace?.business?.budget || {}) };
  const workspaceStaticMap = publicCopy?.workspace?.business?.workspaceStatic || {};
  const ws = workspaceStaticMap[language] || workspaceStaticMap['en-GB'] || {};

  const [enabled, setEnabled] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const [newOpen, setNewOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);
  const [editing, setEditing] = useState(null);   // the budget being edited, or null when creating
  const [endTarget, setEndTarget] = useState(null); // the budget awaiting "end this budget?"
  const [draft, setDraft] = useState({ name: '', amount: '', start: today(), end: '' });
  const [startMode, setStartMode] = useState('now');
  const [endMode, setEndMode] = useState('none');

  const money = useMemo(
    () => new Intl.NumberFormat(language, { style: 'currency', currency: 'USD' }),
    [language],
  );
  const date = useMemo(
    () => new Intl.DateTimeFormat(language, { dateStyle: 'medium' }),
    [language],
  );

  const memberName = user?.displayName || user?.email?.split('@')[0] || '';
  const memberEmail = user?.email || '';

  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  /* Turning budget control on is a request to budget something, so with no
     budgets yet it opens the create dialog straight away; with budgets already
     there it only flips the switch. Turning it off asks first: the dialog says
     what stops working and reminds you that it is reversible. */
  const toggleEnabled = (next) => {
    if (next) {
      setEnabled(true);
      if (budgets.length === 0) setNewOpen(true);
      return;
    }
    setDisableOpen(true);
  };

  const openCreate = () => {
    setEditing(null);
    setStartMode('now');
    setEndMode('none');
    setDraft({ name: '', amount: '', start: today(), end: '' });
    setNewOpen(true);
  };

  const openEdit = (budget) => {
    setEditing(budget);
    setStartMode(budget.start ? 'date' : 'now');
    setEndMode(budget.end ? 'date' : 'none');
    setDraft({ name: budget.name, amount: String(budget.amount), start: budget.start || today(), end: budget.end || '' });
    setNewOpen(true);
  };

  const closeDraft = () => {
    setNewOpen(false);
    setEditing(null);
    setDraft({ name: '', amount: '', start: today(), end: '' });
    setStartMode('now');
    setEndMode('none');
  };

  const saveDraft = (event) => {
    event.preventDefault();
    const amount = Number(draft.amount);
    if (!draft.name.trim() || !Number.isFinite(amount) || amount <= 0) return;
    setEnabled(true);
    const fields = {
      name: draft.name.trim(),
      start: startMode === 'date' ? draft.start : today(),
      end: endMode === 'date' ? draft.end : '',
      amount,
    };
    setBudgets((current) => (editing
      ? current.map((budget) => (budget.id === editing.id ? { ...budget, ...fields } : budget))
      : [...current, { id: `b-${current.length + 1}`, ...fields, spent: 0, status: 'active' }]));
    closeDraft();
  };

  const endBudget = (id) => setBudgets((current) => current.map((budget) => (
    budget.id === id ? { ...budget, status: 'ended' } : budget
  )));

  /* An <input type="date"> yields YYYY-MM-DD, which Date() reads as UTC midnight;
     west of Greenwich that renders as the previous day. Anchor it to local time. */
  const renderDate = (value, fallback) => (value ? date.format(new Date(`${value}T00:00:00`)) : fallback);

  return <main className="business-account-page">
    <BusinessRail onSelect={handleRailSelect} />
    <div className="business-account-pane">
      <header>
        <button type="button" onClick={() => navigate(withLanguage('/business/workspace', language))}>
          <ArrowLeft size={17} /> {ws.account?.backToProjects}
        </button>
        <NotificationBell />
      </header>

      <section className="business-budget-shell">
        <div>
          <p className="business-eyebrow">{ws.account?.eyebrow}</p>
          <h1>{text.title}</h1>
          <p className="business-budget-intro">{text.intro}</p>
          {/* D-02 = B: budgets are plans in this version. Saying so here stops a
              client reading the switch as a spending cap. */}
          <p className="business-budget-planning-note">{text.planningNote}</p>
        </div>

        <div className="business-budget-card">
          <div className="business-budget-head">
            <label className="business-budget-switch">
              <span>{text.title}</span>
              <input type="checkbox" checked={enabled} onChange={(event) => toggleEnabled(event.target.checked)} />
              <i aria-hidden="true" />
            </label>
            <button className="business-button business-budget-create" type="button" onClick={openCreate}>
              <Plus size={15} /> {text.create}
            </button>
          </div>

          <div className="business-budget-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">{text.colName}</th>
                  <th scope="col">{text.colStart}</th>
                  <th scope="col">{text.colEnd}</th>
                  <th scope="col">{text.colAmount}</th>
                  <th scope="col">{text.colSpent}</th>
                  <th scope="col">{text.colStatus}</th>
                  <th scope="col">{text.colActions}</th>
                </tr>
              </thead>
              <tbody>
                {/* Switch off: nothing is being applied, and the body says so
                    instead of listing rows that are not in force. */}
                {!enabled ? (
                  <tr className="business-budget-off">
                    <td colSpan={7}>{text.emptyOff || 'No budget items.'}</td>
                  </tr>
                ) : budgets.length === 0 ? (
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
                ) : budgets.map((budget) => {
                  const share = budget.amount > 0 ? Math.round((budget.spent / budget.amount) * 100) : 0;
                  return (
                    <tr key={budget.id}>
                      <td>{budget.name}</td>
                      <td>{renderDate(budget.start, text.noEndDate)}</td>
                      <td>{renderDate(budget.end, text.noEndDate)}</td>
                      <td className="is-number">{money.format(budget.amount)}</td>
                      <td className="is-number">{money.format(budget.spent)} <span className="business-budget-share">{share}%</span></td>
                      <td>
                        <span className={`business-budget-status is-${budget.status}`}>
                          {budget.status === 'active' ? text.statusActive : text.statusEnded}
                        </span>
                      </td>
                      <td>
                        {budget.status === 'active' ? (
                          <span className="business-budget-actions">
                            <button type="button" className="business-budget-edit" onClick={() => openEdit(budget)}>{text.edit}</button>
                            <i aria-hidden="true">|</i>
                            <button type="button" className="business-budget-end" onClick={() => setEndTarget(budget)}>{text.end}</button>
                          </span>
                        ) : <span className="business-budget-none">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

    {disableOpen && (
      <div className="business-budget-modal" role="dialog" aria-modal="true" aria-labelledby="budget-disable-title">
        <section>
          <h2 id="budget-disable-title">{text.disableTitle}</h2>
          <p>{text.disableIntro}</p>
          <ul>
            <li>{text.disablePoint1}</li>
            <li>{text.disablePoint2}</li>
          </ul>
          <p className="business-budget-modal-note">{text.disableNote}</p>
          <div className="business-budget-modal-actions">
            <button type="button" onClick={() => setDisableOpen(false)}>{text.disableKeep}</button>
            <button className="business-button" type="button" onClick={() => { setEnabled(false); setDisableOpen(false); }}>
              {text.disableConfirm}
            </button>
          </div>
        </section>
      </div>
    )}

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
            <button className="business-button" type="button" onClick={() => { endBudget(endTarget.id); setEndTarget(null); }}>
              {text.endConfirm}
            </button>
          </div>
        </section>
      </div>
    )}

    {newOpen && (
      <div className="business-budget-modal" role="dialog" aria-modal="true" aria-labelledby="budget-new-title">
        <section>
          <h2 id="budget-new-title">{editing ? text.editBudget : text.newBudget}</h2>
          <form onSubmit={saveDraft}>
            <div className="business-budget-pair">
              <div className="business-budget-field">
                <label htmlFor="budget-name">{text.colName}</label>
                <input id="budget-name" value={draft.name} onChange={(event) => setDraft((d) => ({ ...d, name: event.target.value }))} maxLength={80} />
              </div>
              <div className="business-budget-field">
                <label htmlFor="budget-amount">{text.colAmount}</label>
                <input id="budget-amount" type="number" min="1" step="1" value={draft.amount} onChange={(event) => setDraft((d) => ({ ...d, amount: event.target.value }))} />
              </div>
            </div>

            <div className="business-budget-pair business-budget-dates">
              <div className="business-budget-field">
                <span className="business-budget-field-label">{text.colStart}</span>
                <div className="business-budget-choices">
                  <label>
                    <input type="radio" name="budget-start" checked={startMode === 'now'} onChange={() => setStartMode('now')} />
                    <span>{text.now}</span>
                  </label>
                  <label>
                    <input type="radio" name="budget-start" checked={startMode === 'date'} onChange={() => setStartMode('date')} />
                    <input
                      type="date"
                      aria-label={text.pickDate}
                      disabled={startMode !== 'date'}
                      value={draft.start}
                      onChange={(event) => setDraft((d) => ({ ...d, start: event.target.value }))}
                    />
                  </label>
                </div>
              </div>
              <div className="business-budget-field">
                <span className="business-budget-field-label">{text.colEnd}</span>
                <div className="business-budget-choices">
                  <label>
                    <input type="radio" name="budget-end" checked={endMode === 'none'} onChange={() => setEndMode('none')} />
                    <span>{text.anyEnd}</span>
                  </label>
                  <label>
                    <input type="radio" name="budget-end" checked={endMode === 'date'} onChange={() => setEndMode('date')} />
                    <input
                      type="date"
                      aria-label={text.pickDate}
                      disabled={endMode !== 'date'}
                      value={draft.end}
                      onChange={(event) => setDraft((d) => ({ ...d, end: event.target.value }))}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* One row today: the workspace owner. Per-member sub-limits are out of
                scope for this version (D-04 = B) — the members themselves, with roles
                that decide who may manage budgets, come with the team feature. */}
            <p className="business-budget-section">{text.memberLimits}</p>
            <table className="business-budget-members">
              <thead>
                <tr>
                  <th scope="col">{text.memberName}</th>
                  <th scope="col">{text.memberEmail}</th>
                  <th scope="col">{text.colSpent}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{memberName}</td>
                  <td>{memberEmail}</td>
                  <td className="is-number">
                    {money.format(0)}
                    <span className="business-budget-bar" aria-hidden="true"><i style={{ width: '0%' }} /></span>
                    <span className="business-budget-share">0%</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="business-budget-modal-actions">
              <button type="button" onClick={closeDraft}>{text.cancel}</button>
              <button className="business-button" type="submit" disabled={!draft.name.trim() || !(Number(draft.amount) > 0)}>
                {text.save}
              </button>
            </div>
          </form>
        </section>
      </div>
    )}
  </main>;
}

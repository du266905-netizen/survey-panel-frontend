import { useEffect, useState } from 'react';
import { BriefcaseBusiness, FileText, LoaderCircle, RefreshCcw, Send } from 'lucide-react';
import { createAdminBusinessQuote, getAdminBusinessProjects, updateAdminBusinessProject } from '../api/realApi';
import PageHeader from '../components/PageHeader';

const statuses = [
  ['DRAFT', 'Draft'],
  ['SUBMITTED_FOR_REVIEW', 'Submitted for review'],
  ['QUOTE_REQUIRED', 'Quote required'],
  ['QUOTE_SENT', 'Quote sent'],
  ['CLIENT_ACCEPTED', 'Client accepted'],
  ['FUNDED', 'Funded'],
  ['RECRUITING', 'Recruiting'],
  ['LIVE', 'Live'],
  ['COMPLETED', 'Completed'],
];

const statusLabel = (value) => statuses.find(([key]) => key === value)?.[1] || value?.replaceAll('_', ' ');
const emptyQuote = { currency: 'USD', amount: '', scope: '', terms: '', validUntil: '' };
const amountLabel = (quote) => quote ? new Intl.NumberFormat('en-US', { style: 'currency', currency: quote.currency || 'USD' }).format(quote.amount || 0) : '';

export default function AdminBusinessProjects() {
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState('');
  const [quoteProjectId, setQuoteProjectId] = useState('');
  const [quote, setQuote] = useState(emptyQuote);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const response = await getAdminBusinessProjects(statusFilter);
      setProjects(response.data.projects || []);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'We could not load client projects.');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [statusFilter]);

  const changeStatus = async (project, status) => {
    if (status === project.status || workingId) return;
    setWorkingId(project.id); setError('');
    try {
      const response = await updateAdminBusinessProject(project.id, status);
      setProjects((current) => current.map((item) => item.id === project.id ? response.data.project : item));
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'We could not update this client project.');
    } finally { setWorkingId(''); }
  };

  const sendQuote = async (event, project) => {
    event.preventDefault();
    if (workingId) return;
    setWorkingId(project.id); setError('');
    try {
      const response = await createAdminBusinessQuote(project.id, { ...quote, amount: Number(quote.amount), validUntil: quote.validUntil || null });
      setProjects((current) => current.map((item) => item.id === project.id ? response.data.project : item));
      setQuoteProjectId(''); setQuote(emptyQuote);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'We could not send this quote.');
    } finally { setWorkingId(''); }
  };

  return <div className="space-y-6">
    <PageHeader title="Client projects" description="Move a project from draft through scope, quote acceptance, funding, recruitment and delivery. Questionnaire content approval remains separate from commercial approval." action={<div className="flex items-center gap-2"><select className="field min-w-40 py-2 text-sm" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="ALL">All project statuses</option>{statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button className="btn-secondary px-3 py-2 text-sm" type="button" onClick={load} disabled={loading}><RefreshCcw size={15} /> Refresh</button></div>} />
    <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-950"><strong>Operating rule:</strong> sending a quote notifies the client in their workspace and by email. Client acceptance records agreement only; move the project to <strong>Funded</strong> after payment is confirmed. A sourced questionnaire cannot become <strong>Live</strong> until its content is approved.</div>
    {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
    {loading ? <div className="card grid min-h-64 place-items-center"><LoaderCircle className="animate-spin text-emerald-700" /></div> : projects.length ? <div className="grid gap-4">{projects.map((project) => {
      const latestQuote = project.latestQuote;
      const quoteOpen = quoteProjectId === project.id;
      const canSendQuote = ['QUOTE_REQUIRED', 'QUOTE_SENT', 'CLIENT_ACCEPTED'].includes(project.status);
      return <article className="card p-5" key={project.id}>
        <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{project.client}</p><h2 className="mt-1 text-xl font-bold text-slate-950">{project.title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{project.researchGoal}</p></div><label className="grid min-w-48 gap-1 text-xs font-bold uppercase tracking-wide text-slate-500">Project status<select className="field py-2 text-sm normal-case" value={project.status} disabled={workingId === project.id} onChange={(event) => changeStatus(project, event.target.value)}>{statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>
        <dl className="mt-5 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2 xl:grid-cols-4"><div><dt className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Research format</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{project.studyFormat.replaceAll('_', ' ')}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Audience</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{project.audienceDescription}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Questionnaire content</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{project.questionnaire ? `${statusLabel(project.questionnaire.status)} · ${project.questionnaire.responseCount} responses` : 'Not applicable'}</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Commercial stage</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{statusLabel(project.status)}</dd></div></dl>
        {latestQuote && <section className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm"><div className="flex flex-wrap items-center justify-between gap-2"><strong className="text-slate-900">Quote v{latestQuote.version} · {amountLabel(latestQuote)}</strong><span className="font-semibold text-slate-600">{latestQuote.status.replaceAll('_', ' ')}</span></div><p className="mt-2 whitespace-pre-wrap leading-6 text-slate-600">{latestQuote.scope}</p>{latestQuote.validUntil && <small className="mt-2 block text-slate-500">Valid until {new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(latestQuote.validUntil))}</small>}</section>}
        {canSendQuote && <div className="mt-4 flex justify-end"><button className="btn-secondary px-3 py-2 text-sm" type="button" onClick={() => { setQuoteProjectId(quoteOpen ? '' : project.id); setQuote(emptyQuote); }}><FileText size={15} /> {latestQuote ? 'Send revised quote' : 'Send quote'}</button></div>}
        {quoteOpen && <form className="mt-4 grid gap-3 border-t border-slate-100 pt-4" onSubmit={(event) => sendQuote(event, project)}><div className="grid gap-3 sm:grid-cols-3"><label className="text-xs font-bold uppercase tracking-wide text-slate-500">Currency<input className="field mt-1 w-full py-2 text-sm normal-case" value={quote.currency} maxLength="3" onChange={(event) => setQuote((current) => ({ ...current, currency: event.target.value.toUpperCase() }))} required /></label><label className="text-xs font-bold uppercase tracking-wide text-slate-500">Quoted amount<input className="field mt-1 w-full py-2 text-sm normal-case" value={quote.amount} type="number" min="0.01" step="0.01" onChange={(event) => setQuote((current) => ({ ...current, amount: event.target.value }))} required /></label><label className="text-xs font-bold uppercase tracking-wide text-slate-500">Valid until<input className="field mt-1 w-full py-2 text-sm normal-case" value={quote.validUntil} type="date" onChange={(event) => setQuote((current) => ({ ...current, validUntil: event.target.value }))} /></label></div><label className="text-xs font-bold uppercase tracking-wide text-slate-500">Scope included<textarea className="field mt-1 min-h-24 w-full py-2 text-sm normal-case" value={quote.scope} onChange={(event) => setQuote((current) => ({ ...current, scope: event.target.value }))} placeholder="State the sample, fieldwork, deliverables and key assumptions." required /></label><label className="text-xs font-bold uppercase tracking-wide text-slate-500">Terms or payment instructions <span className="normal-case text-slate-400">(optional)</span><textarea className="field mt-1 min-h-20 w-full py-2 text-sm normal-case" value={quote.terms} onChange={(event) => setQuote((current) => ({ ...current, terms: event.target.value }))} placeholder="For example, payment timing or a note about scope changes." /></label><div className="flex justify-end gap-2"><button className="btn-secondary px-3 py-2 text-sm" type="button" onClick={() => setQuoteProjectId('')}>Cancel</button><button className="btn-primary px-3 py-2 text-sm" disabled={workingId === project.id} type="submit">{workingId === project.id ? <LoaderCircle className="animate-spin" size={15} /> : <Send size={15} />} Send quote</button></div></form>}
      </article>;
    })}</div> : <div className="card grid min-h-64 place-items-center text-center"><div><BriefcaseBusiness className="mx-auto text-emerald-700" size={28} /><h2 className="mt-3 text-lg font-bold text-slate-950">No client projects in this view</h2><p className="mt-1 text-sm text-slate-500">Projects created in the researcher workspace will appear here.</p></div></div>}
  </div>;
}

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Mail, RefreshCcw, UserRound } from 'lucide-react';
import { getSupportTickets, updateSupportTicket } from '../api/supportApi';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';

const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];
const CATEGORY_LABELS = {
  ACCOUNT: 'Account & access',
  PARTICIPATION: 'Participation',
  REWARDS: 'Coins & rewards',
  PRIVACY: 'Privacy request',
  BUSINESS: 'Business sales',
  OTHER: 'Other',
};

function statusClass(status) {
  if (status === 'RESOLVED') return 'bg-green-50 text-green-700 ring-green-200';
  if (status === 'IN_PROGRESS') return 'bg-cyan-50 text-cyan-700 ring-cyan-200';
  return 'bg-amber-50 text-amber-700 ring-amber-200';
}

function ticketCategoryLabel(category) {
  return CATEGORY_LABELS[category] || CATEGORY_LABELS.OTHER;
}

function visitorMessages(ticket) {
  return (ticket.conversation || []).filter((message) => message.role === 'user');
}

function TicketStatus({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusClass(status)}`}>{status.replace('_', ' ')}</span>;
}

export default function AdminSupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getSupportTickets(statusFilter ? { status: statusFilter } : {});
      setTickets(response.data);
      setSelectedTicket((current) => response.data.find((ticket) => ticket.id === current?.id) || null);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to load support requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [statusFilter]);

  const stats = useMemo(() => ({
    open: tickets.filter((ticket) => ticket.status === 'OPEN').length,
    inProgress: tickets.filter((ticket) => ticket.status === 'IN_PROGRESS').length,
    resolved: tickets.filter((ticket) => ticket.status === 'RESOLVED').length,
  }), [tickets]);

  const selectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setAdminNote(ticket.adminNote || '');
  };

  const saveTicket = async (status) => {
    if (!selectedTicket || saving) return;
    setSaving(true);
    setError('');
    try {
      const response = await updateSupportTicket(selectedTicket.id, { status, adminNote });
      setSelectedTicket(response.data);
      setAdminNote(response.data.adminNote || '');
      setTickets((current) => current.map((ticket) => ticket.id === response.data.id ? response.data : ticket));
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to update the support request.');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { key: 'createdAt', header: 'Submitted', render: (ticket) => new Date(ticket.createdAt).toLocaleString() },
    { key: 'category', header: 'Area', render: (ticket) => ticketCategoryLabel(ticket.category) },
    { key: 'subject', header: 'Summary', render: (ticket) => ticket.subject || 'Support request' },
    { key: 'contactEmail', header: 'Contact', render: (ticket) => ticket.contactEmail },
    { key: 'status', header: 'Status', render: (ticket) => <TicketStatus status={ticket.status} /> },
    {
      key: 'review',
      header: '',
      render: (ticket) => <button type="button" className="btn-secondary px-3 py-1.5 text-xs" onClick={() => selectTicket(ticket)}>Open</button>,
    },
  ];

  const requestDetails = selectedTicket ? visitorMessages(selectedTicket) : [];
  const emailSubject = selectedTicket ? encodeURIComponent(`Re: ${selectedTicket.subject || 'your GuanyiSearch support request'}`) : '';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales & support"
        description="One operational queue for business sales enquiries and participant support, with contact details and internal handling notes."
        action={<button className="btn-secondary" type="button" onClick={loadTickets} disabled={loading}><RefreshCcw size={16} className={loading ? 'animate-spin' : ''} /> Refresh</button>}
      />

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}

      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-amber-700">New</p><p className="mt-2 text-2xl font-black text-amber-900">{stats.open}</p></section>
        <section className="rounded-xl border border-cyan-200 bg-cyan-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-cyan-700">In progress</p><p className="mt-2 text-2xl font-black text-cyan-950">{stats.inProgress}</p></section>
        <section className="rounded-xl border border-green-200 bg-green-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-green-700">Resolved</p><p className="mt-2 text-2xl font-black text-green-900">{stats.resolved}</p></section>
      </div>

      <section className="card p-4">
        <label className="flex max-w-56 flex-col gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">Status
          <select className="field" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">All requests</option>
            {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status.replace('_', ' ')}</option>)}
          </select>
        </label>
      </section>

      <DataTable columns={columns} rows={tickets} loading={loading} emptyMessage="No support requests yet." />

      {selectedTicket && (
        <section className="card overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{ticketCategoryLabel(selectedTicket.category)}</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">{selectedTicket.subject || 'Support request'}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">{selectedTicket.contactName || selectedTicket.user?.displayName || 'Website visitor'} · {selectedTicket.contactEmail}</p>
            </div>
            <TicketStatus status={selectedTicket.status} />
          </div>
          <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.8fr)]">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-black text-slate-900"><UserRound size={16} /> Request details</h3>
              <div className="mt-3 space-y-3">
                {requestDetails.length ? requestDetails.map((message, index) => (
                  <article key={`${message.role}-${index}`} className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wide text-cyan-700">Visitor description</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm font-medium leading-6 text-slate-800">{message.content}</p>
                  </article>
                )) : <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-600">No written details were included with this request.</p>}
              </div>
              {(selectedTicket.conversation || []).some((message) => message.role === 'assistant') && (
                <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <summary className="cursor-pointer text-sm font-bold text-slate-700">View previous support context</summary>
                  <div className="mt-3 space-y-2">
                    {(selectedTicket.conversation || []).filter((message) => message.role === 'assistant').map((message, index) => <p key={`${message.role}-${index}`} className="text-sm leading-6 text-slate-600">{message.content}</p>)}
                  </div>
                </details>
              )}
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-black text-slate-900"><Clock3 size={16} /> Handling</h3>
              <a className="btn-secondary mt-3 justify-center" href={`mailto:${selectedTicket.contactEmail}?subject=${emailSubject}`}><Mail size={16} /> Reply by email</a>
              <textarea className="field mt-3 min-h-40" value={adminNote} maxLength={1600} onChange={(event) => setAdminNote(event.target.value)} placeholder="Internal note — not shown to the visitor." />
              <div className="mt-3 grid gap-2">
                <button className="btn-secondary justify-center" type="button" disabled={saving} onClick={() => saveTicket('IN_PROGRESS')}>Save and mark in progress</button>
                <button className="btn-primary justify-center" type="button" disabled={saving} onClick={() => saveTicket('RESOLVED')}><CheckCircle2 size={16} /> Save and resolve</button>
                {selectedTicket.status !== 'OPEN' && <button className="btn-secondary justify-center" type="button" disabled={saving} onClick={() => saveTicket('OPEN')}>Reopen request</button>}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

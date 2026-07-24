import { AlertTriangle, ClipboardCheck, RefreshCcw, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import { getTrafficSettlementReview } from '../api/realApi';

function statusLabel(status) {
  if (status === 'settlement_evidence_received') return 'Evidence received';
  if (status === 'settlement_reversed') return 'Reversed';
  return 'Awaiting evidence';
}

function statusClass(status) {
  if (status === 'settlement_evidence_received') return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
  if (status === 'settlement_reversed') return 'bg-red-50 text-red-700 ring-red-200';
  return 'bg-amber-50 text-amber-800 ring-amber-200';
}

function StatusPill({ value }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClass(value)}`}>{statusLabel(value)}</span>;
}

function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="card p-4">
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon size={20} /></div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function formatTime(value) {
  return value ? new Date(value).toLocaleString() : '-';
}

export default function SettlementReview() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getTrafficSettlementReview();
      setTasks(response.items || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to load settlement review.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const totals = useMemo(
    () => ({
      pending: tasks.filter((task) => task.status === 'settlement_pending').length,
      evidence: tasks.filter((task) => task.status === 'settlement_evidence_received').length,
      reversed: tasks.filter((task) => task.status === 'settlement_reversed').length,
    }),
    [tasks]
  );

  const columns = [
    { key: 'id', header: 'Task record', render: (row) => row.id.slice(-8).toUpperCase() },
    { key: 'status', header: 'Review state', render: (row) => <StatusPill value={row.status} /> },
    { key: 'startedAt', header: 'Started', render: (row) => formatTime(row.startedAt) },
    { key: 'finishedAt', header: 'Finished', render: (row) => formatTime(row.finishedAt) },
    { key: 'updatedAt', header: 'Updated', render: (row) => formatTime(row.updatedAt) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settlement Review"
        description="Review evidence states before controlled reconciliation. This page never grants coins or changes a result."
        action={<button className="btn-secondary" type="button" onClick={loadTasks} disabled={loading}><RefreshCcw size={16} />Refresh</button>}
      />

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard label="Awaiting evidence" value={totals.pending} icon={ClipboardCheck} tone="bg-amber-50 text-amber-600" />
        <StatCard label="Evidence received" value={totals.evidence} icon={ClipboardCheck} tone="bg-emerald-50 text-emerald-600" />
        <StatCard label="Reversed" value={totals.reversed} icon={RotateCcw} tone="bg-red-50 text-red-600" />
      </div>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-950">Evidence queue</h2>
          <p className="mt-1 text-sm text-slate-500">A completed task remains pending until independent evidence is recorded. Reversed records stay visible for audit and receive no credit.</p>
        </div>
        <DataTable columns={columns} rows={tasks} loading={loading} emptyMessage="No settlement items require review." />
      </section>
    </div>
  );
}

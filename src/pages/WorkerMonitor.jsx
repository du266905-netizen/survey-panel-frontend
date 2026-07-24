import { Activity, AlertTriangle, CheckCircle2, ClipboardCheck, MonitorCheck, RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import { getTrafficDiagnostics } from '../api/realApi';

function readinessClass(severity) {
  if (severity === 'ready') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (severity === 'warning') return 'border-amber-200 bg-amber-50 text-amber-800';
  return 'border-red-200 bg-red-50 text-red-700';
}

function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="card p-4">
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
        <Icon size={20} />
      </div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function formatTime(value) {
  return value ? new Date(value).toLocaleString() : '-';
}

export default function WorkerMonitor() {
  const [diagnostics, setDiagnostics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOperations = async () => {
    setLoading(true);
    setError('');
    try {
      setDiagnostics(await getTrafficDiagnostics());
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to load Orbit operations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOperations();
  }, []);

  const rows = useMemo(
    () => (diagnostics?.items || []).map((item) => ({ ...item, id: item.worker.id })),
    [diagnostics]
  );
  const totals = useMemo(
    () => ({
      online: rows.filter((item) => item.worker.isOnline).length,
      attention: rows.filter((item) => item.severity !== 'ready').length,
      active: rows.reduce((sum, item) => sum + Number(item.counts.runningTasks || 0), 0),
      settlement: rows.reduce((sum, item) => sum + Number(item.worker.settlementPendingTaskCount || 0), 0),
    }),
    [rows]
  );

  const columns = [
    {
      key: 'member',
      header: 'Member',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-950">{row.worker.displayName}</p>
          {row.worker.groupName && <p className="mt-1 text-xs text-slate-500">{row.worker.groupName}</p>}
        </div>
      ),
    },
    {
      key: 'device',
      header: 'Device',
      render: (row) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${row.worker.isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
          {row.worker.isOnline ? 'Online' : 'Offline'}
        </span>
      ),
    },
    {
      key: 'readiness',
      header: 'Readiness',
      render: (row) => (
        <div className="space-y-1.5">
          <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${readinessClass(row.severity)}`}>
            {row.headline}
          </span>
          {(row.reasons || []).slice(0, 2).map((reason) => (
            <p key={reason.code} className="text-xs text-slate-500">{reason.label}</p>
          ))}
        </div>
      ),
    },
    {
      key: 'work',
      header: 'Work',
      render: (row) => `${row.counts.runningTasks || 0} active · ${row.counts.idleProfiles || 0}/${row.counts.profiles || 0} ready`,
    },
    {
      key: 'settlement',
      header: 'Settlement review',
      render: (row) => row.worker.settlementPendingTaskCount || 0,
    },
    { key: 'lastSeen', header: 'Last active', render: (row) => formatTime(row.worker.lastSeenAt) },
    {
      key: 'actions',
      header: 'Action',
      render: (row) => (
        <Link className="btn-secondary px-3 py-1.5" to={`/workers/${row.worker.id}`}>
          Open
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orbit Operations"
        description="See member readiness, device activity, work in progress, and items awaiting settlement review."
        action={
          <button className="btn-secondary" type="button" onClick={loadOperations} disabled={loading}>
            <RefreshCcw size={16} />
            Refresh
          </button>
        }
      />

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-4">
        <StatCard label="Online members" value={totals.online} icon={MonitorCheck} tone="bg-emerald-50 text-emerald-600" />
        <StatCard label="Needs attention" value={totals.attention} icon={AlertTriangle} tone="bg-amber-50 text-amber-600" />
        <StatCard label="Active work" value={totals.active} icon={Activity} tone="bg-blue-50 text-blue-600" />
        <StatCard label="Awaiting review" value={totals.settlement} icon={ClipboardCheck} tone="bg-violet-50 text-violet-600" />
      </div>

      <section className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Member readiness</h2>
            <p className="mt-1 text-sm text-slate-500">Open a member only when an action is required. Task routing and result handling remain controlled by the member application.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Ready {diagnostics?.summary?.ready || 0}</span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">Review {diagnostics?.summary?.warning || 0}</span>
            <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">Blocked {diagnostics?.summary?.blocked || 0}</span>
          </div>
        </div>
        <DataTable columns={columns} rows={rows} loading={loading} emptyMessage="No internal members are available yet." />
      </section>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
        <div className="flex items-center gap-2 font-semibold"><CheckCircle2 size={16} /> Daily management only needs this page and settlement review.</div>
      </div>
    </div>
  );
}

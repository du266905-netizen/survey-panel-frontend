import { Activity, AlertTriangle, CheckCircle2, MonitorCheck, RefreshCcw, UserRoundCog } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import { getTrafficWorkers } from '../api/realApi';

function statusClass(isOnline) {
  return isOnline ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-100 text-slate-600 ring-slate-200';
}

function StatusPill({ isOnline }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClass(isOnline)}`}>
      {isOnline ? 'online' : 'offline'}
    </span>
  );
}

function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
        <Icon size={20} />
      </div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

export default function WorkerMonitor() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadWorkers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTrafficWorkers();
      setWorkers(data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load worker monitor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  const totals = useMemo(
    () => ({
      online: workers.filter((worker) => worker.isOnline).length,
      running: workers.reduce((sum, worker) => sum + Number(worker.runningCount || 0), 0),
      idleProfiles: workers.reduce((sum, worker) => sum + Number(worker.idleProfileCount || 0), 0),
      pendingTasks: workers.reduce((sum, worker) => sum + Number(worker.pendingTaskCount || 0), 0),
    }),
    [workers]
  );

  const columns = [
    {
      key: 'displayName',
      header: 'Worker',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-950">{row.displayName || row.operatorName || row.id}</p>
          <p className="mt-1 text-xs text-slate-500">{row.email || row.operatorName || row.type}</p>
        </div>
      ),
    },
    { key: 'status', header: 'Status', render: (row) => <StatusPill isOnline={row.isOnline} /> },
    { key: 'runningCount', header: 'Running' },
    { key: 'concurrency', header: 'Slots' },
    { key: 'profileCount', header: 'Profiles' },
    { key: 'idleProfileCount', header: 'Idle' },
    { key: 'pendingTaskCount', header: 'Pending' },
    {
      key: 'lastSeenAt',
      header: 'Last Seen',
      render: (row) => (row.lastSeenAt ? new Date(row.lastSeenAt).toLocaleString() : '-'),
    },
    {
      key: 'actions',
      header: 'Action',
      render: (row) => (
        <Link className="btn-secondary px-3 py-1.5" to={`/workers/${row.id}`}>
          Open
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Worker Monitor"
        description="Monitor internal execution operators, bound MoreLogin profiles, task queue state, and assignment readiness."
        action={
          <button className="btn-secondary" type="button" onClick={loadWorkers} disabled={loading}>
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
        <StatCard label="Online Workers" value={totals.online} icon={MonitorCheck} tone="bg-green-50 text-green-600" />
        <StatCard label="Running Tasks" value={totals.running} icon={Activity} tone="bg-blue-50 text-blue-600" />
        <StatCard label="Idle Profiles" value={totals.idleProfiles} icon={CheckCircle2} tone="bg-amber-50 text-amber-600" />
        <StatCard label="Pending Tasks" value={totals.pendingTasks} icon={UserRoundCog} tone="bg-indigo-50 text-indigo-600" />
      </div>

      <DataTable columns={columns} rows={workers} loading={loading} emptyMessage="No workers or local agents found yet." />
    </div>
  );
}

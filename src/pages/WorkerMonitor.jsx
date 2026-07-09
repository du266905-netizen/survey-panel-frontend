import { Activity, AlertTriangle, CheckCircle2, MonitorCheck, RefreshCcw, UserRoundCog } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import { getTrafficDiagnostics, getTrafficWorkers } from '../api/realApi';

function statusClass(isOnline) {
  return isOnline ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-100 text-slate-600 ring-slate-200';
}

function StatusPill({ isOnline }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClass(isOnline)}`}>
      {isOnline ? '在线' : '离线'}
    </span>
  );
}

function diagnosticClass(severity) {
  if (severity === 'ready') return 'border-cyan-200 bg-cyan-50 text-cyan-700';
  if (severity === 'warning') return 'border-amber-200 bg-amber-50 text-amber-800';
  return 'border-red-200 bg-red-50 text-red-700';
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
  const [diagnostics, setDiagnostics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadWorkers = async () => {
    setLoading(true);
    setError('');
    try {
      const [workerData, diagnosticData] = await Promise.all([getTrafficWorkers(), getTrafficDiagnostics()]);
      setWorkers(workerData.items || []);
      setDiagnostics(diagnosticData);
    } catch (err) {
      setError(err.response?.data?.message || err.message || '成员监控加载失败');
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

  const diagnosticItems = diagnostics?.items || [];

  const columns = [
    {
      key: 'displayName',
      header: '成员',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-950">{row.displayName || row.operatorName || row.id}</p>
          <p className="mt-1 text-xs text-slate-500">{row.email || row.operatorName || row.type}</p>
        </div>
      ),
    },
    { key: 'status', header: '状态', render: (row) => <StatusPill isOnline={row.isOnline} /> },
    { key: 'currentStatus', header: '当前状态', render: (row) => row.currentStatus || '-' },
    { key: 'currentTaskId', header: '当前任务', render: (row) => row.currentTaskId || '-' },
    { key: 'currentProfileId', header: '当前环境', render: (row) => row.currentProfileId || '-' },
    { key: 'profileCount', header: '绑定环境' },
    { key: 'idleProfileCount', header: '空闲环境' },
    { key: 'completedTaskCount', header: '今日完成' },
    { key: 'failedTaskCount', header: '今日失败' },
    {
      key: 'lastSeenAt',
      header: '最后心跳',
      render: (row) => (row.lastSeenAt ? new Date(row.lastSeenAt).toLocaleString() : '-'),
    },
    {
      key: 'actions',
      header: '操作',
      render: (row) => (
        <Link className="btn-secondary px-3 py-1.5" to={`/workers/${row.id}`}>
          打开
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="成员监控"
        description="按成员聚合执行端心跳、绑定执行环境、当前任务、任务结果和异常原因。"
        action={
          <button className="btn-secondary" type="button" onClick={loadWorkers} disabled={loading}>
            <RefreshCcw size={16} />
            刷新
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
        <StatCard label="在线成员" value={totals.online} icon={MonitorCheck} tone="bg-green-50 text-green-600" />
        <StatCard label="运行任务" value={totals.running} icon={Activity} tone="bg-blue-50 text-blue-600" />
        <StatCard label="空闲环境" value={totals.idleProfiles} icon={CheckCircle2} tone="bg-amber-50 text-amber-600" />
        <StatCard label="待处理任务" value={totals.pendingTasks} icon={UserRoundCog} tone="bg-indigo-50 text-indigo-600" />
      </div>

      <section className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">派发诊断</h2>
            <p className="mt-1 text-sm text-slate-500">只读检查成员、设备、Profile、任务和近期 CPX 同步日志，解释为什么暂时没派上任务。</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">可派发 {diagnostics?.summary?.ready || 0}</span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">需关注 {diagnostics?.summary?.warning || 0}</span>
            <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">阻塞 {diagnostics?.summary?.blocked || 0}</span>
          </div>
        </div>
        <div className="grid gap-4 p-5 xl:grid-cols-2">
          {diagnosticItems.map((item) => (
            <div key={item.worker.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-950">{item.worker.displayName || item.worker.operatorName || item.worker.id}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.worker.email || item.worker.role || '-'}</p>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${diagnosticClass(item.severity)}`}>
                  {item.headline}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="font-bold text-slate-950">{item.counts.onlineDevices}/{item.counts.devices}</p>
                  <p className="mt-1 text-slate-500">设备</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="font-bold text-slate-950">{item.counts.idleProfiles}/{item.counts.profiles}</p>
                  <p className="mt-1 text-slate-500">空闲</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="font-bold text-slate-950">{item.counts.pendingTasks}</p>
                  <p className="mt-1 text-slate-500">待派</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="font-bold text-slate-950">{item.counts.missingProxyIp}</p>
                  <p className="mt-1 text-slate-500">缺 IP</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(item.reasons || []).map((reason) => (
                  <span key={reason.code} className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${diagnosticClass(reason.severity)}`} title={reason.detail || reason.label}>
                    {reason.label}{reason.detail ? ` · ${reason.detail}` : ''}
                  </span>
                ))}
                {!item.reasons?.length && (
                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                    当前没有阻塞原因
                  </span>
                )}
              </div>
            </div>
          ))}
          {!loading && !diagnosticItems.length && (
            <p className="rounded-lg bg-slate-50 p-5 text-sm text-slate-500">还没有可诊断的内部成员。</p>
          )}
        </div>
      </section>

      <DataTable columns={columns} rows={workers} loading={loading} emptyMessage="还没有成员或执行端心跳。" />
    </div>
  );
}

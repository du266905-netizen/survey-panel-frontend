import { AlertTriangle, ArrowLeft, CheckCircle2, Clipboard, LinkIcon, Plus, RefreshCcw, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import {
  assignTrafficTask,
  bindWorkerTrafficProfile,
  getTrafficWorker,
  importWorkerTrafficTask,
  markTrafficOutcome,
  releaseTrafficTask,
  updateWorkerDevice,
} from '../api/realApi';

const initialTaskForm = {
  provider: 'CPX',
  externalSurveyId: '',
  surveyUrl: '',
  targetCountries: 'US',
  payoutUsd: '',
  quotaLimit: '',
  quotaRemaining: '',
  extUserId: '',
  ipUser: '',
};

const initialBindForm = {
  profileId: '',
  displayName: '',
  extUserId: '',
  settlementUserId: '',
  proxyIp: '',
  proxyCountry: '',
  countryTag: 'US',
};

function statusClass(status) {
  const normalized = String(status || '').toLowerCase();
  if (['done', 'idle', 'online'].includes(normalized)) return 'bg-green-50 text-green-700 ring-green-200';
  if (['running', 'launching'].includes(normalized)) return 'bg-blue-50 text-blue-700 ring-blue-200';
  if (['pending', 'pending_wait', 'cooldown'].includes(normalized)) return 'bg-amber-50 text-amber-700 ring-amber-200';
  return 'bg-red-50 text-red-700 ring-red-200';
}

function StatusPill({ value }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClass(value)}`}>
      {value || '-'}
    </span>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

export default function WorkerDetail() {
  const { workerId } = useParams();
  const [worker, setWorker] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [devices, setDevices] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [taskForm, setTaskForm] = useState(initialTaskForm);
  const [bindForm, setBindForm] = useState(initialBindForm);
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [forceAssign, setForceAssign] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  const loadWorker = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTrafficWorker(workerId);
      setWorker(data.worker);
      setProfiles(data.profiles || []);
      setAvailableProfiles(data.availableProfiles || []);
      setDevices(data.devices || []);
      setTasks(data.tasks || []);
      setLogs(data.logs || []);
      const firstIdle = (data.profiles || []).find((profile) => profile.status === 'idle');
      setSelectedProfileId((current) => current || firstIdle?.id || '');
      setBindForm((current) => ({ ...current, profileId: current.profileId || (data.availableProfiles || [])[0]?.id || '' }));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load worker detail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorker();
  }, [workerId]);

  const runAction = async (action) => {
    setBusy(true);
    setError('');
    try {
      await action();
      await loadWorker();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setBusy(false);
    }
  };

  const idleProfiles = useMemo(() => profiles.filter((profile) => profile.status === 'idle'), [profiles]);
  const settlementSummary = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.status === 'done');
    const expectedUsd = completedTasks.reduce((sum, task) => sum + Number(task.payoutUsd || 0), 0);
    const settlementIds = new Set(
      profiles
        .map((profile) => profile.metadata?.settlementUserId)
        .concat(tasks.map((task) => task.metadata?.settlementUserId))
        .filter(Boolean)
    );
    return {
      completed: completedTasks.length,
      expectedUsd,
      settlementIds: [...settlementIds],
      disabledDevices: devices.filter((device) => device.disabledAt).length,
    };
  }, [devices, profiles, tasks]);

  const handleImportTask = (event) => {
    event.preventDefault();
    return runAction(async () => {
      await importWorkerTrafficTask(workerId, {
        ...taskForm,
        payoutUsd: Number(taskForm.payoutUsd || 0),
        quotaLimit: taskForm.quotaLimit ? Number(taskForm.quotaLimit) : null,
        quotaRemaining: taskForm.quotaRemaining ? Number(taskForm.quotaRemaining) : null,
      });
      setTaskForm(initialTaskForm);
    });
  };

  const handleBindProfile = (event) => {
    event.preventDefault();
    return runAction(async () => {
      await bindWorkerTrafficProfile(workerId, bindForm.profileId, {
        displayName: bindForm.displayName || undefined,
        extUserId: bindForm.extUserId || undefined,
        settlementUserId: bindForm.settlementUserId || undefined,
        proxyIp: bindForm.proxyIp || undefined,
        proxyCountry: bindForm.proxyCountry || undefined,
        countryTag: bindForm.countryTag || undefined,
      });
      setBindForm(initialBindForm);
    });
  };

  const copyBindingCode = async () => {
    if (!worker?.bindingCode) return;
    await navigator.clipboard.writeText(worker.bindingCode);
    setCopyMessage('成员密码已复制');
    window.setTimeout(() => setCopyMessage(''), 1800);
  };

  const profileColumns = [
    { key: 'id', header: '环境 ID' },
    { key: 'displayName', header: '名称', render: (row) => row.displayName || '-' },
    { key: 'extUserId', header: 'ext_user_id', render: (row) => row.metadata?.extUserId || '-' },
    { key: 'settlementUserId', header: '结算账号', render: (row) => row.metadata?.settlementUserId || '-' },
    { key: 'countryTag', header: '国家' },
    { key: 'proxyIp', header: '代理/IP' },
    { key: 'healthScore', header: '健康' },
    { key: 'status', header: '状态', render: (row) => <StatusPill value={row.status} /> },
    {
      key: 'actions',
      header: '操作',
      render: (row) => (
        <button className="btn-secondary px-3 py-1.5" type="button" disabled={busy || row.status !== 'idle'} onClick={() => setSelectedProfileId(row.id)}>
          选择
        </button>
      ),
    },
  ];

  const taskColumns = [
    { key: 'provider', header: '来源' },
    { key: 'externalSurveyId', header: '任务编号', render: (row) => row.externalSurveyId || row.id.slice(-8) },
    { key: 'targetCountries', header: '国家', render: (row) => (row.targetCountries || []).join(', ') },
    { key: 'payoutUsd', header: '支付', render: (row) => `$${Number(row.payoutUsd || 0).toFixed(2)}` },
    { key: 'status', header: '状态', render: (row) => <StatusPill value={row.status} /> },
    { key: 'profile', header: '环境', render: (row) => row.assignedProfileId || '-' },
    {
      key: 'actions',
      header: '操作',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            className="btn-secondary px-3 py-1.5"
            type="button"
            disabled={busy || !selectedProfileId || !['pending', 'pending_wait', 'failed'].includes(row.status)}
            onClick={() => runAction(() => assignTrafficTask(row.id, { profileId: selectedProfileId, force: forceAssign, reason: forceAssign ? 'Admin worker detail assignment' : undefined }))}
          >
            分配
          </button>
          <button className="btn-secondary px-3 py-1.5" type="button" disabled={busy || row.status !== 'running'} onClick={() => runAction(() => releaseTrafficTask(row.id))}>
            Release
          </button>
          <button className="btn-secondary px-3 py-1.5" type="button" disabled={busy || row.status !== 'running'} onClick={() => runAction(() => markTrafficOutcome(row.id, { outcome: 'done' }))}>
            Done
          </button>
          <button className="btn-secondary px-3 py-1.5" type="button" disabled={busy || row.status !== 'running'} onClick={() => runAction(() => markTrafficOutcome(row.id, { outcome: 'failed', reason: 'Manual failure' }))}>
            Fail
          </button>
        </div>
      ),
    },
  ];

  const deviceColumns = [
    { key: 'deviceName', header: '设备', render: (row) => row.deviceName || row.deviceId || row.id },
    { key: 'platform', header: '系统', render: (row) => row.platform || '-' },
    { key: 'appVersion', header: '版本', render: (row) => row.appVersion || '-' },
    { key: 'currentStatus', header: '状态', render: (row) => <StatusPill value={row.disabledAt ? 'disabled' : row.currentStatus} /> },
    { key: 'moreLoginStatus', header: 'MoreLogin', render: (row) => row.moreLoginStatus || '-' },
    { key: 'lastSeenAt', header: '最后心跳', render: (row) => (row.lastSeenAt ? new Date(row.lastSeenAt).toLocaleString() : '-') },
    {
      key: 'actions',
      header: '操作',
      render: (row) => (
        <button
          className="btn-secondary px-3 py-1.5"
          type="button"
          disabled={busy}
          onClick={() =>
            runAction(() =>
              updateWorkerDevice(workerId, row.id, {
                disabled: !row.disabledAt,
                reason: row.disabledAt ? undefined : 'Disabled from member detail',
              })
            )
          }
        >
          {row.disabledAt ? '恢复' : '禁用'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={worker?.displayName || '成员详情'}
        description={worker?.email || worker?.operatorName || '管理成员密码、执行环境、任务分配和执行日志。'}
        action={
          <div className="flex gap-2">
            <Link className="btn-secondary" to="/workers">
              <ArrowLeft size={16} />
              返回
            </Link>
            <button className="btn-secondary" type="button" onClick={loadWorker} disabled={loading || busy}>
              <RefreshCcw size={16} />
              刷新
            </button>
          </div>
        }
      />

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-5">
        <InfoCard label="状态" value={worker?.isOnline ? '在线' : '离线'} />
        <InfoCard label="运行任务" value={worker?.runningCount || 0} />
        <InfoCard label="并发上限" value={worker?.concurrency || 0} />
        <InfoCard label="绑定资料" value={worker?.profileCount || 0} />
        <InfoCard label="待处理" value={worker?.pendingTaskCount || 0} />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <InfoCard label="当前 Coins" value={worker?.coinsBalance ?? 0} />
        <InfoCard label="已完成任务" value={settlementSummary.completed} />
        <InfoCard label="预计结算 USD" value={`$${settlementSummary.expectedUsd.toFixed(2)}`} />
        <InfoCard label="结算账号" value={settlementSummary.settlementIds.length || '-'} />
      </div>

      <section className="card flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Orbit Member 成员密码</p>
          <p className="mt-2 font-mono text-2xl font-bold text-slate-950">{worker?.bindingCode || '暂无成员密码'}</p>
          <p className="mt-2 text-sm text-slate-500">成员只需要把这个密码填进 Orbit Member。绑定后执行端会用有限权限凭证工作，不再需要管理员登录信息。</p>
          {copyMessage && <p className="mt-2 text-sm font-semibold text-green-600">{copyMessage}</p>}
        </div>
        <button className="btn-primary" type="button" onClick={copyBindingCode} disabled={!worker?.bindingCode}>
          <Clipboard size={16} />
          复制成员密码
        </button>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-950">成员设备</h2>
        <DataTable columns={deviceColumns} rows={devices} loading={loading} emptyMessage="这个成员还没有绑定 Orbit Member 设备。" />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <form className="card space-y-4 p-5" onSubmit={handleBindProfile}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">绑定执行环境</h2>
            <LinkIcon size={18} className="text-green-600" />
          </div>
          <p className="text-sm text-slate-500">绑定后，Orbit Member 只能领取这个成员名下的执行环境。ext_user_id 默认用环境 ID，结算账号默认用当前成员账号。</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="field sm:col-span-2" required value={bindForm.profileId} onChange={(event) => setBindForm({ ...bindForm, profileId: event.target.value })}>
              <option value="">选择可绑定执行环境</option>
              {availableProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.displayName || profile.id} - {profile.countryTag}
                </option>
              ))}
            </select>
            <input className="field" placeholder="显示名称" value={bindForm.displayName} onChange={(event) => setBindForm({ ...bindForm, displayName: event.target.value })} />
            <input className="field" placeholder="ext_user_id，留空默认环境 ID" value={bindForm.extUserId} onChange={(event) => setBindForm({ ...bindForm, extUserId: event.target.value })} />
            <input className="field sm:col-span-2" placeholder="结算账号 User ID，留空默认当前成员" value={bindForm.settlementUserId} onChange={(event) => setBindForm({ ...bindForm, settlementUserId: event.target.value })} />
            <input className="field" placeholder="代理/IP" value={bindForm.proxyIp} onChange={(event) => setBindForm({ ...bindForm, proxyIp: event.target.value })} />
            <input className="field" placeholder="代理国家" value={bindForm.proxyCountry} onChange={(event) => setBindForm({ ...bindForm, proxyCountry: event.target.value })} />
            <input className="field" placeholder="国家标签" value={bindForm.countryTag} onChange={(event) => setBindForm({ ...bindForm, countryTag: event.target.value })} />
          </div>
          <button className="btn-primary w-full" type="submit" disabled={busy || !bindForm.profileId}>
            保存绑定
          </button>
        </form>

        <form className="card space-y-4 p-5" onSubmit={handleImportTask}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">导入成员任务</h2>
            <Plus size={18} className="text-green-600" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="field" placeholder="Provider" value={taskForm.provider} onChange={(event) => setTaskForm({ ...taskForm, provider: event.target.value })} />
            <input className="field" placeholder="Offer ID" value={taskForm.externalSurveyId} onChange={(event) => setTaskForm({ ...taskForm, externalSurveyId: event.target.value })} />
            <input className="field sm:col-span-2" required placeholder="Survey URL" value={taskForm.surveyUrl} onChange={(event) => setTaskForm({ ...taskForm, surveyUrl: event.target.value })} />
            <input className="field" placeholder="Countries, e.g. US" value={taskForm.targetCountries} onChange={(event) => setTaskForm({ ...taskForm, targetCountries: event.target.value })} />
            <input className="field" placeholder="Payout USD" value={taskForm.payoutUsd} onChange={(event) => setTaskForm({ ...taskForm, payoutUsd: event.target.value })} />
            <input className="field" placeholder="Quota limit" value={taskForm.quotaLimit} onChange={(event) => setTaskForm({ ...taskForm, quotaLimit: event.target.value })} />
            <input className="field" placeholder="Quota remaining" value={taskForm.quotaRemaining} onChange={(event) => setTaskForm({ ...taskForm, quotaRemaining: event.target.value })} />
            <input className="field" placeholder="Ext user id" value={taskForm.extUserId} onChange={(event) => setTaskForm({ ...taskForm, extUserId: event.target.value })} />
            <input className="field" placeholder="IP user / proxy IP" value={taskForm.ipUser} onChange={(event) => setTaskForm({ ...taskForm, ipUser: event.target.value })} />
          </div>
          <button className="btn-primary w-full" type="submit" disabled={busy}>
            导入任务
          </button>
        </form>
      </div>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">已绑定执行环境</h2>
          <div className="flex flex-wrap items-center gap-3">
            <select className="field max-w-80" value={selectedProfileId} onChange={(event) => setSelectedProfileId(event.target.value)}>
              <option value="">选择空闲执行环境用于分配</option>
              {idleProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.displayName || profile.id} - {profile.countryTag}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600">
              <input type="checkbox" checked={forceAssign} onChange={(event) => setForceAssign(event.target.checked)} />
              强制
            </label>
          </div>
        </div>
        <DataTable columns={profileColumns} rows={profiles} loading={loading} emptyMessage="这个成员还没有绑定执行环境。" />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-950">成员任务</h2>
        <DataTable columns={taskColumns} rows={tasks} loading={loading} emptyMessage="这个成员还没有导入或分配任务。" />
      </section>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-lg font-bold text-slate-950">执行日志</h2>
        </div>
        <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
          {logs.length ? (
            logs.map((log) => (
              <div key={log.id} className="flex gap-3 px-4 py-3 text-sm">
                {log.level === 'error' ? <XCircle className="mt-0.5 text-red-500" size={16} /> : <CheckCircle2 className="mt-0.5 text-green-500" size={16} />}
                <div>
                  <p className="font-semibold text-slate-800">{log.event}</p>
                  <p className="text-slate-500">{log.message}</p>
                  <p className="mt-1 text-xs text-slate-400">{new Date(log.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-6 text-sm text-slate-500">还没有这个成员的执行日志。</p>
          )}
        </div>
      </section>
    </div>
  );
}

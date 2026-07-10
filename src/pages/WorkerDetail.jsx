import { AlertTriangle, ArrowLeft, CheckCircle2, Clipboard, LinkIcon, Plus, RefreshCcw, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import {
  assignTrafficTask,
  bindWorkerTrafficProfile,
  createTrafficProfile,
  getTrafficWorker,
  importWorkerTrafficTask,
  markTrafficOutcome,
  releaseTrafficTask,
  updateWorkerDevice,
  updateWorkerMoreLoginCredential,
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
  newProfileId: '',
  displayName: '',
  extUserId: '',
  settlementUserId: '',
  proxyIp: '',
  proxyCountry: '',
  countryTag: 'US',
  dynamicIpMode: true,
};

const initialMoreLoginForm = {
  localBaseUrl: 'http://127.0.0.1:40000',
  apiId: '',
  apiKey: '',
  encryptKey: '',
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

function profileIpLabel(profile) {
  const metadata = profile.metadata || {};
  if (metadata.dynamicIpMode) {
    return metadata.currentIp ? `动态 ${metadata.currentIp}` : '动态，待检测';
  }
  return profile.proxyIp || '-';
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
  const [moreLoginCredential, setMoreLoginCredential] = useState(null);
  const [moreLoginForm, setMoreLoginForm] = useState(initialMoreLoginForm);
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
      setMoreLoginCredential(data.moreLoginCredential || null);
      setMoreLoginForm((current) => ({
        ...current,
        localBaseUrl: data.moreLoginCredential?.localBaseUrl || current.localBaseUrl || initialMoreLoginForm.localBaseUrl,
        apiId: '',
        apiKey: '',
        encryptKey: '',
      }));
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
      const profileId = bindForm.newProfileId.trim() || bindForm.profileId;
      if (!profileId) throw new Error('请输入新的环境 ID，或选择一个已登记环境');
      if (!bindForm.countryTag.trim()) throw new Error('请填写国家标签，例如 US');
      if (!bindForm.dynamicIpMode && !bindForm.proxyIp.trim()) throw new Error('固定 IP 模式必须填写代理/IP');

      if (bindForm.newProfileId.trim()) {
        await createTrafficProfile({
          id: profileId,
          displayName: bindForm.displayName || profileId,
          proxyIp: bindForm.proxyIp || undefined,
          proxyCountry: bindForm.proxyCountry || bindForm.countryTag,
          countryTag: bindForm.countryTag || bindForm.proxyCountry || 'US',
          status: 'idle',
          dynamicIpMode: bindForm.dynamicIpMode,
          metadata: {
            source: 'worker_detail_manual_bind',
            manualCompletionOnly: true,
            dynamicIpMode: bindForm.dynamicIpMode,
          },
        });
      }

      await bindWorkerTrafficProfile(workerId, profileId, {
        displayName: bindForm.displayName || undefined,
        extUserId: bindForm.extUserId || undefined,
        settlementUserId: bindForm.settlementUserId || undefined,
        proxyIp: bindForm.proxyIp || undefined,
        proxyCountry: bindForm.proxyCountry || undefined,
        countryTag: bindForm.countryTag || undefined,
        dynamicIpMode: bindForm.dynamicIpMode,
        metadata: {
          dynamicIpMode: bindForm.dynamicIpMode,
        },
      });
      setBindForm(initialBindForm);
    });
  };

  const handleMoreLoginCredential = (event) => {
    event.preventDefault();
    return runAction(async () => {
      await updateWorkerMoreLoginCredential(workerId, {
        localBaseUrl: moreLoginForm.localBaseUrl || initialMoreLoginForm.localBaseUrl,
        ...(moreLoginForm.apiId.trim() ? { apiId: moreLoginForm.apiId.trim() } : {}),
        ...(moreLoginForm.apiKey.trim() ? { apiKey: moreLoginForm.apiKey.trim() } : {}),
        ...(moreLoginForm.encryptKey.trim() ? { encryptKey: moreLoginForm.encryptKey.trim() } : {}),
      });
      setMoreLoginForm((current) => ({ ...current, apiId: '', apiKey: '', encryptKey: '' }));
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
    { key: 'proxyIp', header: '代理/IP', render: profileIpLabel },
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
          {copyMessage && <p className="mt-2 text-sm font-semibold text-cyan-600">{copyMessage}</p>}
        </div>
        <button className="btn-primary" type="button" onClick={copyBindingCode} disabled={!worker?.bindingCode}>
          <Clipboard size={16} />
          复制成员密码
        </button>
      </section>

      <form className="card space-y-4 p-5" onSubmit={handleMoreLoginCredential}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">MoreLogin API 配置</h2>
            <p className="mt-1 text-sm text-slate-500">保存后，Orbit Member 检查环境和开始接任务前会自动同步这组配置。</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className={`rounded-full px-2.5 py-1 ring-1 ${moreLoginCredential?.hasApiId ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-50 text-slate-500 ring-slate-200'}`}>
              API ID {moreLoginCredential?.hasApiId ? '已配置' : '未配置'}
            </span>
            <span className={`rounded-full px-2.5 py-1 ring-1 ${moreLoginCredential?.hasApiKey ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-50 text-slate-500 ring-slate-200'}`}>
              API Key {moreLoginCredential?.hasApiKey ? '已配置' : '未配置'}
            </span>
            <span className={`rounded-full px-2.5 py-1 ring-1 ${moreLoginCredential?.hasEncryptKey ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-50 text-slate-500 ring-slate-200'}`}>
              Encrypt Key {moreLoginCredential?.hasEncryptKey ? '已配置' : '未配置'}
            </span>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-4">
          <input className="field" placeholder="Local API URL" value={moreLoginForm.localBaseUrl} onChange={(event) => setMoreLoginForm({ ...moreLoginForm, localBaseUrl: event.target.value })} />
          <input className="field" placeholder="API ID（留空不修改）" value={moreLoginForm.apiId} onChange={(event) => setMoreLoginForm({ ...moreLoginForm, apiId: event.target.value })} />
          <input className="field" placeholder="API Key（留空不修改）" type="password" value={moreLoginForm.apiKey} onChange={(event) => setMoreLoginForm({ ...moreLoginForm, apiKey: event.target.value })} />
          <input className="field" placeholder="Encrypt Key（留空不修改）" type="password" value={moreLoginForm.encryptKey} onChange={(event) => setMoreLoginForm({ ...moreLoginForm, encryptKey: event.target.value })} />
        </div>
        <button className="btn-primary" type="submit" disabled={busy}>
          保存 MoreLogin 配置
        </button>
      </form>

      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-950">成员设备</h2>
        <DataTable columns={deviceColumns} rows={devices} loading={loading} emptyMessage="这个成员还没有绑定 Orbit Member 设备。" />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <form className="card space-y-4 p-5" onSubmit={handleBindProfile}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">绑定执行环境</h2>
            <LinkIcon size={18} className="text-cyan-600" />
          </div>
          <p className="text-sm text-slate-500">绑定后，Orbit Member 只能领取这个成员名下的执行环境。ext_user_id 默认用环境 ID，结算账号默认用当前成员账号。</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="field sm:col-span-2" value={bindForm.profileId} onChange={(event) => setBindForm({ ...bindForm, profileId: event.target.value, newProfileId: '' })}>
              <option value="">选择可绑定执行环境</option>
              {availableProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.displayName || profile.id} - {profile.countryTag}
                </option>
              ))}
            </select>
            <div className="sm:col-span-2">
              <input
                className="field"
                placeholder="新 MoreLogin 环境 ID，未在列表里就直接粘贴到这里"
                value={bindForm.newProfileId}
                onChange={(event) => setBindForm({ ...bindForm, newProfileId: event.target.value, profileId: '' })}
              />
              <p className="mt-2 text-xs font-semibold text-slate-500">全新环境先填这里。系统会先登记环境，再绑定给当前成员。</p>
            </div>
            <input className="field" placeholder="显示名称" value={bindForm.displayName} onChange={(event) => setBindForm({ ...bindForm, displayName: event.target.value })} />
            <input className="field" placeholder="ext_user_id，留空默认环境 ID" value={bindForm.extUserId} onChange={(event) => setBindForm({ ...bindForm, extUserId: event.target.value })} />
            <input className="field sm:col-span-2" placeholder="结算账号 User ID，留空默认当前成员" value={bindForm.settlementUserId} onChange={(event) => setBindForm({ ...bindForm, settlementUserId: event.target.value })} />
            <label className="sm:col-span-2 flex items-center gap-2 rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-800">
              <input type="checkbox" checked={bindForm.dynamicIpMode} onChange={(event) => setBindForm({ ...bindForm, dynamicIpMode: event.target.checked })} />
              动态 IP 模式（Orbit Member 接任务前自动读取当前出口 IP）
            </label>
            {bindForm.dynamicIpMode ? (
              <p className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-500">
                代理/IP 不需要手动填写。Orbit Member 会在接任务前打开检测页，自动写入当前出口 IP。
              </p>
            ) : (
              <input className="field" placeholder="固定代理/IP" value={bindForm.proxyIp} onChange={(event) => setBindForm({ ...bindForm, proxyIp: event.target.value })} />
            )}
            <input className="field" placeholder="代理国家" value={bindForm.proxyCountry} onChange={(event) => setBindForm({ ...bindForm, proxyCountry: event.target.value })} />
            <input className="field" placeholder="国家标签" value={bindForm.countryTag} onChange={(event) => setBindForm({ ...bindForm, countryTag: event.target.value })} />
          </div>
          <button className="btn-primary w-full" type="submit" disabled={busy || (!bindForm.profileId && !bindForm.newProfileId.trim())}>
            保存绑定
          </button>
        </form>

        <form className="card space-y-4 p-5" onSubmit={handleImportTask}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">导入成员任务</h2>
            <Plus size={18} className="text-cyan-600" />
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

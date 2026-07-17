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
    return metadata.currentIp ? `Dynamic ${metadata.currentIp}` : 'Dynamic, pending check';
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
      if (!profileId) throw new Error('Enter a new profile ID or select a registered profile.');
      if (!bindForm.countryTag.trim()) throw new Error('Enter a country tag, for example US.');
      if (!bindForm.dynamicIpMode && !bindForm.proxyIp.trim()) throw new Error('Static IP mode requires a proxy/IP value.');

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
    setCopyMessage('Member password copied');
    window.setTimeout(() => setCopyMessage(''), 1800);
  };

  const profileColumns = [
    { key: 'id', header: 'Profile ID' },
    { key: 'displayName', header: 'Name', render: (row) => row.displayName || '-' },
    { key: 'extUserId', header: 'ext_user_id', render: (row) => row.metadata?.extUserId || '-' },
    { key: 'settlementUserId', header: 'Settlement user', render: (row) => row.metadata?.settlementUserId || '-' },
    { key: 'countryTag', header: 'Country' },
    { key: 'proxyIp', header: 'Proxy/IP', render: profileIpLabel },
    { key: 'healthScore', header: 'Health' },
    { key: 'status', header: 'Status', render: (row) => <StatusPill value={row.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <button className="btn-secondary px-3 py-1.5" type="button" disabled={busy || row.status !== 'idle'} onClick={() => setSelectedProfileId(row.id)}>
          Select
        </button>
      ),
    },
  ];

  const taskColumns = [
    { key: 'provider', header: 'Source' },
    { key: 'externalSurveyId', header: 'Task ID', render: (row) => row.externalSurveyId || row.id.slice(-8) },
    { key: 'targetCountries', header: 'Countries', render: (row) => (row.targetCountries || []).join(', ') },
    { key: 'payoutUsd', header: 'Payout', render: (row) => `$${Number(row.payoutUsd || 0).toFixed(2)}` },
    { key: 'status', header: 'Status', render: (row) => <StatusPill value={row.status} /> },
    { key: 'profile', header: 'Profile', render: (row) => row.assignedProfileId || '-' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            className="btn-secondary px-3 py-1.5"
            type="button"
            disabled={busy || !selectedProfileId || !['pending', 'pending_wait', 'failed'].includes(row.status)}
            onClick={() => runAction(() => assignTrafficTask(row.id, { profileId: selectedProfileId, force: forceAssign, reason: forceAssign ? 'Admin worker detail assignment' : undefined }))}
          >
            Assign
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
    { key: 'deviceName', header: 'Device', render: (row) => row.deviceName || row.deviceId || row.id },
    { key: 'platform', header: 'System', render: (row) => row.platform || '-' },
    { key: 'appVersion', header: 'Version', render: (row) => row.appVersion || '-' },
    { key: 'currentStatus', header: 'Status', render: (row) => <StatusPill value={row.disabledAt ? 'disabled' : row.currentStatus} /> },
    { key: 'moreLoginStatus', header: 'MoreLogin', render: (row) => row.moreLoginStatus || '-' },
    { key: 'lastSeenAt', header: 'Last heartbeat', render: (row) => (row.lastSeenAt ? new Date(row.lastSeenAt).toLocaleString() : '-') },
    {
      key: 'actions',
      header: 'Actions',
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
          {row.disabledAt ? 'Restore' : 'Disable'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={worker?.displayName || 'Member detail'}
        description={worker?.email || worker?.operatorName || 'Manage member password, execution profiles, task assignment, and execution logs.'}
        action={
          <div className="flex gap-2">
            <Link className="btn-secondary" to="/workers">
              <ArrowLeft size={16} />
              Back
            </Link>
            <button className="btn-secondary" type="button" onClick={loadWorker} disabled={loading || busy}>
              <RefreshCcw size={16} />
              Refresh
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
        <InfoCard label="Status" value={worker?.isOnline ? 'Online' : 'Offline'} />
        <InfoCard label="Running tasks" value={worker?.runningCount || 0} />
        <InfoCard label="Concurrency" value={worker?.concurrency || 0} />
        <InfoCard label="Bound profiles" value={worker?.profileCount || 0} />
        <InfoCard label="Pending" value={worker?.pendingTaskCount || 0} />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <InfoCard label="Current Coins" value={worker?.coinsBalance ?? 0} />
        <InfoCard label="Completed tasks" value={settlementSummary.completed} />
        <InfoCard label="Expected USD" value={`$${settlementSummary.expectedUsd.toFixed(2)}`} />
        <InfoCard label="Settlement users" value={settlementSummary.settlementIds.length || '-'} />
      </div>

      <section className="card flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Orbit Member password</p>
          <p className="mt-2 font-mono text-2xl font-bold text-slate-950">{worker?.bindingCode || 'No member password yet'}</p>
          <p className="mt-2 text-sm text-slate-500">Members only need to enter this password in Orbit Member. After binding, the client uses limited-scope credentials and no longer needs administrator login details.</p>
          {copyMessage && <p className="mt-2 text-sm font-semibold text-cyan-600">{copyMessage}</p>}
        </div>
        <button className="btn-primary" type="button" onClick={copyBindingCode} disabled={!worker?.bindingCode}>
          <Clipboard size={16} />
          Copy member password
        </button>
      </section>

      <form className="card space-y-4 p-5" onSubmit={handleMoreLoginCredential}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">MoreLogin API configuration</h2>
            <p className="mt-1 text-sm text-slate-500">After saving, Orbit Member automatically syncs these credentials before checking profiles or starting tasks.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className={`rounded-full px-2.5 py-1 ring-1 ${moreLoginCredential?.hasApiId ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-50 text-slate-500 ring-slate-200'}`}>
              API ID {moreLoginCredential?.hasApiId ? 'Configured' : 'Not configured'}
            </span>
            <span className={`rounded-full px-2.5 py-1 ring-1 ${moreLoginCredential?.hasApiKey ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-50 text-slate-500 ring-slate-200'}`}>
              API Key {moreLoginCredential?.hasApiKey ? 'Configured' : 'Not configured'}
            </span>
            <span className={`rounded-full px-2.5 py-1 ring-1 ${moreLoginCredential?.hasEncryptKey ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-50 text-slate-500 ring-slate-200'}`}>
              Encrypt Key {moreLoginCredential?.hasEncryptKey ? 'Configured' : 'Not configured'}
            </span>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-4">
          <input className="field" placeholder="Local API URL" value={moreLoginForm.localBaseUrl} onChange={(event) => setMoreLoginForm({ ...moreLoginForm, localBaseUrl: event.target.value })} />
          <input className="field" placeholder="API ID (leave blank to keep current)" value={moreLoginForm.apiId} onChange={(event) => setMoreLoginForm({ ...moreLoginForm, apiId: event.target.value })} />
          <input className="field" placeholder="API Key (leave blank to keep current)" type="password" value={moreLoginForm.apiKey} onChange={(event) => setMoreLoginForm({ ...moreLoginForm, apiKey: event.target.value })} />
          <input className="field" placeholder="Encrypt Key (leave blank to keep current)" type="password" value={moreLoginForm.encryptKey} onChange={(event) => setMoreLoginForm({ ...moreLoginForm, encryptKey: event.target.value })} />
        </div>
        <button className="btn-primary" type="submit" disabled={busy}>
          Save MoreLogin configuration
        </button>
      </form>

      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-950">Member devices</h2>
        <DataTable columns={deviceColumns} rows={devices} loading={loading} emptyMessage="This member has not bound any Orbit Member devices yet." />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <form className="card space-y-4 p-5" onSubmit={handleBindProfile}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">Bind execution profile</h2>
            <LinkIcon size={18} className="text-cyan-600" />
          </div>
          <p className="text-sm text-slate-500">After binding, Orbit Member can only claim execution profiles assigned to this member. ext_user_id defaults to the profile ID, and settlement defaults to the current member account.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="field sm:col-span-2" value={bindForm.profileId} onChange={(event) => setBindForm({ ...bindForm, profileId: event.target.value, newProfileId: '' })}>
              <option value="">Select an available execution profile</option>
              {availableProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.displayName || profile.id} - {profile.countryTag}
                </option>
              ))}
            </select>
            <div className="sm:col-span-2">
              <input
                className="field"
                placeholder="New MoreLogin profile ID, paste here if it is not listed"
                value={bindForm.newProfileId}
                onChange={(event) => setBindForm({ ...bindForm, newProfileId: event.target.value, profileId: '' })}
              />
              <p className="mt-2 text-xs font-semibold text-slate-500">For a new profile, enter it here first. The system will register the profile and then bind it to this member.</p>
            </div>
            <input className="field" placeholder="Display name" value={bindForm.displayName} onChange={(event) => setBindForm({ ...bindForm, displayName: event.target.value })} />
            <input className="field" placeholder="ext_user_id, defaults to profile ID" value={bindForm.extUserId} onChange={(event) => setBindForm({ ...bindForm, extUserId: event.target.value })} />
            <input className="field sm:col-span-2" placeholder="Settlement user ID, defaults to current member" value={bindForm.settlementUserId} onChange={(event) => setBindForm({ ...bindForm, settlementUserId: event.target.value })} />
            <label className="sm:col-span-2 flex items-center gap-2 rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-800">
              <input type="checkbox" checked={bindForm.dynamicIpMode} onChange={(event) => setBindForm({ ...bindForm, dynamicIpMode: event.target.checked })} />
              Dynamic IP mode (Orbit Member reads the current exit IP before claiming tasks)
            </label>
            {bindForm.dynamicIpMode ? (
              <p className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-500">
                Proxy/IP does not need to be entered manually. Orbit Member opens the check page before claiming tasks and writes the current exit IP automatically.
              </p>
            ) : (
              <input className="field" placeholder="Static proxy/IP" value={bindForm.proxyIp} onChange={(event) => setBindForm({ ...bindForm, proxyIp: event.target.value })} />
            )}
            <input className="field" placeholder="Proxy country" value={bindForm.proxyCountry} onChange={(event) => setBindForm({ ...bindForm, proxyCountry: event.target.value })} />
            <input className="field" placeholder="Country tag" value={bindForm.countryTag} onChange={(event) => setBindForm({ ...bindForm, countryTag: event.target.value })} />
          </div>
          <button className="btn-primary w-full" type="submit" disabled={busy || (!bindForm.profileId && !bindForm.newProfileId.trim())}>
            Save binding
          </button>
        </form>

        <form className="card space-y-4 p-5" onSubmit={handleImportTask}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">Import member task</h2>
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
            Import task
          </button>
        </form>
      </div>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">Bound execution profiles</h2>
          <div className="flex flex-wrap items-center gap-3">
            <select className="field max-w-80" value={selectedProfileId} onChange={(event) => setSelectedProfileId(event.target.value)}>
              <option value="">Select an idle execution profile for assignment</option>
              {idleProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.displayName || profile.id} - {profile.countryTag}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600">
              <input type="checkbox" checked={forceAssign} onChange={(event) => setForceAssign(event.target.checked)} />
              Force
            </label>
          </div>
        </div>
        <DataTable columns={profileColumns} rows={profiles} loading={loading} emptyMessage="This member has not bound any execution profiles yet." />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-950">Member tasks</h2>
        <DataTable columns={taskColumns} rows={tasks} loading={loading} emptyMessage="This member has no imported or assigned tasks yet." />
      </section>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-lg font-bold text-slate-950">Execution logs</h2>
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
            <p className="p-6 text-sm text-slate-500">This member has no execution logs yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

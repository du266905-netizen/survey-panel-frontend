import { AlertTriangle, ArrowLeft, CheckCircle2, LinkIcon, Plus, RefreshCcw, XCircle } from 'lucide-react';
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
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [taskForm, setTaskForm] = useState(initialTaskForm);
  const [bindForm, setBindForm] = useState(initialBindForm);
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [forceAssign, setForceAssign] = useState(false);

  const loadWorker = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTrafficWorker(workerId);
      setWorker(data.worker);
      setProfiles(data.profiles || []);
      setAvailableProfiles(data.availableProfiles || []);
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
        proxyIp: bindForm.proxyIp || undefined,
        proxyCountry: bindForm.proxyCountry || undefined,
        countryTag: bindForm.countryTag || undefined,
      });
      setBindForm(initialBindForm);
    });
  };

  const profileColumns = [
    { key: 'id', header: 'Profile ID' },
    { key: 'displayName', header: 'Name', render: (row) => row.displayName || '-' },
    { key: 'extUserId', header: 'Ext User', render: (row) => row.metadata?.extUserId || '-' },
    { key: 'countryTag', header: 'Country' },
    { key: 'proxyIp', header: 'Proxy/IP' },
    { key: 'healthScore', header: 'Health', render: (row) => Number(row.healthScore || 0).toFixed(0) },
    { key: 'status', header: 'Status', render: (row) => <StatusPill value={row.status} /> },
    {
      key: 'actions',
      header: 'Action',
      render: (row) => (
        <button className="btn-secondary px-3 py-1.5" type="button" disabled={busy || row.status !== 'idle'} onClick={() => setSelectedProfileId(row.id)}>
          Select
        </button>
      ),
    },
  ];

  const taskColumns = [
    { key: 'provider', header: 'Provider' },
    { key: 'externalSurveyId', header: 'Offer ID', render: (row) => row.externalSurveyId || row.id.slice(-8) },
    { key: 'targetCountries', header: 'Country', render: (row) => (row.targetCountries || []).join(', ') },
    { key: 'payoutUsd', header: 'Payout', render: (row) => `$${Number(row.payoutUsd || 0).toFixed(2)}` },
    { key: 'status', header: 'Status', render: (row) => <StatusPill value={row.status} /> },
    { key: 'profile', header: 'Profile', render: (row) => row.assignedProfileId || '-' },
    {
      key: 'actions',
      header: 'Action',
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

  return (
    <div className="space-y-6">
      <PageHeader
        title={worker?.displayName || 'Worker Detail'}
        description={worker?.email || worker?.operatorName || 'Execution operator detail'}
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
        <InfoCard label="Running" value={worker?.runningCount || 0} />
        <InfoCard label="Slots" value={worker?.concurrency || 0} />
        <InfoCard label="Profiles" value={worker?.profileCount || 0} />
        <InfoCard label="Pending" value={worker?.pendingTaskCount || 0} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <form className="card space-y-4 p-5" onSubmit={handleBindProfile}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">Bind Profile</h2>
            <LinkIcon size={18} className="text-green-600" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="field sm:col-span-2" required value={bindForm.profileId} onChange={(event) => setBindForm({ ...bindForm, profileId: event.target.value })}>
              <option value="">Select available profile</option>
              {availableProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.displayName || profile.id} - {profile.countryTag}
                </option>
              ))}
            </select>
            <input className="field" placeholder="Display name" value={bindForm.displayName} onChange={(event) => setBindForm({ ...bindForm, displayName: event.target.value })} />
            <input className="field" placeholder="Ext user id" value={bindForm.extUserId} onChange={(event) => setBindForm({ ...bindForm, extUserId: event.target.value })} />
            <input className="field" placeholder="Proxy/IP" value={bindForm.proxyIp} onChange={(event) => setBindForm({ ...bindForm, proxyIp: event.target.value })} />
            <input className="field" placeholder="Proxy country" value={bindForm.proxyCountry} onChange={(event) => setBindForm({ ...bindForm, proxyCountry: event.target.value })} />
            <input className="field" placeholder="Country tag" value={bindForm.countryTag} onChange={(event) => setBindForm({ ...bindForm, countryTag: event.target.value })} />
          </div>
          <button className="btn-primary w-full" type="submit" disabled={busy || !bindForm.profileId}>
            Save Binding
          </button>
        </form>

        <form className="card space-y-4 p-5" onSubmit={handleImportTask}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">Import Worker Task</h2>
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
            Import Task
          </button>
        </form>
      </div>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">Bound Profiles</h2>
          <div className="flex flex-wrap items-center gap-3">
            <select className="field max-w-80" value={selectedProfileId} onChange={(event) => setSelectedProfileId(event.target.value)}>
              <option value="">Select idle profile for assignment</option>
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
        <DataTable columns={profileColumns} rows={profiles} loading={loading} emptyMessage="No MoreLogin profiles are bound to this worker yet." />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-950">Worker Tasks</h2>
        <DataTable columns={taskColumns} rows={tasks} loading={loading} emptyMessage="No tasks imported or assigned to this worker yet." />
      </section>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-lg font-bold text-slate-950">Execution Logs</h2>
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
            <p className="p-6 text-sm text-slate-500">No execution logs found for this worker.</p>
          )}
        </div>
      </section>
    </div>
  );
}

import { Activity, AlertTriangle, CheckCircle2, Clock3, MonitorCheck, Play, Plus, RefreshCcw, RotateCcw, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import {
  assignTrafficTask,
  bulkCreateTrafficProfiles,
  closeTrafficProfile,
  createTrafficProfile,
  getTrafficLogs,
  getTrafficProfiles,
  getTrafficSummary,
  getTrafficTasks,
  importTrafficTask,
  markTrafficOutcome,
  releaseTrafficTask,
  runTrafficScheduler,
} from '../api/realApi';

const taskStatuses = ['pending', 'pending_wait', 'running', 'done', 'screen_out', 'quota_full', 'failed', 'cancelled'];
const profileStatuses = ['idle', 'running', 'cooldown', 'disabled'];

function statusClass(status) {
  const normalized = String(status || '').toLowerCase();
  if (['done', 'idle'].includes(normalized)) return 'bg-green-50 text-green-700 ring-green-200';
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

const initialTaskForm = {
  provider: 'CPX',
  externalSurveyId: '',
  surveyUrl: '',
  payoutUsd: '',
  targetCountries: 'US',
  quotaLimit: '',
  quotaRemaining: '',
};

const initialProfileForm = {
  profileId: '',
  displayName: '',
  proxyIp: '',
  proxyCountry: '',
  countryTag: 'US',
};

export default function TrafficConsole() {
  const [summary, setSummary] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: '', country: '', provider: '' });
  const [taskForm, setTaskForm] = useState(initialTaskForm);
  const [profileForm, setProfileForm] = useState(initialProfileForm);
  const [bulkProfilesText, setBulkProfilesText] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState('');

  const idleProfiles = useMemo(() => profiles.filter((profile) => profile.status === 'idle'), [profiles]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [summaryData, taskData, profileData, logData] = await Promise.all([
        getTrafficSummary(),
        getTrafficTasks({ ...filters, pageSize: 100 }),
        getTrafficProfiles({ pageSize: 100 }),
        getTrafficLogs({ pageSize: 25 }),
      ]);
      setSummary(summaryData);
      setTasks(taskData.items || []);
      setProfiles(profileData.items || []);
      setLogs(logData.items || []);
      setSelectedProfileId((current) => current || (profileData.items || []).find((profile) => profile.status === 'idle')?.id || '');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load traffic data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const runAction = async (action) => {
    setBusy(true);
    setError('');
    try {
      await action();
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setBusy(false);
    }
  };

  const handleImportTask = (event) => {
    event.preventDefault();
    return runAction(async () => {
      await importTrafficTask({
        ...taskForm,
        payoutUsd: Number(taskForm.payoutUsd || 0),
        quotaLimit: taskForm.quotaLimit ? Number(taskForm.quotaLimit) : null,
        quotaRemaining: taskForm.quotaRemaining ? Number(taskForm.quotaRemaining) : null,
        targetCountries: taskForm.targetCountries,
      });
      setTaskForm(initialTaskForm);
    });
  };

  const handleCreateProfile = (event) => {
    event.preventDefault();
    return runAction(async () => {
      await createTrafficProfile(profileForm);
      setProfileForm(initialProfileForm);
    });
  };

  const handleBulkProfiles = (event) => {
    event.preventDefault();
    return runAction(async () => {
      await bulkCreateTrafficProfiles({ text: bulkProfilesText });
      setBulkProfilesText('');
    });
  };

  const summaryCards = [
    { label: 'Pending Tasks', value: (summary?.taskStatus?.pending || 0) + (summary?.taskStatus?.pending_wait || 0), icon: Clock3, tone: 'text-amber-600 bg-amber-50' },
    { label: 'Running Tasks', value: summary?.taskStatus?.running || 0, icon: Activity, tone: 'text-blue-600 bg-blue-50' },
    { label: 'Idle Profiles', value: summary?.profileStatus?.idle || 0, icon: CheckCircle2, tone: 'text-green-600 bg-green-50' },
    { label: 'Online Agents', value: (summary?.agents || []).filter((agent) => agent.isOnline).length, icon: MonitorCheck, tone: 'text-indigo-600 bg-indigo-50' },
  ];

  const taskColumns = [
    { key: 'provider', header: 'Provider' },
    { key: 'externalSurveyId', header: 'Offer ID', render: (row) => row.externalSurveyId || row.id.slice(-8) },
    { key: 'targetCountries', header: 'Countries', render: (row) => (row.targetCountries || []).join(', ') },
    { key: 'payoutUsd', header: 'Payout', render: (row) => `$${Number(row.payoutUsd || 0).toFixed(2)}` },
    { key: 'priorityScore', header: 'Priority', render: (row) => Number(row.priorityScore || 0).toFixed(1) },
    { key: 'status', header: 'Status', render: (row) => <StatusPill value={row.status} /> },
    {
      key: 'retryAt',
      header: 'Retry At',
      render: (row) => (row.retryAt ? new Date(row.retryAt).toLocaleTimeString() : '-'),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            className="btn-secondary px-3 py-1.5"
            disabled={busy || !selectedProfileId || !['pending', 'pending_wait', 'failed'].includes(row.status)}
            type="button"
            onClick={() => runAction(() => assignTrafficTask(row.id, { profileId: selectedProfileId }))}
          >
            Assign
          </button>
          <button className="btn-secondary px-3 py-1.5" disabled={busy || row.status !== 'running'} type="button" onClick={() => runAction(() => releaseTrafficTask(row.id))}>
            Release
          </button>
          <button className="btn-secondary px-3 py-1.5" disabled={busy || row.status !== 'running'} type="button" onClick={() => runAction(() => markTrafficOutcome(row.id, { outcome: 'done' }))}>
            Done
          </button>
          <button className="btn-secondary px-3 py-1.5" disabled={busy || row.status !== 'running'} type="button" onClick={() => runAction(() => markTrafficOutcome(row.id, { outcome: 'failed', reason: 'Manual failure' }))}>
            Fail
          </button>
        </div>
      ),
    },
  ];

  const profileColumns = [
    { key: 'id', header: 'Profile ID' },
    { key: 'displayName', header: 'Name', render: (row) => row.displayName || '-' },
    { key: 'countryTag', header: 'Country' },
    { key: 'proxyIp', header: 'Proxy IP' },
    { key: 'healthScore', header: 'Health', render: (row) => Number(row.healthScore || 0).toFixed(0) },
    { key: 'status', header: 'Status', render: (row) => <StatusPill value={row.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button className="btn-secondary px-3 py-1.5" disabled={busy || row.status === 'running'} type="button" onClick={() => setSelectedProfileId(row.id)}>
            Select
          </button>
          <button className="btn-secondary px-3 py-1.5" disabled={busy || row.status === 'running'} type="button" onClick={() => runAction(() => closeTrafficProfile(row.id, { status: 'idle' }))}>
            Idle
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Traffic Console"
        description="Import survey traffic tasks, assign MoreLogin profiles, and track manual execution outcomes."
        action={
          <div className="flex gap-2">
            <button className="btn-secondary" type="button" onClick={loadData} disabled={loading || busy}>
              <RefreshCcw size={16} />
              Refresh
            </button>
            <button className="btn-primary" type="button" onClick={() => runAction(() => runTrafficScheduler({ limit: 10 }))} disabled={busy}>
              <Play size={16} />
              Run Scheduler
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

      <div className="grid gap-4 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card p-4">
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.tone}`}>
                <Icon size={20} />
              </div>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">{card.value}</p>
            </div>
          );
        })}
      </div>

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Local Agents</h2>
            <p className="mt-1 text-sm text-slate-500">Internal desktop tools used for MoreLogin/profile orchestration. Members do not see this area.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            24h sessions: {summary?.recentSessions || 0}
          </span>
        </div>
        <div className="grid gap-3 p-4 lg:grid-cols-3">
          {(summary?.agents || []).length ? (
            summary.agents.map((agent) => (
              <div key={agent.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">{agent.operatorName}</p>
                    <p className="mt-1 text-xs text-slate-500">Last seen {new Date(agent.lastSeenAt).toLocaleString()}</p>
                  </div>
                  <StatusPill value={agent.isOnline ? 'online' : 'offline'} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-500">Running</p>
                    <p className="font-semibold text-slate-900">{agent.runningCount}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Concurrency</p>
                    <p className="font-semibold text-slate-900">{agent.concurrency}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Interval</p>
                    <p className="font-semibold text-slate-900">{agent.launchIntervalSeconds}s</p>
                  </div>
                  <div>
                    <p className="text-slate-500">MoreLogin</p>
                    <p className="font-semibold text-slate-900">{agent.moreLoginStatus}</p>
                  </div>
                </div>
                {agent.lastError && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{agent.lastError}</p>}
              </div>
            ))
          ) : (
            <p className="col-span-full p-4 text-sm text-slate-500">No local agent heartbeats yet. Run the local agent with a valid admin token.</p>
          )}
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <form className="card space-y-4 p-5" onSubmit={handleImportTask}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">Import Task</h2>
            <Plus size={18} className="text-green-600" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="field" placeholder="Provider, e.g. CPX" value={taskForm.provider} onChange={(e) => setTaskForm({ ...taskForm, provider: e.target.value })} />
            <input className="field" placeholder="External survey id" value={taskForm.externalSurveyId} onChange={(e) => setTaskForm({ ...taskForm, externalSurveyId: e.target.value })} />
            <input className="field sm:col-span-2" required placeholder="Survey URL" value={taskForm.surveyUrl} onChange={(e) => setTaskForm({ ...taskForm, surveyUrl: e.target.value })} />
            <input className="field" placeholder="Countries, e.g. US,CA" value={taskForm.targetCountries} onChange={(e) => setTaskForm({ ...taskForm, targetCountries: e.target.value })} />
            <input className="field" placeholder="Payout USD" value={taskForm.payoutUsd} onChange={(e) => setTaskForm({ ...taskForm, payoutUsd: e.target.value })} />
            <input className="field" placeholder="Quota limit" value={taskForm.quotaLimit} onChange={(e) => setTaskForm({ ...taskForm, quotaLimit: e.target.value })} />
            <input className="field" placeholder="Quota remaining" value={taskForm.quotaRemaining} onChange={(e) => setTaskForm({ ...taskForm, quotaRemaining: e.target.value })} />
          </div>
          <button className="btn-primary w-full" type="submit" disabled={busy}>
            Import Traffic Task
          </button>
        </form>

        <form className="card space-y-4 p-5" onSubmit={handleCreateProfile}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">Register MoreLogin Profile</h2>
            <RotateCcw size={18} className="text-green-600" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="field" required placeholder="MoreLogin profile id" value={profileForm.profileId} onChange={(e) => setProfileForm({ ...profileForm, profileId: e.target.value })} />
            <input className="field" placeholder="Display name" value={profileForm.displayName} onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })} />
            <input className="field" required placeholder="Proxy IP" value={profileForm.proxyIp} onChange={(e) => setProfileForm({ ...profileForm, proxyIp: e.target.value })} />
            <input className="field" placeholder="Proxy country" value={profileForm.proxyCountry} onChange={(e) => setProfileForm({ ...profileForm, proxyCountry: e.target.value })} />
            <input className="field" required placeholder="Country tag" value={profileForm.countryTag} onChange={(e) => setProfileForm({ ...profileForm, countryTag: e.target.value })} />
          </div>
          <button className="btn-primary w-full" type="submit" disabled={busy}>
            Save Profile
          </button>
        </form>
      </div>

      <form className="card space-y-4 p-5" onSubmit={handleBulkProfiles}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Bulk Import Profiles</h2>
            <p className="mt-1 text-sm text-slate-500">One line per profile: profileId proxyIp countryTag displayName. Commas are also supported.</p>
          </div>
          <button className="btn-primary" type="submit" disabled={busy || !bulkProfilesText.trim()}>
            Import Profiles
          </button>
        </div>
        <textarea
          className="field min-h-32 font-mono"
          placeholder={'ml-001 45.12.10.8 US US-Profile-001\\nml-002 91.20.8.3 DE DE-Profile-002'}
          value={bulkProfilesText}
          onChange={(event) => setBulkProfilesText(event.target.value)}
        />
      </form>

      <div className="card p-4">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <select className="field max-w-44" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All task statuses</option>
            {taskStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <input className="field max-w-36" placeholder="Country" value={filters.country} onChange={(e) => setFilters({ ...filters, country: e.target.value })} />
          <input className="field max-w-36" placeholder="Provider" value={filters.provider} onChange={(e) => setFilters({ ...filters, provider: e.target.value })} />
          <select className="field max-w-72" value={selectedProfileId} onChange={(e) => setSelectedProfileId(e.target.value)}>
            <option value="">Select idle profile for assignment</option>
            {idleProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.displayName || profile.id} - {profile.countryTag}
              </option>
            ))}
          </select>
          <button className="btn-secondary" type="button" onClick={loadData}>
            Apply
          </button>
        </div>
        <DataTable columns={taskColumns} rows={tasks} loading={loading} emptyMessage="No traffic tasks yet. Import a task or run supplier sync first." />
      </div>

      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-950">MoreLogin Profiles</h2>
        <DataTable columns={profileColumns} rows={profiles} loading={loading} emptyMessage="No browser profiles registered yet." />
      </section>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-lg font-bold text-slate-950">Execution Logs</h2>
        </div>
        <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto">
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
            <p className="p-6 text-sm text-slate-500">No execution logs yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

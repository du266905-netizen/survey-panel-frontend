import { AlertTriangle, ArrowLeft, CheckCircle2, Clipboard, PauseCircle, PlayCircle, Plus, RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import { bindWorkerTrafficProfile, createTrafficProfile, getTrafficWorker, updateWorkerDevice } from '../api/realApi';

const initialBindForm = {
  profileId: '',
  newProfileId: '',
  displayName: '',
  countryTag: 'US',
};

function statusClass(status) {
  const normalized = String(status || '').toLowerCase();
  if (['done', 'idle', 'online', 'ready'].includes(normalized)) return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
  if (['running', 'launching'].includes(normalized)) return 'bg-blue-50 text-blue-700 ring-blue-200';
  if (['pending', 'pending_wait', 'cooldown', 'missing'].includes(normalized)) return 'bg-amber-50 text-amber-800 ring-amber-200';
  return 'bg-red-50 text-red-700 ring-red-200';
}

function StatusPill({ value, label = value }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClass(value)}`}>
      {label || '-'}
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

function formatTime(value) {
  return value ? new Date(value).toLocaleString() : '-';
}

function matchingLabel(profile) {
  const status = profile.respondentProfileStatus?.status || 'missing';
  if (status === 'ready') return 'Ready';
  if (status === 'blocked') return 'Needs correction';
  return 'Needs completion';
}

export default function WorkerDetail() {
  const { workerId } = useParams();
  const [worker, setWorker] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [devices, setDevices] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [bindForm, setBindForm] = useState(initialBindForm);
  const [copyMessage, setCopyMessage] = useState('');

  const loadWorker = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTrafficWorker(workerId);
      setWorker(data.worker || null);
      setProfiles(data.profiles || []);
      setAvailableProfiles(data.availableProfiles || []);
      setDevices(data.devices || []);
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to load member details.');
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
      setError(err.response?.data?.message || err.message || 'Operation failed.');
    } finally {
      setBusy(false);
    }
  };

  const unboundProfiles = useMemo(() => {
    const boundIds = new Set(profiles.map((profile) => profile.id));
    return availableProfiles.filter((profile) => !boundIds.has(profile.id));
  }, [availableProfiles, profiles]);

  const summary = useMemo(
    () => ({
      onlineDevices: devices.filter((device) => device.isOnline && !device.disabledAt).length,
      activeWork: tasks.filter((task) => task.status === 'running').length,
      pendingSettlement: tasks.filter((task) => task.status === 'settlement_pending').length,
    }),
    [devices, tasks]
  );

  const handleBindProfile = (event) => {
    event.preventDefault();
    return runAction(async () => {
      const newProfileId = bindForm.newProfileId.trim();
      const profileId = newProfileId || bindForm.profileId;
      if (!profileId) throw new Error('Select an existing environment or enter a new environment ID.');

      if (newProfileId) {
        const countryTag = bindForm.countryTag.trim().toUpperCase();
        if (!/^[A-Z]{2}$/.test(countryTag)) throw new Error('Enter a two-letter country code for the new environment.');
        await createTrafficProfile({
          id: profileId,
          displayName: bindForm.displayName.trim() || profileId,
          proxyIp: 'dynamic-ip',
          proxyCountry: countryTag,
          countryTag,
          status: 'idle',
          dynamicIpMode: true,
          metadata: { dynamicIpMode: true, manualCompletionOnly: true, source: 'orbit_operations' },
        });
      }

      await bindWorkerTrafficProfile(workerId, profileId, {
        displayName: bindForm.displayName.trim() || undefined,
        ...(newProfileId
          ? {
              proxyIp: 'dynamic-ip',
              proxyCountry: bindForm.countryTag.trim().toUpperCase(),
              countryTag: bindForm.countryTag.trim().toUpperCase(),
            }
          : {}),
        dynamicIpMode: true,
        metadata: { dynamicIpMode: true, manualCompletionOnly: true },
      });
      setBindForm(initialBindForm);
    });
  };

  const copyBindingCode = async () => {
    if (!worker?.bindingCode || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(worker.bindingCode);
      setCopyMessage('Binding code copied');
      window.setTimeout(() => setCopyMessage(''), 1600);
    } catch {
      setCopyMessage('Copy failed');
    }
  };

  const profileColumns = [
    { key: 'id', header: 'Environment ID' },
    { key: 'displayName', header: 'Name', render: (row) => row.displayName || '-' },
    { key: 'countryTag', header: 'Country', render: (row) => row.countryTag || '-' },
    {
      key: 'matching',
      header: 'Matching profile',
      render: (row) => <StatusPill value={row.respondentProfileStatus?.status || 'missing'} label={matchingLabel(row)} />,
    },
    { key: 'status', header: 'Environment state', render: (row) => <StatusPill value={row.status} /> },
  ];

  const deviceColumns = [
    { key: 'deviceName', header: 'Device', render: (row) => row.deviceName || 'Orbit Member device' },
    { key: 'currentStatus', header: 'State', render: (row) => <StatusPill value={row.disabledAt ? 'paused' : row.currentStatus} label={row.disabledAt ? 'Paused' : row.currentStatus} /> },
    { key: 'lastSeenAt', header: 'Last active', render: (row) => formatTime(row.lastSeenAt) },
    {
      key: 'actions',
      header: 'Action',
      render: (row) => (
        <button
          className="btn-secondary px-3 py-1.5"
          type="button"
          disabled={busy}
          onClick={() => runAction(() => updateWorkerDevice(workerId, row.id, { disabled: !row.disabledAt, reason: 'Paused from Orbit operations' }))}
        >
          {row.disabledAt ? <PlayCircle size={15} /> : <PauseCircle size={15} />}
          {row.disabledAt ? 'Resume' : 'Pause'}
        </button>
      ),
    },
  ];

  const taskColumns = [
    { key: 'id', header: 'Task record', render: (row) => row.id.slice(-8).toUpperCase() },
    { key: 'status', header: 'State', render: (row) => <StatusPill value={row.status} /> },
    { key: 'startedAt', header: 'Started', render: (row) => formatTime(row.startedAt) },
    { key: 'finishedAt', header: 'Finished', render: (row) => formatTime(row.finishedAt) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={worker?.displayName || 'Member detail'}
        description="Manage device access and working environments. Tasks are assigned and recorded only through the member application."
        action={
          <div className="flex gap-2">
            <Link className="btn-secondary" to="/workers"><ArrowLeft size={16} />Back</Link>
            <button className="btn-secondary" type="button" onClick={loadWorker} disabled={loading || busy}><RefreshCcw size={16} />Refresh</button>
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
        <InfoCard label="Online devices" value={summary.onlineDevices} />
        <InfoCard label="Work environments" value={profiles.length} />
        <InfoCard label="Active work" value={summary.activeWork} />
        <InfoCard label="Awaiting review" value={summary.pendingSettlement} />
      </div>

      <section className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Member binding</h2>
            <p className="mt-1 text-sm text-slate-500">Use this code once when the member activates a new Orbit Member installation.</p>
          </div>
          <button className="btn-secondary" type="button" onClick={copyBindingCode} disabled={!worker?.bindingCode}>
            <Clipboard size={16} />
            Copy code
          </button>
        </div>
        {copyMessage && <p className="mt-3 text-sm font-semibold text-emerald-700">{copyMessage}</p>}
      </section>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-950">Work environments</h2>
          <p className="mt-1 text-sm text-slate-500">The member completes matching information in the application before this environment can receive work.</p>
        </div>
        <DataTable columns={profileColumns} rows={profiles} loading={loading} emptyMessage="No work environment is bound yet." />
      </section>

      <form className="card space-y-4 p-5" onSubmit={handleBindProfile}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Bind work environment</h2>
            <p className="mt-1 text-sm text-slate-500">Bind an existing environment or register a new ID. Environment checks run from the member application.</p>
          </div>
          <Plus size={18} className="text-cyan-600" />
        </div>
        <div className="grid gap-3 lg:grid-cols-4">
          <select className="field" value={bindForm.profileId} onChange={(event) => setBindForm((current) => ({ ...current, profileId: event.target.value, newProfileId: '' }))}>
            <option value="">Select existing environment</option>
            {unboundProfiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.displayName || profile.id}</option>)}
          </select>
          <input className="field" placeholder="New environment ID" value={bindForm.newProfileId} onChange={(event) => setBindForm((current) => ({ ...current, newProfileId: event.target.value, profileId: '' }))} />
          <input className="field" placeholder="Display name (optional)" value={bindForm.displayName} onChange={(event) => setBindForm((current) => ({ ...current, displayName: event.target.value }))} />
          <input className="field" maxLength="2" placeholder="Country for new ID" value={bindForm.countryTag} onChange={(event) => setBindForm((current) => ({ ...current, countryTag: event.target.value.toUpperCase() }))} />
        </div>
        <button className="btn-primary" type="submit" disabled={busy}><CheckCircle2 size={16} />Bind environment</button>
      </form>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-950">Member devices</h2>
          <p className="mt-1 text-sm text-slate-500">Pause only when the member should stop receiving work. Resume when they are ready to continue.</p>
        </div>
        <DataTable columns={deviceColumns} rows={devices} loading={loading} emptyMessage="No member device is bound yet." />
      </section>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-950">Work history</h2>
          <p className="mt-1 text-sm text-slate-500">Read-only history. Review completed results from the settlement page instead of changing outcomes here.</p>
        </div>
        <DataTable columns={taskColumns} rows={tasks} loading={loading} emptyMessage="No task history yet." />
      </section>
    </div>
  );
}

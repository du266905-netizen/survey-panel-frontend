import { Activity, Coins, Database, LineChart as LineChartIcon, Users } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getAdminDashboard } from '../api/realApi';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { useAuth } from '../components/AuthContext';
import { useAsyncData } from '../hooks/useAsyncData';

const valueAt = (source, path) => path.split('.').reduce((current, key) => current?.[key], source);

const overviewCards = [
  ['Total Records', 'stats.totalResponses', Database],
  ['Completed Records', 'stats.completedResponses', Activity],
  ['Pending Records', 'stats.pendingResponses', LineChartIcon],
  ['Coins Settled', 'stats.coinsSettled', Coins],
  ['Active Users', 'stats.activeUsers', Users],
];

const qualityCards = [
  ['US Panelist DAU', 'trafficQuality.panel.dau'],
  ['Panel Starts', 'stats.panelStarts'],
  ['Panel Completes', 'stats.panelCompletes'],
  ['Panel Completion', 'stats.panelCompletionRate', '%'],
  ['Internal Starts', 'stats.internalStarts'],
  ['Internal Completes', 'stats.internalCompletes'],
  ['CPX Starts', 'stats.cpxStarts'],
  ['CPX Completion', 'stats.cpxCompletionRate', '%'],
];

const identityCards = [
  ['Panelists', 'stats.panelists'],
  ['Employees', 'stats.employees'],
  ['Partners', 'stats.partners'],
  ['Active Partners', 'stats.activePartners'],
  ['Sessions', 'stats.totalSessions'],
  ['Failed Records', 'stats.failedResponses'],
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const { data, loading } = useAsyncData(getAdminDashboard, []);

  if (user?.role !== 'admin') {
    return (
      <div className="card p-8 text-center">
        <h1 className="text-xl font-bold text-slate-950">Admin access required</h1>
        <p className="mt-2 text-sm text-slate-500">This dashboard is only visible to admin role users.</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Admin Dashboard" description="Live database-backed metrics for records, users, CPX, and panel traffic quality." />

      <section>
        <div className="mb-3">
          <h2 className="text-lg font-bold text-slate-950">Database Overview</h2>
          <p className="mt-1 text-sm text-slate-500">These totals come directly from production records, sessions, users, and partners.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {overviewCards.map(([label, path, Icon]) => (
            <StatCard key={path} label={label} value={loading ? '-' : (valueAt(data, path) ?? 0)} icon={Icon} iconClassName="bg-cyan-50 text-cyan-600" />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Traffic Quality</h2>
            <p className="mt-1 text-sm text-slate-500">Panelist activity is tracked separately from internal Orbit Member traffic.</p>
          </div>
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 ring-1 ring-cyan-100">
            Last {data?.trafficQuality?.window?.days || 7} days
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {qualityCards.map(([label, path, suffix]) => {
            const value = valueAt(data, path);
            return <StatCard key={path} label={label} value={loading || value === undefined ? '-' : `${value}${suffix || ''}`} />;
          })}
        </div>
      </section>

      <div className="mt-7 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="card p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-950">US Panelist DAU</h2>
          <div className="h-72">
            {loading ? (
              <div className="h-full animate-pulse rounded-lg bg-slate-100" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.trafficQuality?.daily || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="panelistDau" stroke="#06b6d4" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-bold text-slate-950">Identity Split</h2>
          <div className="mt-4 grid gap-3">
            {identityCards.map(([label, path]) => (
              <div key={path} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-sm font-semibold text-slate-600">{label}</span>
                <span className="text-lg font-bold text-slate-950">{loading ? '-' : (valueAt(data, path) ?? 0)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

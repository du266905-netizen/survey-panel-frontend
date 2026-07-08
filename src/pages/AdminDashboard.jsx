import { Activity, Coins, Database, Globe2, LineChart as LineChartIcon, MapPin, PlugZap, ShieldAlert, Users } from 'lucide-react';
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
  ['Global Panelist DAU', 'trafficQuality.panel.dau'],
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

const apiCards = [
  ['CPX Starts', 'stats.cpxStarts', PlugZap],
  ['CPX Completes', 'stats.cpxCompletes', Activity],
  ['CPX Completion', 'stats.cpxCompletionRate', LineChartIcon, '%'],
  ['Pending Records', 'stats.pendingResponses', Database],
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
      <PageHeader title="Admin Dashboard" description="Live database-backed metrics for records, users, CPX, partners, and traffic quality." />

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
            <p className="mt-1 text-sm text-slate-500">Global panelist activity is tracked separately from internal Orbit Member traffic.</p>
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
          <h2 className="mb-4 text-lg font-bold text-slate-950">Global Panelist DAU</h2>
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

      <section className="mt-7">
        <div className="mb-3">
          <h2 className="text-lg font-bold text-slate-950">API Performance</h2>
          <p className="mt-1 text-sm text-slate-500">CPX activity from real Record and Partner data.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {apiCards.map(([label, path, Icon, suffix]) => {
            const value = valueAt(data, path);
            return <StatCard key={path} label={label} value={loading || value === undefined ? '-' : `${value}${suffix || ''}`} icon={Icon} iconClassName="bg-sky-50 text-sky-600" />;
          })}
        </div>
      </section>

      <div className="mt-7 grid gap-6 xl:grid-cols-2">
        <section className="card overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <Globe2 size={18} className="text-cyan-600" />
              <h2 className="text-lg font-bold text-slate-950">Partner Performance</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">Only real business channels are shown here.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {(data?.partnerPerformance || []).map((partner) => (
              <div key={partner.slug} className="grid grid-cols-[1fr_auto] gap-3 px-5 py-4">
                <div>
                  <p className="font-bold text-slate-950">{partner.displayName}</p>
                  <p className="mt-1 text-sm text-slate-500">{partner.channel} · {partner.slug}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-950">{partner.activeSurveys}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{partner.businessStatus}</p>
                </div>
              </div>
            ))}
            {!loading && !(data?.partnerPerformance || []).length && (
              <p className="px-5 py-8 text-sm text-slate-500">No partner data yet.</p>
            )}
          </div>
        </section>

        <section className="card overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <ShieldAlert size={18} className="text-amber-600" />
              <h2 className="text-lg font-bold text-slate-950">Risk & Regions</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">Risk indicators come from IP log quality checks.</p>
          </div>
          <div className="grid gap-4 p-5 lg:grid-cols-2">
            <div className="space-y-3">
              {(data?.riskClassification || []).map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                    {item.name}
                  </span>
                  <span className="font-bold text-slate-950">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {(data?.geographicRisk || []).slice(0, 5).map((item) => (
                <div key={item.country} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <MapPin size={14} className="text-cyan-600" />
                    {item.country || 'Unknown'}
                  </span>
                  <span className="font-bold text-slate-950">{item.value}</span>
                </div>
              ))}
              {!loading && !(data?.geographicRisk || []).length && (
                <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">No regional risk data yet.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

import { useState } from 'react';
import { CheckCircle2, Clock3, Coins, XCircle } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashboard } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatCoinNumber } from '../utils/formatters';
import { useAuth } from '../components/AuthContext';

const greetingForHour = (hour) => {
  if (hour < 12) return '早上好';
  if (hour < 18) return '下午好';
  return '晚上好';
};

export default function Dashboard() {
  const { data, loading } = useAsyncData(getDashboard, []);
  const { user } = useAuth();
  const [chartRange, setChartRange] = useState('7d');
  const greeting = greetingForHour(new Date().getHours());
  const displayName = user?.displayName || user?.username || 'there';

  const columns = [
    { key: 'surveyId', header: 'Survey ID' },
    { key: 'platform', header: 'Platform' },
    { key: 'ip', header: 'IP' },
    { key: 'coins', header: 'Coins', render: (row) => <CoinAmount value={row.coins} /> },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'time', header: 'Time' },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Track your last 7 days of coin rewards and completed survey activity." />
      <section className="card mb-6 border-l-4 border-l-primary p-5">
        <h2 className="text-xl font-bold text-slate-950">
          {greeting}，{displayName}
        </h2>
        <p className="mt-1 text-sm text-slate-500">Here is your activity summary.</p>
      </section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Completed Offers"
          value={data?.stats.completedOffers ?? '-'}
          icon={CheckCircle2}
          helper="Approved conversions"
          className="border-l-4 border-l-green-500"
          iconClassName="bg-green-100 text-green-600"
        />
        <StatCard
          label="Coins Earned"
          value={<CoinAmount value={data?.stats.coinsEarned} />}
          icon={Coins}
          helper="Lifetime survey coins"
          className="border-l-4 border-l-amber-500"
          iconClassName="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          label="Pending Coins"
          value={<CoinAmount value={data?.stats.pendingEarnings} />}
          icon={Clock3}
          helper="Awaiting audit"
          className="border-l-4 border-l-blue-500"
          iconClassName="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Failed Coins"
          value={<CoinAmount value={data?.stats.failedEarnings} />}
          icon={XCircle}
          helper="Rejected or expired"
          className="border-l-4 border-l-red-500"
          iconClassName="bg-red-100 text-red-600"
        />
      </div>

      <section className="card mt-6 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Coins Earned Trend</h2>
            <p className="text-sm text-slate-500">Coin rewards from completed surveys.</p>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-500">
            Time range
            <select
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              value={chartRange}
              onChange={(event) => setChartRange(event.target.value)}
            >
              <option value="7d">Last 7 days</option>
              <option value="14d">Last 14 days</option>
              <option value="30d">Last 30 days</option>
            </select>
          </label>
        </div>
        <div className="h-80">
          {loading ? (
            <div className="h-full animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.earningsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${formatCoinNumber(value)}`} />
                <Tooltip />
                <Line type="monotone" dataKey="coins" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="mt-6">
        <PageHeader title="Recent Activity" description="Last 10 completed surveys." />
        <DataTable columns={columns} rows={data?.recentActivities || []} loading={loading} emptyMessage="No completed surveys yet." />
      </section>
    </>
  );
}

import { CheckCircle2, Clock3, Coins, XCircle } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashboard } from '../api/mockApi';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatCoins } from '../utils/formatters';

export default function Dashboard() {
  const { data, loading } = useAsyncData(getDashboard, []);

  const columns = [
    { key: 'surveyId', header: 'Survey ID' },
    { key: 'platform', header: 'Platform' },
    { key: 'ip', header: 'IP' },
    { key: 'coins', header: 'Coins', render: (row) => formatCoins(row.coins) },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'time', header: 'Time' },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Track your last 7 days of earnings and completed survey activity." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Completed Offers" value={data?.stats.completedOffers ?? '-'} icon={CheckCircle2} helper="Approved conversions" />
        <StatCard label="Coins Earned" value={formatCoins(data?.stats.coinsEarned)} icon={Coins} helper="Lifetime survey coins" />
        <StatCard label="Pending Earnings" value={formatCoins(data?.stats.pendingEarnings)} icon={Clock3} helper="Awaiting audit" />
        <StatCard label="Failed Earnings" value={formatCoins(data?.stats.failedEarnings)} icon={XCircle} helper="Rejected or expired" />
      </div>

      <section className="card mt-6 p-5">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-950">Earnings, Last 7 Days</h2>
          <p className="text-sm text-slate-500">Coin rewards from completed surveys.</p>
        </div>
        <div className="h-80">
          {loading ? (
            <div className="h-full animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.earningsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
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

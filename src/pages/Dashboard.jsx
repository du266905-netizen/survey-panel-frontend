import { useState } from 'react';
import { CheckCircle2, Clock3, Coins, Copy, Gift, XCircle } from 'lucide-react';
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

const chartTooltipStyle = {
  backgroundColor: '#081317',
  border: '1px solid rgba(214, 236, 232, .14)',
  borderRadius: 10,
  color: '#eaf4f1',
};

const greetingForHour = (hour) => {
  if (hour < 12) return '早上好';
  if (hour < 18) return '下午好';
  return '晚上好';
};

export default function Dashboard() {
  const { data, loading } = useAsyncData(getDashboard, []);
  const { user } = useAuth();
  const [chartRange, setChartRange] = useState('7d');
  const [copyStatus, setCopyStatus] = useState('');
  const greeting = greetingForHour(new Date().getHours());
  const displayName = user?.displayName || user?.username || 'there';
  const referral = data?.referral;
  const referralLink = referral?.referralCode ? `https://guanyi-media.com/register?ref=${referral.referralCode}` : '';

  const copyReferralLink = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopyStatus('Copied');
    } catch {
      setCopyStatus('Copy failed');
    }
  };

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
          className="border-l-4 border-l-cyan-500"
          iconClassName="bg-cyan-100 text-cyan-600"
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

      <section className="card mt-6 overflow-hidden border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-700"><Gift size={19} /><span className="text-xs font-bold uppercase tracking-[0.12em]">Invite friends</span></div>
            <h2 className="mt-2 text-xl font-bold text-slate-950">Share your link after they complete their first survey.</h2>
            <p className="mt-1 text-sm text-slate-600">You earn {referral?.referrerRewardCoins ?? 500} Coins and your friend earns {referral?.referredRewardCoins ?? 300} Coins after their first completed survey.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-right">
            <div><p className="text-2xl font-black text-slate-950">{referral?.successfulInvites ?? 0}</p><p className="text-xs font-semibold text-slate-500">Successful invites</p></div>
            <div><p className="text-2xl font-black text-amber-600"><CoinAmount value={referral?.coinsEarned ?? 0} /></p><p className="text-xs font-semibold text-slate-500">Referral Coins</p></div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input className="field flex-1 bg-white font-mono text-sm" value={referralLink} readOnly aria-label="Your referral link" />
          <button className="btn-primary shrink-0" type="button" onClick={copyReferralLink} disabled={!referralLink}><Copy size={16} /> {copyStatus || 'Copy link'}</button>
        </div>
      </section>

      <section className="card mt-6 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Coins Earned Trend</h2>
            <p className="text-sm text-slate-500">Coin rewards from completed surveys.</p>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-500">
            Time range
            <select
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
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
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(193, 221, 218, .12)" />
                <XAxis dataKey="day" stroke="rgba(193, 221, 218, .52)" fontSize={12} />
                <YAxis stroke="rgba(193, 221, 218, .52)" fontSize={12} tickFormatter={(value) => `${formatCoinNumber(value)}`} />
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: '#eaf4f1' }} itemStyle={{ color: '#9fe4df' }} cursor={{ stroke: 'rgba(159, 228, 223, .22)' }} />
                <Line type="monotone" dataKey="coins" stroke="#9fe4df" strokeWidth={3} dot={{ r: 3, fill: '#0b1d21', stroke: '#9fe4df', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#9fe4df' }} />
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

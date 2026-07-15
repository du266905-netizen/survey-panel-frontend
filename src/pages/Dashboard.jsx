import { useMemo, useState } from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CheckCircle2, Clock3, Eye, ListFilter, X, XCircle } from 'lucide-react';
import { getDashboard } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatCoinNumber, titleCase } from '../utils/formatters';

const chartTooltipStyle = {
  backgroundColor: '#081317',
  border: '1px solid rgba(214, 236, 232, .14)',
  borderRadius: 10,
  color: '#eaf4f1',
};

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function recordDate(record) {
  const value = record.auditTime && record.auditTime !== '-' ? record.auditTime : record.startTime || record.time;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function buildTrend(records, dayCount) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const points = Array.from({ length: dayCount }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (dayCount - index - 1));
    return {
      key: dateKey(date),
      day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed: 0,
      coins: 0,
    };
  });
  const byDay = new Map(points.map((point) => [point.key, point]));

  records.forEach((record) => {
    if (record.status !== 'completed') return;
    const date = recordDate(record);
    const point = date ? byDay.get(dateKey(date)) : null;
    if (!point) return;
    point.completed += 1;
    point.coins += Number(record.coinsReward || 0);
  });

  return points;
}

function formatRecordTime(record) {
  const date = recordDate(record);
  return date ? date.toLocaleString() : '-';
}

export default function Dashboard() {
  const { data, loading } = useAsyncData(getDashboard, []);
  const [trendRange, setTrendRange] = useState(7);
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [historyStatus, setHistoryStatus] = useState('all');
  const [historyRange, setHistoryRange] = useState('all');
  const records = data?.records || [];
  const trend = useMemo(() => buildTrend(records, trendRange), [records, trendRange]);
  const recentRecords = records.slice(0, 8);
  const historyRecords = useMemo(() => {
    const now = new Date();
    const cutoff = historyRange === 'all' ? null : new Date(now.getTime() - Number(historyRange) * 24 * 60 * 60 * 1000);
    return records.filter((record) => {
      const matchesStatus = historyStatus === 'all' || record.status === historyStatus;
      const date = recordDate(record);
      return matchesStatus && (!cutoff || (date && date >= cutoff));
    });
  }, [historyRange, historyStatus, records]);

  const recordColumns = [
    { key: 'platform', header: 'Channel' },
    { key: 'coinsReward', header: 'Coins', render: (row) => <CoinAmount value={row.coinsReward} /> },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'time', header: 'Time', render: (row) => formatRecordTime(row) },
    {
      key: 'details',
      header: '',
      render: (row) => (
        <button className="btn-secondary px-3 py-1.5 text-xs" type="button" onClick={() => setSelectedRecord(row)}>
          <Eye size={14} /> Details
        </button>
      ),
    },
  ];

  const fullRecordColumns = [
    { key: 'surveyNumber', header: 'Survey' },
    ...recordColumns,
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Your recent survey activity, reward trend, and participation history." />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Completed Offers"
          value={data?.stats.completedOffers ?? '-'}
          icon={CheckCircle2}
          helper="Approved conversions"
          className="border-l-4 border-l-cyan-500"
          iconClassName="bg-cyan-100 text-cyan-600"
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
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Participation trend</h2>
            <p className="mt-1 text-sm text-slate-500">Daily completed offers and approved Coins.</p>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            Period
            <select className="field w-auto py-2" value={trendRange} onChange={(event) => setTrendRange(Number(event.target.value))}>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </label>
        </div>
        <div className="h-80">
          {loading ? (
            <div className="h-full animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trend} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, .24)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} interval={trendRange === 30 ? 4 : 0} />
                <YAxis yAxisId="completed" allowDecimals={false} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
                <YAxis yAxisId="coins" orientation="right" tickFormatter={(value) => formatCoinNumber(value)} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} width={48} />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  labelStyle={{ color: '#eaf4f1' }}
                  formatter={(value, name) => [name === 'Coins' ? `${formatCoinNumber(value)} Coins` : value, name]}
                />
                <Legend wrapperStyle={{ paddingTop: 14 }} />
                <Bar yAxisId="completed" dataKey="completed" name="Completed offers" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Line yAxisId="coins" type="monotone" dataKey="coins" name="Coins" stroke="#0891b2" strokeWidth={3} dot={trendRange === 7 ? { r: 3 } : false} activeDot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Recent records</h2>
            <p className="mt-1 text-sm text-slate-500">Your latest participation updates.</p>
          </div>
          <button className="btn-secondary" type="button" onClick={() => setShowAllRecords(true)}>
            <ListFilter size={16} /> View all
          </button>
        </div>
        <DataTable columns={recordColumns} rows={recentRecords} loading={loading} emptyMessage="No participation records yet." />
      </section>

      {showAllRecords && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4" role="dialog" aria-modal="true" aria-labelledby="all-records-title">
          <section className="card flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden shadow-2xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 p-5">
              <div>
                <h2 id="all-records-title" className="text-xl font-bold text-slate-950">Participation history</h2>
                <p className="mt-1 text-sm text-slate-500">Filter and review your full record history without leaving Dashboard.</p>
              </div>
              <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" type="button" onClick={() => setShowAllRecords(false)} aria-label="Close participation history">
                <X size={19} />
              </button>
            </div>
            <div className="grid gap-3 border-b border-slate-100 bg-slate-50 p-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Status
                <select className="field mt-1" value={historyStatus} onChange={(event) => setHistoryStatus(event.target.value)}>
                  <option value="all">All statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="screen_out">Screen out</option>
                  <option value="quota_full">Quota full</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Period
                <select className="field mt-1" value={historyRange} onChange={(event) => setHistoryRange(event.target.value)}>
                  <option value="all">All time</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                </select>
              </label>
            </div>
            <div className="min-h-0 overflow-y-auto p-5">
              <DataTable columns={fullRecordColumns} rows={historyRecords} loading={loading} emptyMessage="No records match these filters." />
            </div>
          </section>
        </div>
      )}

      {selectedRecord && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 p-4" role="dialog" aria-modal="true" aria-labelledby="record-details-title">
          <section className="card w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Participation record</p>
                <h2 id="record-details-title" className="mt-1 text-xl font-bold text-slate-950">{selectedRecord.surveyNumber}</h2>
              </div>
              <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" type="button" onClick={() => setSelectedRecord(null)} aria-label="Close record details">
                <X size={18} />
              </button>
            </div>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              {[
                ['Channel', selectedRecord.platform],
                ['Status', titleCase(selectedRecord.status)],
                ['Approved Coins', `${formatCoinNumber(selectedRecord.coinsReward)} Coins`],
                ['Payout', selectedRecord.amountUsd === null || selectedRecord.amountUsd === undefined ? '-' : `$${Number(selectedRecord.amountUsd).toFixed(2)}`],
                ['Started', selectedRecord.startTime ? new Date(selectedRecord.startTime).toLocaleString() : '-'],
                ['Updated', formatRecordTime(selectedRecord)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt>
                  <dd className="mt-1 font-semibold text-slate-900">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )}
    </>
  );
}

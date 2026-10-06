import { useMemo, useState } from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashboard } from '../api/realApi';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatCoinNumber } from '../utils/formatters';

const chartTooltipStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid rgba(17, 17, 19, .14)',
  borderRadius: 4,
  color: '#24272c',
  boxShadow: '0 12px 28px rgba(12, 14, 17, .10)',
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

export default function ActivityDashboard() {
  const { data, loading } = useAsyncData(getDashboard, []);
  const [trendRange, setTrendRange] = useState(7);
  const records = data?.records || [];
  const trend = useMemo(() => buildTrend(records, trendRange), [records, trendRange]);
  const hasTrendActivity = trend.some((point) => point.completed > 0 || point.coins > 0);

  return (
    <div className="activity-dashboard-page">
      <section className="dashboard-trend-card">
        <div className="dashboard-trend-heading">
          <div>
            <p className="dashboard-command-kicker">Your activity</p>
            <h1>Participation trend</h1>
            <p>Daily completed offers and approved Coins.</p>
          </div>
          <label>
            <span>Period</span>
            <select className="field" value={trendRange} onChange={(event) => setTrendRange(Number(event.target.value))}>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </label>
        </div>
        <div className="dashboard-chart-wrap">
          {loading ? (
            <div className="h-full animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <>
              {!hasTrendActivity && (
                <div className="dashboard-chart-empty">
                  <p>Trend will appear after your first approved survey.</p>
                  <span>No cleared activity in the selected period yet.</span>
                </div>
              )}
              <div className={hasTrendActivity ? 'h-full' : 'h-full dashboard-chart-muted'}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={trend} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(17, 17, 19, .10)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: '#7f848a', fontSize: 12 }} axisLine={false} tickLine={false} interval={trendRange === 30 ? 4 : 0} />
                    <YAxis yAxisId="completed" allowDecimals={false} tick={{ fill: '#7f848a', fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
                    <YAxis yAxisId="coins" orientation="right" tickFormatter={(value) => formatCoinNumber(value)} tick={{ fill: '#7f848a', fontSize: 12 }} axisLine={false} tickLine={false} width={48} />
                    <Tooltip
                      contentStyle={chartTooltipStyle}
                      labelStyle={{ color: '#24272c' }}
                      formatter={(value, name) => [name === 'Coins' ? `${formatCoinNumber(value)} Coins` : value, name]}
                    />
                    <Legend wrapperStyle={{ paddingTop: 14 }} />
                    <Bar yAxisId="completed" dataKey="completed" name="Completed offers" fill="#e8e8e5" radius={[3, 3, 0, 0]} maxBarSize={28} />
                    <Line yAxisId="coins" type="monotone" dataKey="coins" name="Coins" stroke="#24272c" strokeWidth={2.5} dot={trendRange === 7 ? { r: 3 } : false} activeDot={{ r: 5 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

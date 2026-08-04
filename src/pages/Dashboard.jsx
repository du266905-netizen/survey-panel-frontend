import { useEffect, useMemo, useState } from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDashboard } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import { useProfileSurvey } from '../components/ProfileSurveyContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatCoinNumber } from '../utils/formatters';
import { isPanelistRole } from '../utils/roles';
import { formatUsdEstimate } from '../utils/wallet';

const chartTooltipStyle = {
  backgroundColor: '#fffdfa',
  border: '1px solid rgba(53, 62, 53, .16)',
  borderRadius: 4,
  color: '#1f2a23',
  boxShadow: '0 12px 28px rgba(47, 54, 45, .09)',
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

function localGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard() {
  const { user } = useAuth();
  const { panelProfile } = useProfileSurvey();
  const { data, loading } = useAsyncData(getDashboard, []);
  const [trendRange, setTrendRange] = useState(7);
  const [greeting, setGreeting] = useState(localGreeting);
  const records = data?.records || [];
  const trend = useMemo(() => buildTrend(records, trendRange), [records, trendRange]);
  const hasTrendActivity = trend.some((point) => point.completed > 0 || point.coins > 0);
  const completedOffers = data?.stats.completedOffers ?? 0;
  const isPanelist = isPanelistRole(user?.role);
  const displayName = user?.username || user?.displayName || 'there';
  const balance = Number(user?.coins ?? user?.coinsBalance ?? 0);
  const balanceUsd = balance / 1000;
  const nextAction = completedOffers > 0
    ? 'New matches move throughout the day. Check the wall while survey inventory is fresh.'
    : 'Start with one verified completion. Once it clears, your reward record begins to build.';

  useEffect(() => {
    const intervalId = window.setInterval(() => setGreeting(localGreeting()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-page">
      {isPanelist && (
        <section className="dashboard-welcome">
          <div className="dashboard-welcome-copy">
            <p>Your space</p>
            <h1>{greeting}, {displayName}.</h1>
            <span>Explore at your own pace. Your next opportunity is ready when you are.</span>
          </div>
          <div className="dashboard-balance-card" aria-label={`${formatCoinNumber(balance)} Coins available`}>
            <span className="dashboard-balance-token" aria-hidden="true">◎</span>
            <span className="dashboard-balance-copy">
              <span>Coins balance</span>
              <strong>{formatCoinNumber(balance)} <em>Coins</em></strong>
            </span>
            <span className="dashboard-balance-estimate">≈ {formatUsdEstimate(balanceUsd, panelProfile?.country)}</span>
          </div>
        </section>
      )}
      <section className="dashboard-board">
        <div className="dashboard-board-intro">
          <header className="dashboard-command">
            <div className="dashboard-command-copy">
              <p className="dashboard-command-kicker">Start earning today</p>
              <h1>One good survey can start the streak.</h1>
              <p>{nextAction}</p>
              <div className="dashboard-command-actions">
                <Link className="btn-primary" to="/partners">
                  Find surveys <ArrowUpRight size={16} />
                </Link>
                {!isPanelist && (
                  <Link className="btn-secondary" to="/wallet">
                    Open wallet
                  </Link>
                )}
              </div>
            </div>
          </header>

          <aside className="dashboard-path-panel" aria-label="Reward path">
            <div className="dashboard-path-head">
              <span>Reward path</span>
              <strong>Surveys → Coins → Gift cards</strong>
            </div>
            <div className="dashboard-path-steps">
              <article>
                <span>01</span>
                <strong>Find a live match</strong>
                <p>Survey availability changes during the day.</p>
              </article>
              <article>
                <span>02</span>
                <strong>Finish with quality</strong>
                <p>Partners validate completions before Coins clear.</p>
              </article>
              <article>
                <span>03</span>
                <strong>Build toward rewards</strong>
                <p>Gift card goals unlock from the $10 tier.</p>
              </article>
            </div>
            <p>Tip: finish your first survey and check back when the wall looks quiet — inventory rotates.</p>
          </aside>
        </div>

        <section className="dashboard-trend-card">
          <div className="dashboard-trend-heading">
            <div>
              <p className="dashboard-command-kicker">Your activity</p>
              <h2>Participation trend</h2>
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
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(58, 69, 59, .12)" vertical={false} />
                      <XAxis dataKey="day" tick={{ fill: '#888b82', fontSize: 12 }} axisLine={false} tickLine={false} interval={trendRange === 30 ? 4 : 0} />
                      <YAxis yAxisId="completed" allowDecimals={false} tick={{ fill: '#888b82', fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
                      <YAxis yAxisId="coins" orientation="right" tickFormatter={(value) => formatCoinNumber(value)} tick={{ fill: '#888b82', fontSize: 12 }} axisLine={false} tickLine={false} width={48} />
                      <Tooltip
                        contentStyle={chartTooltipStyle}
                        labelStyle={{ color: '#1f2a23' }}
                        formatter={(value, name) => [name === 'Coins' ? `${formatCoinNumber(value)} Coins` : value, name]}
                      />
                      <Legend wrapperStyle={{ paddingTop: 14 }} />
                      <Bar yAxisId="completed" dataKey="completed" name="Completed offers" fill="#9ec8bd" radius={[3, 3, 0, 0]} maxBarSize={28} />
                      <Line yAxisId="coins" type="monotone" dataKey="coins" name="Coins" stroke="#ba9655" strokeWidth={2.5} dot={trendRange === 7 ? { r: 3 } : false} activeDot={{ r: 5 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}

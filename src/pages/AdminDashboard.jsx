import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getAdminDashboard } from '../api/realApi';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { useAuth } from '../components/AuthContext';
import { useAsyncData } from '../hooks/useAsyncData';

const tabs = ['Overview', 'Codebit Service', 'API Performance Overview', 'API Partner Performance', 'Performance Report', 'Already Downloaded', 'Report'];

export default function AdminDashboard() {
  const { user } = useAuth();
  const { data, loading } = useAsyncData(getAdminDashboard, []);
  const [activeTab, setActiveTab] = useState('Overview');

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
      <PageHeader title="Admin Dashboard" description="Risk quality controls and partner API performance reporting." />
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab ? 'bg-primary text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Responses" value={data?.stats.totalResponses ?? '-'} />
        <StatCard label="High Quality" value={data?.stats.highQuality ?? '-'} />
        <StatCard label="Medium Risk" value={data?.stats.mediumRisk ?? '-'} />
        <StatCard label="High Risk" value={data?.stats.highRisk ?? '-'} />
        <StatCard label="Other" value={data?.stats.other ?? '-'} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="card p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-950">Risk Classification</h2>
          <div className="h-80">
            {loading ? (
              <div className="h-full animate-pulse rounded-lg bg-slate-100" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.riskClassification} dataKey="value" nameKey="name" innerRadius={70} outerRadius={115} paddingAngle={3}>
                    {data.riskClassification.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="card p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-950">Geographic Risk</h2>
          <div className="h-80">
            {loading ? (
              <div className="h-full animate-pulse rounded-lg bg-slate-100" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.geographicRisk}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="country" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="highQuality" stackId="a" fill="#22c55e" />
                  <Bar dataKey="mediumRisk" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="highRisk" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>

      <section className="card mt-6 p-5">
        <h2 className="mb-4 text-lg font-bold text-slate-950">Daily Trend</h2>
        <div className="h-80">
          {loading ? (
            <div className="h-full animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.dailyRiskTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="all" stroke="#0f172a" strokeWidth={2} />
                <Line type="monotone" dataKey="highQuality" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="mediumRisk" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="highRisk" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </>
  );
}

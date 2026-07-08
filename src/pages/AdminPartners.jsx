import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getPartners } from '../api/realApi';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';

function StatusPill({ active }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${active ? 'bg-cyan-50 text-cyan-700 ring-cyan-200' : 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPartners = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getPartners();
      setPartners(response.data || []);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || caughtError.message || 'Failed to load partner stats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const stats = useMemo(
    () => ({
      totalPartners: partners.length,
      activePartners: partners.filter((partner) => partner.isActive !== false).length,
      totalSurveys: partners.reduce((sum, partner) => sum + Number(partner.activeSurveys || 0), 0),
    }),
    [partners]
  );

  const columns = [
    { key: 'name', header: 'Partner', render: (row) => row.displayName || row.name || '-' },
    { key: 'slug', header: 'Slug', render: (row) => row.slug || '-' },
    { key: 'activeSurveys', header: 'Surveys', render: (row) => row.activeSurveys || 0 },
    { key: 'conversion', header: 'Business Status', render: (row) => row.conversion || (row.isActive === false ? 'Inactive' : 'Connected') },
    { key: 'isActive', header: 'Enabled', render: (row) => <StatusPill active={row.isActive !== false} /> },
    { key: 'apiEndpoint', header: 'API Endpoint', render: (row) => row.apiEndpoint || '-' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Partners"
        description="Admin-only partner view. The member experience stays as one anonymous survey wall."
        action={
          <button className="btn-secondary" type="button" onClick={loadPartners} disabled={loading}>
            <RefreshCcw size={16} />
            Refresh
          </button>
        }
      />

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Partners" value={stats.totalPartners} />
        <StatCard label="Enabled Channels" value={stats.activePartners} />
        <StatCard label="Live Surveys" value={stats.totalSurveys} />
      </div>

      <DataTable columns={columns} rows={partners} loading={loading} emptyMessage="No partner data yet." />
    </div>
  );
}

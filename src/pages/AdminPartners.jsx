import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getPartners } from '../api/realApi';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';

function StatusPill({ active }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${active ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
      {active ? 'Live' : 'Inactive'}
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
      setError(caughtError.response?.data?.message || caughtError.message || '合作伙伴统计加载失败');
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
    { key: 'name', header: '合作伙伴', render: (row) => row.displayName || row.name || '-' },
    { key: 'slug', header: 'Slug', render: (row) => row.slug || '-' },
    { key: 'activeSurveys', header: '问卷数量', render: (row) => row.activeSurveys || 0 },
    { key: 'conversion', header: '渠道状态', render: (row) => row.conversion || (row.isActive === false ? 'Inactive' : 'Live') },
    { key: 'isActive', header: '启用', render: (row) => <StatusPill active={row.isActive !== false} /> },
    { key: 'apiEndpoint', header: 'API Endpoint', render: (row) => row.apiEndpoint || '-' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="合作伙伴"
        description="管理员查看真实合作伙伴名称、API 状态和当前问卷数量。用户端只展示统一问卷墙。"
        action={
          <button className="btn-secondary" type="button" onClick={loadPartners} disabled={loading}>
            <RefreshCcw size={16} />
            刷新
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
        <StatCard label="合作伙伴" value={stats.totalPartners} />
        <StatCard label="启用渠道" value={stats.activePartners} />
        <StatCard label="问卷总量" value={stats.totalSurveys} />
      </div>

      <DataTable columns={columns} rows={partners} loading={loading} emptyMessage="还没有合作伙伴数据。" />
    </div>
  );
}

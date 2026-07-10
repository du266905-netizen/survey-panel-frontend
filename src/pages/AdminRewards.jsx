import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw, ToggleLeft, ToggleRight } from 'lucide-react';
import { getRewardOrders, getRewardProviders, updateRewardOrder, updateRewardProvider } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import { titleCase } from '../utils/formatters';

function statusValue(value) {
  return String(value || '').toLowerCase();
}

function usd(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function ProviderPill({ provider, onToggle, busy }) {
  const Icon = provider.enabled ? ToggleRight : ToggleLeft;
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${
        provider.enabled ? 'bg-cyan-50 text-cyan-700 ring-cyan-200' : 'bg-slate-100 text-slate-600 ring-slate-200'
      }`}
      type="button"
      onClick={() => onToggle(provider)}
      disabled={busy}
    >
      <Icon size={16} />
      {provider.enabled ? 'ON' : 'OFF'}
    </button>
  );
}

export default function AdminRewards() {
  const [orders, setOrders] = useState([]);
  const [providers, setProviders] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');

  const loadRewards = async () => {
    setLoading(true);
    setError('');
    try {
      const [ordersResponse, providersResponse] = await Promise.all([
        getRewardOrders(status ? { status } : {}),
        getRewardProviders(),
      ]);
      setOrders(ordersResponse.data.items || []);
      setProviders(providersResponse.data || []);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to load reward center.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRewards();
  }, [status]);

  const stats = useMemo(
    () => ({
      pending: orders.filter((order) => order.status === 'PENDING').length,
      processing: orders.filter((order) => order.status === 'PROCESSING').length,
      completed: orders.filter((order) => order.status === 'COMPLETED').length,
      coins: orders.reduce((sum, order) => sum + Number(order.amountCoins || 0), 0),
    }),
    [orders]
  );

  const handleOrderStatus = async (order, nextStatus) => {
    setBusyId(`${order.id}:${nextStatus}`);
    setError('');
    try {
      await updateRewardOrder(order.id, { status: nextStatus });
      await loadRewards();
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to update reward order.');
    } finally {
      setBusyId('');
    }
  };

  const handleProviderToggle = async (provider) => {
    setBusyId(`provider:${provider.name}`);
    setError('');
    try {
      await updateRewardProvider(provider.name, { enabled: !provider.enabled });
      await loadRewards();
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to update provider.');
    } finally {
      setBusyId('');
    }
  };

  const orderColumns = [
    { key: 'createdAt', header: 'Created', render: (row) => new Date(row.createdAt).toLocaleString() },
    { key: 'user', header: 'User', render: (row) => row.user?.email || row.userId },
    { key: 'provider', header: 'Provider', render: (row) => titleCase(row.provider) },
    { key: 'rewardType', header: 'Reward', render: (row) => titleCase(row.rewardType) },
    { key: 'amountCoins', header: 'Coins', render: (row) => <CoinAmount value={row.amountCoins} /> },
    { key: 'amountUSD', header: 'USD', render: (row) => usd(row.amountUSD) },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={statusValue(row.status)} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => {
        const isTerminal = ['COMPLETED', 'FAILED', 'CANCELED'].includes(row.status);
        if (isTerminal) return '-';
        return (
          <div className="flex flex-wrap gap-2">
            {row.status === 'PENDING' && (
              <button
                className="btn-secondary px-3 py-1.5 text-xs"
                type="button"
                disabled={busyId === `${row.id}:PROCESSING`}
                onClick={() => handleOrderStatus(row, 'PROCESSING')}
              >
                Process
              </button>
            )}
            <button
              className="btn-secondary px-3 py-1.5 text-xs"
              type="button"
              disabled={busyId === `${row.id}:COMPLETED`}
              onClick={() => handleOrderStatus(row, 'COMPLETED')}
            >
              Complete
            </button>
            <button
              className="btn-secondary px-3 py-1.5 text-xs"
              type="button"
              disabled={busyId === `${row.id}:FAILED`}
              onClick={() => handleOrderStatus(row, 'FAILED')}
            >
              Fail
            </button>
          </div>
        );
      },
    },
  ];

  const providerColumns = [
    { key: 'displayName', header: 'Provider', render: (row) => row.displayName || titleCase(row.name) },
    { key: 'name', header: 'Key' },
    { key: 'rewardTypes', header: 'Reward Types', render: (row) => (row.rewardTypes || []).map(titleCase).join(', ') || '-' },
    { key: 'apiKeyEnvVar', header: 'API Key Env', render: (row) => row.apiKeyEnvVar || '-' },
    { key: 'priority', header: 'Priority' },
    {
      key: 'enabled',
      header: 'Enabled',
      render: (row) => <ProviderPill provider={row} onToggle={handleProviderToggle} busy={busyId === `provider:${row.name}`} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reward Center"
        description="Admin review queue for wallet redemptions and reward providers."
        action={
          <button className="btn-secondary" type="button" onClick={loadRewards} disabled={loading}>
            <RefreshCcw size={16} />
            Refresh
          </button>
        }
      />

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}

      <div className="grid gap-4 md:grid-cols-4">
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Pending</p>
          <p className="mt-2 text-2xl font-black text-amber-900">{stats.pending}</p>
        </section>
        <section className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Processing</p>
          <p className="mt-2 text-2xl font-black text-cyan-950">{stats.processing}</p>
        </section>
        <section className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-green-700">Completed</p>
          <p className="mt-2 text-2xl font-black text-green-900">{stats.completed}</p>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Order Coins</p>
          <div className="mt-2 text-lg font-black text-slate-950">
            <CoinAmount value={stats.coins} />
          </div>
        </section>
      </div>

      <section className="card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-slate-700">Status</span>
          <select className="field max-w-56" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-950">Reward Orders</h2>
        <DataTable columns={orderColumns} rows={orders} loading={loading} emptyMessage="No reward orders yet." />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-950">Reward Providers</h2>
        <DataTable columns={providerColumns} rows={providers} loading={loading} emptyMessage="No reward providers configured." />
      </section>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { getRecords } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import { useAsyncData } from '../hooks/useAsyncData';
import { useAuth } from '../components/AuthContext';
import { isAdminRole } from '../utils/roles';

const pageSize = 8;

export default function MyRecords() {
  const { data, loading } = useAsyncData(getRecords, []);
  const { user } = useAuth();
  const isAdmin = isAdminRole(user?.role);
  const records = data || [];
  const [status, setStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return records.filter((record) => {
      const recordDate = record.startTime.slice(0, 10);
      const matchesStatus = status === 'All' || record.status === status;
      const afterStart = !startDate || recordDate >= startDate;
      const beforeEnd = !endDate || recordDate <= endDate;
      return matchesStatus && afterStart && beforeEnd;
    });
  }, [records, status, startDate, endDate]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const summary = useMemo(() => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    return records.reduce(
      (accumulator, record) => {
        const coins = Number(record.coinsReward || 0);
        const isCompleted = record.status === 'completed';
        const recordMonth = record.startTime?.slice(0, 7);

        if (isCompleted) {
          accumulator.completed += 1;
          accumulator.totalCoins += coins;
          if (recordMonth === monthKey) {
            accumulator.monthCoins += coins;
          }
        }

        return accumulator;
      },
      { completed: 0, totalCoins: 0, monthCoins: 0 }
    );
  }, [records]);

  const columns = [
    ...(isAdmin ? [{ key: 'employee', header: 'Employee' }] : []),
    { key: 'surveyNumber', header: 'Survey ID' },
    ...(isAdmin ? [{ key: 'pid', header: 'PID' }] : []),
    { key: 'platform', header: 'Platform' },
    { key: 'ipAddress', header: 'IP Address' },
    { key: 'coinsReward', header: 'Coins Reward', render: (row) => <CoinAmount value={row.coinsReward} /> },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'startTime', header: 'Start Time' },
    { key: 'auditTime', header: 'Audit Time' },
  ];

  return (
    <>
      <PageHeader title="My Records" description="Personal participation history with audit status and rewards." />
      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <section className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Total Completed</p>
          <p className="mt-2 text-2xl font-bold text-cyan-900">{summary.completed}</p>
        </section>
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Total Coins Earned</p>
          <div className="mt-2 text-lg font-bold text-amber-900">
            <CoinAmount value={summary.totalCoins} />
          </div>
        </section>
        <section className="rounded-xl border border-sky-200 bg-sky-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700">This Month Coins</p>
          <div className="mt-2 text-lg font-bold text-sky-900">
            <CoinAmount value={summary.monthCoins} />
          </div>
        </section>
      </div>
      <section className="card mb-5 grid gap-4 p-4 md:grid-cols-4">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Start date</span>
          <input className="field" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">End date</span>
          <input className="field" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Status</span>
          <select className="field" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </label>
        <div className="flex items-end">
          <button
            className="btn-secondary w-full"
            type="button"
            onClick={() => {
              setStartDate('');
              setEndDate('');
              setStatus('All');
              setPage(1);
            }}
          >
            Reset Filters
          </button>
        </div>
      </section>
      <DataTable columns={columns} rows={rows} loading={loading} emptyMessage="No participation records found." />
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Page {page} of {pageCount}
        </p>
        <div className="flex gap-2">
          <button className="btn-secondary" type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
            Previous
          </button>
          <button className="btn-secondary" type="button" disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

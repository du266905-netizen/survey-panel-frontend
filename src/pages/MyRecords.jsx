import { useMemo, useState } from 'react';
import { getRecords } from '../api/mockApi';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatCoins } from '../utils/formatters';

const pageSize = 8;

export default function MyRecords() {
  const { data, loading } = useAsyncData(getRecords, []);
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

  const columns = [
    { key: 'surveyNumber', header: 'Survey Number' },
    { key: 'platform', header: 'Platform' },
    { key: 'ipAddress', header: 'IP Address' },
    { key: 'coinsReward', header: 'Coins Reward', render: (row) => formatCoins(row.coinsReward) },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'startTime', header: 'Start Time' },
    { key: 'auditTime', header: 'Audit Time' },
  ];

  return (
    <>
      <PageHeader title="My Records" description="Personal participation history with audit status and rewards." />
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

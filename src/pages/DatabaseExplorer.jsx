import { AlertTriangle, Database, RefreshCcw, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getDatabaseExplorer } from '../api/realApi';
import PageHeader from '../components/PageHeader';

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
};

const cellTitle = (value) => {
  const text = formatValue(value);
  return text.length > 80 ? text : undefined;
};

export default function DatabaseExplorer() {
  const [snapshot, setSnapshot] = useState(null);
  const [selectedTable, setSelectedTable] = useState('');
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSnapshot = async (table = selectedTable, rowLimit = limit) => {
    setLoading(true);
    setError('');
    try {
      const response = await getDatabaseExplorer({ table, limit: rowLimit });
      setSnapshot(response.data);
      setSelectedTable(response.data.selectedTable?.key || '');
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || caughtError.message || 'Unable to load database snapshot.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSnapshot('', limit);
  }, []);

  const tables = snapshot?.tables || [];
  const selected = snapshot?.selectedTable;
  const columns = useMemo(() => selected?.columns || [], [selected]);
  const rows = selected?.rows || [];

  const handleTableSelect = (tableKey) => {
    setSelectedTable(tableKey);
    loadSnapshot(tableKey, limit);
  };

  const handleLimitChange = (event) => {
    const nextLimit = Number(event.target.value);
    setLimit(nextLimit);
    loadSnapshot(selectedTable, nextLimit);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Database Explorer"
        description="Admin-only read-only view of production SQLite tables and recent rows."
        action={
          <button className="btn-secondary" type="button" onClick={() => loadSnapshot(selectedTable, limit)} disabled={loading}>
            <RefreshCcw size={16} />
            Refresh
          </button>
        }
      />

      <section className="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 text-cyan-700" size={18} />
          <div>
            <p className="text-sm font-bold text-cyan-900">Read-only database view</p>
            <p className="mt-1 text-sm text-cyan-800">
              Sensitive fields are redacted. This page does not run SQL and cannot edit or delete data.
            </p>
          </div>
        </div>
      </section>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[18rem_1fr]">
        <aside className="card overflow-hidden">
          <div className="border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <Database size={18} className="text-cyan-600" />
              <h2 className="font-bold text-slate-950">Tables</h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">{snapshot?.database?.provider || 'SQLite'} · {snapshot?.database?.mode || 'read-only'}</p>
          </div>
          <div className="max-h-[64vh] overflow-y-auto p-2">
            {loading && !tables.length ? (
              <div className="space-y-2 p-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-10 animate-pulse rounded-lg bg-slate-100" />
                ))}
              </div>
            ) : (
              tables.map((table) => (
                <button
                  key={table.key}
                  className={`mb-1 flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                    selected?.key === table.key ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
                  }`}
                  type="button"
                  onClick={() => handleTableSelect(table.key)}
                >
                  <span className="truncate">{table.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${selected?.key === table.key ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {table.count}
                  </span>
                </button>
              ))
            )}
          </div>
        </aside>

        <section className="card min-w-0 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950">{selected?.label || 'Table'}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {selected?.count ?? 0} rows total · showing latest {selected?.limit || limit}
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              Rows
              <select className="field w-24 py-2" value={limit} onChange={handleLimitChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>

          <div className="overflow-x-auto">
            {loading && rows.length === 0 ? (
              <div className="space-y-3 p-5">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-10 animate-pulse rounded-lg bg-slate-100" />
                ))}
              </div>
            ) : !rows.length ? (
              <div className="flex min-h-52 items-center justify-center p-8 text-sm text-slate-500">No rows in this table yet.</div>
            ) : (
              <table className="min-w-full border-collapse">
                <thead className="table-head">
                  <tr>
                    {columns.map((column) => (
                      <th key={column} className="px-4 py-3">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {rows.map((row, rowIndex) => (
                    <tr key={row.id || rowIndex} className="hover:bg-cyan-50/50">
                      {columns.map((column) => {
                        const value = formatValue(row[column]);
                        return (
                          <td key={column} className="max-w-[18rem] whitespace-nowrap border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                            <span className="block truncate" title={cellTitle(row[column])}>
                              {value}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function DataTable({ columns, rows, loading, emptyMessage = 'No data available.' }) {
  if (loading) {
    return (
      <div className="app-data-table card overflow-hidden">
        <div className="space-y-3 p-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  if (!rows?.length) {
    return (
      <div className="app-data-table card flex min-h-44 items-center justify-center p-8 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="app-data-table card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="table-head">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={row.id || row.surveyId || row.surveyNumber || rowIndex} className="transition hover:bg-cyan-50/60">
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { Skeleton } from './ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export default function DataTable({ columns, rows, loading, emptyMessage = 'No data available.' }) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-[#E5E3DD] bg-white">
        <div className="space-y-2 p-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!rows?.length) {
    return (
      <div className="flex min-h-44 items-center justify-center rounded-xl border border-[#E5E3DD] bg-white p-8 text-center text-sm text-[#5F6862]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E3DD] bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row.id || row.surveyId || row.surveyNumber || rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

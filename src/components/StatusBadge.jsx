import { titleCase } from '../utils/formatters';

const styles = {
  completed: { badge: 'bg-green-50 text-green-700 ring-green-200', dot: 'bg-green-500' },
  pending: { badge: 'bg-amber-50 text-amber-700 ring-amber-200', dot: 'bg-amber-500' },
  failed: { badge: 'bg-red-50 text-red-700 ring-red-200', dot: 'bg-red-500' },
  screen_out: { badge: 'bg-slate-50 text-slate-700 ring-slate-200', dot: 'bg-slate-400' },
  quota_full: { badge: 'bg-blue-50 text-blue-700 ring-blue-200', dot: 'bg-blue-500' },
  security_term: { badge: 'bg-red-50 text-red-700 ring-red-200', dot: 'bg-red-500' },
};

export default function StatusBadge({ status }) {
  const style = styles[status] || styles.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${style.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {titleCase(status)}
    </span>
  );
}

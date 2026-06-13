import { titleCase } from '../utils/formatters';

const styles = {
  completed: 'bg-green-50 text-green-700 ring-green-200',
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  failed: 'bg-red-50 text-red-700 ring-red-200',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status] || styles.pending}`}>
      {titleCase(status)}
    </span>
  );
}

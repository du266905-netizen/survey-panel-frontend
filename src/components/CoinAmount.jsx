import { formatCoinNumber } from '../utils/formatters';

export default function CoinAmount({ value, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${className}`}>
      <span className="coin-icon">◎</span>
      <span>{formatCoinNumber(value)} Coins</span>
    </span>
  );
}

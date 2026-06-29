export const formatCoinNumber = (value) => Number(value || 0).toLocaleString();

export const formatCoins = (value) => `◎ ${formatCoinNumber(value)} Coins`;

export const dollarsToCoins = (value) => Math.round(Number(value || 0) * 1000);

export const titleCase = (value) =>
  String(value || '')
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

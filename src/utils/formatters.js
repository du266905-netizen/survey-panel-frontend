export const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;

export const formatCoins = (value) => `◎ ${Number(value || 0).toLocaleString()}`;

export const titleCase = (value) =>
  String(value || '')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

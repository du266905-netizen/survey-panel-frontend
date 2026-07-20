import { titleCase } from './formatters';

const currencyLocales = {
  AU: 'en-AU',
  CA: 'en-CA',
  CN: 'zh-CN',
  GB: 'en-GB',
  IN: 'en-IN',
  JP: 'ja-JP',
  KR: 'ko-KR',
  MX: 'es-MX',
  NZ: 'en-NZ',
  SG: 'en-SG',
  US: 'en-US',
};

export function formatUsdEstimate(value, country) {
  const locale = currencyLocales[country] || 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

export function walletTransactionLabel(transaction) {
  const source = [transaction?.type, transaction?.description, transaction?.sourceType]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (/(panel.?profile|native.?profile|first.?survey|onboarding)/.test(source)) return 'First survey completion';
  if (/(registration|welcome)/.test(source)) return 'Welcome bonus';
  if (/referral/.test(source)) return 'Referral reward';
  if (/redeem.*refund/.test(source)) return 'Reward refund';
  if (/redeem/.test(source)) return 'Reward redemption';
  if (/survey|postback|offer/.test(source)) return 'Survey reward';

  return transaction?.description || titleCase(transaction?.type) || 'Wallet activity';
}

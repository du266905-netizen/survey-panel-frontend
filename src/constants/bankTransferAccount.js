/**
 * The bank we ask customers to pay into.
 *
 * One object on purpose: when the account moves, or a second currency is opened,
 * this is the only place that changes. It is deliberately not in the component —
 * the next step is to serve it from `/api/business/account/bank-transfer` so a
 * change does not need a redeploy, and so the same values are not copied into
 * three screens.
 *
 * `copy` is the value the clipboard receives: the IBAN is printed in groups of
 * four because that is how people read it, but a bank form wants it unbroken.
 */
export const BANK_TRANSFER_ACCOUNT = {
  currency: 'USD',
  accountName: 'GUAN YI XIN XI KE JI ( GUANG AN ) YOU XIAN ZE REN GONG SI',
  iban: 'DK2589000049489286',
  ibanDisplay: 'DK25 8900 0049 4892 86',
  swift: 'SXPYDKKK',
  bankName: 'Banking Circle S.A., Amerika Plads 38, 2100 Copenhagen, Denmark',
  correspondentName: 'Citibank N.A.',
  correspondentSwift: 'CITIGB2L',
};

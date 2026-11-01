/**
 * Copy for the PayPal-hosted card fields. Lives here because two screens render
 * the same component: the add-funds sheet and the add-funds page. PayPal
 * requires a privacy notice next to the fields, so these strings are not
 * optional decoration.
 */
export const PAYPAL_COPY = {
  loading: 'Loading card fields…',
  /* 这一行叫「Credit or debit card」，所以失败与引导文案先说卡，再说处理方。
     只有隐私那一句必须点名 PayPal —— 卡确实是在他们的托管字段里输的。 */
  unavailable: 'Card payment is temporarily unavailable. Please try again later, or reach us from the help chat.',
  sessionExpired: 'Your session has expired. Sign in again to pay by card.',
  notConfigured: 'Card payment is not set up for this account yet.',
  cardUnavailable: 'Card entry is not enabled for this account yet.',
  privacy: 'Card details are entered in PayPal’s secure fields, never on this site. See',
  privacyLink: 'PayPal’s privacy statement',
  startFailed: 'We could not start the card payment. Please try again.',
  captureFailed: 'We could not complete the payment. Nothing was added to your balance.',
  cancelled: 'Payment cancelled.',
  payWithCard: 'Pay with card',
  paying: 'Processing…',
  cardFailed: 'We could not complete the card payment. Check the details and try again. Nothing was charged to your balance.',
};

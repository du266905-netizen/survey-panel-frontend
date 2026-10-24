/* PayPal return plumbing.
 *
 * PayPal sends the buyer back to the URL we asked for, appending `token=<paypal
 * order id>`. The browser keeps nothing: it forwards that token to the server,
 * which finds the persisted order by (signed-in user, providerOrderId), captures
 * it and credits the ledger. No local mapping, no credentials, no amounts are
 * stored in the browser. */
/** Read the provider token PayPal appended to the return URL. */
export function readPaypalReturnToken(search = typeof window === 'undefined' ? '' : window.location.search) {
  try {
    const params = new URLSearchParams(search || '');
    return String(params.get('token') || '').trim();
  } catch {
    return '';
  }
}

/** Drop PayPal's query parameters so a refresh does not re-trigger the capture. */
export function clearPaypalReturnFromUrl() {
  if (typeof window === 'undefined' || !window.history?.replaceState) return;
  try {
    const url = new URL(window.location.href);
    ['token', 'PayerID'].forEach((key) => url.searchParams.delete(key));
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  } catch {
    /* leave the URL alone if it cannot be parsed */
  }
}

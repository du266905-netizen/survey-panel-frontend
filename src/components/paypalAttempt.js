/* PayPal start-attempt bookkeeping.
 *
 * Two problems this solves, both observed in review of the first version:
 *   1. `setSubmitting()` is React state: it is not visible to a second click in
 *      the same tick, so a fast double-click could start two orders. The lock
 *      here is a plain synchronous flag — the second click sees it immediately.
 *   2. The idempotency key must be stable for one payment attempt: if the create
 *      request times out and the buyer retries, the same key must be reused so
 *      the server (and PayPal) return the original order instead of a second
 *      one. A new amount, or closing the dialog, starts a fresh attempt.
 *
 * Kept free of React so it can be exercised directly (ops/verify-paypal-attempt.mjs).
 */
export function createPaypalAttemptTracker({ keyFactory } = {}) {
  const makeKey = keyFactory || (() => `paypal:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`);
  let locked = false;
  let key = null;
  let keyAmount = null;

  return {
    /** Synchronous: false means a start is already in flight. */
    begin() {
      if (locked) return false;
      locked = true;
      return true;
    },
    end() {
      locked = false;
    },
    isLocked() {
      return locked;
    },
    /** Stable key for the same amount; the first call for an amount creates it. */
    keyFor(amount) {
      const value = String(amount);
      if (key && keyAmount === value) return key;
      key = makeKey();
      keyAmount = value;
      return key;
    },
    /** A new amount invalidates the key but keeps the lock semantics. */
    resetKey() {
      key = null;
      keyAmount = null;
    },
    /** Closing the dialog ends the attempt entirely. */
    reset() {
      locked = false;
      this.resetKey();
    },
  };
}

import assert from 'node:assert/strict';
import { createPaypalAttemptTracker } from '../src/components/paypalAttempt.js';

/* Verifies the two guarantees the modal needs (Codex review round 2, item B):
 * a fast double-click starts exactly one payment, and a retry after a failed or
 * timed-out create reuses the same idempotency key. Pure logic, no browser. */

let seq = 0;
const tracker = createPaypalAttemptTracker({ keyFactory: () => `key-${++seq}` });

// 1) double click: the second synchronous begin() must be refused
assert.equal(tracker.begin(), true, 'first click acquires the lock');
assert.equal(tracker.begin(), false, 'second click in the same tick must be refused');
assert.equal(seq, 0, 'no key is minted until the request is actually prepared');

// 2) one attempt → one key, stable across a retry
const first = tracker.keyFor('120.00');
tracker.end();                       // request failed / timed out
assert.equal(tracker.begin(), true, 'retry acquires the lock again');
const retried = tracker.keyFor('120.00');
assert.equal(retried, first, 'the retry must reuse the same idempotency key');
tracker.end();

// 3) a different amount is a different payment
assert.notEqual(tracker.keyFor('150.00'), first, 'a new amount must mint a new key');

// 4) closing the dialog ends the attempt
tracker.reset();
assert.equal(tracker.isLocked(), false, 'reset releases the lock');
assert.notEqual(tracker.keyFor('120.00'), first, 'a new attempt starts from a fresh key');

console.log('  ✅ B 验签:双击只启动一次、重试复用同一 key、改金额/重开换 key（4/4）');

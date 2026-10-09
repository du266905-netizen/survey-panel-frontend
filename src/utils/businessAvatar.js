/**
 * The business avatar — reading, compressing and storing a profile picture.
 *
 * FRONTEND ONLY, FOR NOW. There is no backend field for this and no upload
 * capability anywhere in the API (checked: no multer, no express.static, no
 * /uploads route, and `PUT /api/auth/profile` accepts only `displayName`). So
 * the picture is kept in localStorage and nowhere else. That means:
 *
 *   - it does not follow the account across browsers or devices;
 *   - it is not visible to anyone else;
 *   - clearing site data removes it.
 *
 * When the backend grows a field, the only part of this file that has to change
 * is `persist()` — read and write the same data URL against the API instead.
 * Everything above it (validation, the square crop, the size cap, the hook the
 * rail and the account page both subscribe to) stays as it is.
 *
 * The image never leaves the browser: it is cropped square, scaled to 256px and
 * re-encoded before it is stored, so what lands in localStorage is 10–25KB
 * rather than the several megabytes a phone camera produces. That cap is the
 * whole reason this can be stored as a data URL at all.
 */

import { useSyncExternalStore } from 'react';

const KEY = 'guanyisearch.business-avatar.v1';
/** 256 is enough for every place this is drawn: 30px in the rail, 46px on the
 *  account page, and both at 2x on a retina screen. */
export const AVATAR_PX = 256;

/** Anything a phone produces is fine on the way in — it is resized anyway.
 *  This only stops someone picking a 60MB RAW file by mistake. */
const MAX_INPUT_BYTES = 12 * 1024 * 1024;

const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp'];
export const AVATAR_ACCEPT = ACCEPTED.join(',');

/* ── store ─────────────────────────────────────────────────────────────── */

let current = read();
const listeners = new Set();

function read() {
  try {
    return window.localStorage.getItem(KEY) || '';
  } catch {
    // Private mode or a restricted context: the feature still works for the
    // session, it just does not survive a reload.
    return '';
  }
}

function persist(dataUrl) {
  current = dataUrl || '';
  try {
    if (current) window.localStorage.setItem(KEY, current);
    else window.localStorage.removeItem(KEY);
  } catch {
    /* see read() */
  }
  listeners.forEach((listener) => listener());
}

export function getBusinessAvatar() {
  return current;
}

export function subscribeBusinessAvatar(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function clearBusinessAvatar() {
  persist('');
}

/* ── compression ───────────────────────────────────────────────────────── */

export class AvatarError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

/**
 * Crop to a centred square, scale to AVATAR_PX and re-encode. Returns a data
 * URL. Prefers WebP; falls back to JPEG where the canvas cannot encode it.
 */
export async function compressAvatar(file) {
  if (!file) throw new AvatarError('empty');
  if (!ACCEPTED.includes(file.type)) throw new AvatarError('type');
  if (file.size > MAX_INPUT_BYTES) throw new AvatarError('too-big');

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new AvatarError('unreadable');
  }

  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;

  const canvas = document.createElement('canvas');
  canvas.width = AVATAR_PX;
  canvas.height = AVATAR_PX;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  // A transparent PNG would otherwise show the page through it; avatars are
  // drawn as opaque tiles in the rail, so flatten onto white first.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, AVATAR_PX, AVATAR_PX);
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, AVATAR_PX, AVATAR_PX);
  bitmap.close?.();

  let out = canvas.toDataURL('image/webp', 0.86);
  if (!out.startsWith('data:image/webp')) out = canvas.toDataURL('image/jpeg', 0.86);
  if (!out || out === 'data:,') throw new AvatarError('unreadable');
  return out;
}

/** Validate, compress and store in one call. Throws AvatarError on bad input. */
export async function saveBusinessAvatar(file) {
  const dataUrl = await compressAvatar(file);
  persist(dataUrl);
  return dataUrl;
}

/* ── the hook both surfaces subscribe to ───────────────────────────────── */

/**
 * Read the avatar and re-render when it changes, so the rail and the account
 * page stay in step without either owning the other. `useSyncExternalStore`
 * rather than context because this is a single external string, and threading
 * a provider through two unrelated subtrees would be the larger change.
 */
export function useBusinessAvatar() {
  return useSyncExternalStore(subscribeBusinessAvatar, getBusinessAvatar, () => '');
}

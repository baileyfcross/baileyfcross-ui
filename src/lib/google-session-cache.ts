import type { GoogleAccess } from './google-drive';

/** Short-lived, browser-tab-only OAuth token cache.
 * Session storage may survive navigation/reloads, but not an independent new
 * browser session. Never use localStorage or persist refresh tokens.
 * Cached data is NOT proof of login: the caller MUST reverify with Google
 * userinfo and load Drive progress before unlocking any private page.
 */
const KEY = 'deutschlab-google-tab-session-v1';
const MAX_TOKEN_AGE_MS = 3_900_000;
const EXPIRATION_BUFFER_MS = 15_000;

type SessionStorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export type CachedGoogleSession = { accountId: string; access: GoogleAccess };

function currentStorage(): SessionStorageLike | null {
  try {
    return typeof sessionStorage !== 'undefined' ? sessionStorage : null;
  } catch {
    return null;
  }
}

function isUsableSession(value: unknown, now: number): value is CachedGoogleSession {
  if (!value || typeof value !== 'object') return false;
  const session = value as { accountId?: unknown; access?: { token?: unknown; expiresAt?: unknown } };
  const access = session.access;
  return typeof session.accountId === 'string' && session.accountId.trim().length > 0
    && typeof access?.token === 'string' && access.token.trim().length > 0
    && typeof access.expiresAt === 'number' && Number.isFinite(access.expiresAt)
    && access.expiresAt > now + EXPIRATION_BUFFER_MS
    && access.expiresAt <= now + MAX_TOKEN_AGE_MS;
}

export function readGoogleSession(
  now = Date.now(),
  store: SessionStorageLike | null = currentStorage(),
): CachedGoogleSession | null {
  if (!store) return null;
  try {
    const json = store.getItem(KEY);
    if (!json) return null;
    const parsed: unknown = JSON.parse(json);
    if (!isUsableSession(parsed, now)) {
      store.removeItem(KEY);
      return null;
    }
    return parsed;
  } catch {
    try { store.removeItem(KEY); } catch { /* browser storage blocked */ }
    return null;
  }
}

export function writeGoogleSession(
  accountId: string,
  access: GoogleAccess,
  store: SessionStorageLike | null = currentStorage(),
): void {
  if (!store) return;
  if (!isUsableSession({ accountId, access }, Date.now())) return;
  try { store.setItem(KEY, JSON.stringify({ accountId, access })); }
  catch { /* This browser may forbid session storage. Normal OAuth still works. */ }
}

export function clearGoogleSession(store: SessionStorageLike | null = currentStorage()): void {
  try { store?.removeItem(KEY); } catch { /* Storage may be disabled. */ }
}

import { describe, expect, it } from 'vitest';
import { clearGoogleSession, readGoogleSession, writeGoogleSession } from './google-session-cache';

function memoryStore() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
    count: () => values.size,
    setCorrupt: () => { for (const key of values.keys()) values.set(key, '{bad json'); },
  };
}

describe('temporary Google authorization across page reloads', () => {
  it('remembers a currently valid session for the same browser tab', () => {
    const store = memoryStore();
    const before = Date.now();
    const access = { token: 'temporary-google-access', expiresAt: before + 20 * 60_000 };
    writeGoogleSession('google-account-one', access, store);
    expect(readGoogleSession(before + 10 * 60_000, store)).toEqual({ accountId: 'google-account-one', access });
  });

  it('rejects expired or nearly expired tokens and erases the cached record', () => {
    const store = memoryStore();
    const now = Date.now();
    writeGoogleSession('google-account-one', { token: 'temporary-google-access', expiresAt: now + 30_000 }, store);
    expect(readGoogleSession(now + 20_000, store)).toBeNull();
    expect(store.count()).toBe(0);
  });

  it('rejects malformed browser cache data', () => {
    const store = memoryStore();
    writeGoogleSession('google-account-one', { token: 'temporary-google-access', expiresAt: Date.now() + 60_000 }, store);
    store.setCorrupt();
    expect(readGoogleSession(Date.now(), store)).toBeNull();
    expect(store.count()).toBe(0);
  });

  it('never keeps fabricated years-long token expiry', () => {
    const store = memoryStore();
    writeGoogleSession('google-account-one', { token: 'not-a-valid-token', expiresAt: Date.now() + 30 * 24 * 3600_000 }, store);
    expect(readGoogleSession(Date.now(), store)).toBeNull();
  });

  it('erases authorization on explicit sign out', () => {
    const store = memoryStore();
    writeGoogleSession('google-account-one', { token: 'temporary-google-access', expiresAt: Date.now() + 60_000 }, store);
    clearGoogleSession(store);
    expect(readGoogleSession(Date.now(), store)).toBeNull();
    expect(store.count()).toBe(0);
  });
});

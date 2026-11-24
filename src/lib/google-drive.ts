/** Google Identity Services token model + Drive App Data.
 * No client secret, refresh token, backend database, or auth tokens in persistent storage.
 */
import { isAppState } from '../domain/progress';
import type { AppState } from '../domain/types';

export const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
export const GOOGLE_SCOPES = `openid email profile ${GOOGLE_DRIVE_SCOPE}`;
export const PROGRESS_FILENAME = 'deutschlab-progress-v1.json';
const DRIVE_API = 'https://www.googleapis.com/drive/v3/files';
const UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3/files';
const MAX_PROGRESS_BYTES = 5_000_000;

export type GoogleProfile = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};
export type GoogleAccess = { token: string; expiresAt: number };
export type DriveRecord = { fileId: string | null; version: string | null; state: AppState | null };

interface GoogleTokenResponse {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  error?: string;
  error_description?: string;
}
interface GoogleTokenClient {
  requestAccessToken: (options?: { prompt?: string; login_hint?: string }) => void;
}
interface GoogleOauth {
  initTokenClient: (config: {
    client_id: string; scope: string; callback: (response: GoogleTokenResponse) => void;
    error_callback?: (error: { type?: string }) => void;
    include_granted_scopes?: boolean;
  }) => GoogleTokenClient;
  revoke?: (token: string, callback?: () => void) => void;
}
declare global {
  interface Window { google?: { accounts?: { oauth2?: GoogleOauth } } }
}

export function googleConfigured(): boolean {
  return !!import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();
}

/** Begin loading before the learner clicks so the popup runs within their click gesture. */
export function preloadGoogleIdentity(): void {
  if (typeof document === 'undefined' || document.querySelector('script[data-deutschlab-gis]')) return;
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.dataset.deutschlabGis = 'true';
  document.head.append(script);
}

export function requestGoogleAccess(options: { prompt?: '' | 'select_account'; loginHint?: string } = {}): Promise<GoogleAccess> {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();
  if (!clientId) throw new Error('Google OAuth client ID is not configured.');
  const oauth = window.google?.accounts?.oauth2;
  if (!oauth) { preloadGoogleIdentity(); throw new Error('Google sign-in is still loading. Please click Continue with Google again.'); }
  // The popup is requested synchronously within the user's click handler.
  return new Promise((resolve, reject) => {
    const client = oauth.initTokenClient({
      client_id: clientId,
      scope: GOOGLE_SCOPES,
      include_granted_scopes: false,
      callback: response => {
        if (response.error || !response.access_token) {
          reject(new Error(response.error_description || response.error || 'Google did not return an access token.'));
          return;
        }
        const scopes = new Set((response.scope || '').split(/\s+/u));
        if (!scopes.has(GOOGLE_DRIVE_SCOPE) || !scopes.has('openid')) {
          reject(new Error('Google Drive app-data permission and account identity are required.'));
          return;
        }
        resolve({ token: response.access_token, expiresAt: Date.now() + Math.max(0, (response.expires_in ?? 3600) - 90) * 1000 });
      },
      error_callback: error => reject(new Error(error.type === 'popup_closed' ? 'Google sign-in was canceled.' : `Unable to open Google sign-in: ${error.type || 'popup error'}`)),
    });
    client.requestAccessToken({
      prompt: options.prompt ?? 'select_account',
      ...(options.loginHint ? { login_hint: options.loginHint } : {}),
    });
  });
}

export function isGoogleProfile(value: unknown): value is GoogleProfile {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<GoogleProfile>;
  return typeof v.id === 'string' && !!v.id && typeof v.email === 'string' && !!v.email && typeof v.name === 'string';
}

async function apiFetch(url: string, access: GoogleAccess, init: RequestInit = {}): Promise<Response> {
  if (Date.now() >= access.expiresAt) throw new Error('GOOGLE_TOKEN_EXPIRED: Reconnect Google to continue syncing.');
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${access.token}`);
  const response = await fetch(url, { ...init, headers, cache: 'no-store' });
  if (response.status === 401) throw new Error('GOOGLE_TOKEN_EXPIRED: Reconnect Google to continue syncing.');
  if (!response.ok) {
    let detail = '';
    try { const body = await response.json() as { error?: { message?: string } }; detail = body.error?.message || ''; } catch { /* no body */ }
    throw new Error(`Google Drive request failed (${response.status})${detail ? `: ${detail}` : ''}`);
  }
  return response;
}

export async function fetchGoogleProfile(access: GoogleAccess): Promise<GoogleProfile> {
  const response = await apiFetch('https://openidconnect.googleapis.com/v1/userinfo', access);
  const value: unknown = await response.json();
  if (!value || typeof value !== 'object') throw new Error('Google returned an invalid profile.');
  const v = value as { sub?: unknown; email?: unknown; name?: unknown; picture?: unknown; email_verified?: unknown };
  if (typeof v.sub !== 'string' || !v.sub || typeof v.email !== 'string' || v.email_verified !== true) {
    throw new Error('A verified Google account is required.');
  }
  return { id: v.sub, email: v.email, name: typeof v.name === 'string' ? v.name : v.email, ...(typeof v.picture === 'string' ? { picture: v.picture } : {}) };
}

type DriveFile = { id: string; name: string; version?: string; trashed?: boolean };
async function locateProgressFile(access: GoogleAccess): Promise<DriveFile | null> {
  const params = new URLSearchParams({
    spaces: 'appDataFolder',
    q: `name = '${PROGRESS_FILENAME}' and trashed = false`,
    fields: 'nextPageToken,files(id,name,version,trashed)',
    pageSize: '100',
  });
  const response = await apiFetch(`${DRIVE_API}?${params}`, access);
  const result = await response.json() as { files?: DriveFile[]; nextPageToken?: string };
  const matches = (result.files || []).filter(file => file.name === PROGRESS_FILENAME);
  // Never choose an arbitrary record and silently overwrite a different copy.
  if (matches.length > 1 || result.nextPageToken) throw new Error('Multiple Drive progress records found. Export a backup and resolve the duplicates before continuing.');
  return matches[0] || null;
}

export async function readDriveProgress(access: GoogleAccess): Promise<DriveRecord> {
  const file = await locateProgressFile(access);
  if (!file) return { fileId: null, version: null, state: null };
  const response = await apiFetch(`${DRIVE_API}/${encodeURIComponent(file.id)}?alt=media`, access);
  const text = await response.text();
  if (new TextEncoder().encode(text).byteLength > MAX_PROGRESS_BYTES) throw new Error('Google Drive progress exceeds the 5 MB limit.');
  let raw: unknown;
  try { raw = JSON.parse(text); } catch { throw new Error('Cloud progress is not valid JSON. No data will be overwritten.'); }
  if (!isAppState(raw)) throw new Error('Cloud progress has an unexpected format. No data will be overwritten.');
  return { fileId: file.id, version: String(file.version || ''), state: raw };
}

export class DriveConflictError extends Error {
  constructor() { super('Google Drive progress changed on another device. Download a backup and reload before continuing; no cloud data was overwritten.'); this.name = 'DriveConflictError'; }
}

export async function writeDriveProgress(access: GoogleAccess, previous: DriveRecord, state: AppState): Promise<DriveRecord> {
  if (!isAppState(state)) throw new Error('Refusing to upload invalid learning progress.');
  const serialized = JSON.stringify(state);
  if (new TextEncoder().encode(serialized).byteLength > MAX_PROGRESS_BYTES) throw new Error('Learning progress is larger than 5 MB. Download a backup before continuing.');
  // Best-effort conflict detection. Drive v3 does not document an atomic media
  // conditional-write contract: two simultaneous devices can still race.
  const current = await locateProgressFile(access);
  if ((current?.id ?? null) !== previous.fileId || (current && String(current.version || '') !== (previous.version || ''))) {
    throw new DriveConflictError();
  }
  if (current) {
    const response = await apiFetch(`${UPLOAD_API}/${encodeURIComponent(current.id)}?uploadType=media&fields=id,name,version`, access, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: serialized,
    });
    const file = await response.json() as DriveFile;
    if (!file.id) throw new Error('Google Drive did not confirm the progress update.');
    return { fileId: file.id, version: String(file.version || ''), state };
  }
  const boundary = `deutschlab_${crypto.randomUUID().replaceAll('-', '')}`;
  const metadata = { name: PROGRESS_FILENAME, parents: ['appDataFolder'], mimeType: 'application/json' };
  const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${serialized}\r\n--${boundary}--`;
  const response = await apiFetch(`${UPLOAD_API}?uploadType=multipart&fields=id,name,version`, access, {
    method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${boundary}` }, body,
  });
  const file = await response.json() as DriveFile;
  if (!file.id) throw new Error('Google Drive did not confirm progress creation.');
  return { fileId: file.id, version: String(file.version || ''), state };
}

export function revokeGoogleAccess(access: GoogleAccess | null): void {
  if (!access) return;
  try { window.google?.accounts?.oauth2?.revoke?.(access.token, () => undefined); } catch { /* best effort */ }
}

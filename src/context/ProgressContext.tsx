import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { AppState, GrammarId } from '../domain/types';
import { completeLesson, completeAuthoredLesson, exportProgress, initialState, isAppState, recordWordAnswer, safeLoad, STORAGE_KEY, unlockGrammar } from '../domain/progress';
import { hasStudyHistory, mergeStudyProgress, validCloudProgress } from '../domain/google-progress';
import { DriveConflictError, fetchGoogleProfile, googleConfigured, preloadGoogleIdentity, readDriveProgress, requestGoogleAccess, revokeGoogleAccess, writeDriveProgress } from '../lib/google-drive';
import { sessionPermitsApp } from '../domain/google-session';
import type { DriveRecord, GoogleAccess, GoogleProfile } from '../lib/google-drive';
import { clearGoogleSession, readGoogleSession, writeGoogleSession } from '../lib/google-session-cache';

const cacheKey = (uid: string) => `deutschlab-drive-progress-v1:${uid}`;
function hasLegacyStudyHistory(): boolean {
  try { return !!localStorage.getItem(STORAGE_KEY) && hasStudyHistory(safeLoad()); } catch { return false; }
}
type CacheEnvelope = { state: AppState; pending: boolean };
function loadUserCache(uid: string): CacheEnvelope | null {
  try {
    const raw = localStorage.getItem(cacheKey(uid));
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object') return null;
    const envelope = data as { state?: unknown; pending?: unknown };
    const state = validCloudProgress(envelope.state);
    return state ? { state, pending: envelope.pending === true } : null;
  } catch { return null; }
}
function writeUserCache(uid: string, snapshot: AppState, pending: boolean): void {
  localStorage.setItem(cacheKey(uid), JSON.stringify({ state: snapshot, pending }));
}

type Context = {
  state: AppState; user: GoogleProfile | null; cloudEnabled: boolean; cloudReady: boolean; authenticated: boolean; authLoading: boolean;
  syncing: boolean; authMessage: string; hasLegacyProgress: boolean; needsReconnect: boolean;
  answerWord: (id: string, correct: boolean) => void; finishGrammar: (id: GrammarId, passed: boolean) => void;
  finishLesson: (id: string, score: number) => void; finishAuthoredLesson: (id: string, title: string, score: number) => void;
  setSetting: <K extends keyof AppState['settings']>(key: K, value: AppState['settings'][K]) => void;
  setNote: (id: string, note: string) => void; addJournal: (content: string) => void; removeJournal: (id: string) => void;
  exportData: () => void; importData: (file: File) => Promise<void>; importLegacyProgress: () => void; resetData: () => void;
  signInWithGoogle: () => Promise<void>; reconnectGoogle: () => Promise<void>; signOut: () => Promise<void>; signOutLocally: () => void;
};

const ProgressContext = createContext<Context | null>(null);
export function ProgressProvider({ children }: PropsWithChildren) {
  // Restore a previously authorized, unexpired browser-tab token only after
  // Google confirms the account and Drive returns this account's progress.
  const [state, setState] = useState<AppState>(initialState);
  const [user, setUser] = useState<GoogleProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(() => readGoogleSession() !== null);
  const [cloudReady, setCloudReady] = useState(false);
  // Tokens are never placed in localStorage or saved across browser sessions.
  // Only a verified live Google token unlocks private pages.
  const [sessionVerified, setSessionVerified] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [needsReconnect, setNeedsReconnect] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [hasLegacyProgress, setHasLegacyProgress] = useState(hasLegacyStudyHistory);
  const active = useRef<{ uid: string; access: GoogleAccess; record: DriveRecord } | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const loadSequence = useRef(0);
  const writeQueue = useRef<Promise<void>>(Promise.resolve());
  const lastSynced = useRef('');
  const blocked = useRef(false);
  const signingIn = useRef(false);
  const [syncAttempt, setSyncAttempt] = useState(0);

  useEffect(() => { preloadGoogleIdentity(); }, []);

  const authenticated = !!user && sessionVerified && cloudReady && active.current?.uid === user.id
    && sessionPermitsApp(user.id, cloudReady, active.current?.access.expiresAt);

  // Lock the entire React workspace at token expiry, including during an idle tab.
  // Recheck when the page is resumed because background tab timers can be delayed.
  useEffect(() => {
    if (!user || !cloudReady || !sessionVerified) return;
    const uid = user.id;
    const expiresAt = active.current?.access.expiresAt ?? 0;
    const verify = () => {
      const current = active.current;
      if (!current || current.uid !== uid || !sessionPermitsApp(uid, cloudReady, current.access.expiresAt)) {
        clearGoogleSession();
        setSessionVerified(false);
        setNeedsReconnect(true);
        setAuthMessage('Your Google session expired. Reconnect the same account to continue. Unsaved progress is retained on this device.');
      }
    };
    const timer = window.setTimeout(verify, Math.max(0, expiresAt - Date.now()));
    window.addEventListener('focus', verify);
    document.addEventListener('visibilitychange', verify);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('focus', verify);
      document.removeEventListener('visibilitychange', verify);
    };
  }, [user, cloudReady, sessionVerified]);

  const saveSnapshot = useCallback((uid: string, snapshot: AppState): Promise<void> => {
    const task = writeQueue.current.catch(() => undefined).then(async () => {
      const current = active.current;
      if (!current || current.uid !== uid || blocked.current) throw new Error('Cloud synchronization is not available for this account.');
      const record = await writeDriveProgress(current.access, current.record, snapshot);
      // A different Google account must never inherit this file pointer or progress.
      if (active.current !== current) return;
      current.record = record;
      lastSynced.current = JSON.stringify(snapshot);
      try { writeUserCache(uid, stateRef.current, JSON.stringify(snapshot) !== JSON.stringify(stateRef.current)); } catch { /* Cloud already saved. */ }
    });
    writeQueue.current = task.catch(() => undefined);
    return task;
  }, []);

  // Shared by interactive login and return-visit restoration. Storage by itself
  // is NEVER evidence of identity: each restoration calls Google userinfo and
  // accesses the authenticated account's Drive folder before unlocking routes.
  const establishSession = useCallback(async (access: GoogleAccess, version: number, expectedUid?: string) => {
    const profile = await fetchGoogleProfile(access);
    if (expectedUid && profile.id !== expectedUid) {
      throw new Error('The previously authorized Google account does not match this session.');
    }
    const remote = await readDriveProgress(access);
    if (version !== loadSequence.current) return;
    const cached = loadUserCache(profile.id);
    const cloud = remote.state;
    // Only unsynced local recovery copies are merged into the Drive record.
    const recovered = cached?.pending
      ? mergeStudyProgress(cloud ?? initialState(), cached.state)
      : cloud ?? cached?.state ?? initialState();
    active.current = { uid: profile.id, access, record: remote };
    lastSynced.current = cloud ? JSON.stringify(cloud) : '';
    blocked.current = false;
    writeQueue.current = Promise.resolve();
    writeGoogleSession(profile.id, access);
    setNeedsReconnect(false);
    setUser(profile);
    setState(recovered);
    setCloudReady(true);
    setSessionVerified(true);
    setAuthMessage('');
  }, []);

  // Reuse the same Google authorization when navigating away and returning in
  // this browser tab. If expired, removed, rejected, or for the wrong account,
  // require Google login instead of ever trusting a cached 'logged in' flag.
  useEffect(() => {
    const cached = readGoogleSession();
    if (!cached) { setAuthLoading(false); return; }
    const version = ++loadSequence.current;
    let cancelled = false;
    setAuthLoading(true);
    void establishSession(cached.access, version, cached.accountId).catch(error => {
      if (cancelled || version !== loadSequence.current) return;
      const message = error instanceof Error ? error.message : String(error);
      // A temporary network outage must not discard an otherwise valid token.
      // Invalid/expired or wrong-account tokens are never reused.
      if (message.includes('GOOGLE_TOKEN_EXPIRED') || message.includes('does not match')) {
        clearGoogleSession();
      }
      setUser(null);
      setCloudReady(false);
      setSessionVerified(false);
      setAuthMessage(`Your previous Google session could not be restored. Reload to retry, or continue with Google. ${message}`);
    }).finally(() => {
      if (!cancelled && version === loadSequence.current) setAuthLoading(false);
    });
    return () => {
      cancelled = true;
      // Strict Mode development remounts effects; invalidate the first attempt
      // so it cannot overwrite a newer session that was loaded by the second.
      if (version === loadSequence.current) ++loadSequence.current;
    };
  }, [establishSession]);

  const signInWithGoogle = useCallback(async () => {
    if (active.current) throw new Error('Sign out before choosing another Google account.');
    if (signingIn.current) return;
    signingIn.current = true;
    setAuthLoading(true);
    setAuthMessage('');
    // Google popup creation must stay synchronous with the user click.
    let access: GoogleAccess | null = null;
    const version = ++loadSequence.current;
    try {
      access = await requestGoogleAccess();
      await establishSession(access, version);
    } catch (error) {
      clearGoogleSession();
      revokeGoogleAccess(access);
      if (version === loadSequence.current) {
        setSessionVerified(false);
        setCloudReady(false);
        setUser(null);
        setAuthMessage(`Unable to load your private Google Drive progress: ${error instanceof Error ? error.message : String(error)}. No data was uploaded.`);
      }
      throw error;
    } finally {
      signingIn.current = false;
      if (version === loadSequence.current) setAuthLoading(false);
    }
  }, [establishSession]);

  const reconnectGoogle = useCallback(async () => {
    const existing = active.current;
    if (!existing) { await signInWithGoogle(); return; }
    // No account chooser on ordinary reconnect when Google still remembers
    // the learner. This still runs in a user click, as Google requires.
    const access = await requestGoogleAccess({ prompt: '', loginHint: user?.email });
    try {
      const profile = await fetchGoogleProfile(access);
      if (profile.id !== existing.uid) throw new Error('You chose a different Google account. Reconnect using the account that owns this progress, or download a backup and sign out.');
      if (active.current !== existing) throw new Error('The active account changed during reconnection.');
      existing.access = access;
      writeGoogleSession(existing.uid, access);
      // Do not reload or replace local work. The next save checks Drive's version.
      blocked.current = false;
      setNeedsReconnect(false);
      setAuthMessage('');
      setSessionVerified(true);
      setSyncAttempt(n => n + 1);
    } catch (error) {
      revokeGoogleAccess(access);
      throw error;
    }
  }, [signInWithGoogle, user?.email]);

  useEffect(() => {
    if (!user || !cloudReady) return;
    try { writeUserCache(user.id, state, JSON.stringify(state) !== lastSynced.current); }
    catch { setAuthMessage('Browser storage is unavailable. Download a backup if cloud saving fails.'); }
  }, [state, user, cloudReady]);

  useEffect(() => {
    if (!user || !cloudReady || blocked.current) return;
    const uid = user.id;
    const snapshot = JSON.stringify(state);
    if (snapshot === lastSynced.current) return;
    const timer = window.setTimeout(() => {
      if (active.current?.uid !== uid) return;
      setSyncing(true);
      void saveSnapshot(uid, state).then(() => {
        if (active.current?.uid === uid) setAuthMessage('');
      }).catch(error => {
        if (active.current?.uid !== uid) return;
        blocked.current = true;
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes('GOOGLE_TOKEN_EXPIRED')) {
          clearGoogleSession();
          setSessionVerified(false);
        }
        setNeedsReconnect(message.includes('GOOGLE_TOKEN_EXPIRED'));
        setAuthMessage(error instanceof DriveConflictError ? message : `Drive sync failed: ${message} Your changes remain on this device. Export a backup before leaving.`);
      }).finally(() => { if (active.current?.uid === uid) setSyncing(false); });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [state, user, cloudReady, syncAttempt, saveSnapshot]);

  const signOut = useCallback(async () => {
    const current = active.current;
    if (!current) return;
    // Do not erase unsaved state, including failed Drive writes, on sign-out.
    await writeQueue.current;
    if (blocked.current || lastSynced.current !== JSON.stringify(stateRef.current)) {
      try {
        blocked.current = false;
        await saveSnapshot(current.uid, stateRef.current);
      } catch (error) {
        blocked.current = true;
        throw new Error(`Progress is not yet saved to Google Drive. Download a backup or reconnect before signing out. ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    ++loadSequence.current;
    active.current = null;
    clearGoogleSession();
    revokeGoogleAccess(current.access);
    setUser(null);
    setCloudReady(false);
    setSessionVerified(false);
    setState(initialState());
    lastSynced.current = '';
    setAuthMessage('');
    setNeedsReconnect(false);
    setSyncing(false);
    blocked.current = false;
  }, [saveSnapshot]);

  const signOutLocally = useCallback(() => {
    const current = active.current;
    if (!current) return;
    // Keep account-specific unsynced data so it cannot appear under another account.
    // Refuse to clear memory unless a recovery copy can be stored.
    writeUserCache(current.uid, stateRef.current, JSON.stringify(stateRef.current) !== lastSynced.current);
    ++loadSequence.current;
    active.current = null;
    clearGoogleSession();
    revokeGoogleAccess(current.access);
    setUser(null);
    setCloudReady(false);
    setSessionVerified(false);
    setState(initialState());
    lastSynced.current = '';
    blocked.current = false;
    setSyncing(false);
    setNeedsReconnect(false);
    setAuthMessage('');
  }, []);

  const value = useMemo<Context>(() => ({
    state, user, cloudEnabled: googleConfigured(), cloudReady, authenticated, authLoading, syncing, authMessage, hasLegacyProgress, needsReconnect,
    answerWord: (id, correct) => setState(s => recordWordAnswer(s, id, correct)),
    finishGrammar: (id, passed) => setState(s => unlockGrammar(s, id, passed)),
    finishLesson: (id, score) => setState(s => completeLesson(s, id, score)),
    finishAuthoredLesson: (id, title, score) => setState(s => completeAuthoredLesson(s, id, title, score)),
    setSetting: (key, setting) => setState(s => ({ ...s, settings: { ...s.settings, [key]: setting }, updatedAt: new Date().toISOString() })),
    setNote: (id, note) => setState(s => ({ ...s, notes: { ...s.notes, [id]: note }, updatedAt: new Date().toISOString() })),
    addJournal: content => setState(s => ({ ...s, journal: [{ id: crypto.randomUUID(), date: new Date().toISOString(), content }, ...s.journal], updatedAt: new Date().toISOString() })),
    removeJournal: id => setState(s => ({ ...s, journal: s.journal.filter(entry => entry.id !== id), updatedAt: new Date().toISOString() })),
    exportData: () => exportProgress(state),
    importData: async file => {
      if (!user || !cloudReady) throw new Error('Sign in with Google before importing progress.');
      if (file.size > 5_000_000) throw new Error('Progress file is too large (5 MB maximum).');
      const parsed: unknown = JSON.parse(await file.text());
      if (!isAppState(parsed)) throw new Error('Invalid DeutschLab progress export.');
      setState(s => mergeStudyProgress(s, parsed));
    },
    importLegacyProgress: () => {
      if (!user || !cloudReady) throw new Error('Sign in with Google before importing progress.');
      const legacy = safeLoad();
      if (!hasStudyHistory(legacy)) return;
      setState(s => mergeStudyProgress(s, legacy));
      localStorage.removeItem(STORAGE_KEY);
      setHasLegacyProgress(false);
    },
    resetData: () => setState(initialState()),
    signInWithGoogle, reconnectGoogle, signOut, signOutLocally,
  }), [state, user, cloudReady, authenticated, authLoading, syncing, authMessage, hasLegacyProgress, needsReconnect, signInWithGoogle, reconnectGoogle, signOut, signOutLocally]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
export function useProgress(): Context {
  const c = useContext(ProgressContext);
  if (!c) throw new Error('ProgressProvider missing');
  return c;
}

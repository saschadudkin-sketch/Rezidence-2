import { isLiveMode } from '../../config/runtimeMode';
import { validatePassByRules } from '../../domain/passValidation';
import { getFirebaseApp } from './firebase';

const demoPasses = [];
const demoVisitLogs = [];

/**
 * API layer для пропусков.
 * Компоненты не должны дергать Firebase напрямую.
 */
export async function getPasses() {
  if (!isLiveMode()) return [...demoPasses];

  const app = getFirebaseApp();
  if (!app) return [...demoPasses];
  // live implementation placeholder:
  // read passes from Firestore
  return [...demoPasses];
}

export async function createPass(pass) {
  const payload = {
    ...pass,
    id: pass.id || `p_${Date.now()}`,
    createdAt: pass.createdAt || new Date().toISOString(),
  };

  if (!isLiveMode()) {
    demoPasses.unshift(payload);
    return payload;
  }

  const app = getFirebaseApp();
  if (!app) {
    demoPasses.unshift(payload);
    return payload;
  }
  // live implementation placeholder:
  // write pass to Firestore
  demoPasses.unshift(payload);
  return payload;
}

export async function validatePass(passPayload, context = {}) {
  return validatePassByRules(passPayload, context);
}

export async function logVisit({ userId, timestamp = new Date().toISOString(), result, ...rest }) {
  const entry = { id: `v_${Date.now()}`, userId, timestamp, result, ...rest };
  if (!isLiveMode()) {
    demoVisitLogs.unshift(entry);
    return entry;
  }

  const app = getFirebaseApp();
  if (!app) {
    demoVisitLogs.unshift(entry);
    return entry;
  }
  // live implementation placeholder:
  // write visit log to Firestore
  demoVisitLogs.unshift(entry);
  return entry;
}

export async function getVisitLogs() {
  if (!isLiveMode()) return [...demoVisitLogs];

  const app = getFirebaseApp();
  if (!app) return [...demoVisitLogs];
  // live implementation placeholder:
  // read visit logs from Firestore
  return [...demoVisitLogs];
}

// test helpers
export function __resetPassesApiDemoState() {
  demoPasses.length = 0;
  demoVisitLogs.length = 0;
}

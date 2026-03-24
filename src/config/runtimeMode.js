import { FEATURES } from './features';

export const LIVE_MODE = 'live';
export const DEMO_MODE = 'demo';
const ALLOWED_MODES = new Set([LIVE_MODE, DEMO_MODE]);

function normalizeMode(mode) {
  const normalized = typeof mode === 'string' ? mode.trim().toLowerCase() : '';
  return ALLOWED_MODES.has(normalized) ? normalized : '';
}

function resolveMode() {
  // Приоритет: REACT_APP_RUNTIME_MODE -> REACT_APP_MODE -> FEATURES.FIREBASE_LIVE.
  // Важно: если REACT_APP_RUNTIME_MODE задан, но невалиден, пробуем REACT_APP_MODE,
  // а не сразу fallback на FEATURES.
  const runtimeMode = normalizeMode(process.env.REACT_APP_RUNTIME_MODE);
  if (runtimeMode) return runtimeMode;

  const appMode = normalizeMode(process.env.REACT_APP_MODE);
  if (appMode) return appMode;

  return FEATURES.FIREBASE_LIVE ? LIVE_MODE : DEMO_MODE;
}

/**
 * Единая точка определения режима приложения.
 * 1) приоритет у REACT_APP_RUNTIME_MODE / REACT_APP_MODE
 * 2) fallback на FEATURES.FIREBASE_LIVE
 */
export const MODE = resolveMode();
export const isLiveMode = () => MODE === LIVE_MODE;
export const isDemoMode = () => MODE === DEMO_MODE;

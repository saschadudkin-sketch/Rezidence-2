import { FEATURES } from './features';

/**
 * Единая точка определения режима приложения.
 * Нужна, чтобы постепенно развести demo/live поведение из UI-компонентов.
 */
export const MODE = FEATURES.FIREBASE_LIVE ? 'live' : 'demo';
export const isLiveMode = () => MODE === 'live';
export const isDemoMode = () => MODE === 'demo';

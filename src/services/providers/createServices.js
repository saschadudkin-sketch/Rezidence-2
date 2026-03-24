import { MODE } from '../../config/runtimeMode';
import { createDemoProvider } from './demoProvider';
import { createFirebaseProvider } from './firebaseProvider';

const LIVE_MODE = 'live';
const DEMO_MODE = 'demo';

/**
 * Фабрика сервисов.
 * Возвращает mode-aware набор сервисов, выбирая реализацию провайдера
 * по единому правилу режима.
 */
export function createServices(mode = MODE) {
  const resolvedMode = mode === LIVE_MODE ? LIVE_MODE : DEMO_MODE;
  const provider = resolvedMode === LIVE_MODE ? createFirebaseProvider() : createDemoProvider();
  return { mode: resolvedMode, ...provider };
}

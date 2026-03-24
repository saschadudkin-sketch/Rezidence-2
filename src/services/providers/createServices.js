import { MODE } from '../../config/runtimeMode';
import { createDemoProvider } from './demoProvider';
import { createFirebaseProvider } from './firebaseProvider';

/**
 * Фабрика сервисов.
 * Сейчас demo/live используют единые gateways, но точка выбора уже централизована.
 */
export function createServices(mode = MODE) {
  const provider = mode === 'live' ? createFirebaseProvider() : createDemoProvider();
  return { mode, ...provider };
}

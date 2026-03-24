import { toast } from './Toasts';
import { SYNC_STATUS } from '../constants/syncStatuses';

/**
 * Показывает информационный toast, если операция была сохранена локально
 * и удалённая синхронизация отложена.
 */
export function notifyLocalFallback(mode, message) {
  if (mode !== SYNC_STATUS.LOCAL_FALLBACK) return false;
  toast(message || 'Изменения сохранены локально. Синхронизация будет повторена позже', 'info');
  return true;
}

/**
 * Показывает один итоговый toast по результату операции:
 * - success для обычного выполнения
 * - info для local_fallback
 */
export function toastBySyncResult(mode, successMessage, fallbackMessage) {
  if (notifyLocalFallback(mode, fallbackMessage)) return 'fallback';
  toast(successMessage, 'success');
  return 'success';
}

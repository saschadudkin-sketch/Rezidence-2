jest.mock('./Toasts', () => ({
  toast: jest.fn(),
}));

import { toast } from './Toasts';
import { notifyLocalFallback, toastBySyncResult } from './syncFeedback';
import { SYNC_STATUS } from '../constants/syncStatuses';

describe('syncFeedback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns false and does not toast for non-fallback mode', () => {
    const notified = notifyLocalFallback(SYNC_STATUS.REMOTE, 'x');
    expect(notified).toBe(false);
    expect(toast).not.toHaveBeenCalled();
  });

  test('shows provided message for local fallback mode', () => {
    const notified = notifyLocalFallback(SYNC_STATUS.LOCAL_FALLBACK, 'Локально сохранено');
    expect(notified).toBe(true);
    expect(toast).toHaveBeenCalledWith('Локально сохранено', 'info');
  });

  test('uses default message when no message is provided', () => {
    notifyLocalFallback(SYNC_STATUS.LOCAL_FALLBACK);
    expect(toast).toHaveBeenCalledWith('Изменения сохранены локально. Синхронизация будет повторена позже', 'info');
  });

  test('toastBySyncResult shows success message for synced result', () => {
    const status = toastBySyncResult(SYNC_STATUS.REMOTE, 'Сохранено', 'Локально');
    expect(status).toBe('success');
    expect(toast).toHaveBeenCalledWith('Сохранено', 'success');
  });

  test('toastBySyncResult shows fallback info message for local_fallback', () => {
    const status = toastBySyncResult(SYNC_STATUS.LOCAL_FALLBACK, 'Сохранено', 'Локально');
    expect(status).toBe('fallback');
    expect(toast).toHaveBeenCalledWith('Локально', 'info');
  });
});

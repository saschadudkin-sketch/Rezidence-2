import { isLiveMode } from '../config/runtimeMode';
import { sendMessage as fbSendMessage } from './firebaseService';

/**
 * Единая точка отправки сообщений чата с учётом режима (demo/live).
 * Возвращает 'remote' или 'local', чтобы UI мог решать, нужен ли optimistic update.
 */
export async function sendChatMessage({ remotePayload, localMessage, sendLocal }) {
  if (isLiveMode()) {
    try {
      await fbSendMessage(remotePayload);
      return 'remote';
    } catch (e) {
      console.warn(e);
      sendLocal(localMessage);
      return 'local';
    }
  }

  sendLocal(localMessage);
  return 'local';
}

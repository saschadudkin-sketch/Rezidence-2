import { MODE } from '../../config/runtimeMode';
import { sendChatMessage } from '../chatGateway';
import {
  resolveRequestPhotos,
  submitRequest,
  updateRequestEverywhere,
  deleteRequestEverywhere,
} from '../requestsGateway';
import {
  savePermsEverywhere,
  saveUserEverywhere,
  removeUserEverywhere,
} from '../adminGateway';
import { startLiveDataSync } from '../liveDataGateway';

/**
 * Фабрика сервисов.
 * Сейчас demo/live используют единые gateways, но точка выбора уже централизована.
 */
export function createServices(mode = MODE) {
  return {
    mode,
    chat: {
      sendMessage: sendChatMessage,
    },
    requests: {
      resolvePhotos: resolveRequestPhotos,
      submit: submitRequest,
      updateEverywhere: updateRequestEverywhere,
      deleteEverywhere: deleteRequestEverywhere,
    },
    admin: {
      savePermsEverywhere,
      saveUserEverywhere,
      removeUserEverywhere,
    },
    liveData: {
      startSync: startLiveDataSync,
    },
  };
}

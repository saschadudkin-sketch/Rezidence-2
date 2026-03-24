import { isLiveMode } from '../config/runtimeMode';
import {
  createRequest,
  uploadRequestPhoto,
  updateRequest as updateRemoteRequest,
  deleteRequest as deleteRemoteRequest,
} from './firebaseService';

/**
 * Единая точка mode-aware поведения для создания заявок.
 * Возвращает нормализованные данные так, чтобы UI не держал demo/live условия.
 */
export async function resolveRequestPhotos(reqId, photos) {
  if (!photos || photos.length === 0) return [];

  if (isLiveMode()) {
    const uploaded = [];
    for (let i = 0; i < photos.length; i++) {
      try {
        uploaded.push(await uploadRequestPhoto(reqId + '_' + i, photos[i]));
      } catch (e) {
        console.warn(e);
        uploaded.push(photos[i]);
      }
    }
    return uploaded;
  }

  return photos;
}

export function submitRequest({ request, addLocal }) {
  if (isLiveMode()) {
    createRequest({ ...request, id: undefined }).catch(console.warn);
    return 'remote';
  }

  addLocal(request);
  return 'local';
}

export function updateRequestEverywhere({ requestId, patch, updateLocal }) {
  updateLocal(requestId, patch);
  if (isLiveMode()) updateRemoteRequest(requestId, patch).catch(console.warn);
}

export function deleteRequestEverywhere({ requestId, deleteLocal }) {
  deleteLocal(requestId);
  if (isLiveMode()) deleteRemoteRequest(requestId).catch(console.warn);
}

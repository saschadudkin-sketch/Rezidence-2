import { isLiveMode } from '../config/runtimeMode';
import {
  savePerms as saveRemotePerms,
  saveUser as saveRemoteUser,
  removeUser as removeRemoteUser,
} from './firebaseService';

export function savePermsEverywhere({ uid, perms, saveLocal }) {
  saveLocal(uid, perms);
  if (isLiveMode()) saveRemotePerms(uid, perms).catch(console.warn);
}

export function saveUserEverywhere({ uid, patch, updateLocal, oldPhone }) {
  updateLocal(uid, patch, oldPhone);
  if (isLiveMode()) saveRemoteUser(uid, patch).catch(console.warn);
}

export function removeUserEverywhere({ uid, removeLocal }) {
  removeLocal(uid);
  if (isLiveMode()) removeRemoteUser(uid).catch(console.warn);
}

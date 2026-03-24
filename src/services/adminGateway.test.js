jest.mock('../config/runtimeMode', () => ({
  isLiveMode: jest.fn(),
}));

jest.mock('./firebaseService', () => ({
  savePerms: jest.fn(),
  saveUser: jest.fn(),
  removeUser: jest.fn(),
}));

import { isLiveMode } from '../config/runtimeMode';
import { savePerms, saveUser, removeUser } from './firebaseService';
import { savePermsEverywhere, saveUserEverywhere, removeUserEverywhere } from './adminGateway';

describe('adminGateway', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('savePermsEverywhere: demo local only', async () => {
    isLiveMode.mockReturnValue(false);
    const saveLocal = jest.fn();

    const mode = await savePermsEverywhere({ uid: 'u1', perms: { visitors: [] }, saveLocal });

    expect(mode).toBe('local');
    expect(saveLocal).toHaveBeenCalledWith('u1', { visitors: [] });
    expect(savePerms).not.toHaveBeenCalled();
  });

  test('savePermsEverywhere: live local + remote', async () => {
    isLiveMode.mockReturnValue(true);
    savePerms.mockResolvedValue(undefined);
    const saveLocal = jest.fn();

    const mode = await savePermsEverywhere({ uid: 'u1', perms: { visitors: [] }, saveLocal });

    expect(mode).toBe('remote');
    expect(saveLocal).toHaveBeenCalledWith('u1', { visitors: [] });
    expect(savePerms).toHaveBeenCalledWith('u1', { visitors: [] });
  });

  test('saveUserEverywhere: demo local only', async () => {
    isLiveMode.mockReturnValue(false);
    const updateLocal = jest.fn();

    const mode = await saveUserEverywhere({ uid: 'u2', patch: { name: 'A' }, updateLocal, oldPhone: '+7' });

    expect(mode).toBe('local');
    expect(updateLocal).toHaveBeenCalledWith('u2', { name: 'A' }, '+7');
    expect(saveUser).not.toHaveBeenCalled();
  });

  test('removeUserEverywhere: live local + remote', async () => {
    isLiveMode.mockReturnValue(true);
    removeUser.mockResolvedValue(undefined);
    const removeLocal = jest.fn();

    const mode = await removeUserEverywhere({ uid: 'u3', removeLocal });

    expect(mode).toBe('remote');
    expect(removeLocal).toHaveBeenCalledWith('u3');
    expect(removeUser).toHaveBeenCalledWith('u3');
  });
});

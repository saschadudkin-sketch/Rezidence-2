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

  test('savePermsEverywhere: demo local only', () => {
    isLiveMode.mockReturnValue(false);
    const saveLocal = jest.fn();

    savePermsEverywhere({ uid: 'u1', perms: { visitors: [] }, saveLocal });

    expect(saveLocal).toHaveBeenCalledWith('u1', { visitors: [] });
    expect(savePerms).not.toHaveBeenCalled();
  });

  test('savePermsEverywhere: live local + remote', () => {
    isLiveMode.mockReturnValue(true);
    savePerms.mockResolvedValue(undefined);
    const saveLocal = jest.fn();

    savePermsEverywhere({ uid: 'u1', perms: { visitors: [] }, saveLocal });

    expect(saveLocal).toHaveBeenCalledWith('u1', { visitors: [] });
    expect(savePerms).toHaveBeenCalledWith('u1', { visitors: [] });
  });

  test('saveUserEverywhere: demo local only', () => {
    isLiveMode.mockReturnValue(false);
    const updateLocal = jest.fn();

    saveUserEverywhere({ uid: 'u2', patch: { name: 'A' }, updateLocal, oldPhone: '+7' });

    expect(updateLocal).toHaveBeenCalledWith('u2', { name: 'A' }, '+7');
    expect(saveUser).not.toHaveBeenCalled();
  });

  test('removeUserEverywhere: live local + remote', () => {
    isLiveMode.mockReturnValue(true);
    removeUser.mockResolvedValue(undefined);
    const removeLocal = jest.fn();

    removeUserEverywhere({ uid: 'u3', removeLocal });

    expect(removeLocal).toHaveBeenCalledWith('u3');
    expect(removeUser).toHaveBeenCalledWith('u3');
  });
});

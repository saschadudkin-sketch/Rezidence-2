import { services } from './serviceContainer';

describe('serviceContainer smoke', () => {
  test('exports wired services object with expected surface', () => {
    expect(['demo', 'live']).toContain(services.mode);

    expect(typeof services.chat.sendMessage).toBe('function');

    expect(typeof services.requests.resolvePhotos).toBe('function');
    expect(typeof services.requests.submit).toBe('function');
    expect(typeof services.requests.updateEverywhere).toBe('function');
    expect(typeof services.requests.deleteEverywhere).toBe('function');

    expect(typeof services.admin.savePermsEverywhere).toBe('function');
    expect(typeof services.admin.saveUserEverywhere).toBe('function');
    expect(typeof services.admin.removeUserEverywhere).toBe('function');

    expect(typeof services.liveData.startSync).toBe('function');
  });

  test('builds services via createServices on module init', () => {
    jest.resetModules();
    const fakeServices = {
      mode: 'live',
      provider: 'firebase',
      chat: { sendMessage: jest.fn() },
      requests: { resolvePhotos: jest.fn(), submit: jest.fn(), updateEverywhere: jest.fn(), deleteEverywhere: jest.fn() },
      admin: { savePermsEverywhere: jest.fn(), saveUserEverywhere: jest.fn(), removeUserEverywhere: jest.fn() },
      liveData: { startSync: jest.fn() },
    };
    const createServices = jest.fn(() => fakeServices);

    jest.doMock('./createServices', () => ({ createServices }));
    const { services: mockedServices } = require('./serviceContainer');

    expect(createServices).toHaveBeenCalledTimes(1);
    expect(mockedServices).toBe(fakeServices);
  });
});

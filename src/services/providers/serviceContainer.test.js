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
});

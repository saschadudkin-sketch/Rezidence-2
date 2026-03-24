import { createServices } from './createServices';

describe('createServices factory', () => {
  test('creates service container for demo mode', () => {
    const s = createServices('demo');

    expect(s.mode).toBe('demo');
    expect(s.provider).toBe('demo');
    expect(typeof s.chat.sendMessage).toBe('function');
    expect(typeof s.requests.submit).toBe('function');
    expect(typeof s.requests.updateEverywhere).toBe('function');
    expect(typeof s.admin.saveUserEverywhere).toBe('function');
    expect(typeof s.liveData.startSync).toBe('function');
  });

  test('creates service container for live mode', () => {
    const s = createServices('live');
    expect(s.mode).toBe('live');
    expect(s.provider).toBe('firebase');
  });
});

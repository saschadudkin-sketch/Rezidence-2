describe('runtimeMode', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    delete process.env.REACT_APP_RUNTIME_MODE;
    delete process.env.REACT_APP_MODE;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('defaults to demo when no env override is provided', () => {
    const runtimeMode = require('./runtimeMode');
    expect(runtimeMode.MODE).toBe('demo');
    expect(runtimeMode.isDemoMode()).toBe(true);
    expect(runtimeMode.isLiveMode()).toBe(false);
  });

  test('uses REACT_APP_RUNTIME_MODE when provided', () => {
    process.env.REACT_APP_RUNTIME_MODE = 'live';
    const runtimeMode = require('./runtimeMode');
    expect(runtimeMode.MODE).toBe('live');
  });

  test('falls back to REACT_APP_MODE when REACT_APP_RUNTIME_MODE is absent', () => {
    process.env.REACT_APP_MODE = 'live';
    const runtimeMode = require('./runtimeMode');
    expect(runtimeMode.MODE).toBe('live');
  });

  test('ignores unsupported mode values', () => {
    process.env.REACT_APP_RUNTIME_MODE = 'staging';
    const runtimeMode = require('./runtimeMode');
    expect(runtimeMode.MODE).toBe('demo');
  });
});

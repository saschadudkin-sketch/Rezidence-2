describe('passesApi (demo mode)', () => {
  let api;

  beforeEach(() => {
    jest.resetModules();
    jest.doMock('../../config/runtimeMode', () => ({ isLiveMode: () => false }));
    api = require('./passesApi');
    api.__resetPassesApiDemoState();
  });

  test('createPass + getPasses', async () => {
    await api.createPass({ userId: 'u1', validUntil: '2030-01-01T00:00:00.000Z' });
    const passes = await api.getPasses();
    expect(passes).toHaveLength(1);
    expect(passes[0].userId).toBe('u1');
  });

  test('validatePass returns denied for expired pass', async () => {
    const result = await api.validatePass(
      { userId: 'u1', validUntil: '2020-01-01T00:00:00.000Z' },
      { now: new Date('2021-01-01T00:00:00.000Z') },
    );
    expect(result.status).toBe('denied');
  });

  test('logVisit stores entry', async () => {
    const entry = await api.logVisit({ userId: 'u1', result: 'allowed' });
    expect(entry.userId).toBe('u1');
    expect(entry.result).toBe('allowed');
  });
});


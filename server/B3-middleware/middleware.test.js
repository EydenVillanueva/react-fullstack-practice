import request from 'supertest';
import { createApp } from '../app.js';

let app;
beforeEach(() => {
  app = createApp();
});
afterEach(() => vi.restoreAllMocks());

describe('B3 requireApiKey', () => {
  it('401 when the header is missing', async () => {
    const res = await request(app).get('/api/admin/stats');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Missing API key' });
  });

  it('401 when the key is wrong', async () => {
    const res = await request(app).get('/api/admin/stats').set('x-api-key', 'nope');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Invalid API key' });
  });

  it('lets the request through with the right key', async () => {
    const res = await request(app).get('/api/admin/stats').set('x-api-key', 'dev-secret');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ users: 5, notes: 2 });
  });

  it('only protects /api/admin', async () => {
    expect((await request(app).get('/api/health')).status).toBe(200);
  });
});

describe('B3 notFound', () => {
  it('returns JSON 404 with the method and the URL', async () => {
    const res = await request(app).get('/api/nope?x=1');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toEqual({ error: 'Route not found: GET /api/nope?x=1' });
  });
});

describe('B3 errorHandler', () => {
  const admin = (path) => request(app).get(`/api/admin${path}`).set('x-api-key', 'dev-secret');

  it('exposes the message of 4xx errors', async () => {
    const res = await admin('/bad-request');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Missing report id' });
  });

  it('hides the message of 5xx errors and logs them', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await admin('/crash');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
    expect(log).toHaveBeenCalled();
  });

  it('also handles errors thrown in async routes', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await admin('/async-crash');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });

  it('turns malformed JSON bodies into a JSON 400 (errors from express.json())', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Content-Type', 'application/json')
      .send('{"title": "oops"'); // missing closing brace
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(typeof res.body.error).toBe('string');
  });
});

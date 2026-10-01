import request from 'supertest';
import { createApp } from '../app.js';

let app;
beforeEach(() => {
  app = createApp(); // fresh data for every test
});

describe('B1 Notes API', () => {
  it('GET /api/notes returns the seeded notes', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toEqual({ id: 1, title: 'Study closures', content: 'Functions remember their scope' });
  });

  it('GET /api/notes?search= filters by title (case-insensitive)', async () => {
    const res = await request(app).get('/api/notes').query({ search: 'sql' });
    expect(res.status).toBe(200);
    expect(res.body.map((n) => n.id)).toEqual([2]);
  });

  it('GET /api/notes/:id returns one note, or 404', async () => {
    const found = await request(app).get('/api/notes/2');
    expect(found.status).toBe(200);
    expect(found.body.title).toBe('Practice SQL');

    const missing = await request(app).get('/api/notes/999');
    expect(missing.status).toBe(404);
    expect(missing.body).toEqual({ error: 'Note not found' });
  });

  it('POST /api/notes creates a note with a new id (201)', async () => {
    const res = await request(app).post('/api/notes').send({ title: '  Hooks  ', content: 'useEffect' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 3, title: 'Hooks', content: 'useEffect' });

    const list = await request(app).get('/api/notes');
    expect(list.body).toHaveLength(3);
  });

  it('POST defaults content to an empty string', async () => {
    const res = await request(app).post('/api/notes').send({ title: 'Only a title' });
    expect(res.status).toBe(201);
    expect(res.body.content).toBe('');
  });

  it('POST validates the title (400)', async () => {
    for (const body of [{}, { title: '' }, { title: '   ' }, { title: 42 }]) {
      const res = await request(app).post('/api/notes').send(body);
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'title is required' });
    }
  });

  it('POST without any body also returns 400 (req.body may be undefined)', async () => {
    const res = await request(app).post('/api/notes');
    expect(res.status).toBe(400);
  });

  it('PUT /api/notes/:id updates a note, validates, and 404s', async () => {
    const res = await request(app).put('/api/notes/1').send({ title: 'Closures!', content: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, title: 'Closures!', content: 'Updated' });

    const again = await request(app).get('/api/notes/1');
    expect(again.body.title).toBe('Closures!');

    expect((await request(app).put('/api/notes/1').send({ title: '' })).status).toBe(400);
    expect((await request(app).put('/api/notes/999').send({ title: 'x' })).status).toBe(404);
  });

  it('DELETE /api/notes/:id returns 204 with no body, then 404', async () => {
    const res = await request(app).delete('/api/notes/1');
    expect(res.status).toBe(204);
    expect(res.text).toBe('');
    expect((await request(app).get('/api/notes/1')).status).toBe(404);
    expect((await request(app).delete('/api/notes/1')).status).toBe(404);
  });

  it('ids are never reused after a delete', async () => {
    await request(app).delete('/api/notes/2');
    const res = await request(app).post('/api/notes').send({ title: 'New' });
    expect(res.body.id).toBe(3);
  });
});

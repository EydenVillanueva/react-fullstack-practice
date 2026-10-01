import request from 'supertest';
import { createApp } from '../app.js';

const app = createApp();
const get = (query) => request(app).get('/api/products').query(query);

describe('B2 Products API', () => {
  it('defaults: page 1, limit 5, original order', async () => {
    const res = await get({});
    expect(res.status).toBe(200);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(5);
    expect(res.body.total).toBe(12);
    expect(res.body.totalPages).toBe(3);
    expect(res.body.data.map((p) => p.id)).toEqual([1, 2, 3, 4, 5]);
  });

  it('paginates', async () => {
    const res = await get({ page: 3, limit: 5 });
    expect(res.body.data.map((p) => p.id)).toEqual([11, 12]);
    const empty = await get({ page: 4, limit: 5 });
    expect(empty.status).toBe(200);
    expect(empty.body.data).toEqual([]);
  });

  it('filters by category (case-insensitive) and price range', async () => {
    const res = await get({ category: 'Furniture', minPrice: 100, maxPrice: 300, limit: 50 });
    expect(res.body.data.map((p) => p.id)).toEqual([4, 12]);
    expect(res.body.total).toBe(2);
    expect(res.body.totalPages).toBe(1);
  });

  it('sorts ascending and descending ("-" prefix)', async () => {
    const asc = await get({ sort: 'price', limit: 3 });
    expect(asc.body.data.map((p) => p.id)).toEqual([10, 9, 7]);
    const desc = await get({ sort: '-price', limit: 3 });
    expect(desc.body.data.map((p) => p.id)).toEqual([5, 8, 4]);
    const byRating = await get({ category: 'electronics', sort: '-rating', limit: 2 });
    expect(byRating.body.data.map((p) => p.id)).toEqual([3, 1]);
  });

  it('filter + sort + pagination together', async () => {
    const res = await get({ category: 'electronics', sort: 'price', page: 2, limit: 2 });
    expect(res.body.data.map((p) => p.id)).toEqual([1, 3]); // 45, 59 | 89.9, 199.99 | 329
    expect(res.body.total).toBe(5);
    expect(res.body.totalPages).toBe(3);
  });

  it('rejects invalid pagination with 400', async () => {
    for (const q of [{ page: 0 }, { page: 'abc' }, { limit: -1 }, { limit: 51 }, { page: 1.5 }]) {
      const res = await get(q);
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid pagination params' });
    }
  });

  it('rejects an unknown sort field with 400', async () => {
    const res = await get({ sort: 'color' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid sort field' });
  });

  it('does not mutate the shared data between requests', async () => {
    await get({ sort: '-price' });
    const res = await get({});
    expect(res.body.data.map((p) => p.id)).toEqual([1, 2, 3, 4, 5]);
  });

  it('GET /api/products/:id returns one product or 404', async () => {
    expect((await request(app).get('/api/products/8')).body.name).toBe('4K Monitor');
    const missing = await request(app).get('/api/products/99');
    expect(missing.status).toBe(404);
    expect(missing.body).toEqual({ error: 'Product not found' });
  });
});

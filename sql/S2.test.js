import { runExercise } from './runQuery.js';

describe('S2', () => {
  it('returns the expected rows, columns and order', () => {
    expect(runExercise('./S2-group-having.sql')).toEqual([
      { category: 'Furniture', product_count: 3, avg_price: 234.83 },
      { category: 'Electronics', product_count: 4, avg_price: 165.97 },
      { category: 'Stationery', product_count: 2, avg_price: 8.74 },
    ]);
  });
});

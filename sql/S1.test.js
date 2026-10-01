import { runExercise } from './runQuery.js';

describe('S1', () => {
  it('returns the expected rows, columns and order', () => {
    expect(runExercise('./S1-filter-sort.sql')).toEqual([
      { name: '4K Monitor', price: 329 },
      { name: 'Noise-Cancelling Headphones', price: 199.99 },
      { name: 'Mechanical Keyboard', price: 89.9 },
    ]);
  });
});

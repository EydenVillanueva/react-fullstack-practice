import { runExercise } from './runQuery.js';

describe('S4', () => {
  it('returns the expected rows, columns and order', () => {
    expect(runExercise('./S4-top-customers.sql')).toEqual([
      { name: 'Diego Hernández', total_spent: 743 },
      { name: 'Luis Pérez', total_spent: 284.5 },
      { name: 'Ana Torres', total_spent: 236.15 },
    ]);
  });
});

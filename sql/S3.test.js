import { runExercise } from './runQuery.js';

describe('S3', () => {
  it('returns the expected rows, columns and order', () => {
    expect(runExercise('./S3-left-join.sql')).toEqual([
      { name: 'Ana Torres', order_count: 2 },
      { name: 'Diego Hernández', order_count: 2 },
      { name: 'Sofía Ramírez', order_count: 2 },
      { name: 'Luis Pérez', order_count: 1 },
      { name: 'Valeria Cruz', order_count: 1 },
      { name: 'Jorge Molina', order_count: 0 },
    ]);
  });
});

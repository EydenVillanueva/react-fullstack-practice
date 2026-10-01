import { runExercise } from './runQuery.js';

describe('S5', () => {
  it('returns the expected rows, columns and order', () => {
    expect(runExercise('./S5-never-ordered.sql')).toEqual([
      { name: 'Gel Pens (12)', category: 'Stationery' },
      { name: 'Notebook Pack', category: 'Stationery' },
    ]);
  });
});

import { mergeIntervals } from './M02-mergeIntervals.js';

describe('M02 mergeIntervals', () => {
  it('sample 0: unsorted input', () => {
    expect(mergeIntervals([[5, 8], [1, 4], [2, 3], [10, 12], [7, 9]])).toEqual([
      [1, 4],
      [5, 9],
      [10, 12],
    ]);
  });
  it('touching intervals are merged', () => {
    expect(mergeIntervals([[1, 2], [2, 3]])).toEqual([[1, 3]]);
  });
  it('an interval fully inside another', () => {
    expect(mergeIntervals([[1, 10], [2, 3], [4, 5]])).toEqual([[1, 10]]);
  });
  it('empty input and a single interval', () => {
    expect(mergeIntervals([])).toEqual([]);
    expect(mergeIntervals([[4, 4]])).toEqual([[4, 4]]);
  });
  it('does not mutate the input (outer or inner arrays)', () => {
    const input = [[3, 5], [1, 4]];
    mergeIntervals(input);
    expect(input).toEqual([[3, 5], [1, 4]]);
  });
  it('large input', () => {
    const input = Array.from({ length: 100000 }, (_, i) => [i * 2, i * 2 + 1]).reverse();
    const result = mergeIntervals(input);
    expect(result).toHaveLength(100000);
    expect(result[0]).toEqual([0, 1]);
  });
});

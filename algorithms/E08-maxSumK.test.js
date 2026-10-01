import { maxSumK } from './E08-maxSumK.js';
import { timed, TIME_LIMIT_MS } from './_perf.js';

describe('E08 maxSumK', () => {
  it('sample 0', () => {
    expect(maxSumK([2, 1, 5, 1, 3, 2], 3)).toBe(9);
  });
  it('all negative numbers', () => {
    expect(maxSumK([-3, -1, -2, -5], 2)).toBe(-3);
  });
  it('k equals n', () => {
    expect(maxSumK([1, 2, 3], 3)).toBe(6);
  });
  it('single element', () => {
    expect(maxSumK([4], 1)).toBe(4);
  });
  it('performance: n = 100,000, k = 50,000', () => {
    const arr = Array.from({ length: 100000 }, (_, i) => (i % 7) - 3);
    arr[99999] = 1000;
    const { result, ms } = timed(() => maxSumK(arr, 50000));
    expect(result).toBe(maxSumReference(arr, 50000));
    expect(ms).toBeLessThan(TIME_LIMIT_MS);
  });
});

function maxSumReference(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let best = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    best = Math.max(best, sum);
  }
  return best;
}

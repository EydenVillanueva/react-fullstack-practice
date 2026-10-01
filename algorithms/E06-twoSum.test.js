import { twoSum } from './E06-twoSum.js';
import { timed, TIME_LIMIT_MS } from './_perf.js';

describe('E06 twoSum', () => {
  it('sample 0', () => {
    expect(twoSum([3, 8, 12, 5], 17)).toEqual([2, 3]);
  });
  it('handles duplicate values', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });
  it('handles negative numbers', () => {
    expect(twoSum([-4, 11, 7, -2], 5)).toEqual([2, 3]);
  });
  it('performance: n = 60,000 (pair at the very end)', () => {
    const nums = Array.from({ length: 59998 }, (_, i) => i + 1);
    nums.push(1_000_000_000, 1_000_000_001);
    const { result, ms } = timed(() => twoSum(nums, 2_000_000_001));
    expect(result).toEqual([59998, 59999]);
    expect(ms).toBeLessThan(TIME_LIMIT_MS);
  });
});

import { removeDuplicates } from './E04-removeDuplicates.js';
import { timed, TIME_LIMIT_MS } from './_perf.js';

describe('E04 removeDuplicates', () => {
  it('sample 0: keeps the first occurrence, in order', () => {
    expect(removeDuplicates([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });
  it('treats 1 and "1" as different values', () => {
    expect(removeDuplicates([1, '1', 1, '1'])).toEqual([1, '1']);
  });
  it('works with strings', () => {
    expect(removeDuplicates(['b', 'a', 'b'])).toEqual(['b', 'a']);
  });
  it('returns a new array and does not mutate the input', () => {
    const input = [3, 3, 1];
    const output = removeDuplicates(input);
    expect(output).not.toBe(input);
    expect(input).toEqual([3, 3, 1]);
  });
  it('handles an empty array', () => {
    expect(removeDuplicates([])).toEqual([]);
  });
  it('performance: n = 80,000', () => {
    const input = Array.from({ length: 40000 }, (_, i) => i);
    const { result, ms } = timed(() => removeDuplicates([...input, ...input]));
    expect(result).toEqual(input);
    expect(ms).toBeLessThan(TIME_LIMIT_MS);
  });
});

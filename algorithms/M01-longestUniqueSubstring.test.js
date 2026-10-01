import { longestUniqueSubstring } from './M01-longestUniqueSubstring.js';
import { timed, TIME_LIMIT_MS } from './_perf.js';

describe('M01 longestUniqueSubstring', () => {
  it('sample 0', () => {
    expect(longestUniqueSubstring('xyzxyzyy')).toBe(3);
  });
  it('sample 1', () => {
    expect(longestUniqueSubstring('dvdf')).toBe(3);
  });
  it('all the same character', () => {
    expect(longestUniqueSubstring('bbbb')).toBe(1);
  });
  it('edge: empty string and a single space', () => {
    expect(longestUniqueSubstring('')).toBe(0);
    expect(longestUniqueSubstring(' ')).toBe(1);
  });
  it('edge: the window must never move backwards', () => {
    expect(longestUniqueSubstring('abba')).toBe(2);
    expect(longestUniqueSubstring('tmmzuxt')).toBe(5);
  });
  it('performance: n = 15,000 with 2,500 distinct characters', () => {
    let s = '';
    for (let i = 0; i < 15000; i++) s += String.fromCharCode(0x4e00 + (i % 2500));
    const { result, ms } = timed(() => longestUniqueSubstring(s));
    expect(result).toBe(2500);
    expect(ms).toBeLessThan(TIME_LIMIT_MS);
  });
});

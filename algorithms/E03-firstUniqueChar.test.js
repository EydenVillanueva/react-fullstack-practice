import { firstUniqueChar } from './E03-firstUniqueChar.js';
import { timed, TIME_LIMIT_MS } from './_perf.js';

describe('E03 firstUniqueChar', () => {
  it('sample 0', () => {
    expect(firstUniqueChar('swiss')).toBe(1);
  });
  it('sample 1', () => {
    expect(firstUniqueChar('abacabad')).toBe(3);
  });
  it('returns -1 when every character repeats', () => {
    expect(firstUniqueChar('aabbcc')).toBe(-1);
  });
  it('handles a single character', () => {
    expect(firstUniqueChar('z')).toBe(0);
  });
  it('performance: n = 200,000', () => {
    const s = 'ab'.repeat(100000) + 'z';
    const { result, ms } = timed(() => firstUniqueChar(s));
    expect(result).toBe(200000);
    expect(ms).toBeLessThan(TIME_LIMIT_MS);
  });
});

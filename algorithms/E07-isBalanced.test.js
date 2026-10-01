import { isBalanced } from './E07-isBalanced.js';

describe('E07 isBalanced', () => {
  it('sample 0', () => {
    expect(isBalanced('([]{})')).toBe('YES');
  });
  it('sample 1: wrong closing order', () => {
    expect(isBalanced('([)]')).toBe('NO');
  });
  it('unclosed brackets', () => {
    expect(isBalanced('((()')).toBe('NO');
  });
  it('closing bracket with nothing open', () => {
    expect(isBalanced(']')).toBe('NO');
    expect(isBalanced('())')).toBe('NO');
  });
  it('sequences and the empty string', () => {
    expect(isBalanced('{[]}()')).toBe('YES');
    expect(isBalanced('')).toBe('YES');
  });
  it('large input', () => {
    const s = '('.repeat(50000) + '[]'.repeat(1000) + ')'.repeat(50000);
    expect(isBalanced(s)).toBe('YES');
  });
});

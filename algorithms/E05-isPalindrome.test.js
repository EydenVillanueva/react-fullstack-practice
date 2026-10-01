import { isPalindrome } from './E05-isPalindrome.js';

describe('E05 isPalindrome', () => {
  it('sample 0: ignores case, spaces and punctuation', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });
  it('sample 1', () => {
    expect(isPalindrome('No lemon, no melon')).toBe(true);
  });
  it('detects non-palindromes', () => {
    expect(isPalindrome('race a car')).toBe(false);
  });
  it('digits count as characters', () => {
    expect(isPalindrome('0P')).toBe(false);
    expect(isPalindrome('12:21')).toBe(true);
  });
  it('empty or symbol-only strings are palindromes', () => {
    expect(isPalindrome('')).toBe(true);
    expect(isPalindrome(' .,! ')).toBe(true);
  });
});

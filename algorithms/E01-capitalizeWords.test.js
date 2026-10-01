import { capitalizeWords } from './E01-capitalizeWords.js';

describe('E01 capitalizeWords', () => {
  it('sample 0: capitalizes each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });
  it('sample 1: lowercases the rest of each word', () => {
    expect(capitalizeWords('jAVAsCRIPT iS fUN')).toBe('Javascript Is Fun');
  });
  it('preserves the original spacing', () => {
    expect(capitalizeWords('  keep   the  spaces ')).toBe('  Keep   The  Spaces ');
  });
  it('handles single letters and non-letters', () => {
    expect(capitalizeWords('a b c')).toBe('A B C');
    expect(capitalizeWords("it's 2026")).toBe("It's 2026");
  });
  it('handles the empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });
});

import { flatten } from './E10-flatten.js';

describe('E10 flatten', () => {
  afterEach(() => vi.restoreAllMocks());

  it('sample 0: flattens all levels by default', () => {
    expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });
  it('sample 1: respects depth', () => {
    expect(flatten([1, [2, [3, [4]]]], 1)).toEqual([1, 2, [3, [4]]]);
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });
  it('depth 0 returns a shallow copy', () => {
    const input = [1, [2]];
    const result = flatten(input, 0);
    expect(result).toEqual([1, [2]]);
    expect(result).not.toBe(input);
  });
  it('removes empty arrays', () => {
    expect(flatten([[], [[]], 5])).toEqual([5]);
  });
  it('does not use Array.prototype.flat and does not mutate the input', () => {
    const flatSpy = vi.spyOn(Array.prototype, 'flat');
    const input = [1, [2, [3]]];
    expect(flatten(input)).toEqual([1, 2, 3]);
    expect(flatSpy).not.toHaveBeenCalled();
    expect(input).toEqual([1, [2, [3]]]);
  });
});

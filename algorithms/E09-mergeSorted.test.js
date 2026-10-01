import { mergeSorted } from './E09-mergeSorted.js';

describe('E09 mergeSorted', () => {
  afterEach(() => vi.restoreAllMocks());

  it('sample 0', () => {
    expect(mergeSorted([1, 3, 5], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it('one empty array', () => {
    expect(mergeSorted([], [1, 2])).toEqual([1, 2]);
    expect(mergeSorted([7], [])).toEqual([7]);
  });
  it('keeps duplicates and negatives', () => {
    expect(mergeSorted([-2, 1, 1], [-3, 1, 4])).toEqual([-3, -2, 1, 1, 1, 4]);
  });
  it('different lengths', () => {
    expect(mergeSorted([10], [1, 2, 3, 11])).toEqual([1, 2, 3, 10, 11]);
  });
  it('does not use sort() and does not mutate the inputs', () => {
    const sortSpy = vi.spyOn(Array.prototype, 'sort');
    const toSortedSpy = Array.prototype.toSorted ? vi.spyOn(Array.prototype, 'toSorted') : null;
    const a = [1, 4];
    const b = [2, 3];
    const result = mergeSorted(a, b);
    expect(result).toEqual([1, 2, 3, 4]);
    expect(sortSpy).not.toHaveBeenCalled();
    if (toSortedSpy) expect(toSortedSpy).not.toHaveBeenCalled();
    expect(a).toEqual([1, 4]);
    expect(b).toEqual([2, 3]);
  });
});

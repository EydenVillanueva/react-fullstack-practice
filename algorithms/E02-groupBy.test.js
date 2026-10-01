import { groupBy } from './E02-groupBy.js';

const people = [
  { name: 'Ana', city: 'Cancun', age: 30 },
  { name: 'Luis', city: 'Merida', age: 25 },
  { name: 'Sofia', city: 'Cancun', age: 30 },
  { name: 'Diego', city: 'Monterrey', age: 41 },
];

describe('E02 groupBy', () => {
  it('sample 0: groups by a string property, keeping the original order', () => {
    expect(groupBy(people, 'city')).toEqual({
      Cancun: [people[0], people[2]],
      Merida: [people[1]],
      Monterrey: [people[3]],
    });
  });
  it('groups by a numeric property (object keys become strings)', () => {
    const result = groupBy(people, 'age');
    expect(Object.keys(result).sort()).toEqual(['25', '30', '41']);
    expect(result['30']).toEqual([people[0], people[2]]);
  });
  it('returns the same object references (no copies of items needed)', () => {
    expect(groupBy(people, 'city').Merida[0]).toBe(people[1]);
  });
  it('returns an empty object for an empty array', () => {
    expect(groupBy([], 'city')).toEqual({});
  });
  it('does not mutate the input array', () => {
    const snapshot = JSON.stringify(people);
    groupBy(people, 'city');
    expect(JSON.stringify(people)).toBe(snapshot);
  });
});

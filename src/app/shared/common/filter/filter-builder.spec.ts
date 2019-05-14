import { FilterBuilder, Compare } from './filter-builder';

describe('FilterBuilder', () => {
  const empty = new FilterBuilder<any>();

  describe('constructor', () => {
    it('returns the next builder if filter is undefined', () => {
      const builder = new FilterBuilder(undefined, empty);
      expect(builder).toBe(empty);
    });
  });

  function itHasNoEffect(name: string, builder: FilterBuilder<any>): void {
    it(`does nothing if ${name} is undefined`, () => {
      expect(builder).toBe(empty);
    });
  }

  function describeFilter(builder: FilterBuilder<any>, good: any, bad: any): void {
    describe('filter', () => {
      const filter = builder.toFilter();

      it('passes valid objects', () => {
        expect(filter(good)).toBeTruthy();
      });

      it('fails invalid objects', () => {
        expect(filter(bad)).toBeFalsy();
      });
    });
  }

  describe('addMatches(value)', () => {
    itHasNoEffect('value', empty.addMatches('abc', undefined));
    describeFilter(empty.addMatches('foo', 123), { foo: 123 }, { foo: 456 });
  });

  describe('addCompare', () => {
    itHasNoEffect('value', empty.addCompare('abc', Compare.equal, undefined));
    describeFilter(empty.addCompare('foo', Compare.less_than, 0), { foo: -1 }, { foo: 1 });
  });

  describe('addIncludes', () => {
    itHasNoEffect('value', empty.addIncludes('abc', undefined));
    describeFilter(empty.addIncludes('foo', 12), { foo: [11, 12] }, { foo: [13, 14] });
  });

  describe('addIncludedIn', () => {
    itHasNoEffect('values', empty.addIncludedIn('abc', undefined));
    itHasNoEffect('values', empty.addIncludedIn('abc', []));
    describeFilter(empty.addIncludedIn('foo', [1, 2]), { foo: 1 }, { foo: 3 });
  });

  describe('addOverlapsBy', () => {
    itHasNoEffect('values', empty.addOverlapsBy('abc', undefined));
    itHasNoEffect('values', empty.addOverlapsBy('abc', []));
    describeFilter(empty.addOverlapsBy('foo', [1, 2]), { foo: [2, 3] }, { foo: [3, 4] });
  });

  describe('toFilter', () => {
    it('returns a predicate function', () => {
      expect(empty.toFilter()).toEqual(jasmine.any(Function));
    });
  });
});

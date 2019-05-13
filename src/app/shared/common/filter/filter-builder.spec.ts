import { FilterBuilder } from './filter-builder';

describe('FilterBuilder', () => {
  const empty = new FilterBuilder();

  describe('constructor', () => {
    it('returns the next builder if filter is undefined', () => {
      const builder = new FilterBuilder(undefined, empty);
      expect(builder).toBe(empty);
    });
  });

  describe('addMatches(value)', () => {
    it('does nothing if value is undefined', () => {
      const builder = empty.addMatches('abc', undefined);
      expect(builder).toBe(empty);
    });

    // TODO
  });
  // TODO
});

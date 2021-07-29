import { TestScheduler } from 'rxjs/testing';

import { filterNulls } from './filter-nulls';


describe('filterNulls()', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('removes null and undefined values', () => scheduler.run(helpers => {
    const { cold, expectObservable } = helpers;
    const values = [1, null, undefined, 2, 3];
    const source = cold('0-1-2-3-4|', { ...values }).pipe(filterNulls());
    const expected = '   0-----1-2|';
    const filteredValues = [1, 2, 3];

    expectObservable(source).toBe(expected, filteredValues);
  }));
});

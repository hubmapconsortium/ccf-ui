import { mergeMapTo } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

import { pluckUnique } from './pluck-unique';


describe('pluckUnique(...props, [opts])', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('plucks the specified property', () => scheduler.run(helpers => {
    const { cold, expectObservable } = helpers;
    const obj = { mykey: [1, 2] };
    const source = cold('a|', { a: obj }).pipe(pluckUnique('mykey', 1));

    expectObservable(source).toBe('a|', { a: 2 });
  }));

  it('emits distinct values', () => scheduler.run(helpers => {
    const { cold, expectObservable } = helpers;
    const obj = { prop: 1 };
    const source = cold('ab|', { a: obj, b: obj }).pipe(pluckUnique('prop'));
    const expected = '   a-|';

    expectObservable(source).toBe(expected, { a: 1 });
  }));

  it('accepts a custom equality comparison function', () => scheduler.run(helpers => {
    const { cold, flush, expectObservable } = helpers;
    const obj1 = [1];
    const obj2 = [2];
    const obj3 = [0];
    const compare = jasmine.createSpy().and.callFake((lhs: number, rhs: number) => lhs <= rhs);
    const source = cold('abc|', { a: obj1, b: obj2, c: obj3 }).pipe(pluckUnique(0, { compare }));
    const expected = '   a-c|';

    expectObservable(source).toBe(expected, { a: 1, c: 0 });
    flush();

    expect(compare).toHaveBeenCalledTimes(2);
    expect(compare.calls.allArgs()).toEqual([[1, 2], [1, 0]]);
  }));

  it('multicast the latest value', () => scheduler.run(helpers => {
    const { cold, hot, expectObservable, expectSubscriptions } = helpers;
    const values = { a: [1], b: [2], c: [3], d: [4] };
    const pluckedValues = { a: 1, b: 2, c: 3, d: 4 };
    const source = cold('    -a-b-c----d-|', values);
    const sourceSubs = '     ^-----------!';
    const subscriber1 = hot('a|           ');
    const expected1 = '      -a-b-c----d-|';
    const subscriber2 = hot('----b|       ');
    const expected2 = '      ----bc----d-|';
    const subscriber3 = hot('--------c|   ');
    const expected3 = '      --------c-d-|';

    const shared = source.pipe(pluckUnique(0));

    expectObservable(subscriber1.pipe(mergeMapTo(shared))).toBe(expected1, pluckedValues);
    expectObservable(subscriber2.pipe(mergeMapTo(shared))).toBe(expected2, pluckedValues);
    expectObservable(subscriber3.pipe(mergeMapTo(shared))).toBe(expected3, pluckedValues);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
  }));
});

/* eslint-disable @typescript-eslint/naming-convention */
import { TestScheduler } from 'rxjs/testing';

import { flatten } from './flatten';


describe('flatten()', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('flattens nested arrays', () => scheduler.run(helpers => {
    const { cold, expectObservable } = helpers;
    const values = [[1, 2], [3, 4]];
    const source = cold('0|', { 0: values }).pipe(flatten());
    const expected = '   0|';
    const flatValues = [1, 2, 3, 4];

    expectObservable(source).toBe(expected, { 0: flatValues });
  }));

  it('flattens only the first level', () => scheduler.run(helpers => {
    const { cold, expectObservable } = helpers;
    const values = [[1, [2, 2.5]], [3, 4]];
    const source = cold('0|', { 0: values }).pipe(flatten());
    const expected = '   0|';
    const flatValues = [1, [2, 2.5], 3, 4];

    expectObservable(source).toBe(expected, { 0: flatValues });
  }));
});

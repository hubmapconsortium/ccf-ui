import { TestScheduler } from 'rxjs/testing';

import { innerMap } from './inner-map';


describe('innerMap(project)', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('calls the project callback on each element of emitted arrays', () => scheduler.run(helpers => {
    const { cold, flush } = helpers;
    const arrays = { a: [1, 2], b: [3, 4] };
    const project = jasmine.createSpy();
    const source = cold('ab|', arrays).pipe(innerMap(project));

    source.subscribe();
    flush();

    expect(project).toHaveBeenCalledTimes(4);
    expect(project.calls.argsFor(0)).toEqual([1, 0, 0]);
    expect(project.calls.argsFor(1)).toEqual([2, 1, 0]);
    expect(project.calls.argsFor(2)).toEqual([3, 0, 1]);
    expect(project.calls.argsFor(3)).toEqual([4, 1, 1]);
  }));

  it('emits new arrays with the results of the project callback', () => scheduler.run(helpers => {
    const { cold, expectObservable } = helpers;
    const arrays = { a: [1, 2], b: [3, 4] };
    const project = (val: number) => val + 1;
    const source = cold('ab|', arrays).pipe(innerMap(project));
    const result = { a: [2, 3], b: [4, 5] };

    expectObservable(source).toBe('ab|', result);
  }));
});

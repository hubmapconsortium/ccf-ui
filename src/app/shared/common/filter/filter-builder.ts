import {
  eq,
  gt,
  gte,
  includes,
  intersectionBy,
  lt,
  lte,
  matchesProperty,
  negate,
  overEvery,
  property,
  PropertyPath,
  ValueIteratee,
} from 'lodash';

export type FilterPred<T> = (obj: T) => boolean;

export const enum Compare {
  equal,
  not_equal,
  less_than,
  less_than_equal,
  greater_than,
  greater_than_equal
}

const compareMethods = {
  [Compare.equal]: eq,
  [Compare.not_equal]: negate(eq),
  [Compare.less_than]: lt,
  [Compare.less_than_equal]: lte,
  [Compare.greater_than]: gt,
  [Compare.greater_than_equal]: gte
};

export class FilterBuilder<T> {
  constructor(private filter?: FilterPred<T>, private next?: FilterBuilder<T>) {
    if (filter === undefined && next !== undefined) { return next; }
  }

  addMatches<U>(path: PropertyPath, value: U): FilterBuilder<T> {
    if (value === undefined) { return this; }
    return this.addFilter(matchesProperty(path, value))
  }

  addCompare<U>(path: PropertyPath, compare: Compare, value: U): FilterBuilder<T> {
    if (value === undefined) { return this; }
    const method = compareMethods[compare] as (v1: U, v2: U) => boolean;
    const getter = property<T, U>(path);
    return this.addFilter(obj => method(getter(obj), value));
  }

  addIncludes<U>(path: PropertyPath, value: U): FilterBuilder<T> {
    if (value === undefined) { return this; }
    const getter = property<T, U[]>(path);
    return this.addFilter(obj => includes(getter(obj), value));
  }

  addIncludedIn<U>(path: PropertyPath, values: U[]): FilterBuilder<T> {
    if (values === undefined || values.length === 0) { return this; }
    const getter = property<T, U>(path);
    return this.addFilter(obj => includes(values, getter(obj)));
  }

  addOverlapsBy<U>(path: PropertyPath, values: U[], iteratee?: ValueIteratee<U>): FilterBuilder<T> {
    if (values === undefined || values.length === 0) { return this; }
    const getter = property<T, U[]>(path);
    return this.addFilter(obj => intersectionBy(getter(obj), values, iteratee).length !== 0);
  }

  toFilter(): FilterPred<T> {
    return overEvery(this.getAllFilters());
  }

  private addFilter(filter: FilterPred<T>): FilterBuilder<T> {
    return new FilterBuilder(filter, this);
  }

  private getAllFilters(): FilterPred<T>[] {
    const result: FilterPred<T>[] = [];
    let head: FilterBuilder<T> = this;
    while (head !== undefined) {
      result.push(head.filter);
      head = head.next;
    }

    return result;
  }
}

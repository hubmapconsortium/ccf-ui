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

/**
 * Predicate type.
 */
export type FilterPred<T> = (obj: T) => boolean;

/**
 * Enumeration for selecting a comparison operation.
 */
export const enum Compare {
  equal,
  not_equal,
  less_than,
  less_than_equal,
  greater_than,
  greater_than_equal
}

/**
 * Mapping from `enum Compare` values to actual comparison functions.
 */
const compareMethods = {
  [Compare.equal]: eq,
  [Compare.not_equal]: negate(eq),
  [Compare.less_than]: lt,
  [Compare.less_than_equal]: lte,
  [Compare.greater_than]: gt,
  [Compare.greater_than_equal]: gte
};

/**
 * Utility class for creating database filters.
 */
export class FilterBuilder<T> {
  /**
   * Creates an instance of filter builder.
   * Note: Arguments are for internal use only!
   *
   * @param [filter] A filter function.
   * @param [next] Reference to the next builder in the filter chain.
   */
  constructor(private filter?: FilterPred<T>, private next?: FilterBuilder<T>) {
    if (filter === undefined && next !== undefined) { return next; }
  }

  /**
   * Adds a filter that matches a value.
   *
   * @param path The path of the property to match.
   * @param value The value to match against.
   * @returns A new `FilterBuilder`
   */
  addMatches<U>(path: PropertyPath, value: U): FilterBuilder<T> {
    if (value === undefined) { return this; }
    return this.addFilter(matchesProperty(path, value));
  }

  /**
   * Adds a filter that compares to a value.
   *
   * @param path The path of the property to compare.
   * @param compare The comparison operation to perform.
   * @param value The value to compare against.
   * @returns A new `FilterBuilder`
   */
  addCompare<U>(path: PropertyPath, compare: Compare, value: U): FilterBuilder<T> {
    if (value === undefined) { return this; }
    const method = compareMethods[compare] as (v1: U, v2: U) => boolean;
    const getter = property<T, U>(path);
    return this.addFilter(obj => method(getter(obj), value));
  }

  /**
   * Adds a filter that checks if it contains a value.
   *
   * @param path The path of the property to check inclusion in.
   * @param value The value that should be included.
   * @returns A new `FilterBuilder`
   */
  addIncludes<U>(path: PropertyPath, value: U): FilterBuilder<T> {
    if (value === undefined) { return this; }
    const getter = property<T, U[]>(path);
    return this.addFilter(obj => includes(getter(obj), value));
  }

  /**
   * Adds a filter that checks if it matches one of many values.
   *
   * @param path The path of the property to check for inclusion.
   * @param values The values that should be matched.
   * @returns A new `FilterBuilder`
   */
  addIncludedIn<U>(path: PropertyPath, values: U[]): FilterBuilder<T> {
    if (values === undefined || values.length === 0) { return this; }
    const getter = property<T, U>(path);
    return this.addFilter(obj => includes(values, getter(obj)));
  }

  /**
   * Adds a filter that checks if at least one values matches.
   *
   * @param path The path of the property to check for overlay.
   * @param values The values that should be matched.
   * @param [iteratee] An optional function that will be applied to each value to create the matching.
   * @returns A new `FilterBuilder`
   */
  addOverlapsBy<U>(path: PropertyPath, values: U[], iteratee?: ValueIteratee<U>): FilterBuilder<T> {
    if (values === undefined || values.length === 0) { return this; }
    const getter = property<T, U[]>(path);
    return this.addFilter(obj => intersectionBy(getter(obj), values, iteratee).length !== 0);
  }

  /**
   * Creates a predicate function combining all filters in this builder.
   *
   * @returns The predicate.
   */
  toFilter(): FilterPred<T> {
    return overEvery(this.getAllFilters());
  }

  /**
   * Creates a new `FilterBuilder` with a new filter and `this` as the next builder.
   *
   * @param filter The filter for the new builder.
   * @returns The new `FilterBuilder`
   */
  private addFilter(filter: FilterPred<T>): FilterBuilder<T> {
    return new FilterBuilder(filter, this);
  }

  /**
   * Produces an array of all filters in the chain of builders.
   *
   * @returns An array of all filters.
   */
  private getAllFilters(): FilterPred<T>[] {
    const result: FilterPred<T>[] = [];
    let head: FilterBuilder<T> = this;
    while (head !== undefined && head.filter !== undefined) {
      result.push(head.filter);
      head = head.next;
    }

    return result;
  }
}

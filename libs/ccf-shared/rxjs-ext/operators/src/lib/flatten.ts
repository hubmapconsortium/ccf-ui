import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 * Flattens a single level of nested arrays.
 *
 * @returns An `Observable` operator
 */
export function flatten<T>(): OperatorFunction<readonly (readonly T[])[], T[]> {
  return map(array => ([] as T[]).concat(...array));
}

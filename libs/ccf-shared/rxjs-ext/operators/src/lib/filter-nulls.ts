import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Removes all `null` and `undefined` values from a stream.
 *
 * @returns An `Observable` operator
 */
export function filterNulls<T>(): OperatorFunction<T | null | undefined, T> {
  return filter((value): value is T => value != null);
}

import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Maps the values of each emitted array.
 *
 * @param project Mapping callback invoked for each element
 * @returns An `Observable` operator
 */
export function innerMap<T, R>(
  project: (value: T, index: number, outerIndex: number) => R
): OperatorFunction<readonly T[], R[]> {
  return map((array, outerIndex) =>
    array.map((value, index) => project(value, index, outerIndex))
  );
}

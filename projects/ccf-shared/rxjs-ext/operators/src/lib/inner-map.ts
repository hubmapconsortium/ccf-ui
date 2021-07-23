import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';


export function innerMap<T, R>(
  project: (value: T, index: number, outerIndex: number) => R
): OperatorFunction<readonly T[], R[]> {
  return map(
    (array, outerIndex) => array.map(
      (value, index) => project(value, index, outerIndex)
    )
  );
}

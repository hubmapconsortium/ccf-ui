import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';


export function innerMap<T>(
  project: (value: T, index: number, outerIndex: number) => T
): OperatorFunction<readonly T[], T[]> {
  return map(
    (array, outerIndex) => array.map(
      (value, index) => project(value, index, outerIndex)
    )
  );
}

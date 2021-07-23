import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';


export function flatten<T>(): OperatorFunction<readonly (readonly T[])[], T[]> {
  return map(array => ([] as T[]).concat(...array));
}

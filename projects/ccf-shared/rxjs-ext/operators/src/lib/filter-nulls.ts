import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';


export function filterNulls<T>(): OperatorFunction<T | null | undefined, T> {
  return filter((value): value is T => value != null);
}

import { OperatorFunction } from 'rxjs';
import { distinctUntilChanged, pluck, shareReplay } from 'rxjs/operators';


export interface PluckUniqueOptions<T> {
  compare?: (lhs: T, rhs: T) => boolean;
}


const DEFAULT_OPTIONS: PluckUniqueOptions<unknown> = {};


/* eslint-disable max-len */
export function pluckUnique<T, K1 extends keyof T>(k1: K1, opts?: PluckUniqueOptions<T[K1]>): OperatorFunction<T, T[K1]>;
export function pluckUnique<T, K1 extends keyof T, K2 extends keyof T[K1]>(k1: K1, k2: K2, opts?: PluckUniqueOptions<T[K1][K2]>): OperatorFunction<T, T[K1][K2]>;
export function pluckUnique<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(k1: K1, k2: K2, k3: K3, opts?: PluckUniqueOptions<T[K1][K2][K3]>): OperatorFunction<T, T[K1][K2][K3]>;
export function pluckUnique<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends T[K1][K2][K3]>(k1: K1, k2: K2, k3: K3, k4: K4, opts?: PluckUniqueOptions<T[K1][K2][K3][K4]>): OperatorFunction<T, T[K1][K2][K3][K4]>;
export function pluckUnique<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends T[K1][K2][K3], K5 extends T[K1][K2][K3][K4]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, opts?: PluckUniqueOptions<T[K1][K2][K3][K4][K5]>): OperatorFunction<T, T[K1][K2][K3][K4][K5]>;
export function pluckUnique<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends T[K1][K2][K3], K5 extends T[K1][K2][K3][K4], K6 extends T[K1][K2][K3][K4][K5]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, opts?: PluckUniqueOptions<T[K1][K2][K3][K4][K5][K6]>): OperatorFunction<T, T[K1][K2][K3][K4][K5][K6]>;
export function pluckUnique<T, R>(...props: [string, ...string[]]): OperatorFunction<T, R>;
export function pluckUnique<T, R>(...props: [string, ...string[], PluckUniqueOptions<R>]): OperatorFunction<T, R>;
export function pluckUnique(...props: unknown[]): OperatorFunction<unknown, unknown> {
  const last = props[props.length - 1];
  let keys = props as string[];
  let opts = DEFAULT_OPTIONS;

  if (typeof last === 'object') {
    opts = last as PluckUniqueOptions<unknown>;
    keys = keys.slice(0, -1);
  }

  return source => source.pipe(
    pluck(...keys),
    distinctUntilChanged(opts.compare),
    shareReplay(1)
  );
}

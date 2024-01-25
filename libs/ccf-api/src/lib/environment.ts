import { config } from 'dotenv';

// ---------------------
// Load .env
// ---------------------

const env = (() => {
  config();
  return process.env;
})();


// ---------------------
// Utilities
// ---------------------

function parseBoolean(value: string | undefined): boolean {
  return value === undefined ? false : value.trim().toLowerCase() === 'true';
}

function parseNumber(value: string): number | undefined {
  const num = Number(value || 'NaN');
  return isNaN(num) ? undefined : num;
}


// ---------------------
// Api
// ---------------------

export type ThrowIndicator = typeof THROW_IF_NOT_FOUND;

export const THROW_IF_NOT_FOUND = Symbol('Indicator that an error should be thrown');


export function has(key: string): boolean {
  return !!env[key];
}

export function get(key: string): string | undefined;
export function get(key: string, throwIfNotFound: ThrowIndicator): string;
export function get<D>(key: string, defaultValue: D | ThrowIndicator): string | D;
export function get<D>(key: string, defaultValue?: D | ThrowIndicator): string | D | undefined {
  if (!has(key) && defaultValue === THROW_IF_NOT_FOUND) {
    throw new Error(`Environment variable '${key}' has not been set`);
  }

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return env[key] || (defaultValue as D);
}

export function getBoolean(key: string, defaultValue?: boolean | ThrowIndicator): boolean {
  const value = get(key, defaultValue);
  return typeof value === 'boolean' ? value : parseBoolean(value);
}

export function getNumber(key: string): number | undefined;
export function getNumber(key: string, defaultValue: number | ThrowIndicator): number;
export function getNumber(key: string, defaultValue?: number | ThrowIndicator): number | undefined {
  const value = get(key, defaultValue);
  if (typeof value !== 'string') {
    return value;
  }

  const num = parseNumber(value);
  if (num === undefined && defaultValue === THROW_IF_NOT_FOUND) {
    throw new Error(`Environment variable '${key}=${value}' is not a number`);
  }

  return num ?? (defaultValue as number);
}

export function isDebug(): boolean {
  return get('NODE_ENV') !== 'production';
}

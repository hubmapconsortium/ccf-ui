import { Injectable } from '@angular/core';


/** Type of keys allowed in the global object */
export type GlobalKey = string | symbol;

/** Type of the global object */
export type GlobalThis = typeof globalThis;

declare let global: GlobalThis;

/**
 * Provide functionality for interacting with the global object.
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  /**
   * The found global object
   */
  get obj(): GlobalThis | undefined {
    const obj = this.findGlobalObject();
    // Cache value on the instance
    Object.defineProperties(this, {
      obj: {
        configurable: false,
        writable: false,
        value: obj
      }
    });

    return obj;
  }

  /**
   * Tests whether the global object has the specific key.
   * This method returns true even when the associated value
   * is undefined or null as long as the key exists.
   *
   * @param key The key
   *
   * @returns true if the key exists in the global object
   */
  has(key: GlobalKey): boolean {
    const { obj } = this;
    return obj != null && key in obj;
  }

  /**
   * Gets a value from the global object.
   *
   * @param key The key for the value
   * @param def An optional default value
   *
   * @returns The value if it exists otherwise the default value
   */
  get<K extends keyof GlobalThis>(key: K): GlobalThis[K];
  get<K extends keyof GlobalThis, D>(key: K, def: D): NonNullable<GlobalThis[K]> | D;
  get<T = unknown>(key: GlobalKey): T | null | undefined;
  get<T = unknown, D = T>(key: GlobalKey, def: D): T | D;

  get(key: GlobalKey, def?: unknown): unknown {
    const { obj } = this;
    return (obj && obj[key] as unknown) ?? def;
  }

  /**
   * Sets a value on the global object.
   *
   * @param key The key to set the value on
   * @param value The new value
   *
   * @throws TypeError if the value is readonly
   */
  set<K extends keyof GlobalThis>(key: K, value: GlobalThis[K]): void;
  set<T>(key: GlobalKey, value: T): void;

  set(key: GlobalKey, value: unknown): void {
    const { obj } = this;
    if (obj) {
      obj[key] = value;
    }
  }

  /**
   * Removes a key from the global object.
   *
   * @param key The key to remove
   *
   * @throws TypeError if the key is not removable
   */
  remove(key: GlobalKey): void {
    const { obj } = this;
    if (obj) {
      delete obj[key];
    }
  }

  /**
   * Attempt to locate the global object.
   * Can be overridden in a subclass to check other locations
   * or completely change the object. This is especially useful
   * during testing.
   *
   * @returns The global object if found
   */
  /* istanbul ignore next This is really hard to test as it depends on the global environment */
  protected findGlobalObject(): GlobalThis | undefined {
    // This should pretty much always be available unless
    // we are running in some outdated environment
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }

    // Check the common places for a global object
    if (typeof global !== 'undefined') { // Node.js environment
      return global;
    } else if (typeof window !== 'undefined') { // Browser environment
      return window;
    } else if (typeof self !== 'undefined') { // Web worker environment
      return self;
    }

    try {
      // One last try - may fail depending on content security policy (CSP) settings
      // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
      return (new Function('return this;'))() as GlobalThis | undefined;
    } catch (_ignored) { /* Ignore errors */ }

    return undefined;
  }
}

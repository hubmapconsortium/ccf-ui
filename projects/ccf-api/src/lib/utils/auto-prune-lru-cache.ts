import LRUCache from 'lru-cache';


export interface AutoPruneLRUCache<K, V> extends LRUCache<K, V> {
  startAutoPrune(force?: boolean): void;
  clearAutoPrune(force?: boolean): void;
}

export class AutoPruneLRUCache<K, V> {
  readonly cache: LRUCache<K, V>;

  private pruner?: ReturnType<typeof setInterval>;

  constructor(options?: LRUCache.Options<K, V>) {
    this.cache = new LRUCache({
      ...options,
      noDisposeOnSet: true,
      dispose: (key, value) => {
        options?.dispose?.(key, value);
        if (this.length === 0) {
          this.clearAutoPrune();
        }
      }
    });
  }

  set(key: K, value: V, maxAge?: number): boolean {
    const result = this.cache.set(key, value, maxAge);
    this.startAutoPrune();
    return result;
  }

  startAutoPrune(force = false): void {
    if (this.pruner || !this.maxAge || this.maxAge === Infinity) {
      return;
    }

    if (this.length !== 0 || force) {
      const duration = Math.max(this.maxAge, 1);
      this.pruner = setInterval(() => this.prune(), duration);
    }
  }

  clearAutoPrune(force = false): void {
    if (!this.pruner) {
      return;
    }

    if (this.length === 0 || force) {
      clearInterval(this.pruner);
      this.pruner = undefined;
    }
  }
}


// -----------------------------------
// Forward property and method calls
// -----------------------------------

type AnyAutoPruneLRUCache = AutoPruneLRUCache<unknown, unknown>;

const readonlyProperties = [
  'length', 'itemCount'
];
const mutableProperties = [
  'lengthCalculator', 'allowStale', 'max', 'maxAge'
];
const methods = [
  // NOTE: No set method as it is overwritten by AutoPruneLRUCache
  'has', 'get', 'del', 'peek',
  'keys', 'values',
  'forEach', 'rforEach',
  'prune', 'reset',
  'dump', 'load'
];


readonlyProperties.forEach(prop => Object.defineProperty(AutoPruneLRUCache.prototype, prop, {
  get(this: AnyAutoPruneLRUCache): unknown {
    return this.cache[prop];
  }
}));

mutableProperties.forEach(prop => Object.defineProperty(AutoPruneLRUCache.prototype, prop, {
  get(this: AnyAutoPruneLRUCache): unknown {
    return this.cache[prop];
  },
  set(this: AnyAutoPruneLRUCache, value: unknown): void {
    this.cache[prop] = value;
  }
}));

methods.forEach(prop => Object.defineProperty(AutoPruneLRUCache.prototype, prop, {
  value(this: AnyAutoPruneLRUCache, ...args: unknown[]): unknown {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return this.cache[prop](...args);
  }
}));

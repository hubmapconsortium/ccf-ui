import { BackgroundFetch, LRUCache } from 'lru-cache';

// eslint-disable-next-line @typescript-eslint/ban-types
type AnyObject = {};

export interface AutoPruneLRUCacheOptions<K, V> {
  max?: number;
  maxAge?: number;
  dispose?: (key: K, value: V) => void;
}

export class AutoPruneLRUCache<K extends AnyObject, V extends AnyObject> extends LRUCache<K, V> {
  private pruner?: ReturnType<typeof setInterval>;

  constructor(options?: AutoPruneLRUCacheOptions<K, V>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      max: options?.max ?? 100000,
      ttl: options?.maxAge ?? 0,
      ttlAutopurge: (options?.maxAge ?? 0) > 0,
      noDisposeOnSet: false,
      dispose: (value, key) => {
        options?.dispose?.(key, value);
        if (this.size === 0) {
          this.clearAutoPrune();
        }
      }
    });
  }

  set(key: K, value: V | BackgroundFetch<V> | undefined, options?: number | LRUCache.SetOptions<K, V, unknown>): this {
    const setOptions = typeof options === 'number' ? { ttl: options } : options;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    super.set(key, value, setOptions);
    this.startAutoPrune();
    return this;
  }

  startAutoPrune(force = false): void {
    if (this.pruner ?? !this.ttl ?? this.ttl === Infinity) {
      return;
    }

    if (this.size !== 0 || force) {
      const duration = Math.max(this.ttl, 1);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.pruner = setInterval(() => this.purgeStale(), duration);
    }
  }

  clearAutoPrune(force = false): void {
    if (!this.pruner) {
      return;
    }

    if (this.ttl === 0 || force) {
      clearInterval(this.pruner);
      this.pruner = undefined;
    }
  }
}

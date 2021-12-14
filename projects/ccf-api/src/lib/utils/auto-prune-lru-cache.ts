import LRUCache from 'lru-cache';


type DisposeCallback<K, V> = NonNullable<LRUCache.Options<K, V>['dispose']>;
type BoundDisposeCallback<K, V> = DisposeCallback<K, V> & { cache?: AutoPruneLRUCache<K, V> };


function createDisposer<K, V>(original?: DisposeCallback<K, V>): BoundDisposeCallback<K, V> {
  const dispose: BoundDisposeCallback<K, V> = (key, value) => {
    original?.(key, value);
    if (dispose.cache?.length === 0) {
      dispose.cache.clearAutoPrune();
    }
  };

  return dispose;
}


export class AutoPruneLRUCache<K, V> extends LRUCache<K, V> {
  private pruner?: ReturnType<typeof setInterval>;

  constructor(options?: LRUCache.Options<K, V>) {
    const dispose = createDisposer(options?.dispose);
    super({ ...options, noDisposeOnSet: true, dispose });

    // dispose cannot bind `this` earlier since it is not available before the super call
    dispose.cache = this;
  }

  set(key: K, value: V, maxAge?: number): boolean {
    const result = super.set(key, value, maxAge);
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

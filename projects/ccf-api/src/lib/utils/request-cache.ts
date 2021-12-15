import LRUCache from 'lru-cache';


export class RequestCache<K, V> {
  constructor(
    readonly cache: LRUCache<K, Promise<V>>,
    readonly doRequest: (key: K, ...args: unknown[]) => V | Promise<V>
  ) { }

  get(key: K, ...args: unknown[]): Promise<V> {
    const { cache } = this;
    let result = cache.get(key);

    if (!result) {
      result = this.promisifiedDoRequest(key, ...args);
      cache.set(key, result);
      this.handleErrors(key, result);
    }

    return result;
  }

  private async promisifiedDoRequest(key: K, ...args: unknown[]): Promise<V> {
    return this.doRequest(key, ...args);
  }

  private async handleErrors(key: K, request: Promise<V>): Promise<void> {
    const { cache } = this;

    try {
      await request;
    } catch (_error) {
      if (cache.get(key) === request) {
        cache.del(key);
      }
    }
  }
}

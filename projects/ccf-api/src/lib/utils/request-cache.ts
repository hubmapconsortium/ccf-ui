import LRUCache from 'lru-cache';


export class RequestCache<K, V> {
  constructor(
    readonly cache: LRUCache<K, Promise<V>>,
    readonly doRequest: (key: K) => V | Promise<V>
  ) { }

  get(key: K): Promise<V> {
    const { cache } = this;
    let result = cache.get(key);

    if (!result) {
      result = this.promisifiedDoRequest(key);
      cache.set(key, result);
      this.handleErrors(key, result);
    }

    return result;
  }

  private async promisifiedDoRequest(key: K): Promise<V> {
    return this.doRequest(key);
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

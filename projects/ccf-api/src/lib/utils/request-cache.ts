import { LRUCache } from 'lru-cache';

// eslint-disable-next-line @typescript-eslint/ban-types
type AnyObject = {};

export class RequestCache<K extends AnyObject, V> {
  constructor(
    readonly cache: LRUCache<K, Promise<V>>,
    readonly doRequest: (key: K, ...args: unknown[]) => V | Promise<V>
  ) { }

  get(key: K, ...args: unknown[]): Promise<V> {
    const { cache } = this;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    let result = cache.get(key);

    if (!result) {
      result = this.promisifiedDoRequest(key, ...args);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
      if (this.get(key) === request) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        cache.delete(key);
      }
    }
  }
}

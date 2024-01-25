import { RequestHandler } from 'express';
import { AutoPruneLRUCache } from '../utils/auto-prune-lru-cache';


export interface CacheOptions {
  max?: number;
  maxAge?: number;
}


function parseBoolean(value: unknown, defaultValue = false): boolean {
  if (value === undefined) {
    return defaultValue;
  }

  return `${value}`.toLowerCase() === 'true';
}


export function cacheResponses(options?: CacheOptions): RequestHandler {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type AnyObject = {};
  const cache = new AutoPruneLRUCache<string, AnyObject>({
    max: options?.max ?? 100,
    maxAge: options?.maxAge ?? 60 * 60 * 1000
  });

  return (req, res, next) => {
    const { query, originalUrl, url } = req;
    const useCache = parseBoolean(query.cache, true);
    const key = `__${ originalUrl || url }`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const cachedResponse = cache.get(key);

    if (!useCache) {
      next();
    } else if (cachedResponse !== undefined) {
      res.json(cachedResponse);
    } else {
      const originalSend = res.json;
      res.json = body => {
        cache.set(key, body);
        return originalSend.call(res, body);
      };

      next();
    }
  };
}

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
  const cache = new AutoPruneLRUCache<string, unknown>({
    max: 100,
    maxAge: 60 * 60 * 1000,
    ...options
  });

  return (req, res, next) => {
    const { query, originalUrl, url } = req;
    const useCache = parseBoolean(query.cache, true);
    const key = `__${ originalUrl || url }`;
    const cachedResponse = cache.get(key);

    if (!useCache) {
      next();
    } else if (cachedResponse !== undefined) {
      res.send(cachedResponse);
    } else {
      const originalSend = res.send;
      res.send = body => {
        cache.set(key, body);
        return originalSend.call(res, body);
      };

      next();
    }
  };
}

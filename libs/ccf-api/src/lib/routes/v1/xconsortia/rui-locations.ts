import { searchXConsortia } from 'ccf-database';
import { RequestHandler } from 'express';
import { AutoPruneLRUCache } from '../../../utils/auto-prune-lru-cache';
import { RequestCache } from '../../../utils/request-cache';


async function getLocations(_cacheKey: string, options: { dataUrl: string; token: string }): Promise<unknown> {
  const result = await searchXConsortia(
    options.dataUrl,
    'search-api',
    undefined,
    options.token || undefined
  );

  return result;
}

export function ruiLocations(dataUrl: string): RequestHandler {
  const cache = new RequestCache<string, unknown>(
    new AutoPruneLRUCache({
      max: 10,
      maxAge: 60 * 60 * 1000
    }),
    getLocations
  );

  return async (req, res, _next) => {
    const rawToken = req.query.token;
    const token = typeof rawToken === 'string' ? rawToken : '';
    const options = { dataUrl, token };
    const result = await cache.get(dataUrl+token, options);

    if (result) {
      res.json(result);
    } else {
      res.status(500).json([]);
    }
  };
}

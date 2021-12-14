import { CCFDatabaseOptions, searchHubmap } from 'ccf-database';
import { RequestHandler } from 'express';

import { AutoPruneLRUCache } from '../../utils/auto-prune-lru-cache';
import { RequestCache } from '../../utils/request-cache';


async function getLocations(options: CCFDatabaseOptions): Promise<unknown> {
  const result = await searchHubmap(
    options.hubmapDataUrl,
    options.hubmapDataService,
    options.hubmapQuery,
    options.hubmapToken,
    options.hubmapAssetsUrl,
    options.hubmapPortalUrl
  );

  if (result === undefined) {
    throw new Error('No data available');
  }

  return result;
}


export function ruiLocations(): RequestHandler {
  const cache = new RequestCache<CCFDatabaseOptions, unknown>(
    new AutoPruneLRUCache({
      max: 1,
      maxAge: 60 * 60 * 1000
    }),
    getLocations
  );

  return async (req, res, _next) => {
    res.json(await cache.get(req.app.get('database-options')));
  };
}

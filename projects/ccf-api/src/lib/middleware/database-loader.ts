import { CCFDatabaseOptions } from 'ccf-database';
import { Request, RequestHandler } from 'express';

import { AutoPruneLRUCache } from '../utils/auto-prune-lru-cache';
import { CCFDatabaseInstance, createCCFDatabaseWorker } from '../utils/ccf-database-worker';
import { RequestCache } from '../utils/request-cache';


export interface DatabaseCacheOptions {
  max?: number;
  maxAge?: number;
}

export interface DatabaseLoaderOptions {
  database: CCFDatabaseOptions;
  cache?: DatabaseCacheOptions;
}


function selectToken(token: string | undefined, req: Request): string {
  const qtoken = req.query.token;

  if (token) {
    return token;
  } else if (typeof qtoken === 'string' && qtoken) {
    return qtoken;
  }

  return '';
}

function createDatabase(token: string, options: CCFDatabaseOptions): Promise<CCFDatabaseInstance> {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const hubmapToken = token || options.hubmapToken || undefined;

  return createCCFDatabaseWorker({
    ...options,
    hubmapDataUrl: '', // Do not use deprecated internal hubmap data loading
    dataSources: options.dataSources.map(s =>
      hubmapToken && typeof s === 'string' && s.endsWith('hubmap/rui_locations.jsonld') ? `${s}?token=${hubmapToken}` : s
    )
  });
}

export function databaseLoader(options: DatabaseLoaderOptions): RequestHandler {
  const cache = new RequestCache<string, CCFDatabaseInstance>(
    new AutoPruneLRUCache({
      max: 10,
      maxAge: 60 * 60 * 1000,
      dispose: (_key, instance) => instance.then((r) => r.dispose()),
      ...options.cache
    }),
    token => createDatabase(token, options.database)
  );

  return (req, _res, next) => {
    req['getDatabase'] = (token?: string) => cache.get(selectToken(token, req))?.then((instance) => instance.database);
    next();
  };
}

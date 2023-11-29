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

type DatabaseGetter = (token?: string) => Promise<CCFDatabaseInstance>;

export async function getDatabaseInstance(req: Request, token: string | undefined, doConnect = false): Promise<CCFDatabaseInstance> {
  const getDBInstance = req['getDatabase'] as DatabaseGetter;
  const dbInstance = await getDBInstance(token);
  if (doConnect) {
    await dbInstance.database.connect().catch((err) => console.log(err));
  }
  return dbInstance;
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
  const xConsortiaToken = token || options.hubmapToken || undefined;

  return createCCFDatabaseWorker({
    ...options,
    hubmapDataUrl: '', // Do not use deprecated internal hubmap data loading
    dataSources: options.dataSources.map(s =>
      xConsortiaToken && typeof s === 'string' && (
           (!xConsortiaToken.startsWith('SNT-') && s.endsWith('hubmap/rui_locations.jsonld'))
        || (xConsortiaToken.startsWith('SNT-') && s.endsWith('sennet/rui_locations.jsonld'))
      ) ? `${s}?token=${xConsortiaToken}` : s)
  });
}

export function databaseLoader(options: DatabaseLoaderOptions): RequestHandler {
  const cache = new RequestCache<string, CCFDatabaseInstance>(
    new AutoPruneLRUCache({
      max: options.cache?.max ?? 10,
      maxAge: options.cache?.maxAge ?? 60 * 60 * 1000,
      dispose: (_key, instance) => instance.then((r) => r.dispose())
    }),
    token => createDatabase(token, options.database)
  );

  return (req, _res, next) => {
    cache.cache.purgeStale();
    req['getDatabase'] = (token?: string) => cache.get(selectToken(token, req));
    next();
  };
}

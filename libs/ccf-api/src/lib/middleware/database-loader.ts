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
  const xConsortiaTokens = (token || options.hubmapToken || '').split('|').filter(s => !!s);

  let applyToken = (url: string) => url;

  if (xConsortiaTokens.length > 0) {
    const hubmapToken = xConsortiaTokens.find((t) => t.startsWith('HBM-') || !t.startsWith('SNT-'))?.replace(/^HBM-/, '');
    const sennetToken = xConsortiaTokens.find((t) => t.startsWith('SNT-'))?.replace(/^SNT-/, '');

    applyToken = (url: string) => {
      if (typeof url === 'string' && url) {
        const isHuBMAP = url.endsWith('hubmap/rui_locations.jsonld');
        const isSenNet = url.endsWith('sennet/rui_locations.jsonld');

        if (isHuBMAP && hubmapToken) {
          url = `${url}?token=${hubmapToken}`;
        } else if (isSenNet && sennetToken) {
          url = `${url}?token=${sennetToken}`;
        }
      }
      return url;
    };
  }

  return createCCFDatabaseWorker({
    ...options,
    hubmapDataUrl: '', // Do not use deprecated internal hubmap data loading
    dataSources: options.dataSources.map(applyToken)
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

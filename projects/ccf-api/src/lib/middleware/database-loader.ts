import { CCFDatabase, CCFDatabaseOptions } from 'ccf-database';
import { Request, RequestHandler } from 'express';

import { AutoPruneLRUCache } from '../utils/auto-prune-lru-cache';
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

async function createDatabase(token: string, options: CCFDatabaseOptions): Promise<CCFDatabase> {
  const hubmapToken = token || options.hubmapToken;
  const database = new CCFDatabase({ ...options, hubmapToken });

  await database.connect();
  return database;
}


export function databaseLoader(options: DatabaseLoaderOptions): RequestHandler {
  const cache = new RequestCache<string, CCFDatabase>(
    new AutoPruneLRUCache({
      max: 10,
      maxAge: 60 * 60 * 1000,
      ...options.cache
    }),
    token => createDatabase(token, options.database)
  );

  return (req, _res, next) => {
    req['getDatabase'] = (token?: string) => cache.get(selectToken(token, req));
    next();
  };
}

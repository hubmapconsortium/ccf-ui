import { CCFDatabase, CCFDatabaseOptions } from 'ccf-database';
import { Request, RequestHandler } from 'express';
import LRUCache from 'lru-cache';


type LRUKeyT = string | typeof PUBLIC_DATABASE_TOKEN;
type LRUValT = CCFDatabase;

export type DatabaseCacheOptions = Pick<LRUCache.Options<LRUKeyT, LRUValT>, 'max' | 'maxAge'>;

export interface DatabaseLoaderOptions {
  database: CCFDatabaseOptions;
  cache?: DatabaseCacheOptions;
}


const DEFAULT_CACHE_MAX = 10;
const DEFAULT_CACHE_MAX_AGE = 60 * 60 * 1000; // One hour in ms
const PUBLIC_DATABASE_TOKEN = Symbol('Database Token');


function getDatabaseToken({ query: { token } }: Request): LRUKeyT {
  return typeof token === 'string' ? token : PUBLIC_DATABASE_TOKEN;
}

function createDatabase(token: LRUKeyT, options: CCFDatabaseOptions): LRUValT {
  return new CCFDatabase({
    ...options,
    hubmapToken: token !== PUBLIC_DATABASE_TOKEN ? token : options.hubmapToken
  });
}


export function databaseLoader(options: DatabaseLoaderOptions): RequestHandler {
  const cache = new LRUCache<LRUKeyT, LRUValT>({
    max: DEFAULT_CACHE_MAX,
    maxAge: DEFAULT_CACHE_MAX_AGE,
    ...options.cache
  });

  if (cache.maxAge > 0) {
    setInterval(() => cache.prune(), cache.maxAge);
  }

  return async (req, _res, next) => {
    const token = getDatabaseToken(req);
    let database = cache.get(token);
    if (!database) {
      database = createDatabase(token, options.database);
      cache.set(token, database);
    }

    req.database = database;
    await database.connect();
    next();
  };
}

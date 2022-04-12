import { CCFDatabase, Filter } from 'ccf-database';
import { RequestHandler } from 'express';

import { CCFDatabaseInstance } from '../../../utils/ccf-database-worker';
import { queryParametersToFilter } from './parse-filter';


type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

type DatabaseGetter = (token?: string) => Promise<CCFDatabaseInstance>;

export type DatabaseQueryMethods = keyof PickByType<CCFDatabase, (filter: Filter) => unknown>;


export function forwardDatabaseQuery(method: DatabaseQueryMethods): RequestHandler {
  return async (req, res, _next) => {
    const { query } = req;
    const rawToken = query.token;
    const token = typeof rawToken === 'string' ? rawToken : '';
    const filter = queryParametersToFilter(query);
    const getDatabase: DatabaseGetter = req['getDatabase'];
    const dbInstance = await getDatabase(token);

    if (dbInstance.status.status !== 'Error') {
      const database = dbInstance.database;
      await database.connect();
      const result = await database[method](filter);
      res.json(result);
    } else {
      res.status(500).json({ 'error': dbInstance.status.message });
    }
  };
}

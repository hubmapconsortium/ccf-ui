import { CCFDatabase, Filter } from 'ccf-database';
import { RequestHandler } from 'express';

import { getDatabaseInstance } from '../../../middleware/database-loader';
import { queryParametersToFilter } from './parse-filter';


type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

export type DatabaseQueryMethods = keyof PickByType<CCFDatabase, (filter: Filter) => unknown>;

export function forwardDatabaseQuery(method: DatabaseQueryMethods): RequestHandler {
  return async (req, res, _next) => {
    const { query } = req;
    const rawToken = query.token;
    const token = typeof rawToken === 'string' ? rawToken : '';
    const filter = queryParametersToFilter(query);

    const dbInstance = await getDatabaseInstance(req, token, true);
    if (dbInstance.status.status !== 'Error') {
      const result = await dbInstance.database[method](filter);

      res.json(result);
    } else {
      res.status(500).json({ 'error': dbInstance.status.message });
    }
  };
}

import { CCFDatabase, Filter } from 'ccf-database';
import { RequestHandler } from 'express';

import { queryParametersToFilter } from './parse-filter';


type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

export type DatabaseQueryMethods = keyof PickByType<CCFDatabase, (filter: Filter) => unknown>;


export function forwardDatabaseQuery(method: DatabaseQueryMethods): RequestHandler {
  return async (req, res, _next) => {
    const { database, query } = req;
    const filter = queryParametersToFilter(query);
    const result = await database[method](filter);

    res.json(result);
  };
}

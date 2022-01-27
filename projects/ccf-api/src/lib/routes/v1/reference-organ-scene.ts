import { CCFDatabase } from 'ccf-database';
import { RequestHandler } from 'express';

import { queryParametersToFilter } from './utils/parse-filter';


type DatabaseGetter = (token?: string) => Promise<CCFDatabase>;


function parseString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}


export function getReferenceOrganSceneHandler(): RequestHandler {
  return async (req, res, _next) => {
    const { query } = req;
    const { token: rawToken, 'organ-iri': rawOrganIri } = query;
    const token = parseString(rawToken) ?? '';
    const organIri = parseString(rawOrganIri);
    const filter = queryParametersToFilter(query);
    const getDatabase: DatabaseGetter = req['getDatabase'];

    if (!organIri) {
      res.status(404).send('Must provide an organ-iri query parameter');
      return;
    }

    const database = await getDatabase(token);
    const result = await database.getReferenceOrganScene(organIri, filter);

    res.json(result);
  };
}

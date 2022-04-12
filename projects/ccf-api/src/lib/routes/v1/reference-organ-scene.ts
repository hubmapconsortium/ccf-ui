import { RequestHandler } from 'express';

import { CCFDatabaseInstance } from '../../utils/ccf-database-worker';
import { queryParametersToFilter } from './utils/parse-filter';


type DatabaseGetter = (token?: string) => Promise<CCFDatabaseInstance>;


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

    const dbInstance = await getDatabase(token);
    const status = await dbInstance.database.getDatabaseStatus();
    if (status.status !== 'Error') {
      const database = await dbInstance.database.connect().then(() => dbInstance.database);
      const result = await database.getReferenceOrganScene(organIri, filter);
      res.json(result);
    } else {
      res.status(500).json({ 'error': status.message });
    }
  };
}

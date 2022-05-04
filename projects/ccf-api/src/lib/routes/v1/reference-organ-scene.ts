import { RequestHandler } from 'express';

import { getDatabaseInstance } from '../../middleware/database-loader';
import { queryParametersToFilter } from './utils/parse-filter';


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

    if (!organIri) {
      res.status(404).send('Must provide an organ-iri query parameter');
      return;
    }

    const dbInstance = await getDatabaseInstance(req, token, true);
    if (dbInstance.status.status !== 'Error') {
      const result = await dbInstance.database.getReferenceOrganScene(organIri, filter);

      res.json(result);
    } else {
      res.status(500).json({ 'error': dbInstance.status.message });
    }
  };
}

import { RequestHandler } from 'express';

import { CCFDatabaseInstance } from '../../utils/ccf-database-worker';


type DatabaseGetter = (token?: string) => Promise<CCFDatabaseInstance>;

function parseString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export function getSpatialPlacement(): RequestHandler {
  return async (req, res, _next) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { target_iri, rui_location } = req.body;
    const targetIri = parseString(target_iri);
    const getDatabase: DatabaseGetter = req['getDatabase'];

    if (!targetIri) {
      res.status(404).send('Must provide a target_iri in the request body');
      return;
    }
    if (!rui_location) {
      res.status(404).send('Must provide a rui_location in the request body');
      return;
    }

    const dbInstance = await getDatabase();
    const status = await dbInstance.database.getDatabaseStatus();
    if (status.status !== 'Error') {
      const database = await dbInstance.database.connect().then(() => dbInstance.database);
      const result = await database.getSpatialPlacement(rui_location, targetIri);
      if (!result) {
        res.status(404).json({ 'error': 'Placement path not found from rui_location to targetIri' });
      } else {
        res.json(result);
      }
    } else {
      res.status(500).json({ 'error': status.message });
    }
  };
}

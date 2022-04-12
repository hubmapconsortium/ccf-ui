import { RequestHandler } from 'express';
import { CCFDatabaseInstance } from '../../utils/ccf-database-worker';


type DatabaseGetter = (token?: string) => Promise<CCFDatabaseInstance>;

function parseString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export function getDatabaseStatus(): RequestHandler {
  return async (req, res, _next) => {
    const { query } = req;
    const { token: rawToken } = query;
    const token = parseString(rawToken) ?? '';
    const getDatabase: DatabaseGetter = req['getDatabase'];
    const dbInstance = await getDatabase(token);

    res.json(dbInstance.status.toJson());
  };
}

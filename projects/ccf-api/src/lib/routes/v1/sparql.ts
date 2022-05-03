import { RequestHandler } from 'express';

import { CCFDatabaseInstance } from '../../utils/ccf-database-worker';


type DatabaseGetter = (token?: string) => Promise<CCFDatabaseInstance>;

function parseString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export function sparql(): RequestHandler {
  return async (req, res, _next) => {
    let queryBody: string | undefined;
    const token = parseString(req.query.token) ?? '';
    const format = parseString(req.query.format);
    switch (req.method) {
      case 'POST':
        queryBody = parseString((req.body as { query: string })?.query);
        break;
      case 'GET':
        queryBody = parseString(req.query.query);
        break;
      default:
        res.status(405).send('Unsupported operation.');
        res.end();
        return;
    }

    /** Content Negotiation */
    let mediaType = 'application/sparql-results+json';
    if (format) {
      mediaType = format;
      if (['simple', 'stats', 'table', 'tree'].includes(format)) {
        res.type('text/plain');
      } else {
        res.type(format);
      }
    } else {
      const mediaTypes: Record<string, () => void> = [
        'application/json',
        'application/ld+json',
        'application/n-quads',
        'application/n-triples',
        'application/sparql-results+json',
        'application/sparql-results+xml',
        'application/trig',
        'simple',
        'stats',
        'table',
        'text/csv',
        'text/n3',
        'text/tab-separated-values',
        'text/turtle',
        'tree'
      ].reduce((acc, type) => {
        acc[type] = () => {
          mediaType = type;
        };
        return acc;
      }, {
        'text/plain': () => {
          mediaType = 'simple';
        }
      });
      res.format(mediaTypes);
    }

    const getDatabase: DatabaseGetter = req['getDatabase'];
    const dbInstance = await getDatabase(token);
    const status = await dbInstance.database.getDatabaseStatus();
    if (status.status !== 'Error' && queryBody) {
      await dbInstance.database.connect();

      dbInstance.sparqlQuery(queryBody, mediaType).then(result => {
        res.send(result);
      }).catch((err: { message: string }) => {
        res.status(500).json({ 'error': err?.message ?? err });
      });
    } else {
      res.status(500).json({ 'error': status.message });
    }
  };
}

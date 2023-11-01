/* eslint-disable @typescript-eslint/naming-convention */
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import qs, { ParsedQs } from 'qs';

import { databaseLoader, DatabaseLoaderOptions } from './middleware/database-loader';
import { routes as browserRoutes } from './routes/browser';
import { routes as v1Routes } from './routes/v1';

export interface AppOptions extends DatabaseLoaderOptions {
  placeholder?: never;
}


export function createApp(options: AppOptions): Express {
  const app = express();

  app.set('database-options', options.database);

  app.set('query parser', function (str: string): ParsedQs {
    return qs.parse(str, { allowDots: true });
  });

  // http://expressjs.com/en/advanced/best-practice-security.html
  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': ['\'self\'', '\'unsafe-eval\'', 'cdn.jsdelivr.net', 'unpkg.com'],
        'connect-src': ['*'],
      }
    }
  }));
  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(databaseLoader(options));

  app.use('/', browserRoutes);
  app.use('/v1', v1Routes);

  return app;
}

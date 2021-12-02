import express, { Express } from 'express';
import helmet from 'helmet';


export interface AppOptions {
  placeholder?: never;
}


export function createApp(_options: AppOptions = {}): Express {
  const app = express();

  // http://expressjs.com/en/advanced/best-practice-security.html
  app.use(helmet());
  // Maybe TODO: Cookie configuration?

  return app;
}

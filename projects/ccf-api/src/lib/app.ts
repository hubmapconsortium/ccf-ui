import express, { Express } from 'express';


export interface AppOptions {
  placeholder?: never;
}


export function createApp(_options: AppOptions = {}): Express {
  const app = express();

  return app;
}

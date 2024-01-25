import { RequestHandler } from 'express';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { get } from '../../../environment';

const CACHE_DIR = get('CCF_API_CACHE', 'projects/ccf-api/ccf-cache');

export function useCachedResult(filename: string): RequestHandler {
  const filepath = resolve(CACHE_DIR, filename);
  return async (_req, res, next) => {
    if (existsSync(filepath)) {
      res.sendFile(filepath);
    } else {
      next();
    }
  };
}

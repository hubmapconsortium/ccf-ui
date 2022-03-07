import { RequestHandler, Router } from 'express';
import { env } from 'process';

import { ruiLocations } from './rui-locations';


const checkRoutesEnabled: RequestHandler = (_req, _res, next) => {
  const enabled = env.GTEX_ROUTES === 'true';
  enabled ? next() : next('router');
};


export const routes = Router()
  .use(checkRoutesEnabled)
  .get('/rui_locations.jsonld', ruiLocations());

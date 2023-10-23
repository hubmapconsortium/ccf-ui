import { RequestHandler, Router } from 'express';
import { env } from 'process';
import { ruiLocations } from './rui-locations';


const checkRoutesEnabled: RequestHandler = (_req, _res, next) => {
  const enabled = env.XCONSORTIA_ROUTES === 'true';
  enabled ? next() : next('router');
};

export const routes = Router()
  .use(checkRoutesEnabled)
  .get('/sennet/rui_locations.jsonld', ruiLocations('https://search.api.sennetconsortium.org/entities/search'))
  .get('/hubmap/rui_locations.jsonld', ruiLocations('https://search.api.hubmapconsortium.org/v3/entities/search'));

import { Router } from 'express';

import { ruiLocations } from './rui-locations';


export const routes = Router()
  .get('/rui_locations.jsonld', ruiLocations());

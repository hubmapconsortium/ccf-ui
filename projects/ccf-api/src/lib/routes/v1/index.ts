import { Router } from 'express';

import { cacheResponses } from '../../middleware/response-cache';
import { routes as hubmapRoutes } from './hubmap';
import { routes as gtexRoutes } from './gtex';
import { getReferenceOrganSceneHandler } from './reference-organ-scene';
import { forwardDatabaseQuery } from './utils/forward-database-query';


export const routes = Router()
  .use(cacheResponses())
  .use('/hubmap', hubmapRoutes)
  .use('/gtex', gtexRoutes)
  .get('/tissue-blocks', forwardDatabaseQuery('getTissueBlockResults'))
  .get('/technology-names', forwardDatabaseQuery('getDatasetTechnologyNames'))
  .get('/provider-names', forwardDatabaseQuery('getProviderNames'))
  .get('/aggregate-results', forwardDatabaseQuery('getAggregateResults'))
  .get('/ontology-term-occurences', forwardDatabaseQuery('getOntologyTermOccurences'))
  .get('/ontology-tree-model', forwardDatabaseQuery('getOntologyTreeModel'))
  .get('/reference-organs', forwardDatabaseQuery('getReferenceOrgans'))
  .get('/scene', forwardDatabaseQuery('getScene'))
  .get('/reference-organ-scene', getReferenceOrganSceneHandler());

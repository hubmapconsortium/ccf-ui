import { Router } from 'express';

import { cacheResponses } from '../../middleware/response-cache';
import { getDatabaseStatus } from './database-status';
import { getSpatialPlacement } from './get-spatial-placement';
import { routes as gtexRoutes } from './gtex';
import { routes as xConsortiaRoutes } from './xconsortia';
import { getReferenceOrganSceneHandler } from './reference-organ-scene';
import { sparql } from './sparql';
import { forwardDatabaseQuery } from './utils/forward-database-query';
import { useCachedResult } from './utils/use-cached-result';


export const routes = Router()
  .use('/db-status', getDatabaseStatus())
  .post('/get-spatial-placement', getSpatialPlacement())
  .use('/sparql', sparql())
  .use('/ccf.owl.n3store.json', useCachedResult('ccf.owl.n3store.json'))
  .use(cacheResponses())
  .use('/', xConsortiaRoutes)
  .use('/gtex', gtexRoutes)
  .get('/tissue-blocks', forwardDatabaseQuery('getTissueBlockResults'))
  .get('/technology-names', forwardDatabaseQuery('getDatasetTechnologyNames'))
  .get('/provider-names', forwardDatabaseQuery('getProviderNames'))
  .get('/aggregate-results', forwardDatabaseQuery('getAggregateResults'))
  .get('/ontology-term-occurences', forwardDatabaseQuery('getOntologyTermOccurences'))
  .get('/cell-type-term-occurences', forwardDatabaseQuery('getCellTypeTermOccurences'))
  .get('/biomarker-tree-model', forwardDatabaseQuery('getBiomarkerTreeModel'))
  .get('/biomarker-term-occurences', forwardDatabaseQuery('getBiomarkerTermOccurences'))
  .get('/ontology-tree-model', useCachedResult('ontology-tree-model.json'), forwardDatabaseQuery('getOntologyTreeModel'))
  .get('/cell-type-tree-model', useCachedResult('cell-type-tree-model.json'), forwardDatabaseQuery('getCellTypeTreeModel'))
  .get('/reference-organs', useCachedResult('reference-organs.json'), forwardDatabaseQuery('getReferenceOrgans'))
  .get('/scene', forwardDatabaseQuery('getScene'))
  .get('/reference-organ-scene', getReferenceOrganSceneHandler());

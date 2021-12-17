import { Router } from 'express';

import { routes as hubmapRoutes } from './hubmap';
import { forwardDatabaseQuery } from './utils/forward-database-query';


export const routes = Router()
  .use('/hubmap', hubmapRoutes)
  .get('/tissue-blocks', forwardDatabaseQuery('getTissueBlockResults'))
  .get('/technology-names', forwardDatabaseQuery('getDatasetTechnologyNames'))
  .get('/provider-names', forwardDatabaseQuery('getProviderNames'))
  .get('/aggregate-results', forwardDatabaseQuery('getAggregateResults'))
  .get('/ontology-term-occurences', forwardDatabaseQuery('getOntologyTermOccurences'))
  .get('/ontology-tree-model', forwardDatabaseQuery('getOntologyTreeModel'))
  .get('/reference-organs', forwardDatabaseQuery('getReferenceOrgans'))
  .get('/scene', forwardDatabaseQuery('getScene'));

import { Router } from 'express';
import { forwardDatabaseQuery } from './utils/forward-database-query';


export const routes = Router()
  .get('/tissue-blocks', forwardDatabaseQuery('getTissueBlockResults'))
  .get('/technology-names', forwardDatabaseQuery('getDatasetTechnologyNames'))
  .get('/provider-names', forwardDatabaseQuery('getProviderNames'))
  .get('/aggregate-results', forwardDatabaseQuery('getAggregateResults'))
  .get('/ontology-term-occurences', forwardDatabaseQuery('getOntologyTermOccurences'))
  .get('/ontology-tree-model', forwardDatabaseQuery('getOntologyTreeModel'))
  .get('/reference-organs', forwardDatabaseQuery('getReferenceOrgans'))
  .get('/scene', forwardDatabaseQuery('getScene'));

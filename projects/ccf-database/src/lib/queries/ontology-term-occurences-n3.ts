import { N3Store } from 'triple-store-utils';

import { entity } from '../util/prefixes';


/**
 * Get number of occurrences of ontology terms for a set of ids.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns Ontology term counts.
 */
export function getOntologyTermOccurences(ids: Set<string>, store: N3Store): Record<string, number> {
  const counts: Record<string, number> = {};
  store.some((quad) => {
    if (ids.has(quad.subject.id)) { counts[quad.object.id] = 1 + (counts[quad.object.id] || 0); }
    return false;
  }, null, entity.ontologyTerms, null, null);
  return counts;
}

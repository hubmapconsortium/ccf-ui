import { Store } from 'triple-store-utils';

import { ccf, entity } from '../util/prefixes';


/**
 * Get number of occurrences of ontology terms for a set of ids.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns Ontology term counts.
 */
export function getOntologyTermOccurences(ids: Set<string>, store: Store): Record<string, number> {
  const spatial2entity = new Map<string, string[]>();
  store.some((quad) => {
    if (ids.has(quad.subject.id)) {
      if (!spatial2entity.has(quad.object.id)) {
        spatial2entity.set(quad.object.id, [quad.subject.id]);
      } else {
        spatial2entity.get(quad.object.id)?.push(quad.subject.id);
      }
    }
    return false;
  }, null, entity.spatialEntity, null, null);

  const counts: Record<string, number> = {};
  store.some((quad) => {
    if (spatial2entity.has(quad.subject.id)) {
      const numEntities = spatial2entity.get(quad.subject.id)?.length ?? 0;
      counts[quad.object.id] = numEntities + (counts[quad.object.id] || 0);
    }
    return false;
  }, null, ccf.spatialEntity.ccf_annotations, null, null);

  return counts;
}

import { N3Store } from 'triple-store-utils';

import { AggregateResult } from '../interfaces';
import { entity } from '../util/prefixes';


/**
 * Computes aggregate results.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns The list of aggregate results.
 */
export function getAggregateResults(ids: Set<string>, store: N3Store): AggregateResult[] {
  const centers = new Set<string>();
  store.some((quad) => {
    if (ids.has(quad.subject.id)) { centers.add(quad.object.id); }
    return false;
  }, null, entity.groupUUID, null, null);

  const donors = new Set<string>();
  store.some((quad) => {
    if (ids.has(quad.subject.id)) { donors.add(quad.object.id); }
    return false;
  }, null, entity.donor, null, null);

  const spatialEntities = new Set<string>();
  store.forSubjects((subject) => {
    if (ids.has(subject.id)) { spatialEntities.add(subject.id); }
  }, entity.spatialEntity, null, null);

  const results: { [key: string]: number } = {
    Centers: centers.size,
    Donors: donors.size,
    Samples: spatialEntities.size
  };

  return Object.entries(results).map(([label, count]) => ({ label, count }));
}

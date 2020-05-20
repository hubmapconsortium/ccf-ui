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
  const spatialEntities = new Set<string>();
  store.forSubjects((subject) => {
    if (ids.has(subject.id)) { spatialEntities.add(subject.id); }
  }, entity.spatialEntity, null, null);

  const groups = new Set<string>();
  store.some((quad) => {
    if (ids.has(quad.subject.id)) { groups.add(quad.object.id); }
    return false;
  }, null, entity.groupUUID, null, null);

  const results: { [key: string]: number } = {
    Centers: groups.size,
    Donors: 0,
    'Samples with spatial location': spatialEntities.size,
    Samples: 0,
    Datasets: 0
  };

  // The display looks funky with more than 4 aggregates, so delete this one until its fixed.
  delete results.Centers;

  store.some((quad) => {
    if (ids.has(quad.subject.id)) {
      const type = quad.object.value + 's';
      results[type] = (results[type] || 0) + 1;
    }
    return false;
  }, null, entity.x('entityType'), null, null);

  return Object.entries(results).map(([label, count]) => ({ label, count }));
}

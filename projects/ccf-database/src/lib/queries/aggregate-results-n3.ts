import { N3Store } from 'triple-store-utils';

import { AggregateResult } from '../interfaces';
import { entity } from '../util/prefixes';


export function getAggregateResults(ids: Set<string>, store: N3Store): AggregateResult[] {
  const results: { [key: string]: number} = {
    Donors: 0,
    Samples: 0,
    Datasets: 0
  };

  store.some((quad) => {
    if (ids.has(quad.subject.id)) {
      const type = quad.object.value + 's';
      results[type] = (results[type] || 0) + 1;
    }
    return false;
  }, null, entity.x('entityType'), null, null);

  return Object.entries(results).map(([label,count]) => ({ label, count }));
}

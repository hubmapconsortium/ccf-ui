import { isFinite } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, Literal, N3Store, Term } from 'triple-store-utils';

import { Filter } from '../interfaces';
import { entity } from '../util/prefixes';


export function findIds(store: N3Store, filter: Filter): Set<string> {
  let seen = new Set<string>();
  let newSeen: Set<string>;
  const diffCallback = (s: Term) => seen.has(s.id) ? newSeen.add(s.id) : undefined;

  store.forSubjects((s) => seen.add(s.id), entity.id, null, null);
  if (seen.size > 0 && (filter.sex === 'Male' || filter.sex === 'Female')) {
    newSeen = new Set<string>();
    store.forSubjects(diffCallback, entity.sex, entity[filter.sex], null);
    seen = newSeen;
  }
  if (seen.size > 0 && filter.tmc?.length > 0) {
    newSeen = new Set<string>();
    for (const groupName of filter.tmc) {
      store.forSubjects(diffCallback, entity.groupName, DataFactory.literal(groupName), null);
    }
    seen = newSeen;
  }
  if (seen.size > 0 && filter.ontologyTerms?.length > 0) {
    newSeen = new Set<string>();
    for (const term of filter.ontologyTerms) {
      store.forSubjects(diffCallback, entity.ontologyTerms, DataFactory.namedNode(term), null);
    }
    seen = newSeen;
  }
  if (seen.size > 0 && filter.ageRange?.length === 2 &&
      isFinite(filter.ageRange[0]) && isFinite(filter.ageRange[1])) {
    const maxAge = Math.max(...filter.ageRange);
    const minAge = Math.min(...filter.ageRange);
    if (!(minAge === 1 && maxAge === 110)) {
      newSeen = new Set<string>();
      store.some((quad) => {
        if (seen.has(quad.subject.id)) {
          const value = fromRdf(quad.object as Literal) as number;
          if (value >= minAge && value <= maxAge) {
            newSeen.add(quad.subject.id);
          }
        }
        return false;
      }, null, entity.age, null, null);
      seen = newSeen;
    }
  }

  return seen;
}

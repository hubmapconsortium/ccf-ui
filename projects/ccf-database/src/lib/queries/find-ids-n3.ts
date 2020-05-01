import { isFinite } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, Literal, N3Store, Term } from 'triple-store-utils';

import { Filter } from '../interfaces';
import { entity } from '../util/prefixes';


export function findIds(store: N3Store, filter: Filter): Set<string> {
  let seen = getAllEntities(store);
  if (seen.size > 0 && (filter.sex === 'Male' || filter.sex === 'Female')) {
    seen = filterBySex(store, seen, filter.sex);
  }
  if (seen.size > 0 && filter.tmc?.length > 0) {
    seen = filterByGroupName(store, seen, filter.tmc);
  }
  if (seen.size > 0 && filter.ontologyTerms?.length > 0) {
    seen = filterByOntologyTerms(store, seen, filter.ontologyTerms);
  }
  if (seen.size > 0 && filter.ageRange?.length === 2 &&
      isFinite(filter.ageRange[0]) && isFinite(filter.ageRange[1])) {
    const maxAge = Math.max(...filter.ageRange);
    const minAge = Math.min(...filter.ageRange);

    // Age filter given by their default range will be ignored
    if (!(minAge === 1 && maxAge === 110)) {
      seen = filterByAge(store, seen, minAge, maxAge);
    }
  }
  return seen;
}

function getAllEntities(store: N3Store): Set<string> {
  const seen = new Set<string>();
  store.forSubjects((s) => seen.add(s.id), entity.id, null, null);
  return seen;
}

function differenceCallback(seen: Set<string>, newSeen: Set<string>): (s: Term) => void {
  return (s: Term) => seen.has(s.id) ? newSeen.add(s.id) : undefined;
}

function filterBySex(store: N3Store, seen: Set<string>, sex: 'Male' | 'Female'): Set<string> {
  const newSeen = new Set<string>();
  store.forSubjects(differenceCallback(seen, newSeen), entity.sex, entity[sex], null);
  return newSeen;
}

function filterByGroupName(store: N3Store, seen: Set<string>, groupNames: string[]): Set<string> {
  const newSeen = new Set<string>();
  for (const groupName of groupNames) {
    const literal = DataFactory.literal(groupName);
    store.forSubjects(differenceCallback(seen, newSeen), entity.groupName, literal, null);
  }
  return newSeen;
}

function filterByOntologyTerms(store: N3Store, seen: Set<string>, terms: string[]): Set<string> {
  const newSeen = new Set<string>();
  for (const term of terms) {
    const namedNode = DataFactory.namedNode(term);
    store.forSubjects(differenceCallback(seen, newSeen), entity.ontologyTerms, namedNode, null);
  }
  return newSeen;
}

function filterByAge(store: N3Store, seen: Set<string>, minAge: number, maxAge: number): Set<string> {
  const newSeen = new Set<string>();
  store.some((quad) => {
    if (seen.has(quad.subject.id)) {
      const value = fromRdf(quad.object as Literal) as number;
      if (value >= minAge && value <= maxAge) {
        newSeen.add(quad.subject.id);
      }
    }
    return false;
  }, null, entity.age, null, null);
  return newSeen;
}

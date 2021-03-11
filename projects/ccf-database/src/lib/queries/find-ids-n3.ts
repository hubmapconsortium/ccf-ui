import { isFinite } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, Literal, Store, Term } from 'triple-store-utils';

import { Filter } from '../interfaces';
import { ccf, entity } from '../util/prefixes';


function filterWithDonor(store: Store, seen: Set<string>, callback: (donorsSeen: Set<string>) => Set<string>): Set<string> {
  const donor2entity = new Map<string, string[]>();
  const donors = new Set<string>();
  store.some((quad) => {
    if (seen.has(quad.subject.id)) {
      donors.add(quad.object.id);
      if (!donor2entity.has(quad.object.id)) {
        donor2entity.set(quad.object.id, [quad.subject.id]);
      } else {
        donor2entity.get(quad.object.id)?.push(quad.subject.id);
      }
    }
    return false;
  }, null, entity.donor, null, null);

  const newDonors = callback(donors);

  const newSeen = new Set<string>();
  for (const d of newDonors) {
    for (const s of donor2entity.get(d) || []) {
      newSeen.add(s);
    }
  }
  return newSeen;
}

function filterWithSpatialEntity(store: Store, seen: Set<string>, callback: (entitiesSeen: Set<string>) => Set<string>): Set<string> {
  const spatial2entity = new Map<string, string[]>();
  const entities = new Set<string>();
  store.some((quad) => {
    if (seen.has(quad.subject.id)) {
      entities.add(quad.object.id);
      if (!spatial2entity.has(quad.object.id)) {
        spatial2entity.set(quad.object.id, [quad.subject.id]);
      } else {
        spatial2entity.get(quad.object.id)?.push(quad.subject.id);
      }
    }
    return false;
  }, null, entity.spatialEntity, null, null);

  const newSpatialEntities = callback(entities);

  const newSeen = new Set<string>();
  for (const e of newSpatialEntities) {
    for (const s of spatial2entity.get(e) || []) {
      newSeen.add(s);
    }
  }
  return newSeen;
}

/**
 * Finds all ids of object matching a filter.
 *
 * @param store The triple store.
 * @param filter The filter to limit objects.
 * @returns A set of all ids matching the filter.
 */
export function findIds(store: Store, filter: Filter): Set<string> {
  let seen = getAllEntities(store);
  if (seen.size > 0) {
    seen = filterByHasSpatialEntity(store, seen);
  }
  if (seen.size > 0 && (filter.sex === 'Male' || filter.sex === 'Female')) {
    const sex = filter.sex;
    seen = filterWithDonor(store, seen, (donors) =>
      filterBySex(store, donors, sex)
    );
  }
  if (seen.size > 0 && filter.tmc?.length > 0) {
    seen = filterWithDonor(store, seen, (donors) =>
      filterByGroupName(store, donors, filter.tmc)
    );
  }
  if (seen.size > 0 && filter.ontologyTerms?.length > 0) {
    seen = filterWithSpatialEntity(store, seen, (entities) =>
      filterByOntologyTerms(store, entities, filter.ontologyTerms)
    );
  }
  if (seen.size > 0 && filter.ageRange?.length === 2 &&
    isFinite(filter.ageRange[0]) && isFinite(filter.ageRange[1])) {
    const maxAge = Math.max(...filter.ageRange);
    const minAge = Math.min(...filter.ageRange);

    // Age filter given by their default range will be ignored
    if (!(minAge === 1 && maxAge === 110)) {
      seen = filterWithDonor(store, seen, (donors) =>
        filterByAge(store, donors, minAge, maxAge)
      );
    }
  }
  if (seen.size > 0 && filter.bmiRange?.length === 2 &&
    isFinite(filter.bmiRange[0]) && isFinite(filter.bmiRange[1])) {
    const maxBMI = Math.max(...filter.bmiRange);
    const minBMI = Math.min(...filter.bmiRange);

    // BMI filter given by their default range will be ignored
    if (!(minBMI === 13 && maxBMI === 83)) {
      seen = filterWithDonor(store, seen, (donors) =>
        filterByBMI(store, donors, minBMI, maxBMI)
      );
    }
  }
  return seen;
}

/**
 * Gets all object ids in a store.
 *
 * @param store The triple store.
 * @returns A set of all ids.
 */
function getAllEntities(store: Store): Set<string> {
  const seen = new Set<string>();
  store.forSubjects((s) => seen.add(s.id), entity.spatialEntity, null, null);
  return seen;
}

/**
 * Creates a callback function that adds ids to a second set iff it exists in the first set.
 *
 * @param seen The first set of ids.
 * @param newSeen The second set to add ids to.
 * @returns The callback function.
 */
function differenceCallback(seen: Set<string>, newSeen: Set<string>): (s: Term) => void {
  return (s: Term) => seen.has(s.id) ? newSeen.add(s.id) : undefined;
}

/**
 * Filters ids by sex.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param sex Sex to filter on.
 * @returns The subset of ids with the specified sex.
 */
function filterBySex(store: Store, seen: Set<string>, sex: 'Male' | 'Female'): Set<string> {
  const newSeen = new Set<string>();
  store.forSubjects(differenceCallback(seen, newSeen), entity.sex, entity[sex], null);
  return newSeen;
}

/**
 * Filters ids by group names.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param groupNames Group names to filter on.
 * @returns The subset of ids with the specified group names.
 */
function filterByGroupName(store: Store, seen: Set<string>, groupNames: string[]): Set<string> {
  const newSeen = new Set<string>();
  for (const groupName of groupNames) {
    const literal = DataFactory.literal(groupName);
    store.forSubjects(differenceCallback(seen, newSeen), entity.providerName, literal, null);
  }
  return newSeen;
}

/**
 * Filters ids by ontology terms.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param terms Ontology terms to filter on.
 * @returns The subset of ids with the specified ontology terms.
 */
function filterByOntologyTerms(store: Store, seen: Set<string>, terms: string[]): Set<string> {
  const newSeen = new Set<string>();
  for (const term of terms) {
    const namedNode = DataFactory.namedNode(term);
    store.forSubjects(differenceCallback(seen, newSeen), ccf.spatialEntity.ccf_annotations, namedNode, null);
  }
  return newSeen;
}

/**
 * Filters ids by age.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param minAge Minimum age.
 * @param maxAge Maximum age.
 * @returns The subset of ids with the specified age.
 */
function filterByAge(store: Store, seen: Set<string>, minAge: number, maxAge: number): Set<string> {
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

/**
 * Filters ids by BMI.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param minBMI Minimum BMI.
 * @param maxBMI Maximum BMI.
 * @returns The subset of ids with the specified BMI.
 */
function filterByBMI(store: Store, seen: Set<string>, minBMI: number, maxBMI: number): Set<string> {
  const newSeen = new Set<string>();
  store.some((quad) => {
    if (seen.has(quad.subject.id)) {
      const value = fromRdf(quad.object as Literal) as number;
      if (value >= minBMI && value <= maxBMI) {
        newSeen.add(quad.subject.id);
      }
    }
    return false;
  }, null, entity.bmi, null, null);
  return newSeen;
}

/**
 * Filters ids by spatial entities.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param hasSpatialEntity Whether the filtered objects should have a spatial entity.
 * @returns The subset of ids with/without spatial entities.
 */
function filterByHasSpatialEntity(store: Store, seen: Set<string>, hasSpatialEntity = true): Set<string> {
  const newSeen = new Set<string>();
  store.forSubjects(differenceCallback(seen, newSeen), entity.spatialEntity, null, null);
  if (!hasSpatialEntity) {
    const notNewSeen = new Set<string>();
    seen.forEach((s) => !newSeen.has(s) ? notNewSeen.add(s) : undefined);
    return notNewSeen;
  }
  return newSeen;
}

import isFinite from 'lodash/isFinite';
import { fromRdf } from 'rdf-literal';
import {
  DataFactory,
  Literal,
  readQuads,
  Store,
  Term,
} from 'triple-store-utils';

import { CCFSpatialGraph } from '../ccf-spatial-graph';
import { Filter, SpatialSearch } from '../interfaces';
import { ccf, entity, rui } from '../util/prefixes';
import { filterByProbingSphere } from './spatial-search-n3';

function filterWithDonor(
  store: Store,
  seen: Set<string>,
  callback: (donorsSeen: Set<string>) => Set<string>
): Set<string> {
  const donor2entity = new Map<string, string[]>();
  const donors = new Set<string>();
  for (const subject of seen) {
    for (const quad of readQuads(store, subject, entity.donor, null, null)) {
      donors.add(quad.object.id);
      if (!donor2entity.has(quad.object.id)) {
        donor2entity.set(quad.object.id, [subject]);
      } else {
        donor2entity.get(quad.object.id)?.push(subject);
      }
    }
  }

  const newDonors = callback(donors);
  const newSeen = new Set<string>();
  for (const d of newDonors) {
    for (const s of donor2entity.get(d) ?? []) {
      newSeen.add(s);
    }
  }
  return newSeen;
}

function filterWithSpatialEntity(
  store: Store,
  seen: Set<string>,
  callback: (entitiesSeen: Set<string>) => Set<string>
): Set<string> {
  const spatial2entity = new Map<string, string[]>();
  const entities = new Set<string>();
  for (const subject of seen) {
    for (const quad of readQuads(
      store,
      subject,
      entity.spatialEntity,
      null,
      null
    )) {
      entities.add(quad.object.id);
      if (!spatial2entity.has(quad.object.id)) {
        spatial2entity.set(quad.object.id, [subject]);
      } else {
        spatial2entity.get(quad.object.id)?.push(subject);
      }
    }
  }

  const newSpatialEntities = callback(entities);
  const newSeen = new Set<string>();
  for (const e of newSpatialEntities) {
    for (const s of spatial2entity.get(e) ?? []) {
      newSeen.add(s);
    }
  }
  return newSeen;
}

function filterWithDataset(
  store: Store,
  seen: Set<string>,
  callback: (datasetsSeen: Set<string>) => Set<string>
): Set<string> {
  const dataset2entity = new Map<string, string[]>();
  const datasets = new Set<string>();

  const sectionAndBlockSeen = new Set<string>(seen);
  for (const subject of seen) {
    for (const quad of readQuads(store, subject, entity.sections, null, null)) {
      sectionAndBlockSeen.add(quad.object.id);
    }
  }

  for (const subject of sectionAndBlockSeen) {
    for (const quad of readQuads(store, subject, entity.datasets, null, null)) {
      datasets.add(quad.object.id);
      if (!dataset2entity.has(quad.object.id)) {
        dataset2entity.set(quad.object.id, [subject]);
      } else {
        dataset2entity.get(quad.object.id)?.push(subject);
      }
    }
  }

  const newDatasets = callback(datasets);
  const newSeen = new Set<string>();
  for (const e of newDatasets) {
    for (const s of dataset2entity.get(e) ?? []) {
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
export function findIds(
  store: Store,
  graph: CCFSpatialGraph,
  filter: Filter
): Set<string> {
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
  if (seen.size > 0 && filter.consortiums?.length > 0) {
    seen = filterWithDonor(store, seen, (donors) =>
      filterByConsortiumName(store, donors, filter.consortiums)
    );
  }
  if (seen.size > 0 && filter.tmc?.length > 0) {
    seen = filterWithDonor(store, seen, (donors) =>
      filterByGroupName(store, donors, filter.tmc)
    );
  }
  if (seen.size > 0 && filter.technologies?.length > 0) {
    seen = filterWithDataset(store, seen, (datasets) =>
      filterByTechnology(store, datasets, filter.technologies)
    );
  }
  if (seen.size > 0 && filter.spatialSearches?.length > 0) {
    seen = filterWithSpatialEntity(store, seen, (entities) =>
      filterBySpatialSearches(store, graph, entities, filter.spatialSearches)
    );
  }
  if (seen.size > 0 && filter.ontologyTerms?.length > 0) {
    const terms = filter.ontologyTerms;
    if (terms.indexOf(rui.body.id) === -1) {
      seen = filterWithSpatialEntity(store, seen, (entities) =>
        filterByOntologyTerms(store, entities, terms)
      );
    }
  }
  if (seen.size > 0 && filter.cellTypeTerms?.length > 0) {
    const terms = filter.cellTypeTerms;
    if (terms.indexOf(rui.cell.id) === -1) {
      seen = filterWithSpatialEntity(store, seen, (entities) =>
        filterByCellTypeTerms(store, entities, terms)
      );
    }
  }
  if (seen.size > 0 && filter.biomarkerTerms?.length > 0) {
    const terms = filter.biomarkerTerms;
    if (terms.indexOf('http://purl.org/ccf/biomarkers') === -1) {
      seen = filterWithSpatialEntity(store, seen, (entities) =>
        filterByBiomarkerTerms(store, entities, terms)
      );
    }
  }
  if (
    seen.size > 0 &&
    filter.ageRange?.length === 2 &&
    isFinite(filter.ageRange[0]) &&
    isFinite(filter.ageRange[1])
  ) {
    const maxAge = Math.max(...filter.ageRange);
    const minAge = Math.min(...filter.ageRange);

    // Age filter given by their default range will be ignored
    if (!(minAge === 1 && maxAge === 110)) {
      seen = filterWithDonor(store, seen, (donors) =>
        filterByAge(store, donors, minAge, maxAge)
      );
    }
  }
  if (
    seen.size > 0 &&
    filter.bmiRange?.length === 2 &&
    isFinite(filter.bmiRange[0]) &&
    isFinite(filter.bmiRange[1])
  ) {
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
function differenceCallback(
  seen: Set<string>,
  newSeen: Set<string>
): (term: Term) => void {
  return function (term: Term) {
    if (seen.has(term.id)) {
      newSeen.add(term.id);
    }
  };
}

/**
 * Filters ids by sex.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param sex Sex to filter on.
 * @returns The subset of ids with the specified sex.
 */
function filterBySex(
  store: Store,
  seen: Set<string>,
  sex: 'Male' | 'Female'
): Set<string> {
  const newSeen = new Set<string>();
  store.forSubjects(
    differenceCallback(seen, newSeen),
    entity.sex,
    entity[sex],
    null
  );
  return newSeen;
}

/**
 * Filters ids by consortium names.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param consortiums Consortiums to filter on.
 * @returns The subset of ids with the specified consortiums.
 */
function filterByConsortiumName(
  store: Store,
  seen: Set<string>,
  consortiums: string[]
): Set<string> {
  const newSeen = new Set<string>();
  for (const consortium of consortiums) {
    const literal = DataFactory.literal(consortium);
    store.forSubjects(
      differenceCallback(seen, newSeen),
      entity.consortiumName,
      literal,
      null
    );
  }
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
function filterByGroupName(
  store: Store,
  seen: Set<string>,
  groupNames: string[]
): Set<string> {
  const newSeen = new Set<string>();
  for (const groupName of groupNames) {
    const literal = DataFactory.literal(groupName);
    store.forSubjects(
      differenceCallback(seen, newSeen),
      entity.providerName,
      literal,
      null
    );
  }
  return newSeen;
}

/**
 * Filters ids by technology names.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param technologies Technology names to filter on.
 * @returns The subset of ids with the specified technology names.
 */
function filterByTechnology(
  store: Store,
  seen: Set<string>,
  technologies: string[]
): Set<string> {
  const newSeen = new Set<string>();
  for (const technology of technologies) {
    const literal = DataFactory.literal(technology);
    store.forSubjects(
      differenceCallback(seen, newSeen),
      entity.technology,
      literal,
      null
    );
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
function filterByOntologyTerms(
  store: Store,
  seen: Set<string>,
  terms: string[]
): Set<string> {
  const newSeen = new Set<string>();
  for (const term of terms) {
    const namedNode = DataFactory.namedNode(term);
    store.forSubjects(
      differenceCallback(seen, newSeen),
      ccf.spatialEntity.ccf_annotations,
      namedNode,
      null
    );
  }
  return newSeen;
}

/**
 * Filters ids by cell type terms.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param terms Cell type terms to filter on.
 * @returns The subset of ids with the specified cell type terms.
 */
function filterByCellTypeTerms(
  store: Store,
  seen: Set<string>,
  terms: string[]
): Set<string> {
  const asTerms = new Set<string>();
  for (const term of terms) {
    store.forObjects(
      (asTerm) => {
        asTerms.add(asTerm.id);
      },
      term,
      ccf.asctb.located_in,
      null
    );
    if (term === rui.cell.id) {
      asTerms.add(rui.body.id);
    }
  }
  return filterByOntologyTerms(store, seen, [...asTerms]);
}

/**
 * Filters ids by biomarker terms.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param terms Biomarker terms to filter on.
 * @returns The subset of ids with the specified biomarker terms.
 */
function filterByBiomarkerTerms(
  store: Store,
  seen: Set<string>,
  terms: string[]
): Set<string> {
  const asTerms = new Set<string>();
  for (const term of terms) {
    store.forObjects(
      (asTerm) => {
        asTerms.add(asTerm.id);
      },
      term,
      ccf.asctb.bm_located_in,
      null
    );
    if (term === 'http://purl.org/ccf/biomarkers') {
      asTerms.add(rui.body.id);
    }
  }
  return filterByOntologyTerms(store, seen, [...asTerms]);
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
function filterByAge(
  store: Store,
  seen: Set<string>,
  minAge: number,
  maxAge: number
): Set<string> {
  const newSeen = new Set<string>();
  for (const subject of seen) {
    for (const quad of readQuads(store, subject, entity.age, null, null)) {
      const value = fromRdf(quad.object as Literal) as number;
      if (value >= minAge && value <= maxAge) {
        newSeen.add(subject);
      }
    }
  }
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
function filterByBMI(
  store: Store,
  seen: Set<string>,
  minBMI: number,
  maxBMI: number
): Set<string> {
  const newSeen = new Set<string>();
  for (const subject of seen) {
    for (const quad of readQuads(store, subject, entity.bmi, null, null)) {
      const value = fromRdf(quad.object as Literal) as number;
      if (value >= minBMI && value <= maxBMI) {
        newSeen.add(subject);
      }
    }
  }
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
function filterByHasSpatialEntity(
  store: Store,
  seen: Set<string>,
  hasSpatialEntity = true
): Set<string> {
  const newSeen = new Set<string>();
  store.forSubjects(
    differenceCallback(seen, newSeen),
    entity.spatialEntity,
    null,
    null
  );
  if (!hasSpatialEntity) {
    const notNewSeen = new Set<string>();
    seen.forEach((s) => (!newSeen.has(s) ? notNewSeen.add(s) : undefined));
    return notNewSeen;
  }
  return newSeen;
}

function filterBySpatialSearches(
  store: Store,
  graph: CCFSpatialGraph,
  seen: Set<string>,
  spatialSearches: SpatialSearch[]
): Set<string> {
  const newSeen = new Set<string>();
  for (const search of spatialSearches) {
    const thisSeen = filterByProbingSphere(store, graph, seen, search);
    thisSeen.forEach((s) => newSeen.add(s));
  }
  return newSeen;
}

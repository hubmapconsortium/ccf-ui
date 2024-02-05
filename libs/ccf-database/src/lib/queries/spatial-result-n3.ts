import sortBy from 'lodash/sortBy';
import { DataFactory, NamedNode, Store } from 'triple-store-utils';

import {
  ExtractionSet,
  SpatialEntity,
  SpatialObjectReference,
  SpatialPlacement,
} from '../spatial-types';
import { getMappedResult } from '../util/n3-functions';
import { ccf, entity } from '../util/prefixes';

/**
 * Reverses the keys and values in a mapping.
 *
 * @param mapping The mapping to reverse.
 * @returns The reversed mapping.
 */
function reverseMapping(mapping: { [property: string]: NamedNode }): {
  [iri: string]: string;
} {
  const newMapping: { [iri: string]: string } = {};
  Object.entries(mapping).forEach(([prop, predicate]) => {
    newMapping[predicate.id] = prop;
  });
  return newMapping;
}

/** A mapping of spatial objects. */
const mappings = {
  spatialObjectReference: reverseMapping(ccf.spatialObjectReference),
  spatialEntity: reverseMapping(ccf.spatialEntity),
  spatialPlacement: reverseMapping(ccf.spatialPlacement),
};

/**
 * Creates a spatial object reference.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new reference.
 */
export function getSpatialObjectReference(
  store: Store,
  iri: string
): SpatialObjectReference {
  return getMappedResult<SpatialObjectReference>(
    store,
    iri,
    'SpatialObjectReference',
    mappings.spatialObjectReference
  );
}

/**
 * Creates an extraction set data object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new entity.
 */
export function getExtractionSet(store: Store, iri: string): ExtractionSet {
  const result = getMappedResult<ExtractionSet>(
    store,
    iri,
    'ExtractionSet',
    mappings.spatialEntity
  );
  result.extractionSites = sortBy(
    store
      .getSubjects(ccf.spatialEntity.extraction_set, iri, null)
      .map((value) => getSpatialEntity(store, value.id)),
    ['rui_rank']
  );
  return result;
}

/**
 * Gets extraction sets associated with a reference organ
 *
 * @param store The triple store.
 * @param iri The data identifier (the reference organ).
 * @returns A set of extraction sets associated with the reference organ
 */
export function getExtractionSets(store: Store, iri: string): ExtractionSet[] {
  return sortBy(
    store
      .getSubjects(ccf.spatialEntity.extraction_set_for, iri, null)
      .map((value) => getExtractionSet(store, value.id)),
    ['rui_rank']
  );
}

/**
 * Gets the anatomical structures associated with a reference organ.
 *
 * @param store The triple store.
 * @param iri The data identifier (reference organ).
 * @returns The new entity.
 */
export function getAnatomicalStructures(
  store: Store,
  iri: string
): SpatialEntity[] {
  return sortBy(
    store
      .getSubjects(ccf.spatialEntity.reference_organ, iri, null)
      .map((value) => getSpatialEntity(store, value.id))
      .filter((e) => e['@id'] !== iri),
    ['rui_rank']
  );
}

/**
 * Gets all reference organs in the triple store
 *
 * @param store The triple store.
 * @returns All the reference organs.
 */
export function getReferenceOrgans(store: Store): SpatialEntity[] {
  const results: SpatialEntity[] = [];
  store.forEach(
    (quad) => {
      if (quad.subject.id === quad.object.id) {
        results.push(getSpatialEntity(store, quad.subject.id));
      }
    },
    null,
    ccf.spatialEntity.reference_organ,
    null,
    null
  );
  return sortBy(results, ['rui_rank']);
}

/**
 * Creates a spatial entity data object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new entity.
 */
export function getSpatialEntity(store: Store, iri: string): SpatialEntity {
  const result = getMappedResult<SpatialEntity>(
    store,
    iri,
    'SpatialEntity',
    mappings.spatialEntity
  );
  // Default mapping will come back as an IRI which we can look up for the full object
  if (result.object) {
    result.object = getSpatialObjectReference(
      store,
      result.object as unknown as string
    );
  }
  if (result.ccf_annotations) {
    result.ccf_annotations = store
      .getObjects(iri, ccf.spatialEntity.ccf_annotations, null)
      .map((o) => o.id);
  }
  store.forSubjects(
    (subject) => (result.entityId = subject.id),
    entity.spatialEntity,
    iri,
    null
  );
  return result;
}

/**
 * Creates a spatial placement object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns THe new placement object.
 */
export function getSpatialPlacement(
  store: Store,
  iri: string
): SpatialPlacement {
  const result = getMappedResult<SpatialPlacement>(
    store,
    iri,
    'SpatialPlacement',
    mappings.spatialPlacement
  );
  // Default mapping will come back as an IRI for source/target which we can look up for the full object
  if (result.source) {
    result.source = getSpatialEntity(store, result.source as unknown as string);
  }
  if (result.target) {
    result.target = getSpatialEntity(store, result.target as unknown as string);
  }
  return result;
}

/**
 * Creates a spatial entity based on another entity in the store.
 *
 * @param store The triple store.
 * @param entityIRI The indentifier of the store entity.
 * @returns A new entity.
 */
export function getSpatialEntityForEntity(
  store: Store,
  entityIRI: string
): SpatialEntity | undefined {
  const spatialEntityNodes = store.getObjects(
    DataFactory.namedNode(entityIRI),
    entity.spatialEntity,
    null
  );
  if (spatialEntityNodes.length > 0) {
    return getSpatialEntity(store, spatialEntityNodes[0].id);
  } else {
    return undefined;
  }
}

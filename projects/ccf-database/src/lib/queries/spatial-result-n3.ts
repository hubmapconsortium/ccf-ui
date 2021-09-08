import { memoize, set, sortBy } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, NamedNode, Store } from 'triple-store-utils';

import { SpatialEntity, SpatialObjectReference, SpatialPlacement, ExtractionSet } from '../spatial-types';
import { ccf, entity } from '../util/prefixes';


/**
 * Reverses the keys and values in a mapping.
 *
 * @param mapping The mapping to reverse.
 * @returns The reversed mapping.
 */
function reverseMapping(mapping: { [property: string]: NamedNode }): { [iri: string]: string } {
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
  spatialPlacement: reverseMapping(ccf.spatialPlacement)
};

/**
 * Creates an object of the specified type using quads from the store.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @param type Type name.
 * @param mapping Property mappings.
 * @returns A new data object.
 */
function create<T = unknown>(store: Store, iri: string, type: string, mapping: { [iri: string]: string }): T {
  const result = { '@id': iri, '@type': type };
  store.some((quad) => {
    const prop = mapping[quad.predicate.id];
    if (prop) {
      const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
      set(result, prop, value);
    }
    return false;
  }, DataFactory.namedNode(iri), null, null, null);
  return (result as unknown) as T;
}

/**
 * Creates a spatial object reference.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new reference.
 */
export function getSpatialObjectReferenceSlowly(store: Store, iri: string): SpatialObjectReference {
  return create<SpatialObjectReference>(store, iri, 'SpatialObjectReference', mappings.spatialObjectReference);
}

export const getSpatialObjectReference = memoize(getSpatialObjectReferenceSlowly, (_store, iri) => iri);

/**
 * Creates an extraction set data object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new entity.
 */
export function getExtractionSetSlowly(store: Store, iri: string): ExtractionSet {
  const result = create<ExtractionSet>(store, iri, 'ExtractionSet', mappings.spatialEntity);
  result.extractionSites = sortBy(
    store.getSubjects(ccf.spatialEntity.extraction_set, iri, null)
      .map((value) => getSpatialEntity(store, value.id)),
    ['rui_rank']);
  return result;
}

export const getExtractionSet = memoize(getExtractionSetSlowly, (_store, iri) => iri);

/**
 * Gets extraction sets associated with a reference organ
 *
 * @param store The triple store.
 * @param iri The data identifier (the reference organ).
 * @returns A set of extraction sets associated with the reference organ
 */
export function getExtractionSetsSlowly(store: Store, iri: string): ExtractionSet[] {
  return sortBy(
    store.getSubjects(ccf.spatialEntity.extraction_set_for, iri, null)
      .map((value) => getExtractionSet(store, value.id)),
    ['rui_rank']
  );
}

export const getExtractionSets = memoize(getExtractionSetsSlowly, (_store, iri) => iri);

/**
 * Gets the anatomical structures associated with a reference organ.
 *
 * @param store The triple store.
 * @param iri The data identifier (reference organ).
 * @returns The new entity.
 */
export function getAnatomicalStructuresSlowly(store: Store, iri: string): SpatialEntity[] {
  return sortBy(
    store.getSubjects(ccf.spatialEntity.reference_organ, iri, null)
      .map((value) => getSpatialEntity(store, value.id))
      .filter((e) => e['@id'] !== iri),
    ['rui_rank']
  );
}

export const getAnatomicalStructures = memoize(getAnatomicalStructuresSlowly, (_store, iri) => iri);

/**
 * Gets all reference organs in the triple store
 *
 * @param store The triple store.
 * @returns All the reference organs.
 */
export function getReferenceOrgansSlowly(store: Store): SpatialEntity[] {
  const results: SpatialEntity[] = [];
  store.forEach((quad) => {
    if (quad.subject.id === quad.object.id) {
      results.push(getSpatialEntity(store, quad.subject.id));
    }
  }, null, ccf.spatialEntity.reference_organ, null, null);
  return sortBy(results, ['rui_rank']);
}

export const getReferenceOrgans = memoize(getReferenceOrgansSlowly);

/**
 * Creates a spatial entity data object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new entity.
 */
export function getSpatialEntitySlowly(store: Store, iri: string): SpatialEntity {
  const result = create<SpatialEntity>(store, iri, 'SpatialEntity', mappings.spatialEntity);
  // Default mapping will come back as an IRI which we can look up for the full object
  if (result.object) {
    result.object = getSpatialObjectReference(store, (result.object as unknown) as string);
  }
  if (result.ccf_annotations) {
    result.ccf_annotations = store.getObjects(iri, ccf.spatialEntity.ccf_annotations, null).map(o => o.id);
  }
  store.forSubjects((subject) => (result.entityId = subject.id), entity.spatialEntity, iri, null);
  return result;
}

export const getSpatialEntity = memoize(getSpatialEntitySlowly, (_store, iri) => iri);

/**
 * Creates a spatial placement object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns THe new placement object.
 */
export function getSpatialPlacementSlowly(store: Store, iri: string): SpatialPlacement {
  const result = create<SpatialPlacement>(store, iri, 'SpatialPlacement', mappings.spatialPlacement);
  // Default mapping will come back as an IRI for source/target which we can look up for the full object
  if (result.source) {
    result.source = getSpatialEntity(store, (result.source as unknown) as string);
  }
  if (result.target) {
    result.target = getSpatialEntity(store, (result.target as unknown) as string);
  }
  return result;
}

export const getSpatialPlacement = memoize(getSpatialPlacementSlowly, (_store, iri) => iri);

/**
 * Creates a spatial entity based on another entity in the store.
 *
 * @param store The triple store.
 * @param entityIRI The indentifier of the store entity.
 * @returns A new entity.
 */
export function getSpatialEntityForEntitySlowly(store: Store, entityIRI: string): SpatialEntity | undefined {
  const spatialEntityNodes = store.getObjects(DataFactory.namedNode(entityIRI), entity.spatialEntity, null);
  if (spatialEntityNodes.length > 0) {
    return getSpatialEntity(store, spatialEntityNodes[0].id);
  } else {
    return undefined;
  }
}

export const getSpatialEntityForEntity = memoize(getSpatialEntityForEntitySlowly, (_store, entityIRI) => entityIRI);

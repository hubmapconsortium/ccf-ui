import { set } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, N3Store, NamedNode } from 'triple-store-utils';

import { SpatialEntity, SpatialObjectReference, SpatialPlacement } from './../spatial-types';
import { ccf, entity } from './../util/prefixes';


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
function create<T = unknown>(store: N3Store, iri: string, type: string, mapping: { [iri: string]: string }): T {
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
export function getSpatialObjectReference(store: N3Store, iri: string): SpatialObjectReference {
  return create<SpatialObjectReference>(store, iri, 'SpatialObjectReference', mappings.spatialObjectReference);
}

/**
 * Creates a spatial entity data object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new entity.
 */
export function getSpatialEntity(store: N3Store, iri: string): SpatialEntity {
  const result = create<SpatialEntity>(store, iri, 'SpatialEntity', mappings.spatialEntity);
  // Default mapping will come back as an IRI which we can look up for the full object
  if (result.object) {
    result.object = getSpatialObjectReference(store, (result.object as unknown) as string);
  }
  return result;
}

/**
 * Creates a spatial placement object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns THe new placement object.
 */
export function getSpatialPlacement(store: N3Store, iri: string): SpatialPlacement {
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

/**
 * Creates a spatial entity based on another entity in the store.
 *
 * @param store The triple store.
 * @param entityIRI The indentifier of the store entity.
 * @returns A new entity.
 */
export function getSpatialEntityForEntity(store: N3Store, entityIRI: string): SpatialEntity | undefined {
  const spatialEntityNodes = store.getObjects(DataFactory.namedNode(entityIRI), entity.spatialEntity, null);
  if (spatialEntityNodes.length > 0) {
    return getSpatialEntity(store, spatialEntityNodes[0].id);
  } else {
    return undefined;
  }
}

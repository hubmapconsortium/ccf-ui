import { set } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, N3Store, NamedNode } from 'triple-store-utils';

import { SpatialEntity, SpatialObjectReference, SpatialPlacement } from './../spatial-types';
import { ccf, entity } from './../util/prefixes';


function reverseMapping(mapping: { [property: string]: NamedNode}): { [iri: string]: string } {
  const newMapping: { [iri: string]: string} = {};
  Object.entries(mapping).forEach(([prop, predicate]) => {
    newMapping[predicate.id] = prop;
  });
  return newMapping;
}

const mappings = {
  spatialObjectReference: reverseMapping(ccf.spatialObjectReference),
  spatialEntity: reverseMapping(ccf.spatialEntity),
  spatialPlacement: reverseMapping(ccf.spatialPlacement)
};

function create<T = unknown>(store: N3Store, iri: string, type: string, mapping: { [iri: string]: string }): T {
  const result = {'@id': iri, '@type': type };
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

export function getSpatialObjectReference(store: N3Store, iri: string): SpatialObjectReference {
  return create<SpatialObjectReference>(store, iri, 'SpatialObjectReference', mappings.spatialObjectReference);
}

export function getSpatialEntity(store: N3Store, iri: string): SpatialEntity {
  const result = create<SpatialEntity>(store, iri, 'SpatialEntity', mappings.spatialEntity);
  // Default mapping will come back as an IRI which we can look up for the full object
  if (result.object) {
    result.object = getSpatialObjectReference(store, (result.object as unknown) as string);
  }
  return result;
}

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

export function getSpatialEntityForEntity(store: N3Store, entityIRI: string): SpatialEntity | undefined {
  const spatialEntityNodes = store.getObjects(DataFactory.namedNode(entityIRI), entity.spatialEntity, null);
  if (spatialEntityNodes.length > 0) {
    return getSpatialEntity(store, spatialEntityNodes[0].id);
  } else {
    return undefined;
  }
}

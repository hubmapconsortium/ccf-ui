import { Store } from 'triple-store-utils';
import { SpatialEntity, SpatialObjectReference, SpatialPlacement, ExtractionSet } from '../spatial-types';
/**
 * Creates a spatial object reference.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new reference.
 */
export declare function getSpatialObjectReference(store: Store, iri: string): SpatialObjectReference;
/**
 * Creates an extraction set data object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new entity.
 */
export declare function getExtractionSet(store: Store, iri: string): ExtractionSet;
/**
 * Gets extraction sets associated with a reference organ
 *
 * @param store The triple store.
 * @param iri The data identifier (the reference organ).
 * @returns A set of extraction sets associated with the reference organ
 */
export declare function getExtractionSets(store: Store, iri: string): ExtractionSet[];
/**
 * Gets the anatomical structures associated with a reference organ.
 *
 * @param store The triple store.
 * @param iri The data identifier (reference organ).
 * @returns The new entity.
 */
export declare function getAnatomicalStructures(store: Store, iri: string): SpatialEntity[];
/**
 * Gets all reference organs in the triple store
 *
 * @param store The triple store.
 * @returns All the reference organs.
 */
export declare function getReferenceOrgans(store: Store): SpatialEntity[];
/**
 * Creates a spatial entity data object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new entity.
 */
export declare function getSpatialEntity(store: Store, iri: string): SpatialEntity;
/**
 * Creates a spatial placement object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns THe new placement object.
 */
export declare function getSpatialPlacement(store: Store, iri: string): SpatialPlacement;
/**
 * Creates a spatial entity based on another entity in the store.
 *
 * @param store The triple store.
 * @param entityIRI The indentifier of the store entity.
 * @returns A new entity.
 */
export declare function getSpatialEntityForEntity(store: Store, entityIRI: string): SpatialEntity | undefined;

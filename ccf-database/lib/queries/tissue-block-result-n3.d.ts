import { Store } from 'triple-store-utils';
import { DatasetResult, DonorResult, TissueBlockResult, TissueSectionResult } from '../interfaces';
/**
 * Extracts a single donor result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
export declare function getDonorResult(store: Store, iri: string): DonorResult;
/**
 * Extracts a single dataset result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
export declare function getDatasetResult(store: Store, iri: string): DatasetResult;
/**
 * Extracts a single tissue section result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
export declare function getTissueSectionResult(store: Store, iri: string): TissueSectionResult;
/**
 * Extracts a single tissue block result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
export declare function getTissueBlockResult(store: Store, iri: string): TissueBlockResult;

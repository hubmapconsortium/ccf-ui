import { applyUFLPatch } from './hubmap-ufl-patch';
import { applyVUPatch } from './hubmap-vu-patch';


/**
 * Patches a set of entities to fix various problems in the source data
 *
 * @param entities entity data to process
 * @returns patched entity data
 */
export function applyPatches(entities: {[key: string]: unknown}[]): {[key: string]: unknown}[] {
  return applyUFLPatch(applyVUPatch(entities));
}

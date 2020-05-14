import { applyUFLPatch } from './hubmap-ufl-patch';
import { applyVUPatch } from './hubmap-vu-patch';


export function applyPatches(entries: {[key: string]: unknown}[]): {[key: string]: unknown}[] {
  return applyUFLPatch(applyVUPatch(entries));
}

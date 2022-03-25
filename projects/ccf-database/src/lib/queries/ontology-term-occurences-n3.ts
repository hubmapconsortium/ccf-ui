import { Store } from 'triple-store-utils';

import { ccf, entity, rui } from '../util/prefixes';


function getSpatialEntityMapping(ids: Set<string>, store: Store): Map<string, Set<string>> {
  const spatial2entity = new Map<string, Set<string>>();

  store.some((quad) => {
    if (ids.has(quad.subject.id)) {
      if (!spatial2entity.has(quad.object.id)) {
        spatial2entity.set(quad.object.id, new Set<string>([quad.subject.id]));
      } else {
        spatial2entity.get(quad.object.id)!.add(quad.subject.id);
      }
    }
    return false;
  }, null, entity.spatialEntity, null, null);

  return spatial2entity;
}

function getAnatomicalStructureMapping(ids: Set<string>, store: Store): Map<string, Set<string>> {
  const spatial2entity = getSpatialEntityMapping(ids, store);
  const term2entity = new Map<string, Set<string>>();

  store.some((quad) => {
    if (spatial2entity.has(quad.subject.id)) {
      const entities = spatial2entity.get(quad.subject.id)!;
      if (!term2entity.has(quad.object.id)) {
        term2entity.set(quad.object.id, new Set<string>(entities));
      } else {
        const termEntities = term2entity.get(quad.object.id)!;
        entities.forEach((value) => termEntities.add(value));
      }
    }
    return false;
  }, null, ccf.spatialEntity.ccf_annotations, null, null);

  return term2entity;
}

/**
 * Get number of occurrences of ontology terms for a set of ids.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns Ontology term counts.
 */
export function getOntologyTermOccurences(ids: Set<string>, store: Store): Record<string, number> {
  const counts: Record<string, number> = {};
  const term2entities = getAnatomicalStructureMapping(ids, store);

  term2entities.forEach((value, key) => {
    counts[key] = value.size;
  });

  return counts;
}

/**
 * Get number of occurrences of cell type terms for a set of ids.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns Ontology term counts.
 */
export function getCellTypeTermOccurences(ids: Set<string>, store: Store): Record<string, number> {
  const asTerm2entities = getAnatomicalStructureMapping(ids, store);
  const ctTerm2entities = new Map<string, Set<string>>();

  store.some((quad) => {
    const anatomicalStructure = quad.object.id;
    if (asTerm2entities.has(anatomicalStructure)) {
      const cellType = quad.subject.id;
      const entities = asTerm2entities.get(anatomicalStructure)!;
      if (!ctTerm2entities.has(cellType)) {
        ctTerm2entities.set(cellType, new Set<string>(entities));
      } else {
        const termEntities = ctTerm2entities.get(cellType)!;
        entities.forEach((value) => termEntities.add(value));
      }
    }
    return false;
  }, null, ccf.asctb.located_in, null, null);

  const counts: Record<string, number> = {};

  ctTerm2entities.forEach((value, key) => {
    counts[key] = value.size;
  });

  counts[rui.cell.id] = asTerm2entities.get(rui.body.id)?.size ?? 0;

  return counts;
}

import { Store, readQuads } from 'triple-store-utils';

import { ccf, entity, rui } from '../util/prefixes';


function getSpatialEntityMapping(subjects: Set<string>, store: Store): Map<string, Set<string>> {
  const spatial2entity = new Map<string, Set<string>>();

  for (const subject of subjects) {
    for (const quad of readQuads(store, subject, entity.spatialEntity, null, null)) {
      if (!spatial2entity.has(quad.object.id)) {
        spatial2entity.set(quad.object.id, new Set<string>([subject]));
      } else {
        spatial2entity.get(quad.object.id)!.add(subject);
      }
    }
  }
  return spatial2entity;
}

function getAnatomicalStructureMapping(ids: Set<string>, store: Store): Map<string, Set<string>> {
  const spatial2entity = getSpatialEntityMapping(ids, store);
  const term2entity = new Map<string, Set<string>>();

  for (const subject of spatial2entity.keys()) {
    const entities = spatial2entity.get(subject)!;
    for (const quad of readQuads(store, subject, ccf.spatialEntity.ccf_annotations, null, null)) {
      if (!term2entity.has(quad.object.id)) {
        term2entity.set(quad.object.id, new Set<string>(entities));
      } else {
        const termEntities = term2entity.get(quad.object.id)!;
        entities.forEach((value) => termEntities.add(value));
      }
    }
  }
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
 * Get number of occurrences of biomarkers terms for a set of ids.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns Ontology term counts.
 */
export function getBiomarkerTermOccurences(ids: Set<string>, store: Store): Record<string, number> {
  const asTerm2entities = getAnatomicalStructureMapping(ids, store);
  const bmTerm2entities = new Map<string, Set<string>>();

  for (const asTerm of asTerm2entities.keys()) {
    const entities = asTerm2entities.get(asTerm)!;
    for (const quad of readQuads(store, null, ccf.asctb.bm_located_in, asTerm, null)) {
      const biomarker = quad.subject.id;
      if (!bmTerm2entities.has(biomarker)) {
        bmTerm2entities.set(biomarker, new Set<string>(entities));
      } else {
        const termEntities = bmTerm2entities.get(biomarker)!;
        entities.forEach((value) => termEntities.add(value));
      }
    }
  }

  const counts: Record<string, number> = {};

  bmTerm2entities.forEach((value, key) => {
    counts[key] = value.size;
  });

  counts['biomarkers'] = asTerm2entities.get(rui.body.id)?.size ?? 0;

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

  for (const asTerm of asTerm2entities.keys()) {
    const entities = asTerm2entities.get(asTerm)!;
    for (const quad of readQuads(store, null, ccf.asctb.located_in, asTerm, null)) {
      const cellType = quad.subject.id;
      if (!ctTerm2entities.has(cellType)) {
        ctTerm2entities.set(cellType, new Set<string>(entities));
      } else {
        const termEntities = ctTerm2entities.get(cellType)!;
        entities.forEach((value) => termEntities.add(value));
      }
    }
  }

  const counts: Record<string, number> = {};

  ctTerm2entities.forEach((value, key) => {
    counts[key] = value.size;
  });

  counts[rui.cell.id] = asTerm2entities.get(rui.body.id)?.size ?? 0;

  return counts;
}

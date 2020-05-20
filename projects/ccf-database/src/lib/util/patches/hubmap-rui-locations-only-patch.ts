/**
 * Patches a set of entities to only include data that has been spatially located.
 * This also includes ancestors and descendants of that sample.
 *
 * @param entities entity data to process
 * @returns patched entity data
 */
export function applyRuiLocationsOnlyPatch(entities: {[key: string]: unknown}[]): {[key: string]: unknown}[] {
  const dataLookup: { [uuid: string]: {[key: string]: unknown}} = {};
  for (const entity of entities) {
    dataLookup[entity.uuid as string] = entity;
  }

  const entitiesToKeep: Set<string> = new Set([]);
  for (const entity of entities) {
    if (!!entity.rui_location) {
      const ids: string[] = [
        entity.uuid as string,
        ...(entity.descendant_ids as string[] || []),
        ...(entity.ancestor_ids as string[] || [])
      ];
      ids.forEach((uuid) => entitiesToKeep.add(uuid));
    }
  }

  return [ ...entitiesToKeep].map((uuid) => dataLookup[uuid]).filter(o => !!o);
}

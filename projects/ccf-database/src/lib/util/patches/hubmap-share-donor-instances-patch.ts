/**
 * Patches a set of entities to ensure that the donor object is consistent on all entities.
 *
 * @param entities entity data to process
 * @returns patched entity data
 */
export function applyShareDonorInstancesPatch(entities: {[key: string]: unknown}[]): {[key: string]: unknown}[] {
  const donorLookup: { [uuid: string]: {[key: string]: unknown}} = {};
  for (const entity of entities) {
    if (entity.entity_type === 'Donor') {
      donorLookup[entity.uuid as string] = entity;
      entity.donor = entity;
    } else {
      const donorUUID = (entity.donor as {uuid: string})?.uuid;
      if (donorUUID && !donorLookup[donorUUID]) {
        donorLookup[donorUUID] = entity.donor as {[key: string]: unknown};
      }
    }
  }

  for (const entity of entities) {
    const donorUUID = (entity.donor as {uuid: string})?.uuid;
    if (donorUUID && donorLookup[donorUUID]) {
      entity.donor = donorLookup[donorUUID];
    }
  }

  return entities;
}

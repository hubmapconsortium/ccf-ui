import { get, set } from 'lodash';
import { OldRuiData } from '../old-rui-utils';


/**
 * Fixes strings from old RUI data.
 *
 * @param value The original string.
 * @returns The fixed string.
 */
function fixString(value: string): string {
  return value.replace(/^_|mm_$|_$/g, '');
}

/**
 * Fixes and parses numbers from old RUI data.
 *
 * @param value The original number.
 * @returns The fixed number.
 */
function fixNumber(value: string | number): number {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/[^\d\-\.]/g, ''));
  }
  return value;
}

/**
 * Fixes a xyz triplet from old RUI data.
 *
 * @param value The original triplet.
 * @returns The fixed triplet.
 */
function fixXYZ(value: { x: string | number, y: string | number, z: string | number }): { x: number, y: number, z: number } {
  const { x, y, z } = value;
  return { x: fixNumber(x), y: fixNumber(y), z: fixNumber(z) };
}

/**
 * Fixes old RUI data from UFL.
 *
 * @param data The original RUI data
 * @returns The fixed RUI data
 */
function fixOldRuiData(data: OldRuiData): OldRuiData {
  data = {...data};
  data.tissue_object_size = fixXYZ(data.tissue_object_size);
  data.tissue_object_rotation = fixXYZ(data.tissue_object_rotation);
  data.tissue_position_mass_point = fixXYZ(data.tissue_position_mass_point);

  Object.entries(data).forEach(([k, v]) => {
    if (typeof v === 'string') {
      set(data, k, fixString(v));
    }
  });

  return data;
}

/**
 * Patches a set of entities to fix UFL rui data
 *
 * @param entities entity data to process
 * @returns patched entity data
 */
export function applyUFLPatch(entities: {[key: string]: unknown}[]): {[key: string]: unknown}[] {

  for (const entity of entities) {
    let ruiLocation = (entity.rui_location || get(entity, 'origin_sample.rui_location', undefined)) as OldRuiData;
    if (ruiLocation && entity.group_uuid === '07a29e4c-ed43-11e8-b56a-0e8017bdda58') {
      ruiLocation = fixOldRuiData(ruiLocation);
      const sample = entity.lab_tissue_sample_id as string || '';
      if (sample.match(/CC1|CC\-1/)) {
        ruiLocation.reference_organ_id = 'http://purl.org/ccf/latest/ccf.owl#VHSpleenCC1';
        ruiLocation.tissue_position_mass_point = {
          x: 59.9 / 2 + ruiLocation.tissue_position_mass_point.x,
          y: 40.7 - 60,
          z: 9.04 / 2 * 0
        };
        ruiLocation.tissue_object_size.x = 10;
      } else if (sample.match(/CC2|CC\-2/)) {
        ruiLocation.reference_organ_id = 'http://purl.org/ccf/latest/ccf.owl#VHSpleenCC2';
        ruiLocation.tissue_position_mass_point = {
          x: 63 / 2 + ruiLocation.tissue_position_mass_point.x,
          y: 40.1 - 60,
          z: 8.89 / 2 * 0
        };
        ruiLocation.tissue_object_size.x = 10;
      } else if (sample.match(/CC3|CC\-3/)) {
        ruiLocation.reference_organ_id = 'http://purl.org/ccf/latest/ccf.owl#VHSpleenCC3';
        ruiLocation.tissue_position_mass_point = {
          x: 58.7 / 2 + ruiLocation.tissue_position_mass_point.x,
          y: 43.4 - 60,
          z: 9.54 / 2 * 0
        };
        ruiLocation.tissue_object_size.x = 10;
      } else {
        ruiLocation.reference_organ_id = 'http://purl.org/ccf/latest/ccf.owl#VHSpleen';
      }
      entity.rui_location = ruiLocation;
    }
  }
  return entities;
}

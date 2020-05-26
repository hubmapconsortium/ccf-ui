import { set } from 'lodash';
import { OldRuiData } from './old-rui-utils';


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
  data = {
    ...data,
    tissue_object_size: fixXYZ(data.tissue_object_size),
    tissue_object_rotation: fixXYZ(data.tissue_object_rotation),
    tissue_position_mass_point: fixXYZ(data.tissue_position_mass_point)
  };

  Object.entries(data).forEach(([k, v]) => {
    if (typeof v === 'string') {
      set(data, k, fixString(v));
    }
  });

  return data;
}

/**
 * Fixes RUI Locations registred by UFL manually
 *
 * @param ruiLocation the original RUI location
 * @param data the search-api raw data
 * @returns The fixed RUI location
 */
export function fixUflRuiLocation(ruiLocation: OldRuiData, data: {[key: string]: unknown}): OldRuiData {
  ruiLocation = fixOldRuiData(ruiLocation);
  const sample = data.lab_tissue_sample_id as string || '';
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
  return ruiLocation;
}

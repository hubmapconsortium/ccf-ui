import { OldRuiData } from '../old-rui-utils';
import { vuPatchData } from './hubmap-vu-patch-data';


/**
 * Fixes old RUI data from VU.
 *
 * @param data The original RUI data
 * @returns The fixed RUI data
 */
function fixOldRuiData(data: OldRuiData): OldRuiData {
  return {
    ...data,
    tissue_position_mass_point: {
      x: data.tissue_position_mass_point.x - 60 / 2,
      y: data.tissue_position_mass_point.y - 100 / 2,
      z: data.tissue_position_mass_point.z - 60 / 2
    }
  };
}


/**
 * Patches a set of entities to fix VU rui data
 *
 * @param entities entity data to process
 * @returns patched entity data
 */
export function applyVUPatch(entities: {[key: string]: unknown}[]): {[key: string]: unknown}[] {
  for (const entity of entities) {
    const displayId = entity.hubmap_display_id as string || '';
    if (vuPatchData.hasOwnProperty(displayId)) {
      const ruiLocation = entity.rui_location = fixOldRuiData(vuPatchData[displayId]);
      if (/\-RK\-/.test(displayId)) {
        ruiLocation.reference_organ_id = 'http://purl.org/ccf/latest/ccf.owl#VHRightKidney';
      } else if (/\-LK\-/.test(displayId)) {
        ruiLocation.reference_organ_id = 'http://purl.org/ccf/latest/ccf.owl#VHLeftKidney';
      }
    }
  }
  return entities;
}

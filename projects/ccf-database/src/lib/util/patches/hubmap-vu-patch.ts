import { get, set } from 'lodash';
import { vuPatchData } from './hubmap-vu-patch-data';


export function applyVUPatch(entities: {[key: string]: unknown}[]): {[key: string]: unknown}[] {
  for (const entity of entities) {
    let displayId = entity.hubmap_display_id as string || '';
    if (vuPatchData.hasOwnProperty(displayId)) {
      entity.rui_location = vuPatchData[displayId];
      if (displayId.match(/\-RK\-/)) {
        vuPatchData[displayId].reference_organ_id = 'http://purl.org/ccf/latest/ccf.owl#VHRightKidney';
      } else if (displayId.match(/\-LK\-/)) {
        vuPatchData[displayId].reference_organ_id = 'http://purl.org/ccf/latest/ccf.owl#VHLeftKidney';
      }
    }
    displayId = get(entity, 'origin_sample.hubmap_display_id', undefined) as string;
    if (vuPatchData.hasOwnProperty(displayId)) {
      set(entity, 'origin_sample.rui_location', vuPatchData[displayId]);
    }
  }
  return entities;
}

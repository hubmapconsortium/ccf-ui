
export interface OldRuiData {
  alignment_id: string;
  alignment_operator_first_name: string;
  alignment_operator_last_name: string;
  alignment_datetime: string;
  reference_organ_id: string;
  tissue_position_vertices: unknown[];
  tissue_position_mass_point: {
    x: number,
    y: number,
    z: number
  };
  tissue_object_rotation: {
    x: number,
    y: number,
    z: number
  };
  tissue_object_size: {
    x: number,
    y: number,
    z: number
  };
}

export function convertOldRuiToJsonLd(data: OldRuiData, externalId?: string, refOrganId?: string): unknown {
  const D = data.tissue_object_size;
  const R = data.tissue_object_rotation;
  const T = data.tissue_position_mass_point;
  const placementTarget = refOrganId || (data.reference_organ_id !== 'uuid-1234-5678' ? data.reference_organ_id : 'http://purl.org/ccf/latest/ccf.owl#VHKidney');

  return {
    '@context': 'http://purl.org/ccf/latest/ccf-context.jsonld',
    '@id': 'http://purl.org/ccf/0.5/' + data.alignment_id,
    '@type': 'SpatialEntity',
    label: externalId || undefined,
    creator: `${data.alignment_operator_first_name} ${data.alignment_operator_last_name}`,
    creator_first_name: data.alignment_operator_first_name,
    creator_last_name: data.alignment_operator_last_name,
    // creator_orcid: data.alignment_operator_orcid,
    creation_date: data.alignment_datetime,
    x_dimension: D.x,
    y_dimension: D.y,
    z_dimension: D.z,
    dimension_units: 'millimeter',

    placement: {
      '@id': 'http://purl.org/ccf/0.5/' + data.alignment_id + '_placement',
      '@type': 'SpatialPlacement',
      target: placementTarget,
      placement_date: data.alignment_datetime,

      x_scaling: 1, y_scaling: 1, z_scaling: 1,
      x_rotation: R.x, y_rotation: R.y, z_rotation: R.z, rotation_order: 'XYZ',
      x_translation: T.x, y_translation: T.y, z_translation: T.z,
    }
  };
}

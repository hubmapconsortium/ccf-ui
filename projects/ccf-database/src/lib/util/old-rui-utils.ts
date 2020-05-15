/** RUI v0.5.0 format */
export interface OldRuiData {
  /** Identifier. */
  alignment_id: string;
  /** Creator first name. */
  alignment_operator_first_name: string;
  /** Creator last name. */
  alignment_operator_last_name: string;
  /** Creation time. */
  alignment_datetime: string;
  /** Organ reference identifier. */
  reference_organ_id: string;
  /** Position vertices. */
  tissue_position_vertices: unknown[];
  /** Tissue point of mass. */
  tissue_position_mass_point: {
    x: number,
    y: number,
    z: number
  };
  /** Tissue object rotation. */
  tissue_object_rotation: {
    x: number,
    y: number,
    z: number
  };
  /** Tissue object size. */
  tissue_object_size: {
    x: number,
    y: number,
    z: number
  };
}

/**
 * Converts version 0.5.0 RUI data to new JSONLD format.
 * @param data The old data.
 * @param [externalId] An optional label.
 * @param [refOrganId] The organ id.
 * @returns The translated JSONLD data.
 */
export function convertOldRuiToJsonLd(data: OldRuiData, label?: string, refOrganId?: string): object {
  const D = data.tissue_object_size;
  const R = data.tissue_object_rotation;
  const T = data.tissue_position_mass_point;
  const placementTarget = refOrganId || (data.reference_organ_id !== 'uuid-1234-5678' ? data.reference_organ_id : 'http://purl.org/ccf/latest/ccf.owl#VHKidney');

  return {
    '@context': 'http://purl.org/ccf/latest/ccf-context.jsonld',
    '@id': 'http://purl.org/ccf/0.5/' + data.alignment_id,
    '@type': 'SpatialEntity',
    label: label || undefined,
    creator: `${data.alignment_operator_first_name} ${data.alignment_operator_last_name}`,
    creator_first_name: data.alignment_operator_first_name,
    creator_last_name: data.alignment_operator_last_name,
    // creator_orcid: data.alignment_operator_orcid,
    creation_date: data.alignment_datetime,
    ccf_annotations: [],
    x_dimension: D.x, y_dimension: D.y, z_dimension: D.z, dimension_units: 'millimeter',

    placement: {
      '@context': 'http://purl.org/ccf/latest/ccf-context.jsonld',
      '@id': 'http://purl.org/ccf/0.5/' + data.alignment_id + '_placement',
      '@type': 'SpatialPlacement',
      target: placementTarget,
      placement_date: data.alignment_datetime,

      x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
      x_rotation: R.x, y_rotation: R.y, z_rotation: R.z, rotation_order: 'XYZ', rotation_units: 'degree',
      x_translation: T.x, y_translation: T.y, z_translation: T.z, translation_units: 'millimeter'
    }
  };
}

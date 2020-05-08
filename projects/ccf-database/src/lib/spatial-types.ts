export interface SpatialObjectReference {
  '@id': string;
  '@type': 'SpatialObjectReference';
  file: string;
  file_format: string;
  file_subpath?: string;
}

export interface SpatialEntity {
  '@id': string;
  '@type': 'SpatialEntity';
  label?: string;
  creator?: string;
  creator_first_name?: string;
  creator_last_name?: string;
  creator_orcid?: string;
  creation_date?: string;
  x_dimension: number;
  y_dimension: number;
  z_dimension: number;
  dimension_units: string;
  object?: SpatialObjectReference;

  color?: [number, number, number, number];
}

export interface SpatialPlacement {
  '@id': string;
  '@type': 'SpatialPlacement';
  source: SpatialEntity | SpatialObjectReference;
  target: SpatialEntity;

  placement_date: string;
  x_scaling: number;
  y_scaling: number;
  z_scaling: number;
  scaling_units: string;

  x_rotation: number;
  y_rotation: number;
  z_rotation: number;
  w_rotation?: number;
  rotation_order?: string;
  rotation_units: string;

  x_translation: number;
  y_translation: number;
  z_translation: number;
  translation_units: string;
}

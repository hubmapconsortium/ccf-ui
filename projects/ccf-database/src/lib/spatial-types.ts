/** A reference to a spatial object. */
export interface SpatialObjectReference {
  /** Identifier. */
  '@id': string;
  /** Type name. */
  '@type': 'SpatialObjectReference';
  /** Data file name. */
  file: string;
  /** Data format. */
  file_format: string;
  /** File subpath. */
  file_subpath?: string;
}

/** A spatial entity. */
export interface SpatialEntity {
  /** Identifier. */
  '@id': string;
  /** Type name. */
  '@type': 'SpatialEntity';
  /** Entity label. */
  label?: string;
  /** Creator. */
  creator?: string;
  /** Creator first name. */
  creator_first_name?: string;
  /** Creator last name. */
  creator_last_name?: string;
  /** Creator identifier. */
  creator_orcid?: string;
  /** Creation date. */
  creation_date?: string;
  /** X-dimension. */
  x_dimension: number;
  /** Y-dimension. */
  y_dimension: number;
  /** Z-dimension. */
  z_dimension: number;
  /** Units dimensions are in. */
  dimension_units: string;
  /** Data references. */
  object?: SpatialObjectReference;

  /** Coloring. */
  color?: [number, number, number, number];
}

/** Object describing the placement of an entity. */
export interface SpatialPlacement {
  /** Identifier. */
  '@id': string;
  /** Type name. */
  '@type': 'SpatialPlacement';
  /** Source entity. */
  source: SpatialEntity | SpatialObjectReference;
  /** Target entity. */
  target: SpatialEntity;

  /** Date placement was made. */
  placement_date: string;
  /** Scaling in x-dimension. */
  x_scaling: number;
  /** Scaling in y-dimension. */
  y_scaling: number;
  /** Scaling in z-dimension. */
  z_scaling: number;
  /** Units scaling is expressed in. */
  scaling_units: string;

  /** Rotation in x-dimension. */
  x_rotation: number;
  /** Rotation in y-dimension. */
  y_rotation: number;
  /** Rotation in z-dimension. */
  z_rotation: number;
  /** Rotation in w-dimension. */
  w_rotation?: number;
  /** Order rotations should be applied in. */
  rotation_order?: string;
  /** Units rotation is expressed in. */
  rotation_units: string;

  /** Translation in x-dimension. */
  x_translation: number;
  /** Translation in y-dimension. */
  y_translation: number;
  /** Translation in z-dimension. */
  z_translation: number;
  /** Units translation is expressed in. */
  translation_units: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
/** A reference to a spatial object */
export interface SpatialObjectReference {
  /** Identifier */
  '@id': string;
  /** Type name */
  '@type': 'SpatialObjectReference';
  /** Data file name */
  file: string;
  /** Data format */
  file_format: string;
  /** File subpath */
  file_subpath?: string;
}

/** A set of extraction sites */
export interface ExtractionSet {
  /** Identifier */
  '@id': string;
  /** Type name */
  '@type': 'ExtractionSet';
  /** Entity label */
  label: string;
  /** The list of extraction sites in this set */
  extractionSites: SpatialEntity[];
}

/** A spatial entity */
export interface SpatialEntity {
  /** Identifier */
  '@id': string;
  /** Type name */
  '@type': 'SpatialEntity';
  /** IRI of the Entity this Spatial Entity represents */
  entityId?: string;
  /** Entity label */
  label?: string;
  /** Entity comment */
  comment?: string;
  /** Creator */
  creator?: string;
  /** Creator first name */
  creator_first_name?: string;
  /** Creator last name */
  creator_last_name?: string;
  /** Creator middle name */
  creator_middle_name?: string;
  /** Creator identifier */
  creator_orcid?: string;
  /** Creation date */
  creation_date?: string;

  /** Annotations (a set of IRIs) */
  ccf_annotations?: string[];
  /** Annotation (IRI) that says what this entity represents */
  representation_of?: string;
  /** Specifies if this is an anatomical structure of this organ (IRI) */
  reference_organ?: string;
  /** Specifies (where applicable) if this entity came from a Male or Female */
  sex: 'Male' | 'Female' | undefined;
  /** Specifies (where applicable) if this entity came from the left or right side organ */
  side: 'Left' | 'Right' | undefined;
  /** Ranking used in the RUI for ordering lists */
  rui_rank?: number;
  /** The thickness (in nanometers) of slices taken out of this spatial entity */
  slice_thickness?: number;
  /** The number of slices taken out of this spatial entity */
  slice_count?: number;

  /** X-dimension */
  x_dimension: number;
  /** Y-dimension */
  y_dimension: number;
  /** Z-dimension */
  z_dimension: number;
  /** Units dimensions are in */
  dimension_units: string;
  /** Data references */
  object?: SpatialObjectReference;

  /** Coloring */
  color?: [number, number, number, number];
}

/** Object describing the placement of an entity */
export interface SpatialPlacementCommon {
  /** JSON-LD context */
  '@context'?: string;
  /** Identifier */
  '@id': string;
  /** Type name */
  '@type': 'SpatialPlacement';

  /** Date placement was made */
  placement_date: string;
  /** Scaling in x-dimension */
  x_scaling: number;
  /** Scaling in y-dimension */
  y_scaling: number;
  /** Scaling in z-dimension */
  z_scaling: number;
  /** Units scaling is expressed in */
  scaling_units: string;

  /** Rotation in x-dimension */
  x_rotation: number;
  /** Rotation in y-dimension */
  y_rotation: number;
  /** Rotation in z-dimension */
  z_rotation: number;
  /** Rotation in w-dimension */
  w_rotation?: number;
  /** Order rotations should be applied in */
  rotation_order?: string;
  /** Units rotation is expressed in */
  rotation_units: string;

  /** Translation in x-dimension */
  x_translation: number;
  /** Translation in y-dimension */
  y_translation: number;
  /** Translation in z-dimension */
  z_translation: number;
  /** Units translation is expressed in */
  translation_units: string;
}

export interface SpatialPlacement extends SpatialPlacementCommon {
  /** Source entity */
  source: SpatialEntity | SpatialObjectReference;
  /** Target entity */
  target: SpatialEntity;
}

export interface FlatSpatialPlacement extends SpatialPlacementCommon {
  /** Source entity iri */
  source: string;
  /** Target entity iri */
  target: string;
}

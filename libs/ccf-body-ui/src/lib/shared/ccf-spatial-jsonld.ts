/* eslint-disable @typescript-eslint/naming-convention */
import { JsonLdObj } from 'jsonld/jsonld-spec';


export interface SpatialPlacementJsonLd extends JsonLdObj {
  '@context'?: string;
  '@id': string;
  '@type': string;
  source?: string;
  target: string;
  placement_date: string;
  x_scaling: number;
  y_scaling: number;
  z_scaling: number;
  scaling_units: string;
  x_rotation: number;
  y_rotation: number;
  z_rotation: number;
  rotation_units: string;
  x_translation: number;
  y_translation: number;
  z_translation: number;
  translation_units: string;
}

export interface SpatialObjectReferenceJsonLd extends JsonLdObj {
  '@id': string;
  '@type': string;
  file: string;
  file_format: string;
  placement: SpatialPlacementJsonLd;
}

export interface SpatialEntityJsonLd extends JsonLdObj {
  '@context': string;
  '@id': string;
  '@type': string | string[];
  label: string;
  comment: string;
  creator: string;
  creator_first_name: string;
  creator_middle_name: string | undefined;
  creator_last_name: string;
  creator_orcid: string | undefined;
  creation_date: string;
  updated_date: string;
  ccf_annotations: string[];
  representation_of: string;
  reference_organ: string;
  extraction_set: string;
  sex: 'Male' | 'Female' | undefined;
  side: 'Left' | 'Right' | undefined;
  rui_rank: number;
  slice_thickness: number;
  slice_count: number;
  x_dimension: number;
  y_dimension: number;
  z_dimension: number;
  dimension_units: string;
  object: SpatialObjectReferenceJsonLd;
  placement: SpatialPlacementJsonLd | SpatialPlacementJsonLd[];
}

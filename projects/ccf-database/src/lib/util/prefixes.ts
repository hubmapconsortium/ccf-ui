/* eslint-disable @typescript-eslint/naming-convention */
import { DataFactory, Util } from 'triple-store-utils';

/** Constants used to create entity accessors. */
export const PREFIXES = {
  ccf: 'http://purl.org/ccf/latest/ccf.owl#',
  entity: 'http://purl.org/ccf/latest/ccf-entity.owl#',
  obo: 'http://purl.obolibrary.org/obo/',
  uberon: 'http://purl.obolibrary.org/obo/UBERON_',
  lmha: 'http://purl.obolibrary.org/obo/LMHA_',
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  dc: 'http://purl.org/dc/elements/1.1/'
};

/** Prefix factory. */
export const prefixer = Util.prefixes(PREFIXES, DataFactory);

export const rdf = {
  x: prefixer('rdf'),
  type: prefixer('rdf')('type')
};

export const rdfs = {
  x: prefixer('rdfs'),
  label: prefixer('rdfs')('label'),
  comment: prefixer('rdfs')('comment'),
  isDefinedBy: prefixer('rdfs')('isDefinedBy'),
  seeAlso: prefixer('rdfs')('seeAlso')
};

/** Common entity ids. */
export const entity = {
  x: prefixer('entity'),
  id: prefixer('entity')('id'),
  label: rdfs.label,
  description: rdfs.comment,
  link: rdfs.seeAlso,

  sex: prefixer('entity')('sex'),
  age: prefixer('entity')('age'),
  bmi: prefixer('entity')('bmi'),

  Male: DataFactory.literal('Male'),
  Female: DataFactory.literal('Female'),

  consortiumName: prefixer('entity')('consortium_name'),
  providerName: prefixer('entity')('provider_name'),
  providerUUID: prefixer('entity')('provider_uuid'),

  donor: prefixer('entity')('has_donor'),

  sections: prefixer('entity')('has_tissue_section'),
  datasets: prefixer('entity')('has_dataset'),

  sampleType: prefixer('entity')('sample_type'),

  TissueBlock: DataFactory.literal('Tissue Block'),
  TissueSection: DataFactory.literal('Tissue Section'),
  NonStandard: DataFactory.literal('Non-standard'),

  sectionCount: prefixer('entity')('section_count'),
  sectionSize: prefixer('entity')('section_size'),
  sectionUnits: prefixer('entity')('section_units'),
  sectionNumber: prefixer('entity')('section_number'),

  spatialEntity: prefixer('entity')('has_spatial_entity'),
  ontologyTerms: prefixer('entity')('has_ontology_term'),

  technology: prefixer('entity')('technology'),
  thumbnail: prefixer('entity')('has_thumbnail')
};

/** CCF id helper. */
const ccfx = prefixer('ccf');

/** CCF specific ids. */
export const ccf = {
  x: ccfx,
  ontologyNode: {
    label: ccfx('ccf_preferred_label'),
    parent: ccfx('ccf_part_of'),
    children: ccfx('ccf_part_of'),
    rui_rank: ccfx('ccf_rui_rank'),
    synonymLabels: DataFactory.namedNode('http://www.geneontology.org/formats/oboInOwl#hasExactSynonym')
  },
  spatial: {
    Female: ccfx('VHFemale'),
    Male: ccfx('VHMale'),
    BothSexes: ccfx('VHBothSexes'),
    FemaleOrgans: ccfx('VHFemaleOrgans'),
    MaleOrgans: ccfx('VHMaleOrgans')
  },
  SpatialObjectReference: ccfx('SpatialObjectReference'),
  SpatialEntity: ccfx('SpatialEntity'),
  SpatialPlacement: ccfx('SpatialPlacement'),
  spatialObjectReference: {
    file: ccfx('has_object_file'),
    file_format: ccfx('has_object_file_format'),
    file_subpath: ccfx('has_object_file_subpath')
  },
  extractionSet: {
    label: rdfs.label,
    rui_rank: ccfx('ccf_rui_rank')
  },
  spatialEntity: {
    label: rdfs.label,
    comment: rdfs.comment,
    creator: prefixer('dc')('creator'),
    creator_first_name: ccfx('creator_first_name'),
    creator_last_name: ccfx('creator_last_name'),
    creator_orcid: ccfx('creator_orcid'),
    creation_date: ccfx('creation_date'),
    updated_date: ccfx('updated_date'),
    ccf_annotations: ccfx('ccf_annotation'),
    representation_of: ccfx('ccf_representation_of'),
    reference_organ: ccfx('anatomical_structure_of'),
    extraction_set_for: ccfx('extraction_set_for'),
    extraction_set: ccfx('extraction_site_for'),
    sex: ccfx('has_sex'),
    side: ccfx('has_side'),
    rui_rank: ccfx('ccf_rui_rank'),
    slice_thickness: ccfx('ccf_slice_thickness'),
    slice_count: ccfx('ccf_slice_count'),
    x_dimension: ccfx('has_x_dimension'),
    y_dimension: ccfx('has_y_dimension'),
    z_dimension: ccfx('has_z_dimension'),
    dimension_units: ccfx('has_dimension_units'),
    object: ccfx('has_object_reference')
  },
  spatialPlacement: {
    source: ccfx('has_placement_source'),
    target: ccfx('has_placement_target'),

    placement_date: ccfx('has_placement_date'),
    x_scaling: ccfx('has_x_scaling'),
    y_scaling: ccfx('has_y_scaling'),
    z_scaling: ccfx('has_z_scaling'),
    scaling_units: ccfx('has_scaling_units'),

    x_rotation: ccfx('has_x_rotation'),
    y_rotation: ccfx('has_y_rotation'),
    z_rotation: ccfx('has_z_rotation'),
    w_rotation: ccfx('has_theta_rotation'),
    rotation_order: ccfx('has_rotation_order'),
    rotation_units: ccfx('has_rotation_units'),

    x_translation: ccfx('has_x_translation'),
    y_translation: ccfx('has_y_translation'),
    z_translation: ccfx('has_z_translation'),
    translation_units: ccfx('has_translation_units')
  }
};

/** Uberon specific ids. */
export const uberon = {
  x: prefixer('uberon')
};

/** LMHA specific ids. */
export const lmha = {
  x: prefixer('lmha')
};

/** RUI accessors. */
export const rui = {
  bladder: uberon.x('0001255'),
  body: uberon.x('0013702'),
  brain: uberon.x('0000955'),
  colon: uberon.x('0001155'),
  heart: uberon.x('0000948'),
  kidney: uberon.x('0002113'),
  large_intestine: uberon.x('0000059'),
  left_kidney: uberon.x('0004538'),
  left_lung: uberon.x('0002168'),
  left_ureter: uberon.x('0001223'),
  liver: uberon.x('0002107'),
  lung: uberon.x('0002048'),
  lymph_node: uberon.x('0000029'),
  pelvis: uberon.x('0001270'),
  rectum: uberon.x('0001052'),
  right_kidney: uberon.x('0004539'),
  right_lung: uberon.x('0002167'),
  right_ureter: uberon.x('0001222'),
  skin: uberon.x('0002097'),
  small_intestine: uberon.x('0002108'),
  spleen: uberon.x('0002106'),
  thymus: uberon.x('0002370'),
  ureter: uberon.x('0000056'),
  vasculature: uberon.x('0002049')
};

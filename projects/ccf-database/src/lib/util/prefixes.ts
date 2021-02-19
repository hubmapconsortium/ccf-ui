import { DataFactory, Util } from 'triple-store-utils';

/** Constants used to create entity accessors. */
export const PREFIXES = {
  ccf: 'http://purl.org/ccf/latest/ccf.owl#',
  entity: 'http://purl.org/ccf/latest/ccf-entity.owl#',
  obo: 'http://purl.obolibrary.org/obo/',
  uberon: 'http://purl.obolibrary.org/obo/UBERON_',
  lmha: 'http://purl.obolibrary.org/obo/LMHA_',
  rdf: 'http://www.w3.org/2000/01/rdf-schema#',
  dc: 'http://purl.org/dc/elements/1.1/'
};

/** Prefix factory. */
export const prefixer = Util.prefixes(PREFIXES, DataFactory);

export const rdf = {
  x: prefixer('rdf'),
  type: DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')
};

/** Common entity ids. */
export const entity = {
  x: prefixer('entity'),
  id: prefixer('entity')('id'),
  sex: prefixer('entity')('sex'),
  age: prefixer('entity')('age'),
  bmi: prefixer('entity')('bmi'),
  Male: DataFactory.literal('Male'),
  Female: DataFactory.literal('Female'),
  donor: prefixer('entity')('donor'),
  entityType: prefixer('entity')('entityType'),
  groupName: prefixer('entity')('groupName'),
  groupUUID: prefixer('entity')('groupUUID'),
  ontologyTerms: prefixer('entity')('ontologyTerms'),
  spatialEntity: prefixer('entity')('spatialEntity'),
  images: prefixer('entity')('hasImage'),
  imageProviders: prefixer('entity')('hasImageProvider')
};

/** CCF id helper. */
const ccfx = prefixer('ccf');

/** CCF specific ids. */
export const ccf = {
  x: ccfx,
  spatial: {
    Body: ccfx('VHBody'),
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
    label: prefixer('rdf')('label'),
    rui_rank: ccfx('ccf_rui_rank')
  },
  spatialEntity: {
    label: prefixer('rdf')('label'),
    comment: prefixer('rdf')('comment'),
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
  body: uberon.x('0013702'),
  heart: uberon.x('0000948'),
  lung: lmha.x('00211'),
  left_lung: uberon.x('0002168'),
  right_lung: uberon.x('0002167'),
  kidney: uberon.x('0002113'),
  left_kidney: uberon.x('0004538'),
  right_kidney: uberon.x('0004539'),
  spleen: uberon.x('0002106'),
  large_intestine: uberon.x('0001155'),
  small_intestine: uberon.x('0002108'),
  rectum: uberon.x('0001052'),
  liver: uberon.x('0002107'),
  bladder: uberon.x('0001255'),
  ureter: uberon.x('0000056'),
  left_ureter: uberon.x('0001223'),
  right_ureter: uberon.x('0001222'),
  thymus: uberon.x('0002370'),
  lymph_node: uberon.x('0000029')
};

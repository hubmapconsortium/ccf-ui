/* eslint-disable @typescript-eslint/naming-convention */
import { DataFactory, Util } from 'triple-store-utils';

/** Constants used to create entity accessors. */
export const PREFIXES = {
  base: 'http://purl.org/ccf/latest/ccf.owl#',
  ccf: 'http://purl.org/ccf/',
  entity: 'http://purl.org/ccf/latest/ccf-entity.owl#',
  fma: 'http://purl.obolibrary.org/obo/FMA_',
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
    label: ccfx('ccf_pref_label'),
    parent: ccfx('ccf_part_of'),
    children: ccfx('ccf_part_of'),
    rui_rank: ccfx('rui_rank'),
    synonymLabels: DataFactory.namedNode('http://www.geneontology.org/formats/oboInOwl#hasExactSynonym')
  },
  spatial: {
    Female: prefixer('base')('VHFemale'),
    Male: prefixer('base')('VHMale'),
    BothSexes: prefixer('base')('VHBothSexes'),
    FemaleOrgans: prefixer('base')('VHFemaleOrgans'),
    MaleOrgans: prefixer('base')('VHMaleOrgans')
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

/** FMA specific ids. */
export const fma = {
  x: prefixer('fma')
};

/** LMHA specific ids. */
export const lmha = {
  x: prefixer('lmha')
};

/** RUI accessors. */
export const rui = {
  body: uberon.x('0013702'),
  respiratory_system: uberon.x('0001004'),
  colon: uberon.x('0001155'),
  left_lung: uberon.x('0002168'),
  right_lung: uberon.x('0002167'),
  left_bronchus: uberon.x('0002178'),
  right_bronchus: uberon.x('0002177'),
  kidney: uberon.x('0002113'),
  ureter: uberon.x('0000056'),
  eye: uberon.x('0000970'),
  fallopian_tube: uberon.x('0003889'),
  knee: uberon.x('0001465'),
  ovary: uberon.x('0000992'),
  trachea: uberon.x('0003126'),
  aorta: uberon.x('0000947'),
  blood: uberon.x('0000178'),
  bone_marrow: uberon.x('0002371'),
  male_reproductive_system: uberon.x('0000079'),
  lymph_node: uberon.x('0000029'),

  // Derived using console.log(ALL_POSSIBLE_ORGANS.map(o => `  ${o.name.toLowerCase().replace(',', '').replace(/ /g, '_')}: ${o.id.split('/').slice(-1)[0].split('_')[0].toLowerCase()}.x('${o.id.split('_').slice(-1)[0]}'),`).join('\n'));
  blood_vasculature: uberon.x('0004537'),
  brain: uberon.x('0000955'),
  eye_left: uberon.x('0004548'),
  eye_right: fma.x('54449'),
  fallopian_tube_left: uberon.x('0001303'),
  fallopian_tube_right: uberon.x('0001302'),
  heart: uberon.x('0000948'),
  kidney_left: uberon.x('0004538'),
  kidney_right: uberon.x('0004539'),
  knee_left: fma.x('24978'),
  knee_right: fma.x('24977'),
  large_intestine: uberon.x('0000059'),
  liver: uberon.x('0002107'),
  lungs: uberon.x('0002048'),
  mesenteric_lymph_node: uberon.x('0002509'),
  ovary_left: fma.x('7214'),
  ovary_right: fma.x('7213'),
  pancreas: uberon.x('0001264'),
  pelvis: uberon.x('0001270'),
  prostate_gland: uberon.x('0002367'),
  skin: uberon.x('0002097'),
  small_intestine: uberon.x('0002108'),
  spleen: uberon.x('0002106'),
  thymus: uberon.x('0002370'),
  ureter_left: uberon.x('0001223'),
  ureter_right: uberon.x('0001222'),
  urinary_bladder: uberon.x('0001255'),
  uterus: uberon.x('0000995')
};

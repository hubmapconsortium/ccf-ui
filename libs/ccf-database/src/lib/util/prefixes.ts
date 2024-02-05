/* eslint-disable @typescript-eslint/naming-convention */
import { DataFactory, Util } from 'triple-store-utils';

/** Constants used to create entity accessors. */
export const PREFIXES = {
  base: 'http://purl.org/ccf/latest/ccf.owl#',
  ccf: 'http://purl.org/ccf/',
  fma: 'http://purl.org/sig/ont/fma/fma',
  obo: 'http://purl.obolibrary.org/obo/',
  uberon: 'http://purl.obolibrary.org/obo/UBERON_',
  cl: 'http://purl.obolibrary.org/obo/CL_',
  lmha: 'http://purl.obolibrary.org/obo/LMHA_',
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  dc: 'http://purl.org/dc/elements/1.1/',
  dcterms: 'http://purl.org/dc/terms/',
};

/** Prefix factory. */
export const prefixer = Util.prefixes(PREFIXES, DataFactory);

export const rdf = {
  x: prefixer('rdf'),
  type: prefixer('rdf')('type'),
};

export const rdfs = {
  x: prefixer('rdfs'),
  label: prefixer('rdfs')('label'),
  comment: prefixer('rdfs')('comment'),
  isDefinedBy: prefixer('rdfs')('isDefinedBy'),
  seeAlso: prefixer('rdfs')('seeAlso'),
};

/** CCF id helper. */
const ccfx = prefixer('ccf');

/** Common entity ids. */
export const entity = {
  id: prefixer('ccf')('has_registration_location'),
  label: prefixer('rdfs')('label'),
  description: prefixer('rdfs')('comment'),
  link: ccfx('url'),

  sex: ccfx('sex'),
  age: ccfx('age'),
  bmi: ccfx('bmi'),

  Male: DataFactory.literal('Male'),
  Female: DataFactory.literal('Female'),

  consortiumName: ccfx('consortium_name'),
  providerName: ccfx('tissue_provider_name'),
  providerUUID: ccfx('tissue_provider_uuid'),

  donor: ccfx('comes_from'),

  sections: ccfx('subdivided_into_sections'),
  datasets: ccfx('generates_dataset'),

  sampleType: ccfx('sample_type'),

  TissueBlock: DataFactory.literal('Tissue Block'),
  TissueSection: DataFactory.literal('Tissue Section'),
  NonStandard: DataFactory.literal('Non-standard'),

  sectionCount: ccfx('section_count'),
  sectionSize: ccfx('section_size'),
  sectionUnits: ccfx('section_size_unit'),
  sectionNumber: ccfx('section_number'),

  spatialEntity: ccfx('has_registration_location'),
  ontologyTerms: ccfx('has_ontology_term'),
  cellTypeTerms: ccfx('has_cell_type_term'),
  biomarkerTerms: ccfx('has_biomarker_term'),

  technology: ccfx('technology'),
  thumbnail: ccfx('thumbnail'),
};

/** CCF specific ids. */
export const ccf = {
  x: ccfx,
  base: prefixer('base'),
  ontologyNode: {
    label: ccfx('ccf_pref_label'),
    parent: ccfx('ccf_part_of'),
    children: ccfx('ccf_part_of'),
    rui_rank: ccfx('rui_rank'),
    synonymLabels: DataFactory.namedNode(
      'http://www.geneontology.org/formats/oboInOwl#hasExactSynonym'
    ),
  },
  asctb: {
    part_of: ccfx('ccf_part_of'),
    ct_is_a: ccfx('ccf_ct_isa'),
    located_in: ccfx('ccf_located_in'),
    characterizes: ccfx('ccf_characterizes'),
    bm_located_in: ccfx('ccf_bm_located_in'),
  },
  spatial: {
    Female: prefixer('base')('VHFemale'),
    Male: prefixer('base')('VHMale'),
    BothSexes: prefixer('base')('VHBothSexes'),
    FemaleOrgans: prefixer('base')('VHFemaleOrgans'),
    MaleOrgans: prefixer('base')('VHMaleOrgans'),
  },
  SpatialObjectReference: ccfx('spatial_object_reference'),
  SpatialEntity: ccfx('spatial_entity'),
  SpatialPlacement: ccfx('spatial_placement'),
  spatialObjectReference: {
    file: ccfx('file_url'),
    file_format: ccfx('file_format'),
    file_subpath: ccfx('file_subpath'),
  },
  extractionSet: {
    label: prefixer('rdfs')('label'),
    rui_rank: ccfx('rui_rank'),
  },
  spatialEntity: {
    label: prefixer('rdfs')('label'),
    description: prefixer('rdfs')('comment'),
    creator: prefixer('dcterms')('creator'),
    creator_first_name: ccfx('creator_first_name'),
    creator_last_name: ccfx('creator_last_name'),
    creator_middle_name: ccfx('creator_middle_name'),
    creator_orcid: ccfx('creator_orcid'),
    creation_date: prefixer('dcterms')('created'),
    updated_date: ccfx('updated_date'),
    ccf_annotations: ccfx('collides_with'),
    representation_of: ccfx('representation_of'),
    reference_organ: ccfx('has_reference_organ'),
    extraction_set_for: ccfx('extraction_set_for'),
    extraction_set: ccfx('has_extraction_set'),
    sex: ccfx('organ_owner_sex'),
    side: ccfx('organ_side'),
    rui_rank: ccfx('rui_rank'),
    slice_thickness: ccfx('slice_thickness'),
    slice_count: ccfx('slice_count'),
    x_dimension: ccfx('x_dimension'),
    y_dimension: ccfx('y_dimension'),
    z_dimension: ccfx('z_dimension'),
    dimension_units: ccfx('dimension_unit'),
    object: ccfx('has_object_reference'),
  },
  spatialPlacement: {
    source: ccfx('placement_for'),
    target: ccfx('placement_relative_to'),

    placement_date: prefixer('dcterms')('created'),
    x_scaling: ccfx('x_scaling'),
    y_scaling: ccfx('y_scaling'),
    z_scaling: ccfx('z_scaling'),
    scaling_units: ccfx('scaling_unit'),

    x_rotation: ccfx('x_rotation'),
    y_rotation: ccfx('y_rotation'),
    z_rotation: ccfx('z_rotation'),
    w_rotation: ccfx('theta_rotation'),
    rotation_order: ccfx('rotation_order'),
    rotation_units: ccfx('rotation_unit'),

    x_translation: ccfx('x_translation'),
    y_translation: ccfx('y_translation'),
    z_translation: ccfx('z_translation'),
    translation_units: ccfx('translation_unit'),
  },
};

/** Uberon specific ids. */
export const uberon = {
  x: prefixer('uberon'),
  body: prefixer('uberon')('0013702'),
};

/** CL specific ids. */
export const cl = {
  x: prefixer('cl'),
  cell: prefixer('cl')('0000000'),
};

/** FMA specific ids. */
export const fma = {
  x: prefixer('fma'),
};

/** LMHA specific ids. */
export const lmha = {
  x: prefixer('lmha'),
};

/** RUI accessors. */
export const rui = {
  body: uberon.body,
  cell: cl.cell,
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
  uterus: uberon.x('0000995'),
};

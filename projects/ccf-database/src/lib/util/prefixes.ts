import { DataFactory, Util } from 'triple-store-utils';

export const PREFIXES = {
  ccf: 'http://purl.org/ccf/latest/ccf.owl#',
  entity: 'http://purl.org/ccf/latest/ccf-entity.owl#',
  obo: 'http://purl.obolibrary.org/obo/',
  uberon: 'http://purl.obolibrary.org/obo/UBERON_',
  lmha: 'http://purl.obolibrary.org/obo/LMHA_'
};

export const prefixer = Util.prefixes(PREFIXES, DataFactory);

export const entity = {
  x: prefixer('entity'),
  id: prefixer('entity')('id'),
  sex: prefixer('entity')('sex'),
  age: prefixer('entity')('age'),
  Male: DataFactory.literal('Male'),
  Female: DataFactory.literal('Female'),
  groupName: prefixer('entity')('groupName'),
  groupUUID: prefixer('entity')('groupUUID'),
  ontologyTerms: prefixer('entity')('ontologyTerms'),
  spatialEntity: prefixer('entity')('spatialEntity')
};

export const ccf = {
  x: prefixer('ccf')
};

export const uberon = {
  x: prefixer('uberon')
};

export const lmha = {
  x: prefixer('lmha')
};

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
  colon: uberon.x('0001155'),
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

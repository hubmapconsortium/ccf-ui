/* eslint-disable @typescript-eslint/naming-convention */
import { JsonLd, JsonLdObj } from 'jsonld/jsonld-spec';
import { get, omit, set, toNumber } from 'lodash';

import { rui } from '../util/prefixes';


type JsonDict = Record<string, unknown>;
const HBM_PREFIX = 'https://entity.api.hubmapconsortium.org/entities/';

// eslint-disable-next-line max-len
export const DR1_VU_THUMBS = new Set(['VAN0003-LK-32-21-AF_preIMS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-22-AF_preMxIF_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0005-RK-1-1-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-PAS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-AF_preIMS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-86-AF_preMxIF_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0007-LK-203-103-AF_preIMS_registered_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-AF_preIMS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-101-AF_preMxIF_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0009-LK-102-7-AF_preIMS_registered_thumbnail.jpg', 'VAN0009-LK-102-7-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0009-LK-102-7-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0009-LK-102-7-PAS_registered_thumbnail.jpg', 'VAN0010-LK-155-40-AF_preIMS_registered_thumbnail.jpg', 'VAN0010-LK-155-40-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0010-LK-155-40-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0010-LK-155-40-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-AF_preIMS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-11-AF_preMxIF_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0012-RK-103-75-AF_preIMS_registered_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-PAS_registered_thumbnail.jpg', 'VAN0012-RK-103-76-AF_preMxIF_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0013-LK-202-96-AF_preIMS_registered_thumbnail.jpg', 'VAN0013-LK-202-96-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0013-LK-202-96-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0013-LK-202-96-PAS_registered_thumbnail.jpg', 'VAN0013-LK-202-97-AF_preMxIF_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0014-LK-203-108-AF_preIMS_registered_thumbnail.jpg', 'VAN0014-LK-203-108-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0014-LK-203-108-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0014-LK-203-108-PAS_registered_thumbnail.jpg', 'VAN0016-LK-202-89-AF_preIMS_registered_thumbnail.jpg', 'VAN0016-LK-202-89-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0016-LK-202-89-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0016-LK-202-89-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-AF_preIMS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-22-AF_preMxIF_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0005-RK-1-1-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-PAS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-AF_preIMS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-86-AF_preMxIF_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0007-LK-203-103-AF_preIMS_registered_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-AF_preIMS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-101-AF_preMxIF_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0011-RK-3-10-AF_preIMS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-11-AF_preMxIF_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0012-RK-103-75-AF_preIMS_registered_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-PAS_registered_thumbnail.jpg', 'VAN0012-RK-103-76-AF_preMxIF_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc3_registered_thumbnail.jpg']);
// eslint-disable-next-line max-len
export const UFL_THUMBS = { 'HBM558.SRZG.629': 'HBM558.SRZG.629_UFL0002-SP-3-4-1.jpg', 'HBM562.NTMH.548': 'HBM562.NTMH.548_UFL0006-SP-1-2-1.jpg', 'HBM685.KHRQ.684': 'HBM685.KHRQ.684_UFL0008-LY07-1-1.jpg', 'HBM278.SFQW.627': 'HBM278.SFQW.627_UFL0008-LY09-1-1.jpg', 'HBM427.SMGB.866': 'HBM427.SMGB.866_UFL0004-SP-1-4-1.jpg', 'HBM432.LLCF.677': 'HBM432.LLCF.677_UFL0001-SP-2-5-1.jpg', 'HBM586.ZSVS.996': 'HBM586.ZSVS.996_UFL0008-SP-1-1-1.jpg', 'HBM285.XMBT.542': 'HBM285.XMBT.542_UFL0006-TH-1-3-1.jpg', 'HBM289.BWJW.663': 'HBM289.BWJW.663_UFL0006-TH-1-2-1.jpg', 'HBM255.SRPR.985': 'HBM255.SRPR.985_UFL0005-TH-2-2-1.jpg', 'HBM799.WXHD.535': 'HBM799.WXHD.535_UFL0009-LY02-1-1.jpg', 'HBM294.RZFN.624': 'HBM294.RZFN.624_UFL0005-TH-1-1-1.jpg', 'HBM383.TRQG.424': 'HBM383.TRQG.424_UFL0006-SP-1-3-1.jpg', 'HBM647.MFQB.496': 'HBM647.MFQB.496_UFL0001-SP-1-2-1.jpg', 'HBM237.GGPR.739': 'HBM237.GGPR.739_UFL0006-LY01-1-1.jpg', 'HBM288.TPBD.654': 'HBM288.TPBD.654_UFL0003-SP-2-2-1.jpg', 'HBM974.NDXT.675': 'HBM974.NDXT.675_UFL0008-TH-2-2-1.jpg', 'HBM589.SLVV.423': 'HBM589.SLVV.423_UFL0008-LY10-1-1.jpg', 'HBM794.RLFN.358': 'HBM794.RLFN.358_UFL0006-LY03-1-1.jpg', 'HBM372.BQSR.778': 'HBM372.BQSR.778_UFL0007-SP-1-1-1.jpg', 'HBM499.TKDW.458': 'HBM499.TKDW.458_UFL0009-LY03-1-1.jpg', 'HBM342.PRQB.739': 'HBM342.PRQB.739_UFL0003-LY06-1-1.jpg', 'HBM633.CLVN.674': 'HBM633.CLVN.674_UFL0003-SP-3-6-1.jpg', 'HBM343.JQKM.578': 'HBM343.JQKM.578_UFL0009-LY01-1-1.jpg', 'HBM987.XGTH.368': 'HBM987.XGTH.368_UFL0002-SP-2-4-1.jpg', 'HBM964.CWCP.788': 'HBM964.CWCP.788_UFL0006-LY02-2-1.jpg', 'HBM244.TJLK.223': 'HBM244.TJLK.223_UFL0003-SP-1-4-1.jpg', 'HBM646.FSBQ.966': 'HBM646.FSBQ.966_UFL0007-SP-2-2-1.jpg', 'HBM572.GXSB.234': 'HBM572.GXSB.234_UFL0003-SP-3-2-1.jpg', 'HBM772.TKGJ.794': 'HBM772.TKGJ.794_UFL0008-SP-2-1-1.jpg', 'HBM239.CBWR.263': 'HBM239.CBWR.263_UFL0008-SP-1-2-1.jpg', 'HBM992.NRTT.383': 'HBM992.NRTT.383_UFL0006-SP-1-1-1.jpg', 'HBM283.DQXD.546': 'HBM283.DQXD.546_UFL0003-SP-1-2-1.jpg', 'HBM795.JHND.856': 'HBM795.JHND.856_UFL0007-SP-1-2-1.jpg', 'HBM267.BZKT.867': 'HBM267.BZKT.867_UFL0003-SP-2-6-1.jpg', 'HBM838.DLMJ.782': 'HBM838.DLMJ.782_UFL0008-TH-1-1-1.jpg', 'HBM337.FSXL.564': 'HBM337.FSXL.564_UFL0001-SP-3-8-2.jpg', 'HBM355.JDLK.244': 'HBM355.JDLK.244_UFL0004-SP-2-4-1.jpg', 'HBM599.PSZG.737': 'HBM599.PSZG.737_UFL0006-LY02-1-1.jpg' };

/** UUID to TMC mapping. */
const GROUP_UUID_MAPPING: { [uuid: string]: string } = {
  '03b3d854-ed44-11e8-8bce-0e368f3075e8': 'TMC-UCSD',
  '07a29e4c-ed43-11e8-b56a-0e8017bdda58': 'TMC-Florida',
  '308f5ffc-ed43-11e8-b56a-0e8017bdda58': 'TMC-CalTech',
  '5bd084c8-edc2-11e8-802f-0e368f3075e8': 'HBM-TestingGroup',
  '73bb26e4-ed43-11e8-8f19-0a7c1eab007a': 'TMC-Vanderbilt',
  'def5fd76-ed43-11e8-b56a-0e8017bdda58': 'TMC-Stanford',
  '5c106f29-ea2d-11e9-85e8-0efb3ba9a670': 'RTI-General Electric',
  '301615f9-c870-11eb-a8dc-35ce3d8786fe': 'TMC-UConn'
};

function createRuiOrganLookup(): { [organName: string]: string } {
  const lookup: { [organName: string]: string } = {};
  Object.entries(rui).forEach(([k, v]) => (lookup[k] = v.id));
  return lookup;
}

/** RUI organ name to entity identifier. */
const RUI_ORGANS: { [organName: string]: string } = createRuiOrganLookup();

// Taken from: https://github.com/hubmapconsortium/commons/blob/master/hubmap_commons/hubmap_const.py#L101
/** HBM organ names to set of RUI organs. */
const HBM_ORGANS: { [organName: string]: string[] } = {
  AO: [RUI_ORGANS.body, RUI_ORGANS.heart, RUI_ORGANS.aorta], //'Aorta',
  BL: [RUI_ORGANS.body, RUI_ORGANS.urinary_bladder], //'Bladder',
  BD: [RUI_ORGANS.body, RUI_ORGANS.pelvis, RUI_ORGANS.blood], //'Blood', *
  BM: [RUI_ORGANS.body, RUI_ORGANS.pelvis, RUI_ORGANS.bone_marrow], //'Bone Marrow', *
  BR: [RUI_ORGANS.body, RUI_ORGANS.brain], //'Brain',
  LB: [RUI_ORGANS.body, RUI_ORGANS.respiratory_system, RUI_ORGANS.lungs, RUI_ORGANS.left_bronchus], //'Bronchus (Left)',
  RB: [RUI_ORGANS.body, RUI_ORGANS.respiratory_system, RUI_ORGANS.lungs, RUI_ORGANS.right_bronchus], //'Bronchus (Right)',
  LE: [RUI_ORGANS.body, RUI_ORGANS.eye, RUI_ORGANS.eye_left], //'Eye (Left)',
  RE: [RUI_ORGANS.body, RUI_ORGANS.eye, RUI_ORGANS.eye_right], //'Eye (Right)',
  LF: [RUI_ORGANS.body, RUI_ORGANS.fallopian_tube, RUI_ORGANS.fallopian_tube_left], //'Fallopian Tube (Left)',
  RF: [RUI_ORGANS.body, RUI_ORGANS.fallopian_tube, RUI_ORGANS.fallopian_tube_right], //'Fallopian Tube (Right)',
  HT: [RUI_ORGANS.body, RUI_ORGANS.heart], //'Heart',
  LK: [RUI_ORGANS.body, RUI_ORGANS.kidney, RUI_ORGANS.kidney_left], //'Kidney (Left)',
  RK: [RUI_ORGANS.body, RUI_ORGANS.kidney, RUI_ORGANS.kidney_right], //'Kidney (Right)',
  LI: [RUI_ORGANS.body, RUI_ORGANS.large_intestine, RUI_ORGANS.colon], //'Large Intestine',
  LV: [RUI_ORGANS.body, RUI_ORGANS.liver], //'Liver',
  LL: [RUI_ORGANS.body, RUI_ORGANS.respiratory_system, RUI_ORGANS.lungs, RUI_ORGANS.left_lung], //'Lung (Left)',
  LN: [RUI_ORGANS.body, RUI_ORGANS.knee, RUI_ORGANS.knee_left], //'Knee (Left)',
  RL: [RUI_ORGANS.body, RUI_ORGANS.respiratory_system, RUI_ORGANS.lungs, RUI_ORGANS.right_lung], //'Lung (Right)',
  RN: [RUI_ORGANS.body, RUI_ORGANS.knee, RUI_ORGANS.knee_right], //'Knee (Right)',
  LY: [RUI_ORGANS.body, RUI_ORGANS.lymph_node, RUI_ORGANS.mesenteric_lymph_node], //'Lymph Node',
  LO: [RUI_ORGANS.body, RUI_ORGANS.ovary, RUI_ORGANS.ovary_left], //'Ovary (Left)',
  RO: [RUI_ORGANS.body, RUI_ORGANS.ovary, RUI_ORGANS.ovary_right], //'Ovary (Right)',
  PA: [RUI_ORGANS.body, RUI_ORGANS.pancreas], //'Pancreas',
  PL: [RUI_ORGANS.body], //'Placenta', *
  SI: [RUI_ORGANS.body, RUI_ORGANS.small_intestine], //'Small Intestine',
  SK: [RUI_ORGANS.body, RUI_ORGANS.skin], //'Skin',
  SP: [RUI_ORGANS.body, RUI_ORGANS.spleen], //'Spleen',
  ST: [RUI_ORGANS.body], //'Sternum', *
  TH: [RUI_ORGANS.body, RUI_ORGANS.thymus], //'Thymus',
  TR: [RUI_ORGANS.body, RUI_ORGANS.respiratory_system, RUI_ORGANS.lungs, RUI_ORGANS.trachea], //'Trachea',
  UR: [RUI_ORGANS.body, RUI_ORGANS.ureter], //'Ureter',
  UT: [RUI_ORGANS.body, RUI_ORGANS.uterus], //'Uterus',
  OT: [RUI_ORGANS.body], //'Other'
};

const ENTITY_CONTEXT = {
  '@base': 'http://purl.org/ccf/latest/ccf-entity.owl#',
  '@vocab': 'http://purl.org/ccf/latest/ccf-entity.owl#',
  ccf: 'http://purl.org/ccf/',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',

  label: 'rdfs:label',
  description: 'rdfs:comment',
  link: {
    '@id': 'rdfs:seeAlso',
    '@type': '@id'
  },
  samples: {
    '@reverse': 'has_donor'
  },
  sections: {
    '@id': 'has_tissue_section',
    '@type': '@id'
  },
  datasets: {
    '@id': 'has_dataset',
    '@type': '@id'
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  rui_location: {
    '@id': 'has_spatial_entity',
    '@type': '@id'
  },
  ontologyTerms: {
    '@id': 'has_ontology_term',
    '@type': '@id'
  },
  cellTypeTerms: {
    '@id': 'has_cell_type_term',
    '@type': '@id'
  },
  thumbnail: {
    '@id': 'has_thumbnail'
  }
};

/**
 * Converts a hubmap response object into JsonLd.
 *
 * @param data The hubmap data.
 * @returns The converted data.
 */
export function hubmapResponseAsJsonLd(data: unknown, assetsApi = '', portalUrl = '', serviceToken?: string, debug = false): JsonLd {
  const entries = (get(data, 'hits.hits', []) as JsonDict[])
    .map(e => get(e, '_source', {}) as JsonDict);

  const donorLookup: Record<string, JsonLdObj> = {};
  const unflattened: JsonLdObj[] = entries.map(e =>
    new HuBMAPTissueBlock(e, assetsApi, portalUrl, serviceToken).toJsonLd()
  );
  for (const donor of unflattened) {
    const donorId = donor['@id'] as string;
    if (!donorLookup[donorId]) {
      donorLookup[donorId] = donor;
    } else {
      const samples = donorLookup[donorId].samples as JsonLdObj[];
      samples.push((donor.samples as JsonLdObj[])[0]);
    }
  }
  const donors = Object.values(donorLookup);

  if (debug) {
    debugDonors(donors);
    console.log(donors.map(d => ({ '@context': ENTITY_CONTEXT, ...d })));
  }

  return { '@context': ENTITY_CONTEXT, '@graph': donors };
}

function debugDonors(donors: JsonLdObj[]) {
  let datasets: JsonLdObj[] = [];
  let deleted = 0;
  for (const donor of donors.filter(d => (d.samples as []).length > 1)) {
    const samples = donor.samples as JsonLdObj[];
    for (let i=0; i < samples.length; i++) {
      const blockId = samples[i]['@id'] as string;
      datasets = datasets.concat(samples[i].datasets as JsonLdObj[]);
      for (const section of samples[i].sections as JsonLdObj[]) {
        datasets = datasets.concat(section.datasets as JsonLdObj[]);
      }
      for (let j=i+1; j < samples.length; j++) {
        const sections = samples[j].sections as JsonLdObj[];
        if (sections.find(s => s['@id'] === blockId)) {
          samples[i].deleteMe = true;
          deleted++;
        }
      }
    }
    donor.samples = samples.filter(s => s.deleteMe !== true);
  }
  if (deleted > 0) {
    console.log(`⚠ ${deleted} sections identified as blocks`);
  }
}

export class HuBMAPTissueBlock {
  bad = false;
  donor: JsonLdObj;

  '@id': string;
  '@type' = 'Sample';
  label: string;
  description: string;
  link: string;

  sample_type = 'Tissue Block';
  section_count: number;
  section_size: number;
  section_units: string;

  rui_location: JsonLdObj;
  sections: JsonLdObj[];
  datasets: JsonLdObj[];

  constructor(public data: JsonDict, assetsApi = '', portalUrl = '', serviceToken?: string) {
    const entityType = this.data.entity_type;
    if (entityType !== 'Sample') {
      this.bad = true;
      return;
    }
    const ancestors = (this.data.ancestors || []) as JsonDict[];
    const descendants = (this.data.descendants || []) as JsonDict[];

    const donor = ancestors.find(e => e.entity_type === 'Donor') as JsonDict;
    this.donor = this.getDonor(donor, portalUrl);
    const ruiLocation = this.getRuiLocation(data, this.donor);
    if (!ruiLocation) {
      this.bad = true;
    } else {
      this.rui_location = ruiLocation;
    }

    if (!GROUP_UUID_MAPPING[data.group_uuid as string]) {
      GROUP_UUID_MAPPING[data.group_uuid as string] = data.group_name as string;
    }

    const dateEntered = new Date(data.last_modified_timestamp as number).toLocaleDateString();
    const groupName = GROUP_UUID_MAPPING[data.group_uuid as string] || data.group_name as string;
    const creator = data.created_by_user_displayname;

    this['@id'] = HBM_PREFIX + data.uuid;
    this.label = `Registered ${dateEntered}, ${creator}, ${groupName}`;
    this.link = `${portalUrl}browse/sample/${data.uuid}`;

    const sectionLookup: Record<string, JsonLdObj> = {};
    const sections: JsonLdObj[] = [];
    this.sections = sections;
    const datasets: JsonLdObj[] = [];
    this.datasets = datasets;

    for (const descendant of descendants.filter(d => d.entity_type === 'Sample')) {
      const section = this.getSection(descendant, data, portalUrl);

      const sectionId = descendant.submission_id as string;
      sectionLookup[sectionId] = section;
      sections.push(section);
      section.section_number = section.section_number ?? sections.length;
    }
    for (const descendant of descendants) {
      if (descendant.entity_type === 'Dataset') {
        const dataset = this.getDataset(descendant, assetsApi, portalUrl, serviceToken);

        const sectionId = get(descendant, ['ingest_metadata', 'metadata', 'tissue_id']) as string;
        if (sectionLookup[sectionId]) {
          (sectionLookup[sectionId].datasets as JsonLd[])?.push(dataset);
        } else {
          datasets.push(dataset);
        }
      }
    }

    const loc: JsonDict = ruiLocation ?? {};
    const dims = `${loc.x_dimension} x ${loc.y_dimension} x ${loc.z_dimension} ${loc.dimension_units}`;
    this.section_count = loc.slice_count as number || sections.length;
    const sSize = parseFloat(
      (loc.slice_thickness as number ||
        ((loc.z_dimension as number || 0) / Math.max(this.section_count, 1)))
        .toFixed(1)
    );
    this.section_size = sSize;
    const sUnits = loc.dimension_units as string || 'millimeter';
    this.section_units = sUnits;

    this.description = `${dims}, ${sSize} ${sUnits}, ${data.specimen_type}, ${this.section_count} Sections`;

    sections.forEach((section, index) => {
      section.description = `${loc.x_dimension} x ${loc.y_dimension} x ${sSize} ${sUnits}, ${sSize} ${sUnits}, ${section.description}`;
      section.section_number = index + 1;
    });
  }

  getSection(section: JsonDict, data: JsonDict, portalUrl: string): JsonLdObj {
    const dateEntered = new Date(section.last_modified_timestamp as number).toLocaleDateString();
    const groupName = GROUP_UUID_MAPPING[section.group_uuid as string] || section.group_name as string;
    const creator = section.created_by_user_displayname;

    return {
      '@id': HBM_PREFIX + section.uuid,
      '@type': 'Sample',
      label: `Registered ${dateEntered}, ${creator}, ${groupName}`,
      description: `${data.specimen_type}`,
      link: `${portalUrl}browse/sample/${section.uuid}`,

      sample_type: 'Tissue Section',
      section_number: 1,

      samples: [],
      datasets: []
    };
  }

  getDataset(dataset: JsonDict, assetsApi = '', portalUrl = '', serviceToken?: string): JsonLdObj {
    const dateEntered = new Date(dataset.last_modified_timestamp as number).toLocaleDateString();
    const groupName = GROUP_UUID_MAPPING[dataset.group_uuid as string] || dataset.group_name as string;
    const creator = dataset.created_by_user_displayname;

    const types = [
      ...dataset.data_types as string[],
      get(dataset, ['ingest_metadata', 'metadata', 'assay_type'], '')
    ];
    const typesSearch = types.join('|').toLowerCase();

    let technology: string;
    let thumbnail = 'assets/icons/ico-unknown.svg';
    if (typesSearch.indexOf('10x') !== -1) {
      technology = '10x';
      thumbnail = 'assets/icons/ico-bulk-10x.svg';
    } else if (typesSearch.indexOf('af') !== -1) {
      technology = 'AF';
      thumbnail = 'assets/icons/ico-spatial-af.svg';
    } else if (typesSearch.indexOf('codex') !== -1) {
      technology = 'CODEX';
      thumbnail = 'assets/icons/ico-spatial-codex.svg';
    } else if (typesSearch.indexOf('imc') !== -1) {
      technology = 'IMC';
      thumbnail = 'assets/icons/ico-spatial-imc.svg';
    } else if ((typesSearch.indexOf('lc') !== -1) && (typesSearch.indexOf('af') === -1)) {
      technology = 'LC';
      thumbnail = 'assets/icons/ico-bulk-lc.svg';
    } else if (typesSearch.indexOf('maldi') !== -1) {
      technology = 'MALDI';
    } else if (typesSearch.indexOf('pas') !== -1) {
      technology = 'PAS';
    } else {
      technology = 'OTHER';
    }
    thumbnail = this.getDatasetThumbnail(dataset, assetsApi, serviceToken) ?? thumbnail;

    return {
      '@id': HBM_PREFIX + dataset.uuid,
      '@type': 'Dataset',
      label: `Registered ${dateEntered}, ${creator}, ${groupName}`,
      description: `Data/Assay Types: ${types.join(', ')}`,
      link: `${portalUrl}browse/dataset/${dataset.uuid}`,
      technology,
      thumbnail
    };
  }

  getDatasetThumbnail(dataset: JsonDict, assetsApi: string, serviceToken?: string): string | undefined {
    if (dataset.thumbnail_file) {
      const thumbnailFile = dataset.thumbnail_file as JsonDict;
      return `${assetsApi}/${thumbnailFile.file_uuid}/${thumbnailFile.filename}` + (serviceToken ? `?token=${serviceToken}` : '');
    } else if (dataset.group_uuid === '73bb26e4-ed43-11e8-8f19-0a7c1eab007a') { // TMC-Vanderbilt
      const tiffs = (get(dataset, 'metadata.files', []) as { rel_path: string }[])
        .filter(f => /\.(ome\.tif|ome\.tiff)$/.test(f.rel_path))
        .filter(f => !/(multilayer\.ome\.tif|_ac\.ome\.tif)/.test(f.rel_path))
        .filter(f => DR1_VU_THUMBS.has(
          f.rel_path.split('/').slice(-1)[0].split('?')[0].replace('.ome.tif', '_thumbnail.jpg')
        ))
        .map(f => `${assetsApi}/${dataset.uuid}/${f.rel_path}` + (serviceToken ? `?token=${serviceToken}` : ''));

      if (tiffs.length > 0) {
        const thumb = tiffs[0].split('/').slice(-1)[0].split('?')[0].replace('.ome.tif', '_thumbnail.jpg');
        if (DR1_VU_THUMBS.has(thumb)) {
          return `assets/thumbnails/TMC-Vanderbilt/DR1/${thumb}`;
        }
      }
    } else if (dataset.group_uuid === '07a29e4c-ed43-11e8-b56a-0e8017bdda58') { // TMC-Florida
      const thumb = UFL_THUMBS[dataset.hubmap_id as string];
      if (thumb) {
        return `assets/thumbnails/TMC-Florida/${thumb}`;
      }
    }
    return undefined;
  }

  getDonor(donor: JsonDict, portalUrl: string): JsonLdObj {
    const donorDescription = (donor.description as string || '').toLowerCase();
    let sex: 'Male' | 'Female' | undefined;
    if (donorDescription.includes('female')) {
      sex = 'Female';
    } else if (donorDescription.includes('male')) {
      sex = 'Male';
    }
    const ageMatch = donorDescription.match(/age ([0-9]+)/);
    let age: number | undefined;
    if (ageMatch) {
      age = toNumber(ageMatch[1]);
    }
    let bmi: number | undefined;
    for (const md of get(donor, 'metadata.organ_donor_data', []) as JsonDict[]) {
      if (md.preferred_term === 'Feminine gender' || md.preferred_term === 'Female') {
        sex = 'Female';
      } else if (md.preferred_term === 'Masculine gender' || md.preferred_term === 'Male') {
        sex = 'Male';
      } else if (md.preferred_term === 'Current chronological age' || md.preferred_term === 'Age') {
        age = toNumber(md.data_value);
      } else if (md.preferred_term === 'Body mass index') {
        bmi = toNumber(md.data_value);
      }
    }
    let label = '';
    if (sex && age) {
      label += `${sex}, Age ${age}`;
      if (bmi) {
        label += `, BMI ${bmi.toFixed(1)}`;
      }
    }

    const dateEntered = new Date(donor.last_modified_timestamp as number).toLocaleDateString();
    const groupName = GROUP_UUID_MAPPING[donor.group_uuid as string] || donor.group_name as string;
    const creator = donor.created_by_user_displayname;

    return {
      '@id': HBM_PREFIX + donor.uuid,
      '@type': 'Donor',
      label,
      description: `Entered ${dateEntered}, ${creator}, ${groupName}`,
      link: `${portalUrl}browse/donor/${donor.uuid}`,

      age,
      sex,
      bmi,

      consortium_name: 'HuBMAP',
      provider_name: groupName,
      provider_uuid: donor.group_uuid as string,

      samples: []
    };
  }

  getRuiLocation(data: JsonDict, donor: JsonLdObj): JsonLdObj | undefined {
    const ancestors = (data.ancestors || []) as JsonDict[];
    const organSample = ancestors.find(e => e.entity_type === 'Sample' && e.specimen_type === 'organ') as JsonDict;
    const ontologyTerms = HBM_ORGANS[organSample?.organ as string] || [RUI_ORGANS.body];

    let spatialEntity: JsonLdObj | undefined;
    let ruiLocation = data.rui_location as JsonDict;
    if (ruiLocation) {
      // RUI Location may come in as an unparsed string
      if (typeof ruiLocation === 'string') {
        ruiLocation = JSON.parse(ruiLocation as string) as JsonDict;
      }
      if (ruiLocation.alignment_id) { // Detect RUI 0.5 generated JSON
        console.log('Detected a deprecated rui_location', data.uuid);
      } else if ((ruiLocation as unknown as { '@id': string })['@id']) { // Detect RUI 1.0+ generated JSON-LD
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        spatialEntity = ruiLocation as unknown as JsonLdObj;
      }
    }
    if (spatialEntity) {
      spatialEntity.ccf_annotations = ontologyTerms.concat(spatialEntity.ccf_annotations as string[] || []);

      // Patch to fix RUI 0.5 Kidney and Spleen Placements
      const target: string = get(spatialEntity, ['placement', 'target']) ?? '';
      if (target.startsWith('http://purl.org/ccf/latest/ccf.owl#VHSpleenCC')) {
        if (donor.sex === 'Male') {
          set(spatialEntity, ['placement', 'target'], target.replace('#VHSpleenCC', '#VHMSpleenCC'));
        } else {
          set(spatialEntity, ['placement', 'target'], target.replace('#VHSpleenCC', '#VHFSpleenCC'));
        }
      }
      if (target === 'http://purl.org/ccf/latest/ccf.owl#VHLeftKidney' || target === 'http://purl.org/ccf/latest/ccf.owl#VHRightKidney') {
        if (donor.sex === 'Male') {
          set(spatialEntity, ['placement', 'target'], target.replace('#VH', '#VHM') + '_Patch');
        } else {
          set(spatialEntity, ['placement', 'target'], target.replace('#VH', '#VHF') + '_Patch');
        }
      }
    }
    return spatialEntity;
  }

  getTissueBlock(): JsonLdObj {
    return omit({ ...this }, ['data', 'bad', 'donor']) as unknown as JsonLdObj;
  }

  toJsonLd(): JsonLdObj {
    return { ...this.donor, samples: [this.getTissueBlock()] };
  }
}

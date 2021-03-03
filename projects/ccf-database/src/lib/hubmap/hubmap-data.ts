/* eslint-disable @typescript-eslint/naming-convention */
import { Iri, JsonLd, Url } from 'jsonld/jsonld-spec';
import { get, omit, toNumber } from 'lodash';
import { addJsonLdToStore, Store } from 'triple-store-utils';

import { ccf, rui } from '../util/prefixes';
import { debugData } from './hubmap-data-debugger';
import { fixUflRuiLocation } from './hubmap-ufl-patch';
import { convertOldRuiToJsonLd, OldRuiData } from './old-rui-utils';


export type JsonDict = { [key: string]: unknown };
const HBM_PREFIX = 'https://entity-api.hubmapconsortium.org/entities/';

// eslint-disable-next-line max-len
export const DR1_VU_THUMBS = new Set(['VAN0003-LK-32-21-AF_preIMS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-22-AF_preMxIF_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0005-RK-1-1-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-PAS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-AF_preIMS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-86-AF_preMxIF_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0007-LK-203-103-AF_preIMS_registered_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-AF_preIMS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-101-AF_preMxIF_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0009-LK-102-7-AF_preIMS_registered_thumbnail.jpg', 'VAN0009-LK-102-7-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0009-LK-102-7-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0009-LK-102-7-PAS_registered_thumbnail.jpg', 'VAN0010-LK-155-40-AF_preIMS_registered_thumbnail.jpg', 'VAN0010-LK-155-40-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0010-LK-155-40-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0010-LK-155-40-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-AF_preIMS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-11-AF_preMxIF_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0012-RK-103-75-AF_preIMS_registered_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-PAS_registered_thumbnail.jpg', 'VAN0012-RK-103-76-AF_preMxIF_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0013-LK-202-96-AF_preIMS_registered_thumbnail.jpg', 'VAN0013-LK-202-96-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0013-LK-202-96-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0013-LK-202-96-PAS_registered_thumbnail.jpg', 'VAN0013-LK-202-97-AF_preMxIF_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0014-LK-203-108-AF_preIMS_registered_thumbnail.jpg', 'VAN0014-LK-203-108-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0014-LK-203-108-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0014-LK-203-108-PAS_registered_thumbnail.jpg', 'VAN0016-LK-202-89-AF_preIMS_registered_thumbnail.jpg', 'VAN0016-LK-202-89-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0016-LK-202-89-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0016-LK-202-89-PAS_registered_thumbnail.jpg', '', 'DR1-VU:', 'VAN0003-LK-32-21-AF_preIMS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-22-AF_preMxIF_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0005-RK-1-1-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-PAS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-AF_preIMS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-86-AF_preMxIF_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0007-LK-203-103-AF_preIMS_registered_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-AF_preIMS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-101-AF_preMxIF_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0011-RK-3-10-AF_preIMS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-11-AF_preMxIF_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0012-RK-103-75-AF_preIMS_registered_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-PAS_registered_thumbnail.jpg', 'VAN0012-RK-103-76-AF_preMxIF_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc3_registered_thumbnail.jpg']);

/** UUID to TMC mapping. */
const GROUP_UUID_MAPPING: { [uuid: string]: string } = {
  '03b3d854-ed44-11e8-8bce-0e368f3075e8': 'TMC-UCSD',
  '07a29e4c-ed43-11e8-b56a-0e8017bdda58': 'TMC-Florida',
  '308f5ffc-ed43-11e8-b56a-0e8017bdda58': 'TMC-CalTech',
  '5bd084c8-edc2-11e8-802f-0e368f3075e8': 'HBM-TestingGroup',
  '73bb26e4-ed43-11e8-8f19-0a7c1eab007a': 'TMC-Vanderbilt',
  'def5fd76-ed43-11e8-b56a-0e8017bdda58': 'TMC-Stanford'
};

function createRuiOrganLookup(): { [organName: string]: string } {
  const lookup: { [organName: string]: string } = {};
  Object.entries(rui).forEach(([k, v]) => lookup[k] = v.id);
  return lookup;
}

/** RUI organ name to entity identifier. */
const RUI_ORGANS: { [organName: string]: string } = createRuiOrganLookup();

// Taken from: https://github.com/hubmapconsortium/commons/blob/master/hubmap_commons/hubmap_const.py#L101
/** HBM organ names to set of RUI organs. */
const HBM_ORGANS: { [organName: string]: string[] } = {
  BL: [RUI_ORGANS.body, RUI_ORGANS.bladder],
  RK: [RUI_ORGANS.body, RUI_ORGANS.kidney, RUI_ORGANS.right_kidney],
  LK: [RUI_ORGANS.body, RUI_ORGANS.kidney, RUI_ORGANS.left_kidney],
  HT: [RUI_ORGANS.body, RUI_ORGANS.heart],
  LI: [RUI_ORGANS.body, RUI_ORGANS.large_intestine], // large_intestine
  SI: [RUI_ORGANS.body, RUI_ORGANS.small_instestine],
  LL: [RUI_ORGANS.body, RUI_ORGANS.lung, RUI_ORGANS.left_lung],
  RL: [RUI_ORGANS.body, RUI_ORGANS.lung, RUI_ORGANS.right_lung],
  LY: [RUI_ORGANS.body, RUI_ORGANS.lymph_node],
  SP: [RUI_ORGANS.body, RUI_ORGANS.spleen],
  TH: [RUI_ORGANS.body, RUI_ORGANS.thymus],
  UR: [RUI_ORGANS.body, RUI_ORGANS.ureter],
  LV: [RUI_ORGANS.body, RUI_ORGANS.liver],
  OT: [RUI_ORGANS.body], // other_organ
};

/** HBM organ names to display name. */
const HBM_ORGAN_LABELS: { [organName: string]: string } = {
  BL: 'Bladder',
  RK: 'Right Kidney',
  LK: 'Left Kidney',
  HT: 'Heart',
  LI: 'Large Intestine',
  SI: 'Small Intestine',
  LL: 'Left Lung',
  RL: 'Right Lung',
  LY: 'Lymph Node',
  SP: 'Spleen',
  TH: 'Thymus',
  UR: 'Ureter',
  LV: 'Liver',
  OT: 'Other Organ',
};

/**
 * Converts a hubmap response object into JsonLd.
 *
 * @param data The hubmap data.
 * @returns The converted data.
 */
export function hubmapResponseAsJsonLd(data: unknown, assetsApi = '', portalUrl = '', serviceToken?: string, debug = false): JsonLd {
  const entries = (get(data, 'hits.hits', []) as JsonDict[])
    .map(e => get(e, '_source', {}) as { [key: string]: unknown });

  if (debug) {
    debugData(entries.map(e => new HuBMAPEntity(e, assetsApi, portalUrl, serviceToken)));
  }

  return {
    '@context': {
      '@vocab': 'http://purl.org/ccf/latest/ccf-entity.owl#',
      ontologyTerms: { '@type': '@id' },
      ancestors: { '@type': '@id' },
      descendants: { '@type': '@id' },
      organ: { '@type': '@id' },
      images: { '@id': 'hasImage', '@type': '@id' },
      imageProviders: { '@id': 'hasImageProvider', '@type': '@id' }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    '@graph': entries.map(e => new HuBMAPEntity(e, assetsApi, portalUrl, serviceToken).toJsonLd()) as any
  };
}

/**
 * A HuBMAP Entity derived from raw data coming from the search-api.
 */
export class HuBMAPEntity {
  donor: JsonDict;
  organSample: JsonDict;
  ancestors: JsonDict[];
  descendants: JsonDict[];

  id: string;
  entityType: 'Donor' | 'Sample' | 'Dataset';

  sex?: 'Male' | 'Female';
  age?: number;
  bmi?: number;
  ethnicity?: string;
  label: string;
  description: string;
  doi: string;

  groupUUID: string;
  groupName: string;
  protocolUrl: Url;
  portalUrl: Url;

  images: Url[];
  imageProviders: Iri[];

  ontologyTerms: Iri[];
  organ: Iri;
  organName: string;
  spatialEntity?: JsonLd;
  dataTypes: string[];
  assayTypes: string[];
  containsHumanGeneticSequences: boolean;
  spatialOrBulk: 'Spatial' | 'Bulk';
  thumbnailUrl: string;
  resultUrl: string;
  resultType: string;

  constructor(public data: JsonDict, public assetsApi = '', portalUrl = '', serviceToken?: string) {
    this.id = this.data.uuid as string;
    this.entityType = this.data.entity_type as 'Donor' | 'Sample' | 'Dataset';

    this.ancestors = (this.data.ancestors || []) as JsonDict[];
    this.descendants = (this.data.descendants || []) as JsonDict[];

    if (this.entityType === 'Donor') {
      this.donor = data;
    } else {
      this.donor = this.ancestors.find(e => e.entity_type === 'Donor') as JsonDict;
    }
    if (this.entityType === 'Sample' && data.specimen_type === 'organ') {
      this.organSample = data;
    } else {
      this.organSample = this.ancestors.find(e => e.entity_type === 'Sample' && e.specimen_type === 'organ') as JsonDict;
    }

    const donorDescription = (this.donor.description as string || '').toLowerCase();
    let sex: 'Male' | 'Female' | undefined;
    if (donorDescription.includes('female')) {
      sex = 'Female';
    } else if (donorDescription.includes('male')) {
      sex = 'Male';
    }
    const ageMatch = donorDescription.match(/age\ ([0-9]+)/);
    let age: number | undefined;
    if (ageMatch) {
      age = toNumber(ageMatch[1]);
    }
    let bmi: number | undefined;
    let ethnicity: string | undefined;
    for (const md of get(this.donor, 'metadata.organ_donor_data', []) as JsonDict[]) {
      if (md.preferred_term === 'Feminine gender' || md.preferred_term === 'Female') {
        sex = 'Female';
      } else if (md.preferred_term === 'Masculine gender' || md.preferred_term === 'Male') {
        sex = 'Male';
      } else if (md.preferred_term === 'Current chronological age' || md.preferred_term === 'Age') {
        age = toNumber(md.data_value);
      } else if (md.preferred_term === 'Body mass index') {
        bmi = toNumber(md.data_value);
      } else if (md.grouping_concept_preferred_term === 'Racial group' || md.grouping_concept_preferred_term === 'Race') {
        ethnicity = md.preferred_term as string;
      }
    }
    let label = '';
    if (sex && age) {
      label += `${sex}, Age ${age}`;
      if (bmi) {
        label += `, BMI ${bmi.toFixed(1)}`;
      }
    }

    this.age = age;
    this.sex = sex;
    this.bmi = bmi;
    this.ethnicity = ethnicity;
    this.label = label;

    this.doi = data.display_doi as string;
    this.description = data.description as string;

    const groupUUID = this.groupUUID = (data.group_uuid || this.donor.group_uuid) as string;
    this.groupName = (GROUP_UUID_MAPPING[groupUUID] || data.group_name || this.donor.group_name) as string;
    this.organName = [data, ...this.ancestors, ...this.descendants]
      .map((d) => d.organ as string)
      .find((organ) => !!organ) as string;
    this.ontologyTerms = HBM_ORGANS[this.organName] || [RUI_ORGANS.body];
    this.organ = this.ontologyTerms[this.ontologyTerms.length - 1];
    this.protocolUrl = this.donor.protocol_url as string;

    let ruiLocation = (data.rui_location || this.ancestors[0].rui_location) as OldRuiData;
    if (ruiLocation) {
      // RUI Location may come in as an unparsed string
      if (typeof ruiLocation === 'string') {
        ruiLocation = JSON.parse(ruiLocation as string) as OldRuiData;
      }
      // Detect RUI 0.5 generated JSON
      if (ruiLocation.alignment_id) {
        if (groupUUID === '07a29e4c-ed43-11e8-b56a-0e8017bdda58') { // UFL
          ruiLocation = fixUflRuiLocation(ruiLocation, data);
        }
        let refOrganId: string | undefined;
        if (this.organ === RUI_ORGANS.left_kidney) {
          refOrganId = ccf.x('VHLeftKidney').id;
        } else if (this.organ === RUI_ORGANS.right_kidney) {
          refOrganId = ccf.x('VHRightKidney').id;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.spatialEntity = convertOldRuiToJsonLd(ruiLocation, 'SpatialEntity for ' + this.label, refOrganId) as any;
        // Detect RUI 1.0+ generated JSON-LD
      } else if ((ruiLocation as unknown as { '@id': string })['@id']) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.spatialEntity = ruiLocation as any;
      }
    }

    // Find TIFF Images for use in the HuBMAP Tissue Viewer
    let images: Url[] = [];
    const imageProviders: Iri[] = [];
    for (const d of [data, ...this.ancestors, ...this.descendants]) {
      const tiffs = (get(d, 'metadata.files', []) as { rel_path: string }[])
        .filter(f => /\.(ome\.tif|ome\.tiff)$/.test(f.rel_path))
        .filter(f => !/(multilayer\.ome\.tif|\_ac\.ome\.tif)/.test(f.rel_path)) // FIXME: Temporarily ignore IMS and MxIF data
        // FIXME: Temporarily only use VU tifs that we have thumbnails for
        .filter(f => groupUUID === '73bb26e4-ed43-11e8-8f19-0a7c1eab007a' ? DR1_VU_THUMBS.has(
          f.rel_path.split('/').slice(-1)[0].split('?')[0].replace('.ome.tif', '_thumbnail.jpg')
        ) : true
        )
        .map(f => `${this.assetsApi}/${d.uuid}/${f.rel_path}` + (serviceToken ? `?token=${serviceToken}` : ''));
      if (tiffs.length > 0) {
        images = images.concat(tiffs);
        imageProviders.push(HBM_PREFIX + d.uuid);
      }
    }
    if (images.length > 0) {
      this.images = images;
      this.imageProviders = imageProviders;
    }

    const dataTypes = new Map<string, JsonDict>();
    const assayTypes = new Map<string, JsonDict>();
    let containsSequence = false;
    for (const e of [...this.ancestors, data, ...this.descendants] as JsonDict[]) {
      (e.data_types as string[] || []).forEach(t => dataTypes.set(t, e));
      const assayType = (e as { metadata: { metadata: JsonDict } }).metadata?.metadata?.assay_type as string;
      if (assayType) {
        assayTypes.set(assayType, e);
      }
      if (e.contains_human_genetic_sequences === 'yes' || e.contains_human_genetic_sequences === true) {
        containsSequence = true;
      }
    }
    this.containsHumanGeneticSequences = containsSequence;
    this.dataTypes = [...dataTypes.keys()].sort();
    this.assayTypes = [...assayTypes.keys()].sort();

    const typesSearch = [...this.dataTypes, ...this.assayTypes].map(l => l.toLowerCase()).join('|');
    if (typesSearch.indexOf('10x') !== -1) {
      this.thumbnailUrl = 'assets/icons/ico-bulk-10x.svg';
      this.spatialOrBulk = 'Bulk';
    } else if (typesSearch.indexOf('af') !== -1) {
      this.thumbnailUrl = 'assets/icons/ico-spatial-af.svg';
      this.spatialOrBulk = 'Spatial';
    } else if (typesSearch.indexOf('codex') !== -1) {
      this.thumbnailUrl = 'assets/icons/ico-spatial-codex.svg';
      this.spatialOrBulk = 'Spatial';
    } else if (typesSearch.indexOf('imc') !== -1) {
      this.thumbnailUrl = 'assets/icons/ico-spatial-imc.svg';
      this.spatialOrBulk = 'Spatial';
    } else if ((typesSearch.indexOf('lc') !== -1) && (typesSearch.indexOf('af') === -1)) {
      this.thumbnailUrl = 'assets/icons/ico-bulk-lc.svg';
      this.spatialOrBulk = 'Bulk';
    } else {
      this.thumbnailUrl = 'assets/icons/ico-unknown.svg';
      this.spatialOrBulk = 'Bulk';
    }

    this.portalUrl = `${portalUrl}browse/sample/${this.id}`;
    // this.portalUrl = `${portalUrl}search?ancestor_ids[0]=${this.id}&entity_type[0]=Dataset`;

    if (images.length > 0 && typesSearch.indexOf('codex') === -1) {
      const uuid = images[0].replace(`${this.assetsApi}/`, '').split('/')[0];
      this.resultUrl = `${portalUrl}browse/dataset/${uuid}`;
      this.resultType = 'external_link';

      this.thumbnailUrl = 'assets/histology3.jpg';
      if (groupUUID === '73bb26e4-ed43-11e8-8f19-0a7c1eab007a') { // VU
        const thumb = images[0].split('/').slice(-1)[0].split('?')[0].replace('.ome.tif', '_thumbnail.jpg');
        if (DR1_VU_THUMBS.has(thumb)) {
          this.thumbnailUrl = `assets/thumbnails/DR1-VU/${thumb}`;
        }
      }
    } else {
      if (dataTypes.has('codex_cytokit')) {
        const uuid = dataTypes.get('codex_cytokit')?.uuid;
        this.resultUrl = `${portalUrl}browse/dataset/${uuid}`;
      } else if (dataTypes.has('salmon_rnaseq_10x')) {
        const uuid = dataTypes.get('salmon_rnaseq_10x')?.uuid;
        this.resultUrl = `${portalUrl}browse/dataset/${uuid}`;
      } else if (dataTypes.has('image_pyramid')) {
        const uuid = dataTypes.get('image_pyramid')?.uuid;
        this.resultUrl = `${portalUrl}browse/dataset/${uuid}`;
      } else {
        this.resultUrl = this.portalUrl;
      }
      this.resultType = 'external_link';
    }
  }

  /**
   * @returns the hubmap data in JSON-LD format
   */
  toJsonLd(): JsonLd {
    const data = this.data;
    return {
      '@id': HBM_PREFIX + this.id,
      '@type': 'Entity',
      ...omit(this, [
        'data', 'donor', 'organ_sample', 'organSample', 'ancestors', 'descendants', 'assetsApi'
      ]) as Record<string, unknown>,
      donor: HBM_PREFIX + this.donor.uuid,
      shortInfo0: this.doi,
      shortInfo1: this.groupName,
      shortInfo2: (data.description || this.donor.description) as string,
      downloadUrl: this.portalUrl,
      downloadTooltip: 'View in the HuBMAP Data Portal',

      // image viewer metadata
      organName: HBM_ORGAN_LABELS[this.organName] || this.organName,
      sex: this.sex,
      age: this.age,
      bmi: this.bmi?.toFixed(1),
      ethnicity: this.ethnicity,
      authorGroup: this.groupName,
      creator: data.created_by_user_displayname as string,
      creation_date: new Date(data.create_timestamp as number || 0).toLocaleDateString(),
      modified_date: new Date(data.last_modified_timestamp as number || 0).toLocaleDateString(),
      donor_id: this.donor.display_doi as string,
      organ_id: this.organSample.display_doi as string,
      tissue_id: this.doi,
      specimen_type: this.data.specimen_type as Record<string, string>,
      data_types: this.dataTypes.join(', '),
      assay_types: this.assayTypes.join(', '),
      spatial_bulk: this.spatialOrBulk,
      contains_sequence: this.containsHumanGeneticSequences ? 'Yes' : 'No',
      description: (data.description || this.donor.description) as string,
    };
  }
}

/**
 * Adds hubmap data from a url to the triple store.
 *
 * @param store The triple store.
 * @param dataUrl The data url.
 * @param serviceType The service type.
 */
export async function addHubmapDataToStore(
  store: Store, dataUrl: string, serviceType: 'static' | 'search-api', serviceToken?: string, assetsApi = '', portalUrl = ''
): Promise<void> {
  let hubmapData: Record<string, unknown> | undefined;
  if (serviceType === 'static') {
    hubmapData = await fetch(dataUrl).then(r => r.ok ? r.json() : undefined).catch(() => { }) as Record<string, unknown>;
  } else if (serviceType === 'search-api') {
    const headers: Record<string, string> = { 'Content-type': 'application/json' };
    if (serviceToken && serviceToken.length > 0) {
      headers.Authorization = `Bearer ${serviceToken}`;
    }
    hubmapData = await fetch(dataUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        version: true,
        size: 10000,
        _source: {
          excludes: ['donor', 'immediate_ancestors', 'immediate_descendants', 'origin_sample', 'ancestor_ids', 'descendant_ids']
        },
        stored_fields: ['*'],
        script_fields: {},
        docvalue_fields: [],
        query: { exists: { field: 'rui_location' } }
      })
    }).then(r => r.ok ? r.json() : undefined).catch(() => { }) as Record<string, unknown>;
  }
  if (hubmapData) {
    await addJsonLdToStore(hubmapResponseAsJsonLd(hubmapData, assetsApi, portalUrl, serviceToken), store);
  } else {
    console.warn(`Unable to load ${dataUrl} as HuBMAP Data`);
  }
}

import { Iri, JsonLd, Url } from 'jsonld/jsonld-spec';
import { get, omit, toNumber } from 'lodash';
import { addJsonLdToStore, N3Store } from 'triple-store-utils';

import { convertOldRuiToJsonLd, OldRuiData } from './old-rui-utils';
import { ccf, rui } from '../util/prefixes';


type JsonDict = { [key: string]: unknown };
const HBM_PREFIX = 'https://entity-api.hubmapconsortium.org/entities/';
const HBM_ASSETS = 'https://assets.test.hubmapconsortium.org/';

/** UUID to TMC mapping. */
const GROUP_UUID_MAPPING: { [uuid: string]: string } = {
  '03b3d854-ed44-11e8-8bce-0e368f3075e8': 'TMC-UCSD',
  '07a29e4c-ed43-11e8-b56a-0e8017bdda58': 'TMC-Florida',
  '308f5ffc-ed43-11e8-b56a-0e8017bdda58': 'TMC-CalTech',
  '5bd084c8-edc2-11e8-802f-0e368f3075e8': 'HBM-TestingGroup',
  '73bb26e4-ed43-11e8-8f19-0a7c1eab007a': 'TMC-Vanderbilt',
  'def5fd76-ed43-11e8-b56a-0e8017bdda58': 'TMC-Stanford'
};

/** RUI organ name to entity identifier. */
const RUI_ORGANS: { [organName: string]: string } = {};
Object.entries(rui).forEach(([k, v]) => RUI_ORGANS[k] = v.id);

// Taken from: https://github.com/hubmapconsortium/commons/blob/master/hubmap_commons/hubmap_const.py#L101
/** HBM organ names to set of RUI organs. */
const HBM_ORGANS: { [organName: string]: string[] } = {
  BL: [RUI_ORGANS.body, RUI_ORGANS.bladder],
  RK: [RUI_ORGANS.body, RUI_ORGANS.kidney, RUI_ORGANS.right_kidney],
  LK: [RUI_ORGANS.body, RUI_ORGANS.kidney, RUI_ORGANS.left_kidney],
  HT: [RUI_ORGANS.body, RUI_ORGANS.heart],
  LI: [RUI_ORGANS.body, RUI_ORGANS.colon], // large_intestine
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

/**
 * Converts a hubmap response object into JsonLd.
 *
 * @param data The hubmap data.
 * @returns The converted data.
 */
export function hubmapResponseAsJsonLd(data: object): JsonLd {
  const entries = (get(data, 'hits.hits', []) as JsonDict[])
    .map(e => get(e, '_source', {}) as { [key: string]: unknown });

  return {
    '@context': {
      '@vocab': 'http://purl.org/ccf/latest/ccf-entity.owl#',
      ontologyTerms: { '@type': '@id' },
      ancestors: { '@type': '@id' },
      descendants: { '@type': '@id' },
      organ: { '@type': '@id' },
      images: { '@id': 'hasImage', '@type': '@id' },
      imageProviders: { '@id': 'hasImageProvider', '@type': '@id'}
    },
    '@graph': entries.map(e => new HuBMAPEntity(e).toJsonLd())
  };
}

export class HuBMAPEntity {
  donor: JsonDict;
  ancestors: JsonDict[];
  descendants: JsonDict[];

  id: string;
  entityType: 'Donor' | 'Sample' | 'Dataset';

  sex?: 'Male' | 'Female';
  age?: number;
  bmi?: number;
  label: string;
  description: string;
  doi: string;

  groupUUID: string;
  groupName: string;
  protocolUrl: Url;

  images: Url[];
  imageProviders: Iri[];

  ontologyTerms: Iri[];
  organ: Iri;
  organName: string;
  spatialEntity?: JsonLd;

  constructor(public data: JsonDict) {
    this.id = this.data.uuid as string;
    this.entityType = this.data.entity_type as 'Donor' | 'Sample' | 'Dataset';

    this.ancestors = (this.data.ancestors || []) as JsonDict[];
    this.descendants = (this.data.descendants || []) as JsonDict[];

    if (this.entityType === 'Donor') {
      this.donor = data;
    } else {
      this.donor = this.ancestors.find(e => e.entity_type === 'Donor') as JsonDict;
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
    for (const md of get(this.donor, 'metadata.organ_donor_data', []) as JsonDict[]) {
      if (md.preferred_term === 'Feminine gender') {
        sex = 'Female';
      } else if (md.preferred_term === 'Masculine gender') {
        sex = 'Male';
      } else if (md.preferred_term === 'Current chronological age') {
        age = toNumber(md.data_value);
      } else if (md.preferred_term === 'Body mass index') {
        bmi = toNumber(md.data_value);
      }
    }
    let label = '';
    if (sex && age) {
      label += `${sex}, Age ${age}`;
      if (bmi) {
        label += `, BMI ${bmi}`;
      }
    }

    this.age = age;
    this.sex = sex;
    this.bmi = bmi;
    this.label = label;

    this.doi = data.display_doi as string;
    this.description = data.description as string;

    const groupUUID = this.groupUUID = (data.group_uuid || this.donor.group_uuid) as string;
    this.groupName = (GROUP_UUID_MAPPING[groupUUID] || data.group_name || this.donor.group_name) as string;
    this.organName = [ data, ...this.ancestors, ...this.descendants ]
      .map((d) => d.organ as string)
      .find((organ) => !!organ) as string;
    this.ontologyTerms = HBM_ORGANS[this.organName] || [RUI_ORGANS.body];
    this.organ = this.ontologyTerms[this.ontologyTerms.length - 1];
    this.protocolUrl = this.donor.protocol_url as string;

    const ruiLocation = (data.rui_location || this.ancestors[0].rui_location) as OldRuiData;
    if (ruiLocation) {
      let refOrganId: string | undefined;
      if (this.organ === RUI_ORGANS.left_kidney) {
        refOrganId = ccf.x('VHRightKidney').id;
      } else if (this.organ === RUI_ORGANS.right_kidney) {
        refOrganId = ccf.x('VHLeftKidney').id;
      }
      this.spatialEntity = convertOldRuiToJsonLd(ruiLocation, 'SpatialEntity for ' + this.label, refOrganId);
    }

    // Find TIFF Images for use in the HuBMAP Tissue Viewer
    let images: Url[] = [];
    const imageProviders: Iri[] = [];
    for (const d of [ data, ...this.ancestors, ...this.descendants ]) {
      const tiffs = (get(d, 'metadata.files', []) as {rel_path: string}[])
        .filter(f => /\.(ome\.tiff)$/.test(f.rel_path))
        .map(f => `${HBM_ASSETS}/${data.uuid}/${f.rel_path}`);
      if (tiffs.length > 0) {
        images = images.concat(tiffs);
        imageProviders.push(HBM_PREFIX + d.uuid);
      }
    }
    if (images.length > 0) {
      this.images = images;
      this.imageProviders = imageProviders;
    }
  }

  toJsonLd(): JsonLd {
    const data = this.data;
    return {
      '@id': HBM_PREFIX + this.id,
      '@type': 'Entity',
      ...omit(this, [
        'data', 'donor', 'ancestors', 'descendants'
      ]),
      donor: HBM_PREFIX + this.donor.uuid,
      shortInfo0: this.doi,
      shortInfo1: this.groupName,
      shortInfo2: data.description || this.donor.description,
      // thumbnailUrl,
      // downloadUrl,
      // downloadTooltip,
      resultUrl: this.protocolUrl,
      resultType: this.protocolUrl ? 'external_link' : undefined,
      // metadata, // image viewer metadata
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
  store: N3Store, dataUrl: string, serviceType: 'static' | 'elasticsearch'
): Promise<void> {
  let hubmapData: object | undefined;
  if (serviceType === 'static') {
    hubmapData = await fetch(dataUrl).then(r => r.ok ? r.json() : undefined) as object;
  } else if (serviceType === 'elasticsearch') {
    hubmapData = await fetch(dataUrl).then(r => r.ok ? r.json() : undefined) as object;
  }
  if (hubmapData) {
    await addJsonLdToStore(hubmapResponseAsJsonLd(hubmapData), store);
  } else {
    console.warn(`Unable to load ${dataUrl} as HuBMAP Data`);
  }
}

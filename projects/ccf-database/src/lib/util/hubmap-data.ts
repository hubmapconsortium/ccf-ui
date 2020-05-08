import { JsonLd } from 'jsonld/jsonld-spec';
import { get, toNumber } from 'lodash';
import { addJsonLdToStore, N3Store } from 'triple-store-utils';

import { rui } from './prefixes';


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
  const entries = get(data, 'hits.hits', []) as object[];
  const graph = entries.map(e =>
    hubmapEntityAsJsonLd(get(e, '_source', {}) as { [key: string]: unknown })
  );

  return {
    '@context': {
      '@vocab': 'http://purl.org/ccf/latest/ccf-entity.owl#',
      ontologyTerms: { '@type': '@id' }
    },
    '@graph': graph
  };
}

/**
 * Converts a hubmap entity to JsonLd.
 *
 * @param entity The hubmap entity data.
 * @returns The converted data.
 */
export function hubmapEntityAsJsonLd(entity: { [key: string]: unknown }): JsonLd {
  const donorDescription = (get(entity, 'donor.description', '') as string).toLowerCase();
  let sex: string | undefined;
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
  let label = entity.hubmap_display_id as string;
  if (sex && age) {
    label += `: ${sex}, Age ${age}`;
  }

  const groupUUID = (entity.group_uuid || get(entity, 'donor.group_uuid', undefined)) as string;
  const groupName = GROUP_UUID_MAPPING[groupUUID] || entity.group_name || get(entity, 'donor.group_name', undefined) as string;
  const ontologyTerms = HBM_ORGANS[(entity.organ || get(entity, 'origin_sample.organ', undefined)) as string] || [RUI_ORGANS.body];
  const protocolUrl = get(entity, 'portal_uploaded_protocol_files[0].protocol_url', undefined) as string;

  return {
    '@id': 'https://entity-api.hubmapconsortium.org/entities/' + entity.uuid,
    '@type': entity.entity_type,
    id: entity.uuid,
    sex,
    age,
    // bmi,
    groupName, // tmc
    groupUUID, // tmc
    // technologies,
    ontologyTerms,

    label,
    organName: entity.organ || get(entity, 'origin_sample.organ', undefined),
    shortInfo0: groupName,
    shortInfo1: entity.description || get(entity, 'donor.description', ''),
    shortInfo2: entity.entity_type,
    // thumbnailUrl,
    // downloadUrl,
    // downloadTooltip,
    resultUrl: protocolUrl,
    resultType: protocolUrl ? 'external_link' : undefined,
    // metadata, // image viewer metadata

    entityType: entity.entity_type,
    description: entity.description,
    displayDOI: entity.display_doi
  };
}

/**
 * Adds hubmap data from a url to the object store.
 *
 * @param store The object store.
 * @param dataUrl The data url.
 * @param serviceType The service type.
 */
export async function addHubmapDataToStore(
  store: N3Store, dataUrl: string, serviceType: 'static' | 'elasticsearch'
): Promise<void> {
  let hubmapData: object | undefined;
  if (serviceType === 'static') {
    hubmapData = await fetch(dataUrl).then(r => r.json()) as object;
  } else if (serviceType === 'elasticsearch') {
    hubmapData = await fetch(dataUrl).then(r => r.json()) as object;
  }
  if (hubmapData) {
    await addJsonLdToStore(hubmapResponseAsJsonLd(hubmapData), store);
  }
}

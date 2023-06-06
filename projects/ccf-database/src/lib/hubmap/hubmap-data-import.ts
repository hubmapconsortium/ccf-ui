/* eslint-disable @typescript-eslint/naming-convention */
import { JsonLd } from 'jsonld/jsonld-spec';
import { addJsonLdToStore, Store } from 'triple-store-utils';

import { hubmapResponseAsJsonLd } from './hubmap-data';


interface SearchResultJson {
  hits: {
    hits: unknown[];
    total: {
      value: number;
    };
  };
}


// Reduce this value if including more data fields
const PER_API_SEARCH_REQUEST_COUNT = 10000;

const INCLUDED_DATA_FIELDS = [
  'uuid', 'entity_type',
  'group_uuid', 'group_name',
  'last_modified_timestamp', 'created_by_user_displayname',
  'ancestors.entity_type',
  'ancestors.description',
  'ancestors.metadata.organ_donor_data.preferred_term',
  'ancestors.metadata.organ_donor_data.data_value',
  'ancestors.metadata.living_donor_data.preferred_term',
  'ancestors.metadata.living_donor_data.data_value',
  'ancestors.last_modified_timestamp',
  'ancestors.group_uuid',
  'ancestors.group_name',
  'ancestors.created_by_user_displayname',
  'ancestors.uuid',
  'descendants.entity_type',
  'descendants.ingest_metadata.metadata.tissue_id',
  'descendants.last_modified_timestamp',
  'descendants.group_uuid',
  'descendants.group_name',
  'descendants.created_by_user_displayname',
  'descendants.uuid',
  'descendants.data_types',
  'descendants.ingest_metadata.metadata.assay_type',
  'descendants.thumbnail_file',
  'descendants.metadata.files.rel_path',
  'rui_location', 'sample_category'
];

const DEFAULT_API_SEARCH_QUERY: unknown = {
  exists: {
    field: 'rui_location'
  }
};

function getApiSearchHeaders(token?: string): Headers {
  const headers = new Headers();

  headers.append('Content-type', 'application/json');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  return headers;
}

function getApiSearchBody(from: number, size: number, query?: unknown): string {
  const bodyObj = {
    version: true,
    from,
    size,
    stored_fields: ['*'],
    script_fields: {},
    docvalue_fields: [],
    query: query ?? DEFAULT_API_SEARCH_QUERY,
    _source: {
      includes: INCLUDED_DATA_FIELDS
    }
  };

  return JSON.stringify(bodyObj);
}

async function doSearchRequest(
  url: string, init?: RequestInit
): Promise<SearchResultJson | undefined> {
  try {
    const res = await fetch(url, init);
    const text = await res.text();
    const validResponse = res.ok || text.startsWith('https');
    if (validResponse) {
      if (text.startsWith('https')) {
        return await fetch(text).then((r) => r.json());
      } else {
        return JSON.parse(text);
      }
    }
    return undefined;
  } catch (_error) {
    return undefined;
  }
}

async function doApiSearch(
  url: string, token?: string, query?: unknown
): Promise<SearchResultJson | undefined> {
  const perReqCount = PER_API_SEARCH_REQUEST_COUNT;
  const headers = getApiSearchHeaders(token);
  const body = getApiSearchBody(0, perReqCount, query);
  const firstResult = await doSearchRequest(url, { method: 'POST', headers, body });
  if (!firstResult) {
    return undefined;
  }

  const totalCount = firstResult.hits.total.value;
  if (totalCount <= perReqCount) {
    return firstResult;
  }

  const requests: Promise<SearchResultJson | undefined>[] = [];
  for (let from = perReqCount; from < totalCount; from += perReqCount) {
    requests.push(doSearchRequest(url, {
      method: 'POST',
      headers,
      body: getApiSearchBody(from, perReqCount, query)
    }));
  }

  const results = await Promise.all(requests);
  if (results.some(res => !res)) {
    return undefined;
  }

  const items = results.map(res => res!.hits.hits);
  return {
    ...firstResult,
    hits: {
      ...firstResult.hits,
      hits: firstResult.hits.hits.concat(...items),
    }
  };
}

/**
 * Search the HuBMAP Search API and return CCF-compatible JSON-LD data
 *
 * @param dataUrl the search API url
 * @param serviceType 'static' if a statically saved response or 'search-api' if querying the search-api live
 * @param query the elastic search query to use
 * @param serviceToken the api key to the search-api
 * @param assetsApi the assets api endpoint
 * @param portalUrl the portal url to point to
 * @returns CCF-compatible JSON-LD data or undefined on error
 */
export async function searchHubmap(
  dataUrl: string, serviceType: 'static' | 'search-api',
  query?: unknown, serviceToken?: string, assetsApi = '', portalUrl = ''
): Promise<JsonLd | undefined> {
  let hubmapData: SearchResultJson | undefined;
  if (serviceType === 'static') {
    hubmapData = await doSearchRequest(dataUrl);
  } else if (serviceType === 'search-api') {
    hubmapData = await doApiSearch(dataUrl, serviceToken, query);
  }

  if (hubmapData) {
    return hubmapResponseAsJsonLd(hubmapData, assetsApi, portalUrl, serviceToken);
  } else {
    console.warn(`Unable to load ${dataUrl} as HuBMAP Data`);
    return undefined;
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
  const hubmapData = await searchHubmap(dataUrl, serviceType, undefined, serviceToken, assetsApi, portalUrl);
  if (hubmapData) {
    await addJsonLdToStore(hubmapData, store);
  }
}

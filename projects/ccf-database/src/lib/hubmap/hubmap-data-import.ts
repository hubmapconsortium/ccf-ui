/* eslint-disable @typescript-eslint/naming-convention */
import { addJsonLdToStore, Store } from 'triple-store-utils';

import { hubmapResponseAsJsonLd } from './hubmap-data';


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
    hubmapData = await fetch(dataUrl).then(r => r.ok ? r.json() : undefined).catch(() => undefined) as Record<string, unknown>;
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
          excludes: [
            'donor', 'immediate_ancestors', 'immediate_descendants', 'origin_sample',
            'portal_metadata_upload_files', 'image_file_metadata', 'ancestor_ids', 'descendant_ids'
          ]
        },
        stored_fields: ['*'],
        script_fields: {},
        docvalue_fields: [],
        query: { exists: { field: 'rui_location' } }
      })
    }).then(r => r.ok ? r.json() : undefined).catch(() => undefined) as Record<string, unknown>;
  }
  if (hubmapData) {
    await addJsonLdToStore(hubmapResponseAsJsonLd(hubmapData, assetsApi, portalUrl, serviceToken), store);
  } else {
    console.warn(`Unable to load ${dataUrl} as HuBMAP Data`);
  }
}

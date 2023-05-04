import { JsonLd } from 'jsonld/jsonld-spec';
import { Store } from 'triple-store-utils';
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
export declare function searchHubmap(dataUrl: string, serviceType: 'static' | 'search-api', query?: unknown, serviceToken?: string, assetsApi?: string, portalUrl?: string): Promise<JsonLd | undefined>;
/**
 * Adds hubmap data from a url to the triple store.
 *
 * @param store The triple store.
 * @param dataUrl The data url.
 * @param serviceType The service type.
 */
export declare function addHubmapDataToStore(store: Store, dataUrl: string, serviceType: 'static' | 'search-api', serviceToken?: string, assetsApi?: string, portalUrl?: string): Promise<void>;

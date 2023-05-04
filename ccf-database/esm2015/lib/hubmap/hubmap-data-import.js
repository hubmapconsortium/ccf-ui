import { __awaiter } from "tslib";
import { addJsonLdToStore } from 'triple-store-utils';
import { hubmapResponseAsJsonLd } from './hubmap-data';
// Reduce this value if including more data fields
const PER_API_SEARCH_REQUEST_COUNT = 250;
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
    'rui_location', 'specimen_type'
];
const DEFAULT_API_SEARCH_QUERY = {
    exists: {
        field: 'rui_location'
    }
};
function getApiSearchHeaders(token) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
}
function getApiSearchBody(from, size, query) {
    const bodyObj = {
        version: true,
        from,
        size,
        stored_fields: ['*'],
        script_fields: {},
        docvalue_fields: [],
        query: query !== null && query !== void 0 ? query : DEFAULT_API_SEARCH_QUERY,
        _source: {
            includes: INCLUDED_DATA_FIELDS
        }
    };
    return JSON.stringify(bodyObj);
}
function doSearchRequest(url, init) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url, init);
            return res.ok ? (yield res.json()) : undefined;
        }
        catch (_error) {
            return undefined;
        }
    });
}
function doApiSearch(url, token, query) {
    return __awaiter(this, void 0, void 0, function* () {
        const perReqCount = PER_API_SEARCH_REQUEST_COUNT;
        const headers = getApiSearchHeaders(token);
        const body = getApiSearchBody(0, perReqCount, query);
        const firstResult = yield doSearchRequest(url, { method: 'POST', headers, body });
        if (!firstResult) {
            return undefined;
        }
        const totalCount = firstResult.hits.total.value;
        if (totalCount <= perReqCount) {
            return firstResult;
        }
        const requests = [];
        for (let from = perReqCount; from < totalCount; from += perReqCount) {
            requests.push(doSearchRequest(url, {
                method: 'POST',
                headers,
                body: getApiSearchBody(from, perReqCount, query)
            }));
        }
        const results = yield Promise.all(requests);
        if (results.some(res => !res)) {
            return undefined;
        }
        const items = results.map(res => res.hits.hits);
        return Object.assign(Object.assign({}, firstResult), { hits: Object.assign(Object.assign({}, firstResult.hits), { hits: firstResult.hits.hits.concat(...items) }) });
    });
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
export function searchHubmap(dataUrl, serviceType, query, serviceToken, assetsApi = '', portalUrl = '') {
    return __awaiter(this, void 0, void 0, function* () {
        let hubmapData;
        if (serviceType === 'static') {
            hubmapData = yield doSearchRequest(dataUrl);
        }
        else if (serviceType === 'search-api') {
            hubmapData = yield doApiSearch(dataUrl, serviceToken, query);
        }
        if (hubmapData) {
            return hubmapResponseAsJsonLd(hubmapData, assetsApi, portalUrl, serviceToken);
        }
        else {
            console.warn(`Unable to load ${dataUrl} as HuBMAP Data`);
            return undefined;
        }
    });
}
/**
 * Adds hubmap data from a url to the triple store.
 *
 * @param store The triple store.
 * @param dataUrl The data url.
 * @param serviceType The service type.
 */
export function addHubmapDataToStore(store, dataUrl, serviceType, serviceToken, assetsApi = '', portalUrl = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const hubmapData = yield searchHubmap(dataUrl, serviceType, undefined, serviceToken, assetsApi, portalUrl);
        if (hubmapData) {
            yield addJsonLdToStore(hubmapData, store);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVibWFwLWRhdGEtaW1wb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NmLWRhdGFiYXNlL3NyYy9saWIvaHVibWFwL2h1Ym1hcC1kYXRhLWltcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLGdCQUFnQixFQUFTLE1BQU0sb0JBQW9CLENBQUM7QUFFN0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBYXZELGtEQUFrRDtBQUNsRCxNQUFNLDRCQUE0QixHQUFHLEdBQUcsQ0FBQztBQUV6QyxNQUFNLG9CQUFvQixHQUFHO0lBQzNCLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFlBQVksRUFBRSxZQUFZO0lBQzFCLHlCQUF5QixFQUFFLDZCQUE2QjtJQUN4RCx1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLG9EQUFvRDtJQUNwRCxnREFBZ0Q7SUFDaEQscURBQXFEO0lBQ3JELGlEQUFpRDtJQUNqRCxtQ0FBbUM7SUFDbkMsc0JBQXNCO0lBQ3RCLHNCQUFzQjtJQUN0Qix1Q0FBdUM7SUFDdkMsZ0JBQWdCO0lBQ2hCLHlCQUF5QjtJQUN6QixnREFBZ0Q7SUFDaEQscUNBQXFDO0lBQ3JDLHdCQUF3QjtJQUN4Qix3QkFBd0I7SUFDeEIseUNBQXlDO0lBQ3pDLGtCQUFrQjtJQUNsQix3QkFBd0I7SUFDeEIsaURBQWlEO0lBQ2pELDRCQUE0QjtJQUM1QixxQ0FBcUM7SUFDckMsY0FBYyxFQUFFLGVBQWU7Q0FDaEMsQ0FBQztBQUVGLE1BQU0sd0JBQXdCLEdBQVk7SUFDeEMsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLGNBQWM7S0FDdEI7Q0FDRixDQUFDO0FBRUYsU0FBUyxtQkFBbUIsQ0FBQyxLQUFjO0lBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENB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SUFDSCxDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cbmltcG9ydCB7IEpzb25MZCB9IGZyb20gJ2pzb25sZC9qc29ubGQtc3BlYyc7XG5pbXBvcnQgeyBhZGRKc29uTGRUb1N0b3JlLCBTdG9yZSB9IGZyb20gJ3RyaXBsZS1zdG9yZS11dGlscyc7XG5cbmltcG9ydCB7IGh1Ym1hcFJlc3BvbnNlQXNKc29uTGQgfSBmcm9tICcuL2h1Ym1hcC1kYXRhJztcblxuXG5pbnRlcmZhY2UgU2VhcmNoUmVzdWx0SnNvbiB7XG4gIGhpdHM6IHtcbiAgICBoaXRzOiB1bmtub3duW107XG4gICAgdG90YWw6IHtcbiAgICAgIHZhbHVlOiBudW1iZXI7XG4gICAgfTtcbiAgfTtcbn1cblxuXG4vLyBSZWR1Y2UgdGhpcyB2YWx1ZSBpZiBpbmNsdWRpbmcgbW9yZSBkYXRhIGZpZWxkc1xuY29uc3QgUEVSX0FQSV9TRUFSQ0hfUkVRVUVTVF9DT1VOVCA9IDI1MDtcblxuY29uc3QgSU5DTFVERURfREFUQV9GSUVMRFMgPSBbXG4gICd1dWlkJywgJ2VudGl0eV90eXBlJyxcbiAgJ2dyb3VwX3V1aWQnLCAnZ3JvdXBfbmFtZScsXG4gICdsYXN0X21vZGlmaWVkX3RpbWVzdGFtcCcsICdjcmVhdGVkX2J5X3VzZXJfZGlzcGxheW5hbWUnLFxuICAnYW5jZXN0b3JzLmVudGl0eV90eXBlJyxcbiAgJ2FuY2VzdG9ycy5kZXNjcmlwdGlvbicsXG4gICdhbmNlc3RvcnMubWV0YWRhdGEub3JnYW5fZG9ub3JfZGF0YS5wcmVmZXJyZWRfdGVybScsXG4gICdhbmNlc3RvcnMubWV0YWRhdGEub3JnYW5fZG9ub3JfZGF0YS5kYXRhX3ZhbHVlJyxcbiAgJ2FuY2VzdG9ycy5tZXRhZGF0YS5saXZpbmdfZG9ub3JfZGF0YS5wcmVmZXJyZWRfdGVybScsXG4gICdhbmNlc3RvcnMubWV0YWRhdGEubGl2aW5nX2Rvbm9yX2RhdGEuZGF0YV92YWx1ZScsXG4gICdhbmNlc3RvcnMubGFzdF9tb2RpZmllZF90aW1lc3RhbXAnLFxuICAnYW5jZXN0b3JzLmdyb3VwX3V1aWQnLFxuICAnYW5jZXN0b3JzLmdyb3VwX25hbWUnLFxuICAnYW5jZXN0b3JzLmNyZWF0ZWRfYnlfdXNlcl9kaXNwbGF5bmFtZScsXG4gICdhbmNlc3RvcnMudXVpZCcsXG4gICdkZXNjZW5kYW50cy5lbnRpdHlfdHlwZScsXG4gICdkZXNjZW5kYW50cy5pbmdlc3RfbWV0YWRhdGEubWV0YWRhdGEudGlzc3VlX2lkJyxcbiAgJ2Rlc2NlbmRhbnRzLmxhc3RfbW9kaWZpZWRfdGltZXN0YW1wJyxcbiAgJ2Rlc2NlbmRhbnRzLmdyb3VwX3V1aWQnLFxuICAnZGVzY2VuZGFudHMuZ3JvdXBfbmFtZScsXG4gICdkZXNjZW5kYW50cy5jcmVhdGVkX2J5X3VzZXJfZGlzcGxheW5hbWUnLFxuICAnZGVzY2VuZGFudHMudXVpZCcsXG4gICdkZXNjZW5kYW50cy5kYXRhX3R5cGVzJyxcbiAgJ2Rlc2NlbmRhbnRzLmluZ2VzdF9tZXRhZGF0YS5tZXRhZGF0YS5hc3NheV90eXBlJyxcbiAgJ2Rlc2NlbmRhbnRzLnRodW1ibmFpbF9maWxlJyxcbiAgJ2Rlc2NlbmRhbnRzLm1ldGFkYXRhLmZpbGVzLnJlbF9wYXRoJyxcbiAgJ3J1aV9sb2NhdGlvbicsICdzcGVjaW1lbl90eXBlJ1xuXTtcblxuY29uc3QgREVGQVVMVF9BUElfU0VBUkNIX1FVRVJZOiB1bmtub3duID0ge1xuICBleGlzdHM6IHtcbiAgICBmaWVsZDogJ3J1aV9sb2NhdGlvbidcbiAgfVxufTtcblxuZnVuY3Rpb24gZ2V0QXBpU2VhcmNoSGVhZGVycyh0b2tlbj86IHN0cmluZyk6IEhlYWRlcnMge1xuICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcblxuICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dG9rZW59YCk7XG4gIH1cblxuICByZXR1cm4gaGVhZGVycztcbn1cblxuZnVuY3Rpb24gZ2V0QXBpU2VhcmNoQm9keShmcm9tOiBudW1iZXIsIHNpemU6IG51bWJlciwgcXVlcnk/OiB1bmtub3duKTogc3RyaW5nIHtcbiAgY29uc3QgYm9keU9iaiA9IHtcbiAgICB2ZXJzaW9uOiB0cnVlLFxuICAgIGZyb20sXG4gICAgc2l6ZSxcbiAgICBzdG9yZWRfZmllbGRzOiBbJyonXSxcbiAgICBzY3JpcHRfZmllbGRzOiB7fSxcbiAgICBkb2N2YWx1ZV9maWVsZHM6IFtdLFxuICAgIHF1ZXJ5OiBxdWVyeSA/PyBERUZBVUxUX0FQSV9TRUFSQ0hfUVVFUlksXG4gICAgX3NvdXJjZToge1xuICAgICAgaW5jbHVkZXM6IElOQ0xVREVEX0RBVEFfRklFTERTXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShib2R5T2JqKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9TZWFyY2hSZXF1ZXN0KFxuICB1cmw6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0XG4pOiBQcm9taXNlPFNlYXJjaFJlc3VsdEpzb24gfCB1bmRlZmluZWQ+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIGluaXQpO1xuICAgIHJldHVybiByZXMub2sgPyAoYXdhaXQgcmVzLmpzb24oKSkgOiB1bmRlZmluZWQ7XG4gIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9BcGlTZWFyY2goXG4gIHVybDogc3RyaW5nLCB0b2tlbj86IHN0cmluZywgcXVlcnk/OiB1bmtub3duXG4pOiBQcm9taXNlPFNlYXJjaFJlc3VsdEpzb24gfCB1bmRlZmluZWQ+IHtcbiAgY29uc3QgcGVyUmVxQ291bnQgPSBQRVJfQVBJX1NFQVJDSF9SRVFVRVNUX0NPVU5UO1xuICBjb25zdCBoZWFkZXJzID0gZ2V0QXBpU2VhcmNoSGVhZGVycyh0b2tlbik7XG4gIGNvbnN0IGJvZHkgPSBnZXRBcGlTZWFyY2hCb2R5KDAsIHBlclJlcUNvdW50LCBxdWVyeSk7XG4gIGNvbnN0IGZpcnN0UmVzdWx0ID0gYXdhaXQgZG9TZWFyY2hSZXF1ZXN0KHVybCwgeyBtZXRob2Q6ICdQT1NUJywgaGVhZGVycywgYm9keSB9KTtcbiAgaWYgKCFmaXJzdFJlc3VsdCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB0b3RhbENvdW50ID0gZmlyc3RSZXN1bHQuaGl0cy50b3RhbC52YWx1ZTtcbiAgaWYgKHRvdGFsQ291bnQgPD0gcGVyUmVxQ291bnQpIHtcbiAgICByZXR1cm4gZmlyc3RSZXN1bHQ7XG4gIH1cblxuICBjb25zdCByZXF1ZXN0czogUHJvbWlzZTxTZWFyY2hSZXN1bHRKc29uIHwgdW5kZWZpbmVkPltdID0gW107XG4gIGZvciAobGV0IGZyb20gPSBwZXJSZXFDb3VudDsgZnJvbSA8IHRvdGFsQ291bnQ7IGZyb20gKz0gcGVyUmVxQ291bnQpIHtcbiAgICByZXF1ZXN0cy5wdXNoKGRvU2VhcmNoUmVxdWVzdCh1cmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVycyxcbiAgICAgIGJvZHk6IGdldEFwaVNlYXJjaEJvZHkoZnJvbSwgcGVyUmVxQ291bnQsIHF1ZXJ5KVxuICAgIH0pKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChyZXF1ZXN0cyk7XG4gIGlmIChyZXN1bHRzLnNvbWUocmVzID0+ICFyZXMpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gcmVzdWx0cy5tYXAocmVzID0+IHJlcyEuaGl0cy5oaXRzKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5maXJzdFJlc3VsdCxcbiAgICBoaXRzOiB7XG4gICAgICAuLi5maXJzdFJlc3VsdC5oaXRzLFxuICAgICAgaGl0czogZmlyc3RSZXN1bHQuaGl0cy5oaXRzLmNvbmNhdCguLi5pdGVtcyksXG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIFNlYXJjaCB0aGUgSHVCTUFQIFNlYXJjaCBBUEkgYW5kIHJldHVybiBDQ0YtY29tcGF0aWJsZSBKU09OLUxEIGRhdGFcbiAqXG4gKiBAcGFyYW0gZGF0YVVybCB0aGUgc2VhcmNoIEFQSSB1cmxcbiAqIEBwYXJhbSBzZXJ2aWNlVHlwZSAnc3RhdGljJyBpZiBhIHN0YXRpY2FsbHkgc2F2ZWQgcmVzcG9uc2Ugb3IgJ3NlYXJjaC1hcGknIGlmIHF1ZXJ5aW5nIHRoZSBzZWFyY2gtYXBpIGxpdmVcbiAqIEBwYXJhbSBxdWVyeSB0aGUgZWxhc3RpYyBzZWFyY2ggcXVlcnkgdG8gdXNlXG4gKiBAcGFyYW0gc2VydmljZVRva2VuIHRoZSBhcGkga2V5IHRvIHRoZSBzZWFyY2gtYXBpXG4gKiBAcGFyYW0gYXNzZXRzQXBpIHRoZSBhc3NldHMgYXBpIGVuZHBvaW50XG4gKiBAcGFyYW0gcG9ydGFsVXJsIHRoZSBwb3J0YWwgdXJsIHRvIHBvaW50IHRvXG4gKiBAcmV0dXJucyBDQ0YtY29tcGF0aWJsZSBKU09OLUxEIGRhdGEgb3IgdW5kZWZpbmVkIG9uIGVycm9yXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hIdWJtYXAoXG4gIGRhdGFVcmw6IHN0cmluZywgc2VydmljZVR5cGU6ICdzdGF0aWMnIHwgJ3NlYXJjaC1hcGknLFxuICBxdWVyeT86IHVua25vd24sIHNlcnZpY2VUb2tlbj86IHN0cmluZywgYXNzZXRzQXBpID0gJycsIHBvcnRhbFVybCA9ICcnXG4pOiBQcm9taXNlPEpzb25MZCB8IHVuZGVmaW5lZD4ge1xuICBsZXQgaHVibWFwRGF0YTogU2VhcmNoUmVzdWx0SnNvbiB8IHVuZGVmaW5lZDtcbiAgaWYgKHNlcnZpY2VUeXBlID09PSAnc3RhdGljJykge1xuICAgIGh1Ym1hcERhdGEgPSBhd2FpdCBkb1NlYXJjaFJlcXVlc3QoZGF0YVVybCk7XG4gIH0gZWxzZSBpZiAoc2VydmljZVR5cGUgPT09ICdzZWFyY2gtYXBpJykge1xuICAgIGh1Ym1hcERhdGEgPSBhd2FpdCBkb0FwaVNlYXJjaChkYXRhVXJsLCBzZXJ2aWNlVG9rZW4sIHF1ZXJ5KTtcbiAgfVxuXG4gIGlmIChodWJtYXBEYXRhKSB7XG4gICAgcmV0dXJuIGh1Ym1hcFJlc3BvbnNlQXNKc29uTGQoaHVibWFwRGF0YSwgYXNzZXRzQXBpLCBwb3J0YWxVcmwsIHNlcnZpY2VUb2tlbik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKGBVbmFibGUgdG8gbG9hZCAke2RhdGFVcmx9IGFzIEh1Qk1BUCBEYXRhYCk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgaHVibWFwIGRhdGEgZnJvbSBhIHVybCB0byB0aGUgdHJpcGxlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBzdG9yZSBUaGUgdHJpcGxlIHN0b3JlLlxuICogQHBhcmFtIGRhdGFVcmwgVGhlIGRhdGEgdXJsLlxuICogQHBhcmFtIHNlcnZpY2VUeXBlIFRoZSBzZXJ2aWNlIHR5cGUuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRIdWJtYXBEYXRhVG9TdG9yZShcbiAgc3RvcmU6IFN0b3JlLCBkYXRhVXJsOiBzdHJpbmcsIHNlcnZpY2VUeXBlOiAnc3RhdGljJyB8ICdzZWFyY2gtYXBpJywgc2VydmljZVRva2VuPzogc3RyaW5nLCBhc3NldHNBcGkgPSAnJywgcG9ydGFsVXJsID0gJydcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBodWJtYXBEYXRhID0gYXdhaXQgc2VhcmNoSHVibWFwKGRhdGFVcmwsIHNlcnZpY2VUeXBlLCB1bmRlZmluZWQsIHNlcnZpY2VUb2tlbiwgYXNzZXRzQXBpLCBwb3J0YWxVcmwpO1xuICBpZiAoaHVibWFwRGF0YSkge1xuICAgIGF3YWl0IGFkZEpzb25MZFRvU3RvcmUoaHVibWFwRGF0YSwgc3RvcmUpO1xuICB9XG59XG4iXX0=
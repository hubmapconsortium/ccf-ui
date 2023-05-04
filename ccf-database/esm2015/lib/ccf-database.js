import { __awaiter } from "tslib";
/* eslint-disable @typescript-eslint/member-ordering */
import { delMany, get, setMany } from 'idb-keyval';
import { addJsonLdToStore, addN3ToStore, addRdfXmlToStore, DataFactory, deserializeN3Store, serializeN3Store, Store } from 'triple-store-utils';
import { CCFSpatialGraph } from './ccf-spatial-graph';
import { CCFSpatialScene } from './ccf-spatial-scene';
import { searchHubmap } from './hubmap/hubmap-data-import';
import { getAggregateResults, getDatasetTechnologyNames, getProviderNames } from './queries/aggregate-results-n3';
import { findIds } from './queries/find-ids-n3';
import { getCellTypeTermOccurences, getOntologyTermOccurences } from './queries/ontology-term-occurences-n3';
import { getAnatomicalStructureTreeModel, getCellTypeTreeModel } from './queries/ontology-tree-n3';
import { getSpatialEntityForEntity } from './queries/spatial-result-n3';
import { getTissueBlockResult } from './queries/tissue-block-result-n3';
import { CCFDatabaseStatusTracker } from './util/ccf-database-status-tracker';
import { patchJsonLd } from './util/patch-jsonld';
import { enrichRuiLocations } from './util/enrich-rui-locations';
/** Default initialization options. */
export const DEFAULT_CCF_DB_OPTIONS = {
    ccfOwlUrl: 'https://purl.org/ccf/latest/ccf.owl',
    ccfContextUrl: 'https://purl.org/ccf/latest/ccf-context.jsonld',
    dataSources: [],
    hubmapDataService: 'static',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '',
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org'
};
/** Database provider. */
export class CCFDatabase {
    /**
     * Creates an instance of ccfdatabase.
     *
     * @param [options] Initialization options.
     */
    constructor(options = DEFAULT_CCF_DB_OPTIONS) {
        this.options = options;
        this.store = new Store(undefined, { factory: DataFactory });
        this.graph = new CCFSpatialGraph(this);
        this.scene = new CCFSpatialScene(this);
    }
    /**
     * Connects the database.
     *
     * @param [options] Options used to initialize.
     * @returns A promise resolving to true if data has been loaded into the database.
     */
    connect(options, cached = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options) {
                this.options = options;
            }
            if (!this.initializing) {
                if (cached) {
                    this.initializing = this.cachedConnect();
                }
                else {
                    this.initializing = this.doConnect();
                }
            }
            yield this.initializing;
            return this.store.size > 0;
        });
    }
    cachedConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const start = new Date().getTime();
            const lastModifiedKey = 'ccf-database.last_modified';
            const ccfDatabaseKey = 'ccf-database';
            const lastModified = yield get(lastModifiedKey).catch(() => undefined);
            let serializedDb;
            if (lastModified && start - new Date(+lastModified).getTime() > 60 * 60 * 1000) {
                yield delMany([ccfDatabaseKey, lastModifiedKey]).catch(() => undefined);
            }
            else {
                serializedDb = yield get(ccfDatabaseKey).catch(() => undefined);
            }
            if (serializedDb) {
                yield this.deserialize(serializedDb);
            }
            else {
                yield this.doConnect();
                setMany([
                    [ccfDatabaseKey, this.serialize()],
                    [lastModifiedKey, '' + start]
                ]).catch(() => undefined);
            }
        });
    }
    /**
     * Actually connects to the database.
     *
     * @returns A promise resolving to void when connected.
     */
    doConnect() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const ops = [];
            const sources = (_b = (_a = this.options.dataSources) === null || _a === void 0 ? void 0 : _a.concat()) !== null && _b !== void 0 ? _b : [];
            const ccfOwlUrl = this.options.ccfOwlUrl;
            if (ccfOwlUrl.startsWith('{')) {
                // serialized n3 store was provided as the ccfOwlUrl
                this.store = deserializeN3Store(ccfOwlUrl, DataFactory);
            }
            else if (ccfOwlUrl.endsWith('.n3store.json')) {
                const storeString = yield fetch(ccfOwlUrl).then(r => r.text())
                    .catch(() => console.log('Couldn\'t locate serialized store.'));
                if (storeString) {
                    this.store = deserializeN3Store(storeString, DataFactory);
                }
            }
            else if ((ccfOwlUrl === null || ccfOwlUrl === void 0 ? void 0 : ccfOwlUrl.length) > 0) {
                sources.push(ccfOwlUrl);
            }
            if (this.options.hubmapDataUrl) {
                if (this.options.hubmapDataUrl.endsWith('jsonld')) {
                    sources.push(this.options.hubmapDataUrl);
                }
                else {
                    ops.push(searchHubmap(this.options.hubmapDataUrl, this.options.hubmapDataService, this.options.hubmapQuery, this.options.hubmapToken, this.options.hubmapAssetsUrl, this.options.hubmapPortalUrl).then((jsonld) => {
                        if (jsonld) {
                            return this.addDataSources([jsonld]);
                        }
                        else {
                            return undefined;
                        }
                    }));
                }
            }
            ops.push(this.addDataSources(sources));
            yield Promise.all(ops);
            yield this.synchronize();
        });
    }
    addDataSources(sources, inputStore) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = inputStore !== null && inputStore !== void 0 ? inputStore : this.store;
            yield Promise.all(sources.map((source) => __awaiter(this, void 0, void 0, function* () {
                if (typeof source === 'string') {
                    if ((source.startsWith('http') || source.startsWith('assets/')) && source.includes('jsonld')) {
                        source = yield fetch(source).then(r => r.text());
                        source = patchJsonLd(source);
                        yield addJsonLdToStore(source, store);
                    }
                    else if (source.endsWith('n3')) {
                        yield addN3ToStore(source, store);
                    }
                    else if (source.endsWith('rdf') || source.endsWith('owl') || source.endsWith('xml')) {
                        yield addRdfXmlToStore(source, store);
                    }
                    else {
                        // Passthrough assumes a JSON-LD response
                        source = patchJsonLd(source);
                        yield addJsonLdToStore(source, store);
                    }
                }
                else {
                    source = patchJsonLd(JSON.stringify(source));
                    yield addJsonLdToStore(source, store);
                }
            })));
            return this;
        });
    }
    synchronize() {
        return __awaiter(this, void 0, void 0, function* () {
            // Add a small delay to allow the triple store to settle
            yield new Promise(r => {
                setTimeout(r, 500);
            });
            this.graph.createGraph();
            enrichRuiLocations(this.store);
            return this;
        });
    }
    serialize() {
        return serializeN3Store(this.store);
    }
    deserialize(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.store = deserializeN3Store(value, DataFactory);
            this.graph = new CCFSpatialGraph(this);
            this.scene = new CCFSpatialScene(this);
            yield new Promise(r => {
                setTimeout(r, 10);
            });
        });
    }
    /**
     * Gets all ids matching the filter.
     *
     * @param [filter] The filter.
     * @returns A set of all matching ids.
     */
    getIds(filter = {}) {
        return findIds(this.store, this.graph, filter);
    }
    /**
     * Gets the data for an object.
     *
     * @param id The id of the requested object.
     * @returns The object data.
     */
    get(id) {
        return this.store.getQuads(DataFactory.namedNode(id), null, null, null);
    }
    /**
     * Gets the data for objects matching a filter.
     *
     * @param [filter] The filter.
     * @returns An array of data.
     */
    search(filter = {}) {
        return [...this.getIds(filter)].map((s) => this.get(s));
    }
    /**
     * Gets all spatial entities for a filter.
     *
     * @param [filter] The filter.
     * @returns A list of spatial entities.
     */
    getSpatialEntities(filter) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        filter = Object.assign(Object.assign({}, filter), { hasSpatialEntity: true });
        return [...this.getIds(filter)].map((s) => getSpatialEntityForEntity(this.store, s));
    }
    getDatabaseStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.status) {
                this.status = new CCFDatabaseStatusTracker(this);
            }
            return this.status.toJson();
        });
    }
    /**
     * Get a list of technology names used by datasets
     *
     * @returns list of unique technology names in the data
     */
    getDatasetTechnologyNames() {
        return __awaiter(this, void 0, void 0, function* () {
            return getDatasetTechnologyNames(this.store);
        });
    }
    /**
     * Get a list of provider names from the database
     *
     * @returns list of unique provider names in the data
     */
    getProviderNames() {
        return __awaiter(this, void 0, void 0, function* () {
            return getProviderNames(this.store);
        });
    }
    /**
     * Gets all tissue block results for a filter.
     *
     * @param [filter] The filter.
     * @returns A list of results.
     */
    getTissueBlockResults(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            filter = Object.assign(Object.assign({}, filter), { hasSpatialEntity: true });
            return [...this.getIds(filter)].map((s) => getTissueBlockResult(this.store, s));
        });
    }
    /**
     * Gets all aggregate results for a filter.
     *
     * @param [filter] The filter.
     * @returns A list of aggregate data.
     */
    getAggregateResults(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return getAggregateResults(this.getIds(filter), this.store);
        });
    }
    /**
     * Get number of occurrences of ontology terms for a set of ids.
     *
     * @param [filter] The filter.
     * @returns Ontology term counts.
     */
    getOntologyTermOccurences(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return getOntologyTermOccurences(this.getIds(filter), this.store);
        });
    }
    /**
     * Get number of occurrences of cell type terms for a set of ids.
     *
     * @param [filter] The filter.
     * @returns Cell type term counts.
     */
    getCellTypeTermOccurences(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTypeTermOccurences(this.getIds(filter), this.store);
        });
    }
    /**
     * Get ontology term tree nodes
     *
     * @returns Ontology term counts.
     */
    getOntologyTreeModel() {
        return __awaiter(this, void 0, void 0, function* () {
            return getAnatomicalStructureTreeModel(this.store);
        });
    }
    /**
     * Get cell type term tree nodes
     *
     * @returns Ontology term counts.
     */
    getCellTypeTreeModel() {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTypeTreeModel(this.store);
        });
    }
    /**
     * Get reference organs
     *
     * @returns Ontology term counts.
     */
    getReferenceOrgans() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.scene.getReferenceOrgans();
        });
    }
    /**
     * Get all nodes to form the 3D scene of reference body, organs, and tissues
     *
     * @param [filter] The filter.
     * @returns A list of Spatial Scene Nodes for the 3D Scene
     */
    getScene(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.graph.createGraph();
            return this.scene.getScene(filter);
        });
    }
    /**
     * Get all nodes to form the 3D scene of reference organ and tissues
     *
     * @param [organIri] The Reference Organ IRI
     * @param [filter] The filter.
     * @returns A list of Spatial Scene Nodes for the 3D Scene
     */
    getReferenceOrganScene(organIri, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.graph.createGraph();
            return this.scene.getReferenceOrganScene(organIri, filter);
        });
    }
    getSpatialPlacement(source, targetIri) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.graph.getSpatialPlacement(source, targetIri);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NmLWRhdGFiYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NmLWRhdGFiYXNlL3NyYy9saWIvY2NmLWRhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1REFBdUQ7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRW5ELE9BQU8sRUFDTCxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFRLGdCQUFnQixFQUFFLEtBQUssRUFDakgsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBb0IsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEgsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdHLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25HLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXhFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFB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SUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0csc0JBQXNCLENBQUMsUUFBZ0IsRUFBRSxNQUFlOztZQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQztLQUFBO0lBRUssbUJBQW1CLENBQUMsTUFBcUIsRUFBRSxTQUFpQjs7WUFDaEUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxDQUFDO0tBQUE7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9tZW1iZXItb3JkZXJpbmcgKi9cbmltcG9ydCB7IGRlbE1hbnksIGdldCwgc2V0TWFueSB9IGZyb20gJ2lkYi1rZXl2YWwnO1xuaW1wb3J0IHsgSnNvbkxkIH0gZnJvbSAnanNvbmxkL2pzb25sZC1zcGVjJztcbmltcG9ydCB7XG4gIGFkZEpzb25MZFRvU3RvcmUsIGFkZE4zVG9TdG9yZSwgYWRkUmRmWG1sVG9TdG9yZSwgRGF0YUZhY3RvcnksIGRlc2VyaWFsaXplTjNTdG9yZSwgUXVhZCwgc2VyaWFsaXplTjNTdG9yZSwgU3RvcmVcbn0gZnJvbSAndHJpcGxlLXN0b3JlLXV0aWxzJztcblxuaW1wb3J0IHsgQ0NGU3BhdGlhbEdyYXBoIH0gZnJvbSAnLi9jY2Ytc3BhdGlhbC1ncmFwaCc7XG5pbXBvcnQgeyBDQ0ZTcGF0aWFsU2NlbmUsIFNwYXRpYWxTY2VuZU5vZGUgfSBmcm9tICcuL2NjZi1zcGF0aWFsLXNjZW5lJztcbmltcG9ydCB7IHNlYXJjaEh1Ym1hcCB9IGZyb20gJy4vaHVibWFwL2h1Ym1hcC1kYXRhLWltcG9ydCc7XG5pbXBvcnQgeyBBZ2dyZWdhdGVSZXN1bHQsIERhdGFiYXNlU3RhdHVzLCBGaWx0ZXIsIE9udG9sb2d5VHJlZU1vZGVsLCBUaXNzdWVCbG9ja1Jlc3VsdCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBnZXRBZ2dyZWdhdGVSZXN1bHRzLCBnZXREYXRhc2V0VGVjaG5vbG9neU5hbWVzLCBnZXRQcm92aWRlck5hbWVzIH0gZnJvbSAnLi9xdWVyaWVzL2FnZ3JlZ2F0ZS1yZXN1bHRzLW4zJztcbmltcG9ydCB7IGZpbmRJZHMgfSBmcm9tICcuL3F1ZXJpZXMvZmluZC1pZHMtbjMnO1xuaW1wb3J0IHsgZ2V0Q2VsbFR5cGVUZXJtT2NjdXJlbmNlcywgZ2V0T250b2xvZ3lUZXJtT2NjdXJlbmNlcyB9IGZyb20gJy4vcXVlcmllcy9vbnRvbG9neS10ZXJtLW9jY3VyZW5jZXMtbjMnO1xuaW1wb3J0IHsgZ2V0QW5hdG9taWNhbFN0cnVjdHVyZVRyZWVNb2RlbCwgZ2V0Q2VsbFR5cGVUcmVlTW9kZWwgfSBmcm9tICcuL3F1ZXJpZXMvb250b2xvZ3ktdHJlZS1uMyc7XG5pbXBvcnQgeyBnZXRTcGF0aWFsRW50aXR5Rm9yRW50aXR5IH0gZnJvbSAnLi9xdWVyaWVzL3NwYXRpYWwtcmVzdWx0LW4zJztcbmltcG9ydCB7IGdldFRpc3N1ZUJsb2NrUmVzdWx0IH0gZnJvbSAnLi9xdWVyaWVzL3Rpc3N1ZS1ibG9jay1yZXN1bHQtbjMnO1xuaW1wb3J0IHsgRmxhdFNwYXRpYWxQbGFjZW1lbnQsIFNwYXRpYWxFbnRpdHkgfSBmcm9tICcuL3NwYXRpYWwtdHlwZXMnO1xuaW1wb3J0IHsgQ0NGRGF0YWJhc2VTdGF0dXNUcmFja2VyIH0gZnJvbSAnLi91dGlsL2NjZi1kYXRhYmFzZS1zdGF0dXMtdHJhY2tlcic7XG5pbXBvcnQgeyBwYXRjaEpzb25MZCB9IGZyb20gJy4vdXRpbC9wYXRjaC1qc29ubGQnO1xuaW1wb3J0IHsgZW5yaWNoUnVpTG9jYXRpb25zIH0gZnJvbSAnLi91dGlsL2VucmljaC1ydWktbG9jYXRpb25zJztcblxuXG4vKiogRGF0YWJhc2UgaW5pdGlhbGl6YXRpb24gb3B0aW9ucy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ0NGRGF0YWJhc2VPcHRpb25zIHtcbiAgLyoqIEEgdXJsIHRvIGxvYWQgZGF0YSBmcm9tLiAqL1xuICBjY2ZPd2xVcmw6IHN0cmluZztcbiAgLyoqIENvbnRleHQuICovXG4gIGNjZkNvbnRleHRVcmw6IHN0cmluZztcbiAgLyoqIEEgbGlzdCBvZiBkYXRhIHNvdXJjZXMgKGluIG4zLCByZGYsIHhtbCwgb3dsLCBvciBqc29ubGQgZm9ybWF0KSAqL1xuICBkYXRhU291cmNlczogKHN0cmluZ3xKc29uTGQpW107XG4gIC8qKiBEYXRhIHNlcnZpY2UgdHlwZS4gKi9cbiAgaHVibWFwRGF0YVNlcnZpY2U6ICdzdGF0aWMnIHwgJ3NlYXJjaC1hcGknO1xuICAvKiogSHVCTUFQIEVsYXN0aWMgU2VhcmNoIFF1ZXJ5ICovXG4gIGh1Ym1hcFF1ZXJ5PzogdW5rbm93bjtcbiAgLyoqIEh1Ym1hcCBQb3J0YWwgdXJsLiAqL1xuICBodWJtYXBQb3J0YWxVcmw6IHN0cmluZztcbiAgLyoqIEh1Ym1hcCBkYXRhIHVybC4gKi9cbiAgaHVibWFwRGF0YVVybDogc3RyaW5nO1xuICAvKiogSHVibWFwIGFzc2V0cyBhcGkgdXJsLiAqL1xuICBodWJtYXBBc3NldHNVcmw6IHN0cmluZztcbiAgLyoqIEh1Qk1BUCBTZXJ2aWNlIFRva2VuLiAqL1xuICBodWJtYXBUb2tlbj86IHN0cmluZztcbn1cblxuLyoqIERlZmF1bHQgaW5pdGlhbGl6YXRpb24gb3B0aW9ucy4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NDRl9EQl9PUFRJT05TOiBDQ0ZEYXRhYmFzZU9wdGlvbnMgPSB7XG4gIGNjZk93bFVybDogJ2h0dHBzOi8vcHVybC5vcmcvY2NmL2xhdGVzdC9jY2Yub3dsJyxcbiAgY2NmQ29udGV4dFVybDogJ2h0dHBzOi8vcHVybC5vcmcvY2NmL2xhdGVzdC9jY2YtY29udGV4dC5qc29ubGQnLFxuICBkYXRhU291cmNlczogW10sXG4gIGh1Ym1hcERhdGFTZXJ2aWNlOiAnc3RhdGljJyxcbiAgaHVibWFwUG9ydGFsVXJsOiAnaHR0cHM6Ly9wb3J0YWwuaHVibWFwY29uc29ydGl1bS5vcmcvJyxcbiAgaHVibWFwRGF0YVVybDogJycsXG4gIGh1Ym1hcEFzc2V0c1VybDogJ2h0dHBzOi8vYXNzZXRzLmh1Ym1hcGNvbnNvcnRpdW0ub3JnJ1xufTtcblxuLyoqIERhdGFiYXNlIHByb3ZpZGVyLiAqL1xuZXhwb3J0IGNsYXNzIENDRkRhdGFiYXNlIHtcbiAgLyoqIFRoZSB0cmlwbGUgc3RvcmUuICovXG4gIHN0b3JlOiBTdG9yZTtcbiAgLyoqIFRoZSBzcGF0aWFsIGdyYXBoICovXG4gIGdyYXBoOiBDQ0ZTcGF0aWFsR3JhcGg7XG4gIC8qKiBDcmVhdGVzIFNwYXRpYWxFbnRpdHkgU2NlbmVzICovXG4gIHNjZW5lOiBDQ0ZTcGF0aWFsU2NlbmU7XG4gIC8qKiBJZiB0aGUgZGF0YWJhc2UgaXMgaW5pdGlhbGl6ZWQgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXppbmc/OiBQcm9taXNlPHZvaWQ+O1xuXG4gIHByaXZhdGUgc3RhdHVzOiBDQ0ZEYXRhYmFzZVN0YXR1c1RyYWNrZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgY2NmZGF0YWJhc2UuXG4gICAqXG4gICAqIEBwYXJhbSBbb3B0aW9uc10gSW5pdGlhbGl6YXRpb24gb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBDQ0ZEYXRhYmFzZU9wdGlvbnMgPSBERUZBVUxUX0NDRl9EQl9PUFRJT05TKSB7XG4gICAgdGhpcy5zdG9yZSA9IG5ldyBTdG9yZSh1bmRlZmluZWQsIHsgZmFjdG9yeTogRGF0YUZhY3RvcnkgfSk7XG4gICAgdGhpcy5ncmFwaCA9IG5ldyBDQ0ZTcGF0aWFsR3JhcGgodGhpcyk7XG4gICAgdGhpcy5zY2VuZSA9IG5ldyBDQ0ZTcGF0aWFsU2NlbmUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQ29ubmVjdHMgdGhlIGRhdGFiYXNlLlxuICAgKlxuICAgKiBAcGFyYW0gW29wdGlvbnNdIE9wdGlvbnMgdXNlZCB0byBpbml0aWFsaXplLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgcmVzb2x2aW5nIHRvIHRydWUgaWYgZGF0YSBoYXMgYmVlbiBsb2FkZWQgaW50byB0aGUgZGF0YWJhc2UuXG4gICAqL1xuICBhc3luYyBjb25uZWN0KG9wdGlvbnM/OiBDQ0ZEYXRhYmFzZU9wdGlvbnMsIGNhY2hlZCA9IGZhbHNlKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIGlmICghdGhpcy5pbml0aWFsaXppbmcpIHtcbiAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXppbmcgPSB0aGlzLmNhY2hlZENvbm5lY3QoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6aW5nID0gdGhpcy5kb0Nvbm5lY3QoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgdGhpcy5pbml0aWFsaXppbmc7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2l6ZSA+IDA7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNhY2hlZENvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCBsYXN0TW9kaWZpZWRLZXkgPSAnY2NmLWRhdGFiYXNlLmxhc3RfbW9kaWZpZWQnO1xuICAgIGNvbnN0IGNjZkRhdGFiYXNlS2V5ID0gJ2NjZi1kYXRhYmFzZSc7XG5cbiAgICBjb25zdCBsYXN0TW9kaWZpZWQgPSBhd2FpdCBnZXQobGFzdE1vZGlmaWVkS2V5KS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpO1xuICAgIGxldCBzZXJpYWxpemVkRGI6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChsYXN0TW9kaWZpZWQgJiYgc3RhcnQgLSBuZXcgRGF0ZSgrbGFzdE1vZGlmaWVkKS5nZXRUaW1lKCkgPiA2MCo2MCoxMDAwKSB7XG4gICAgICBhd2FpdCBkZWxNYW55KFtjY2ZEYXRhYmFzZUtleSwgbGFzdE1vZGlmaWVkS2V5XSkuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VyaWFsaXplZERiID0gYXdhaXQgZ2V0KGNjZkRhdGFiYXNlS2V5KS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIGlmIChzZXJpYWxpemVkRGIpIHtcbiAgICAgIGF3YWl0IHRoaXMuZGVzZXJpYWxpemUoc2VyaWFsaXplZERiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5kb0Nvbm5lY3QoKTtcblxuICAgICAgc2V0TWFueShbXG4gICAgICAgIFtjY2ZEYXRhYmFzZUtleSwgdGhpcy5zZXJpYWxpemUoKV0sXG4gICAgICAgIFtsYXN0TW9kaWZpZWRLZXksICcnICsgc3RhcnRdXG4gICAgICBdKS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY3R1YWxseSBjb25uZWN0cyB0byB0aGUgZGF0YWJhc2UuXG4gICAqXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gdm9pZCB3aGVuIGNvbm5lY3RlZC5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZG9Db25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG9wczogUHJvbWlzZTx1bmtub3duPltdID0gW107XG4gICAgY29uc3Qgc291cmNlczogKHN0cmluZ3xKc29uTGQpW10gPSB0aGlzLm9wdGlvbnMuZGF0YVNvdXJjZXM/LmNvbmNhdCgpID8/IFtdO1xuXG4gICAgY29uc3QgY2NmT3dsVXJsID0gdGhpcy5vcHRpb25zLmNjZk93bFVybDtcbiAgICBpZiAoY2NmT3dsVXJsLnN0YXJ0c1dpdGgoJ3snKSkge1xuICAgICAgLy8gc2VyaWFsaXplZCBuMyBzdG9yZSB3YXMgcHJvdmlkZWQgYXMgdGhlIGNjZk93bFVybFxuICAgICAgdGhpcy5zdG9yZSA9IGRlc2VyaWFsaXplTjNTdG9yZShjY2ZPd2xVcmwsIERhdGFGYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKGNjZk93bFVybC5lbmRzV2l0aCgnLm4zc3RvcmUuanNvbicpKSB7XG4gICAgICBjb25zdCBzdG9yZVN0cmluZyA9IGF3YWl0IGZldGNoKGNjZk93bFVybCkudGhlbihyID0+IHIudGV4dCgpKVxuICAgICAgICAuY2F0Y2goKCkgPT4gY29uc29sZS5sb2coJ0NvdWxkblxcJ3QgbG9jYXRlIHNlcmlhbGl6ZWQgc3RvcmUuJykpO1xuICAgICAgaWYgKHN0b3JlU3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBkZXNlcmlhbGl6ZU4zU3RvcmUoc3RvcmVTdHJpbmcsIERhdGFGYWN0b3J5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNjZk93bFVybD8ubGVuZ3RoID4gMCkge1xuICAgICAgc291cmNlcy5wdXNoKGNjZk93bFVybCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuaHVibWFwRGF0YVVybCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5odWJtYXBEYXRhVXJsLmVuZHNXaXRoKCdqc29ubGQnKSkge1xuICAgICAgICBzb3VyY2VzLnB1c2godGhpcy5vcHRpb25zLmh1Ym1hcERhdGFVcmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BzLnB1c2goc2VhcmNoSHVibWFwKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5odWJtYXBEYXRhVXJsLFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5odWJtYXBEYXRhU2VydmljZSxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuaHVibWFwUXVlcnksXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmh1Ym1hcFRva2VuLFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5odWJtYXBBc3NldHNVcmwsXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmh1Ym1hcFBvcnRhbFVybFxuICAgICAgICApLnRoZW4oKGpzb25sZCkgPT4ge1xuICAgICAgICAgIGlmIChqc29ubGQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZERhdGFTb3VyY2VzKFtqc29ubGRdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgb3BzLnB1c2godGhpcy5hZGREYXRhU291cmNlcyhzb3VyY2VzKSk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwob3BzKTtcbiAgICBhd2FpdCB0aGlzLnN5bmNocm9uaXplKCk7XG4gIH1cblxuICBhc3luYyBhZGREYXRhU291cmNlcyhzb3VyY2VzOiAoc3RyaW5nfEpzb25MZClbXSwgaW5wdXRTdG9yZT86IFN0b3JlKTogUHJvbWlzZTx0aGlzPiB7XG4gICAgY29uc3Qgc3RvcmU6IFN0b3JlID0gaW5wdXRTdG9yZSA/PyB0aGlzLnN0b3JlO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgc291cmNlcy5tYXAoYXN5bmMgKHNvdXJjZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoKHNvdXJjZS5zdGFydHNXaXRoKCdodHRwJykgfHwgc291cmNlLnN0YXJ0c1dpdGgoJ2Fzc2V0cy8nKSkgJiYgc291cmNlLmluY2x1ZGVzKCdqc29ubGQnKSkge1xuICAgICAgICAgICAgc291cmNlID0gYXdhaXQgZmV0Y2goc291cmNlKS50aGVuKHIgPT4gci50ZXh0KCkpO1xuICAgICAgICAgICAgc291cmNlID0gcGF0Y2hKc29uTGQoc291cmNlIGFzIHN0cmluZyk7XG4gICAgICAgICAgICBhd2FpdCBhZGRKc29uTGRUb1N0b3JlKHNvdXJjZSwgc3RvcmUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlLmVuZHNXaXRoKCduMycpKSB7XG4gICAgICAgICAgICBhd2FpdCBhZGROM1RvU3RvcmUoc291cmNlLCBzdG9yZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2UuZW5kc1dpdGgoJ3JkZicpIHx8IHNvdXJjZS5lbmRzV2l0aCgnb3dsJykgfHwgc291cmNlLmVuZHNXaXRoKCd4bWwnKSkge1xuICAgICAgICAgICAgYXdhaXQgYWRkUmRmWG1sVG9TdG9yZShzb3VyY2UsIHN0b3JlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUGFzc3Rocm91Z2ggYXNzdW1lcyBhIEpTT04tTEQgcmVzcG9uc2VcbiAgICAgICAgICAgIHNvdXJjZSA9IHBhdGNoSnNvbkxkKHNvdXJjZSk7XG4gICAgICAgICAgICBhd2FpdCBhZGRKc29uTGRUb1N0b3JlKHNvdXJjZSwgc3RvcmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzb3VyY2UgPSBwYXRjaEpzb25MZChKU09OLnN0cmluZ2lmeShzb3VyY2UpKTtcbiAgICAgICAgICBhd2FpdCBhZGRKc29uTGRUb1N0b3JlKHNvdXJjZSwgc3RvcmUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhc3luYyBzeW5jaHJvbml6ZSgpOiBQcm9taXNlPHRoaXM+IHtcbiAgICAvLyBBZGQgYSBzbWFsbCBkZWxheSB0byBhbGxvdyB0aGUgdHJpcGxlIHN0b3JlIHRvIHNldHRsZVxuICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4ge1xuICAgICAgc2V0VGltZW91dChyLCA1MDApO1xuICAgIH0pO1xuICAgIHRoaXMuZ3JhcGguY3JlYXRlR3JhcGgoKTtcbiAgICBlbnJpY2hSdWlMb2NhdGlvbnModGhpcy5zdG9yZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXJpYWxpemUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc2VyaWFsaXplTjNTdG9yZSh0aGlzLnN0b3JlKTtcbiAgfVxuXG4gIGFzeW5jIGRlc2VyaWFsaXplKHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnN0b3JlID0gZGVzZXJpYWxpemVOM1N0b3JlKHZhbHVlLCBEYXRhRmFjdG9yeSk7XG4gICAgdGhpcy5ncmFwaCA9IG5ldyBDQ0ZTcGF0aWFsR3JhcGgodGhpcyk7XG4gICAgdGhpcy5zY2VuZSA9IG5ldyBDQ0ZTcGF0aWFsU2NlbmUodGhpcyk7XG4gICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB7XG4gICAgICBzZXRUaW1lb3V0KHIsIDEwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCBpZHMgbWF0Y2hpbmcgdGhlIGZpbHRlci5cbiAgICpcbiAgICogQHBhcmFtIFtmaWx0ZXJdIFRoZSBmaWx0ZXIuXG4gICAqIEByZXR1cm5zIEEgc2V0IG9mIGFsbCBtYXRjaGluZyBpZHMuXG4gICAqL1xuICBnZXRJZHMoZmlsdGVyOiBGaWx0ZXIgPSB7fSBhcyBGaWx0ZXIpOiBTZXQ8c3RyaW5nPiB7XG4gICAgcmV0dXJuIGZpbmRJZHModGhpcy5zdG9yZSwgdGhpcy5ncmFwaCwgZmlsdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkYXRhIGZvciBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHJlcXVlc3RlZCBvYmplY3QuXG4gICAqIEByZXR1cm5zIFRoZSBvYmplY3QgZGF0YS5cbiAgICovXG4gIGdldChpZDogc3RyaW5nKTogUXVhZFtdIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRRdWFkcyhEYXRhRmFjdG9yeS5uYW1lZE5vZGUoaWQpLCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkYXRhIGZvciBvYmplY3RzIG1hdGNoaW5nIGEgZmlsdGVyLlxuICAgKlxuICAgKiBAcGFyYW0gW2ZpbHRlcl0gVGhlIGZpbHRlci5cbiAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgZGF0YS5cbiAgICovXG4gIHNlYXJjaChmaWx0ZXI6IEZpbHRlciA9IHt9IGFzIEZpbHRlcik6IFF1YWRbXVtdIHtcbiAgICByZXR1cm4gWy4uLnRoaXMuZ2V0SWRzKGZpbHRlcildLm1hcCgocykgPT4gdGhpcy5nZXQocykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHNwYXRpYWwgZW50aXRpZXMgZm9yIGEgZmlsdGVyLlxuICAgKlxuICAgKiBAcGFyYW0gW2ZpbHRlcl0gVGhlIGZpbHRlci5cbiAgICogQHJldHVybnMgQSBsaXN0IG9mIHNwYXRpYWwgZW50aXRpZXMuXG4gICAqL1xuICBnZXRTcGF0aWFsRW50aXRpZXMoZmlsdGVyPzogRmlsdGVyKTogU3BhdGlhbEVudGl0eVtdIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NvbnNpc3RlbnQtdHlwZS1hc3NlcnRpb25zXG4gICAgZmlsdGVyID0geyAuLi5maWx0ZXIsIGhhc1NwYXRpYWxFbnRpdHk6IHRydWUgfSBhcyBGaWx0ZXI7XG4gICAgcmV0dXJuIFsuLi50aGlzLmdldElkcyhmaWx0ZXIpXS5tYXAoKHMpID0+IGdldFNwYXRpYWxFbnRpdHlGb3JFbnRpdHkodGhpcy5zdG9yZSwgcykgYXMgU3BhdGlhbEVudGl0eSk7XG4gIH1cblxuICBhc3luYyBnZXREYXRhYmFzZVN0YXR1cygpOiBQcm9taXNlPERhdGFiYXNlU3RhdHVzPiB7XG4gICAgaWYgKCF0aGlzLnN0YXR1cykge1xuICAgICAgdGhpcy5zdGF0dXMgPSBuZXcgQ0NGRGF0YWJhc2VTdGF0dXNUcmFja2VyKHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0dXMudG9Kc29uKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgbGlzdCBvZiB0ZWNobm9sb2d5IG5hbWVzIHVzZWQgYnkgZGF0YXNldHNcbiAgICpcbiAgICogQHJldHVybnMgbGlzdCBvZiB1bmlxdWUgdGVjaG5vbG9neSBuYW1lcyBpbiB0aGUgZGF0YVxuICAgKi9cbiAgYXN5bmMgZ2V0RGF0YXNldFRlY2hub2xvZ3lOYW1lcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIGdldERhdGFzZXRUZWNobm9sb2d5TmFtZXModGhpcy5zdG9yZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgbGlzdCBvZiBwcm92aWRlciBuYW1lcyBmcm9tIHRoZSBkYXRhYmFzZVxuICAgKlxuICAgKiBAcmV0dXJucyBsaXN0IG9mIHVuaXF1ZSBwcm92aWRlciBuYW1lcyBpbiB0aGUgZGF0YVxuICAgKi9cbiAgYXN5bmMgZ2V0UHJvdmlkZXJOYW1lcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIGdldFByb3ZpZGVyTmFtZXModGhpcy5zdG9yZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGlzc3VlIGJsb2NrIHJlc3VsdHMgZm9yIGEgZmlsdGVyLlxuICAgKlxuICAgKiBAcGFyYW0gW2ZpbHRlcl0gVGhlIGZpbHRlci5cbiAgICogQHJldHVybnMgQSBsaXN0IG9mIHJlc3VsdHMuXG4gICAqL1xuICBhc3luYyBnZXRUaXNzdWVCbG9ja1Jlc3VsdHMoZmlsdGVyPzogRmlsdGVyKTogUHJvbWlzZTxUaXNzdWVCbG9ja1Jlc3VsdFtdPiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jb25zaXN0ZW50LXR5cGUtYXNzZXJ0aW9uc1xuICAgIGZpbHRlciA9IHsgLi4uZmlsdGVyLCBoYXNTcGF0aWFsRW50aXR5OiB0cnVlIH0gYXMgRmlsdGVyO1xuICAgIHJldHVybiBbLi4udGhpcy5nZXRJZHMoZmlsdGVyKV0ubWFwKChzKSA9PiBnZXRUaXNzdWVCbG9ja1Jlc3VsdCh0aGlzLnN0b3JlLCBzKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgYWdncmVnYXRlIHJlc3VsdHMgZm9yIGEgZmlsdGVyLlxuICAgKlxuICAgKiBAcGFyYW0gW2ZpbHRlcl0gVGhlIGZpbHRlci5cbiAgICogQHJldHVybnMgQSBsaXN0IG9mIGFnZ3JlZ2F0ZSBkYXRhLlxuICAgKi9cbiAgYXN5bmMgZ2V0QWdncmVnYXRlUmVzdWx0cyhmaWx0ZXI/OiBGaWx0ZXIpOiBQcm9taXNlPEFnZ3JlZ2F0ZVJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIGdldEFnZ3JlZ2F0ZVJlc3VsdHModGhpcy5nZXRJZHMoZmlsdGVyKSwgdGhpcy5zdG9yZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG51bWJlciBvZiBvY2N1cnJlbmNlcyBvZiBvbnRvbG9neSB0ZXJtcyBmb3IgYSBzZXQgb2YgaWRzLlxuICAgKlxuICAgKiBAcGFyYW0gW2ZpbHRlcl0gVGhlIGZpbHRlci5cbiAgICogQHJldHVybnMgT250b2xvZ3kgdGVybSBjb3VudHMuXG4gICAqL1xuICBhc3luYyBnZXRPbnRvbG9neVRlcm1PY2N1cmVuY2VzKGZpbHRlcj86IEZpbHRlcik6IFByb21pc2U8UmVjb3JkPHN0cmluZywgbnVtYmVyPj4ge1xuICAgIHJldHVybiBnZXRPbnRvbG9neVRlcm1PY2N1cmVuY2VzKHRoaXMuZ2V0SWRzKGZpbHRlciksIHRoaXMuc3RvcmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgb2YgY2VsbCB0eXBlIHRlcm1zIGZvciBhIHNldCBvZiBpZHMuXG4gICAqXG4gICAqIEBwYXJhbSBbZmlsdGVyXSBUaGUgZmlsdGVyLlxuICAgKiBAcmV0dXJucyBDZWxsIHR5cGUgdGVybSBjb3VudHMuXG4gICAqL1xuICBhc3luYyBnZXRDZWxsVHlwZVRlcm1PY2N1cmVuY2VzKGZpbHRlcj86IEZpbHRlcik6IFByb21pc2U8UmVjb3JkPHN0cmluZywgbnVtYmVyPj4ge1xuICAgIHJldHVybiBnZXRDZWxsVHlwZVRlcm1PY2N1cmVuY2VzKHRoaXMuZ2V0SWRzKGZpbHRlciksIHRoaXMuc3RvcmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBvbnRvbG9neSB0ZXJtIHRyZWUgbm9kZXNcbiAgICpcbiAgICogQHJldHVybnMgT250b2xvZ3kgdGVybSBjb3VudHMuXG4gICAqL1xuICBhc3luYyBnZXRPbnRvbG9neVRyZWVNb2RlbCgpOiBQcm9taXNlPE9udG9sb2d5VHJlZU1vZGVsPiB7XG4gICAgcmV0dXJuIGdldEFuYXRvbWljYWxTdHJ1Y3R1cmVUcmVlTW9kZWwodGhpcy5zdG9yZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNlbGwgdHlwZSB0ZXJtIHRyZWUgbm9kZXNcbiAgICpcbiAgICogQHJldHVybnMgT250b2xvZ3kgdGVybSBjb3VudHMuXG4gICAqL1xuICBhc3luYyBnZXRDZWxsVHlwZVRyZWVNb2RlbCgpOiBQcm9taXNlPE9udG9sb2d5VHJlZU1vZGVsPiB7XG4gICAgcmV0dXJuIGdldENlbGxUeXBlVHJlZU1vZGVsKHRoaXMuc3RvcmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCByZWZlcmVuY2Ugb3JnYW5zXG4gICAqXG4gICAqIEByZXR1cm5zIE9udG9sb2d5IHRlcm0gY291bnRzLlxuICAgKi9cbiAgYXN5bmMgZ2V0UmVmZXJlbmNlT3JnYW5zKCk6IFByb21pc2U8U3BhdGlhbEVudGl0eVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuc2NlbmUuZ2V0UmVmZXJlbmNlT3JnYW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBub2RlcyB0byBmb3JtIHRoZSAzRCBzY2VuZSBvZiByZWZlcmVuY2UgYm9keSwgb3JnYW5zLCBhbmQgdGlzc3Vlc1xuICAgKlxuICAgKiBAcGFyYW0gW2ZpbHRlcl0gVGhlIGZpbHRlci5cbiAgICogQHJldHVybnMgQSBsaXN0IG9mIFNwYXRpYWwgU2NlbmUgTm9kZXMgZm9yIHRoZSAzRCBTY2VuZVxuICAgKi9cbiAgYXN5bmMgZ2V0U2NlbmUoZmlsdGVyPzogRmlsdGVyKTogUHJvbWlzZTxTcGF0aWFsU2NlbmVOb2RlW10+IHtcbiAgICB0aGlzLmdyYXBoLmNyZWF0ZUdyYXBoKCk7XG4gICAgcmV0dXJuIHRoaXMuc2NlbmUuZ2V0U2NlbmUoZmlsdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIG5vZGVzIHRvIGZvcm0gdGhlIDNEIHNjZW5lIG9mIHJlZmVyZW5jZSBvcmdhbiBhbmQgdGlzc3Vlc1xuICAgKlxuICAgKiBAcGFyYW0gW29yZ2FuSXJpXSBUaGUgUmVmZXJlbmNlIE9yZ2FuIElSSVxuICAgKiBAcGFyYW0gW2ZpbHRlcl0gVGhlIGZpbHRlci5cbiAgICogQHJldHVybnMgQSBsaXN0IG9mIFNwYXRpYWwgU2NlbmUgTm9kZXMgZm9yIHRoZSAzRCBTY2VuZVxuICAgKi9cbiAgYXN5bmMgZ2V0UmVmZXJlbmNlT3JnYW5TY2VuZShvcmdhbklyaTogc3RyaW5nLCBmaWx0ZXI/OiBGaWx0ZXIpOiBQcm9taXNlPFNwYXRpYWxTY2VuZU5vZGVbXT4ge1xuICAgIHRoaXMuZ3JhcGguY3JlYXRlR3JhcGgoKTtcbiAgICByZXR1cm4gdGhpcy5zY2VuZS5nZXRSZWZlcmVuY2VPcmdhblNjZW5lKG9yZ2FuSXJpLCBmaWx0ZXIpO1xuICB9XG5cbiAgYXN5bmMgZ2V0U3BhdGlhbFBsYWNlbWVudChzb3VyY2U6IFNwYXRpYWxFbnRpdHksIHRhcmdldElyaTogc3RyaW5nKTogUHJvbWlzZTxGbGF0U3BhdGlhbFBsYWNlbWVudCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmdyYXBoLmdldFNwYXRpYWxQbGFjZW1lbnQoc291cmNlLCB0YXJnZXRJcmkpO1xuICB9XG59XG4iXX0=
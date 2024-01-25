/* eslint-disable @typescript-eslint/member-ordering */
import * as idb from 'idb-keyval';
import { JsonLd } from 'jsonld/jsonld-spec';
import hash from 'object-hash';
import {
  addJsonLdToStore, addN3ToStore, addRdfXmlToStore, DataFactory, deserializeN3Store, Quad, serializeN3Store, Store
} from 'triple-store-utils';

import { CCFSpatialGraph } from './ccf-spatial-graph';
import { CCFSpatialScene, SpatialSceneNode } from './ccf-spatial-scene';
import { searchXConsortia } from './xconsortia/xconsortia-data-import';
import { AggregateResult, DatabaseStatus, Filter, OntologyTreeModel, TissueBlockResult } from './interfaces';
import { getAggregateResults, getDatasetTechnologyNames, getProviderNames } from './queries/aggregate-results-n3';
import { findIds } from './queries/find-ids-n3';
import { getBiomarkerTermOccurences, getCellTypeTermOccurences, getOntologyTermOccurences } from './queries/ontology-term-occurences-n3';
import { getAnatomicalStructureTreeModel, getBiomarkerTreeModel, getCellTypeTreeModel } from './queries/ontology-tree-n3';
import { getSpatialEntityForEntity } from './queries/spatial-result-n3';
import { getTissueBlockResult } from './queries/tissue-block-result-n3';
import { FlatSpatialPlacement, SpatialEntity } from './spatial-types';
import { CCFDatabaseStatusTracker } from './util/ccf-database-status-tracker';
import { patchJsonLd } from './util/patch-jsonld';
import { enrichRuiLocations } from './util/enrich-rui-locations';
import { getBmLocatedInAs } from './util/enrich-bm-located-in-as';

const { delMany, get, setMany } = idb;


/** Database initialization options. */
export interface CCFDatabaseOptions {
  /** A url to load data from. */
  ccfOwlUrl: string;
  /** Context. */
  ccfContextUrl: string;
  /** A list of data sources (in n3, rdf, xml, owl, or jsonld format) */
  dataSources: (string|JsonLd)[];
  /** Data service type. */
  hubmapDataService: 'static' | 'search-api';
  /** HuBMAP Elastic Search Query */
  hubmapQuery?: unknown;
  /** Hubmap Portal url. */
  hubmapPortalUrl: string;
  /** Hubmap data url. */
  hubmapDataUrl: string;
  /** Hubmap assets api url. */
  hubmapAssetsUrl: string;
  /** HuBMAP Service Token. */
  hubmapToken?: string;
}

/** Default initialization options. */
export const DEFAULT_CCF_DB_OPTIONS: CCFDatabaseOptions = {
  ccfOwlUrl: 'https://apps.humanatlas.io/hra-api/v1/ccf.owl.n3store.json',
  ccfContextUrl: 'https://purl.org/ccf/latest/ccf-context.jsonld',
  dataSources: [],
  hubmapDataService: 'static',
  hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
  hubmapDataUrl: '',
  hubmapAssetsUrl: 'https://assets.hubmapconsortium.org'
};

/** Database provider. */
export class CCFDatabase {
  /** The triple store. */
  store: Store;
  /** The spatial graph */
  graph: CCFSpatialGraph;
  /** Creates SpatialEntity Scenes */
  scene: CCFSpatialScene;
  /** If the database is initialized */
  private initializing?: Promise<void>;

  private status: CCFDatabaseStatusTracker;

  /**
   * Creates an instance of ccfdatabase.
   *
   * @param [options] Initialization options.
   */
  constructor(public options: CCFDatabaseOptions = DEFAULT_CCF_DB_OPTIONS) {
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
  async connect(options?: CCFDatabaseOptions, cached = false): Promise<boolean> {
    if (options) {
      this.options = options;
    }
    if (!this.initializing) {
      if (cached) {
        this.initializing = this.cachedConnect();
      } else {
        this.initializing = this.doConnect();
      }
    }
    await this.initializing;
    return this.store.size > 0;
  }

  private async cachedConnect(): Promise<void> {
    const start = new Date().getTime();
    const optionsHash = hash(this.options, {
      encoding: 'base64',
      ignoreUnknown: true,
      respectType: false,
      unorderedArrays: true,
      unorderedObjects: true,
      unorderedSets: true
    });
    const lastModifiedKey = `ccf-database.last_modified.${optionsHash}`;
    const ccfDatabaseKey = `ccf-database.${optionsHash}`;

    const lastModified = await get(lastModifiedKey).catch(() => undefined);
    let serializedDb: string | undefined;

    if (lastModified && start - new Date(+lastModified).getTime() > 60*60*1000) {
      await delMany([ccfDatabaseKey, lastModifiedKey]).catch(() => undefined);
    } else {
      serializedDb = await get(ccfDatabaseKey).catch(() => undefined);
    }

    if (serializedDb) {
      await this.deserialize(serializedDb);
    } else {
      await this.doConnect();

      setMany([
        [ccfDatabaseKey, this.serialize()],
        [lastModifiedKey, '' + start]
      ]).catch(() => undefined);
    }
  }

  /**
   * Actually connects to the database.
   *
   * @returns A promise resolving to void when connected.
   */
  private async doConnect(): Promise<void> {
    const ops: Promise<unknown>[] = [];
    const sources: (string|JsonLd)[] = this.options.dataSources?.concat() ?? [];

    const ccfOwlUrl = this.options.ccfOwlUrl;
    if (ccfOwlUrl.startsWith('{')) {
      // serialized n3 store was provided as the ccfOwlUrl
      this.store = deserializeN3Store(ccfOwlUrl, DataFactory);
    } else if (ccfOwlUrl.endsWith('.n3store.json')) {
      const storeString = await fetch(ccfOwlUrl).then(r => r.text())
        .catch(() => console.log('Couldn\'t locate serialized store.'));
      if (storeString) {
        this.store = deserializeN3Store(storeString, DataFactory);
      }
    } else if (ccfOwlUrl?.length > 0) {
      sources.push(ccfOwlUrl);
    }

    // Add a direct edge between BM and AS for queries
    sources.push(await getBmLocatedInAs());

    if (this.options.hubmapDataUrl) {
      if (this.options.hubmapDataUrl.endsWith('jsonld')) {
        sources.push(this.options.hubmapDataUrl);
      } else {
        ops.push(searchXConsortia(
          this.options.hubmapDataUrl,
          this.options.hubmapDataService,
          this.options.hubmapQuery,
          this.options.hubmapToken
        ).then((jsonld) => {
          if (jsonld) {
            return this.addDataSources([jsonld]);
          } else {
            return undefined;
          }
        }));
      }
    }
    ops.push(this.addDataSources(sources));
    await Promise.all(ops);
    await this.synchronize();
  }

  async addDataSources(sources: (string|JsonLd)[], inputStore?: Store): Promise<this> {
    const store: Store = inputStore ?? this.store;
    await Promise.all(
      sources.map(async (source) => {
        if (typeof source === 'string') {
          if ((source.startsWith('http') || source.startsWith('assets/')) && source.includes('jsonld')) {
            const sourceUrl = source;
            source = await fetch(sourceUrl).then(r => r.text()).catch((err) => {
              console.log(`Error fetching ${sourceUrl}`, err);
              return '[]';
            });
            source = patchJsonLd(source);
            await addJsonLdToStore(source, store);
          } else if (source.endsWith('n3')) {
            await addN3ToStore(source, store);
          } else if (source.endsWith('rdf') || source.endsWith('owl') || source.endsWith('xml')) {
            await addRdfXmlToStore(source, store);
          } else {
            // Passthrough assumes a JSON-LD response
            source = patchJsonLd(source);
            await addJsonLdToStore(source, store);
          }
        } else {
          source = patchJsonLd(JSON.stringify(source));
          await addJsonLdToStore(source, store);
        }
      })
    );
    return this;
  }

  async synchronize(): Promise<this> {
    // Add a small delay to allow the triple store to settle
    await new Promise(r => {
      setTimeout(r, 500);
    });
    this.graph.createGraph();
    enrichRuiLocations(this.store);
    return this;
  }

  serialize(): string {
    return serializeN3Store(this.store);
  }

  async deserialize(value: string): Promise<void> {
    this.store = deserializeN3Store(value, DataFactory);
    this.graph = new CCFSpatialGraph(this);
    this.scene = new CCFSpatialScene(this);
    await new Promise(r => {
      setTimeout(r, 10);
    });
  }

  /**
   * Gets all ids matching the filter.
   *
   * @param [filter] The filter.
   * @returns A set of all matching ids.
   */
  getIds(filter: Filter = {} as Filter): Set<string> {
    return findIds(this.store, this.graph, filter);
  }

  /**
   * Gets the data for an object.
   *
   * @param id The id of the requested object.
   * @returns The object data.
   */
  get(id: string): Quad[] {
    return this.store.getQuads(DataFactory.namedNode(id), null, null, null);
  }

  /**
   * Gets the data for objects matching a filter.
   *
   * @param [filter] The filter.
   * @returns An array of data.
   */
  search(filter: Filter = {} as Filter): Quad[][] {
    return [...this.getIds(filter)].map((s) => this.get(s));
  }

  /**
   * Gets all spatial entities for a filter.
   *
   * @param [filter] The filter.
   * @returns A list of spatial entities.
   */
  getSpatialEntities(filter?: Filter): SpatialEntity[] {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    filter = { ...filter, hasSpatialEntity: true } as Filter;
    return [...this.getIds(filter)].map((s) => getSpatialEntityForEntity(this.store, s) as SpatialEntity);
  }

  async getDatabaseStatus(): Promise<DatabaseStatus> {
    if (!this.status) {
      this.status = new CCFDatabaseStatusTracker(this);
    }
    return this.status.toJson();
  }

  /**
   * Get a list of technology names used by datasets
   *
   * @returns list of unique technology names in the data
   */
  async getDatasetTechnologyNames(): Promise<string[]> {
    return getDatasetTechnologyNames(this.store);
  }

  /**
   * Get a list of provider names from the database
   *
   * @returns list of unique provider names in the data
   */
  async getProviderNames(): Promise<string[]> {
    return getProviderNames(this.store);
  }

  /**
   * Gets all tissue block results for a filter.
   *
   * @param [filter] The filter.
   * @returns A list of results.
   */
  async getTissueBlockResults(filter?: Filter): Promise<TissueBlockResult[]> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    filter = { ...filter, hasSpatialEntity: true } as Filter;
    return [...this.getIds(filter)].map((s) => getTissueBlockResult(this.store, s));
  }

  /**
   * Gets all aggregate results for a filter.
   *
   * @param [filter] The filter.
   * @returns A list of aggregate data.
   */
  async getAggregateResults(filter?: Filter): Promise<AggregateResult[]> {
    return getAggregateResults(this.getIds(filter), this.store);
  }

  /**
   * Get number of occurrences of ontology terms for a set of ids.
   *
   * @param [filter] The filter.
   * @returns Ontology term counts.
   */
  async getOntologyTermOccurences(filter?: Filter): Promise<Record<string, number>> {
    return getOntologyTermOccurences(this.getIds(filter), this.store);
  }

  /**
   * Get number of occurrences of cell type terms for a set of ids.
   *
   * @param [filter] The filter.
   * @returns Cell type term counts.
   */
  async getCellTypeTermOccurences(filter?: Filter): Promise<Record<string, number>> {
    return getCellTypeTermOccurences(this.getIds(filter), this.store);
  }

  /**
   * Get number of occurrences of cell type terms for a set of ids.
   *
   * @param [filter] The filter.
   * @returns Cell type term counts.
   */
  async getBiomarkerTermOccurences(filter?: Filter): Promise<Record<string, number>> {
    return getBiomarkerTermOccurences(this.getIds(filter), this.store);
  }


  /**
   * Get ontology term tree nodes
   *
   * @returns Ontology term counts.
   */
  async getOntologyTreeModel(): Promise<OntologyTreeModel> {
    return getAnatomicalStructureTreeModel(this.store);
  }

  /**
   * Get cell type term tree nodes
   *
   * @returns Ontology term counts.
   */
  async getCellTypeTreeModel(): Promise<OntologyTreeModel> {
    return getCellTypeTreeModel(this.store);
  }

  /**
   * Get biomarker tree nodes
   *
   * @returns Ontology term counts.
   */
  async getBiomarkerTreeModel(): Promise<OntologyTreeModel> {
    return getBiomarkerTreeModel(this.store);
  }

  /**
   * Get reference organs
   *
   * @returns Ontology term counts.
   */
  async getReferenceOrgans(): Promise<SpatialEntity[]> {
    return this.scene.getReferenceOrgans();
  }

  /**
   * Get all nodes to form the 3D scene of reference body, organs, and tissues
   *
   * @param [filter] The filter.
   * @returns A list of Spatial Scene Nodes for the 3D Scene
   */
  async getScene(filter?: Filter): Promise<SpatialSceneNode[]> {
    this.graph.createGraph();
    return this.scene.getScene(filter);
  }

  /**
   * Get all nodes to form the 3D scene of reference organ and tissues
   *
   * @param [organIri] The Reference Organ IRI
   * @param [filter] The filter.
   * @returns A list of Spatial Scene Nodes for the 3D Scene
   */
  async getReferenceOrganScene(organIri: string, filter?: Filter): Promise<SpatialSceneNode[]> {
    this.graph.createGraph();
    return this.scene.getReferenceOrganScene(organIri, filter);
  }

  async getSpatialPlacement(source: SpatialEntity, targetIri: string): Promise<FlatSpatialPlacement | undefined> {
    return this.graph.getSpatialPlacement(source, targetIri);
  }
}

/* eslint-disable @typescript-eslint/member-ordering */
import { addJsonLdToStore, addN3ToStore, addRdfXmlToStore, DataFactory, Quad, Store } from 'triple-store-utils';

import { CCFSpatialGraph } from './ccf-spatial-graph';
import { CCFSpatialScene, SpatialSceneNode } from './ccf-spatial-scene';
import { addHubmapDataToStore } from './hubmap/hubmap-data';
import { AggregateResult, DataSource, Filter, ImageViewerData, ListResult } from './interfaces';
import { getAggregateResults } from './queries/aggregate-results-n3';
import { findIds } from './queries/find-ids-n3';
import { getImageViewerData } from './queries/image-viewer-data-n3';
import { getListResult } from './queries/list-result-n3';
import { getOntologyTermOccurences } from './queries/ontology-term-occurences-n3';
import { getSpatialEntityForEntity } from './queries/spatial-result-n3';
import { SpatialEntity } from './spatial-types';


/** Database initialization options. */
export interface CCFDatabaseOptions {
  /** An url to load data from. */
  ccfOwlUrl: string;
  /** Context. */
  ccfContextUrl: string;
  /** Data service type. */
  hubmapDataService: 'static' | 'search-api';
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
  ccfOwlUrl: 'https://purl.org/ccf/latest/ccf.owl',
  ccfContextUrl: 'https://purl.org/ccf/latest/ccf-context.jsonld',
  hubmapDataService: 'static',
  hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
  hubmapDataUrl: '',
  hubmapAssetsUrl: 'https://assets.hubmapconsortium.org'
};

/** Database provider. */
export class CCFDatabase implements DataSource {
  /** The triple store. */
  store: Store;
  /** The spatial graph */
  graph: CCFSpatialGraph;
  /** Creates SpatialEntity Scenes */
  scene: CCFSpatialScene;
  /** If the database is initialized */
  private initializing?: Promise<void>;

  /**
   * Creates an instance of ccfdatabase.
   *
   * @param [options] Initialization options.
   */
  constructor(public options: CCFDatabaseOptions = DEFAULT_CCF_DB_OPTIONS) {
    this.store = new Store();
    this.graph = new CCFSpatialGraph(this);
    this.scene = new CCFSpatialScene(this);
  }

  /**
   * Connects the database.
   *
   * @param [options] Options used to initialize.
   * @returns A promise resolving to true if data has been loaded into the database.
   */
  async connect(options?: CCFDatabaseOptions): Promise<boolean> {
    if (options) {
      this.options = options;
    }
    if (!this.initializing) {
      this.initializing = this.doConnect();
    }
    await this.initializing;
    return this.store.size > 0;
  }

  /**
   * Actually connects to the database.
   *
   * @returns A promise resolving to void when connected.
   */
  private async doConnect(): Promise<void> {
    const ops: Promise<unknown>[] = [];
    const ccfOwlUrl = this.options.ccfOwlUrl;
    if (ccfOwlUrl.endsWith('.n3')) {
      ops.push(addN3ToStore(this.options.ccfOwlUrl, this.store));
    } else {
      ops.push(addRdfXmlToStore(this.options.ccfOwlUrl, this.store));
    }
    if (this.options.hubmapDataUrl) {
      if (this.options.hubmapDataUrl.endsWith('.jsonld')) {
        ops.push(addJsonLdToStore(this.options.hubmapDataUrl, this.store));
      } else {
        ops.push(addHubmapDataToStore(
          this.store, this.options.hubmapDataUrl, this.options.hubmapDataService, this.options.hubmapToken,
          this.options.hubmapAssetsUrl, this.options.hubmapPortalUrl
        ));
      }
    }
    ops.push(addJsonLdToStore('assets/kpmp/data/rui_locations.jsonld', this.store).catch(x => console.log('Couldn\'t locate KPMP data.')));
    await Promise.all(ops);
    // Add a small delay to allow the triple store to settle
    await new Promise(r => setTimeout(r, 500));
    this.graph.createGraph();
  }

  /**
   * Gets all ids matching the filter.
   *
   * @param [filter] The filter.
   * @returns A set of all matching ids.
   */
  getIds(filter: Filter = {} as Filter): Set<string> {
    return findIds(this.store, filter);
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
    filter = {...filter, hasSpatialEntity: true} as Filter;
    return [...this.getIds(filter)].map((s) => getSpatialEntityForEntity(this.store, s) as SpatialEntity);
  }

  /**
   * Gets all list results for a filter.
   *
   * @param [filter] The filter.
   * @returns A list of results.
   */
  async getListResults(filter?: Filter): Promise<ListResult[]> {
    filter = {...filter, hasSpatialEntity: true} as Filter;
    const highlighted = new Set<string>(filter.highlightedEntities);
    return [...this.getIds(filter)].map((s) => getListResult(this.store, s))
      .map((s) => Object.assign(s, {highlighted: highlighted.has(s['@id'])}))
      .sort((a, b) => (a.highlighted ? 0 : 1) - (b.highlighted ? 0 : 1));
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
   * Gets image data for the associated id.
   *
   * @param id The identifier.
   * @returns The image data.
   */
  async getImageViewerData(id: string): Promise<ImageViewerData> {
    return getImageViewerData(id, this.store);
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
}

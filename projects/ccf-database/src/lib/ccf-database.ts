import { addRdfXmlToStore, DataFactory, N3Store, Quad, Store } from 'triple-store-utils';

import { AggregateResult, DataSource, Filter, ImageViewerData, ListResult } from './interfaces';
import { getAggregateResults } from './queries/aggregate-results-n3';
import { findIds } from './queries/find-ids-n3';
import { getImageViewerData } from './queries/image-viewer-data-n3';
import { getListResult } from './queries/list-result-n3';
import { getSpatialEntityForEntity } from './queries/spatial-result-n3';
import { SpatialEntity } from './spatial-types';
import { addHubmapDataToStore } from './util/hubmap-data';


export interface CCFDatabaseOptions {
  ccfOwlUrl: string;
  ccfContextUrl: string;
  hubmapDataService: 'static' | 'elasticsearch';
  hubmapDataUrl: string;
}

export const DEFAULT_CCF_DB_OPTIONS: CCFDatabaseOptions = {
  ccfOwlUrl: 'https://purl.org/ccf/latest/ccf.owl',
  ccfContextUrl: 'https://purl.org/ccf/latest/ccf-context.jsonld',
  hubmapDataService: 'static',
  hubmapDataUrl: ''
};

export class CCFDatabase implements DataSource {
  store: N3Store;

  constructor(public options: CCFDatabaseOptions = DEFAULT_CCF_DB_OPTIONS) {
    this.store = new Store();
  }

  async connect(options?: CCFDatabaseOptions): Promise<boolean> {
    if (options) {
      this.options = options;
    }
    if (this.store.size === 0) {
      const ops: Promise<unknown>[] = [];
      ops.push(addRdfXmlToStore(this.options.ccfOwlUrl, this.store));
      if (this.options.hubmapDataUrl) {
        ops.push(addHubmapDataToStore(this.store, this.options.hubmapDataUrl, this.options.hubmapDataService));
      }
      await Promise.all(ops);
    }
    return this.store.size > 0;
  }

  getIds(filter: Filter = {} as Filter): Set<string> {
    return findIds(this.store, filter);
  }

  get(id: string): Quad[] {
    return this.store.getQuads(DataFactory.namedNode(id), null, null, null);
  }

  search(filter: Filter = {} as Filter): Quad[][] {
    return [...this.getIds(filter)].map((s) => this.get(s));
  }

  async getListResults(filter?: Filter): Promise<ListResult[]> {
    return [...this.getIds(filter)].map((s) => getListResult(this.store, s));
  }
  async getAggregateResults(filter?: Filter): Promise<AggregateResult[]> {
    return getAggregateResults(this.getIds(filter), this.store);
  }
  async getImageViewerData(id: string): Promise<ImageViewerData> {
    return getImageViewerData(id, this.store);
  }

  async getSpatialEntities(filter?: Filter): Promise<SpatialEntity[]> {
    return [...this.getIds({...filter, hasSpatialEntity: true} as Filter)]
      .map((s) => getSpatialEntityForEntity(this.store, s) as SpatialEntity);
  }
}

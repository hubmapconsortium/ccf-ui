import { addRdfXmlToStore, N3Store, Store, Quad, DataFactory } from 'triple-store-utils';

import { Filter, DataSource, ListResult, AggregateResult, ImageViewerData } from './interfaces';
import { findIds } from './queries/find-ids-n3';
import { addHubmapDataToStore } from './util/hubmap-data';
import { getListResult } from './queries/list-result-n3';
import { getAggregateResults } from './queries/aggregate-results-n3';
import { getImageViewerData } from './queries/image-viewer-data-n3';


export interface CCFDatabaseOptions {
  ccfOwlUrl: string;
  ccfContextUrl: string;
  hubmapDataService: 'static' | 'elasticsearch';
  hubmapDataUrl: string;
}

export const DEFAULT_CCF_DB_OPTIONS: CCFDatabaseOptions = {
  ccfOwlUrl: 'http://purl.org/ccf/latest/ccf.owl',
  ccfContextUrl: 'http://purl.org/ccf/latest/ccf-context.jsonld',
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

  search(filter: Filter = {} as Filter): unknown[] {
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
}

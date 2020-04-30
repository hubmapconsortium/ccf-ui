import { addJsonLdToStore, addRdfXmlToStore, N3Store, Store, Quad, DataFactory } from 'triple-store-utils';

import { Filter, DataSource, ListResult, AggregateResult, ImageViewerData } from './interfaces';
import { findIds } from './util/find-ids-n3';
import { hubmapResponseAsJsonLd } from './util/hubmap-data';
import { getListResult } from './util/list-result-n3';


export interface CCFDatabaseOptions {
  ccfOwlUrl: string;
  ccfContextUrl: string;
  hubmapDataService: 'static' | 'live';
  hubmapDataUrl: string;
}

export const DEFAULT_CCF_DB_OPTIONS: CCFDatabaseOptions = {
  // ccfOwlUrl: 'http://purl.org/ccf/latest/ccf.owl',
  // ccfContextUrl: 'http://purl.org/ccf/latest/ccf-context.jsonld',
  ccfOwlUrl: 'https://cdn.jsdelivr.net/gh/hubmapconsortium/hubmap-ontology@gh-pages/ccf.owl',
  ccfContextUrl: 'https://cdn.jsdelivr.net/gh/hubmapconsortium/hubmap-ontology@gh-pages/ccf-context.jsonld',
  hubmapDataService: 'static',
  hubmapDataUrl: '/assets/dev-data/entities.json'
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
      await addRdfXmlToStore(this.options.ccfOwlUrl, this.store);
      await this.addHubmapData();
      return true;
    }
    return false;
  }

  async addHubmapData() {
    if (this.options.hubmapDataUrl) {
      const hubmapData = await fetch(this.options.hubmapDataUrl).then(r => r.json());
      await addJsonLdToStore(hubmapResponseAsJsonLd(hubmapData), this.store);
    }
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
    return [];
  }
  async getImageViewerData(id: string): Promise<ImageViewerData> {
    return { id, metadata: {} };
  }
}

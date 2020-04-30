import { namedNode } from '@rdfjs/data-model';
import { addJsonLdToStore, addRdfXmlToStore, N3Store, Store, Quad } from 'triple-store-utils';

import { Filter, DataSource, ListResult, AggregateResult, ImageViewerData } from './interfaces';
import { findIds } from './util/find-ids-n3';
import { hubmapResponseAsJsonLd } from './util/hubmap-data';


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

  constructor(readonly options: CCFDatabaseOptions = DEFAULT_CCF_DB_OPTIONS) {
    this.store = new Store();
  }

  async connect(): Promise<this> {
    if (this.store.size === 0) {
      await addRdfXmlToStore(this.options.ccfOwlUrl, this.store);
      await this.addHubmapData();
    }
    return this;
  }

  async addHubmapData() {
    const hubmapData = await fetch(this.options.hubmapDataUrl).then(r => r.json());
    await addJsonLdToStore(hubmapResponseAsJsonLd(hubmapData), this.store);
  }

  getIds(filter: Filter = {} as Filter): Set<string> {
    return findIds(this.store, filter);
  }

  get(id: string): Quad[] {
    return this.store.getQuads(namedNode(id), null, null, null);
  }

  search(filter: Filter = {} as Filter): unknown[] {
    return [...this.getIds(filter)].map((s: string) => this.get(s));
  }

  getListResults(filter?: Filter | undefined): Promise<ListResult[]> {
    throw new Error("Method not implemented.");
  }
  getAggregateResults(filter?: Filter | undefined): Promise<AggregateResult[]> {
    throw new Error("Method not implemented.");
  }
  getImageViewerData(id: string): Promise<ImageViewerData> {
    throw new Error("Method not implemented.");
  }
}

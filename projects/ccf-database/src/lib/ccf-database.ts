import { createTripleStore, createSparqlEngine, FullRDFStore, addRdfXmlToStore, addJsonLdToStore, FullSparqlEngine } from 'triple-store-utils';

export interface CCFDatabaseOptions {
  ccfOwlUrl: string;
  ccfContextUrl: string;
  dbType?: 'memdown' | 'level';
  dbOptions?: {
    dbname: string;
    dbversion: number;
  };
}

export class CCFDatabase {
  store: FullRDFStore;
  sparql: FullSparqlEngine;

  constructor(readonly options: CCFDatabaseOptions = {
    // ccfOwlUrl: 'http://purl.org/ccf/latest/ccf.owl',
    // ccfContextUrl: 'http://purl.org/ccf/latest/ccf-context.jsonld',
    ccfOwlUrl: 'https://cdn.jsdelivr.net/gh/hubmapconsortium/hubmap-ontology@gh-pages/ccf.owl',
    ccfContextUrl: 'https://cdn.jsdelivr.net/gh/hubmapconsortium/hubmap-ontology@gh-pages/ccf-context.jsonld',
    dbType: 'memdown',
    dbOptions: {
      dbname: 'ccf-db',
      dbversion: 0
    }
  }) {}

  async connect(): Promise<this> {
    this.store = createTripleStore(this.options.dbType || 'memdown', this.options.dbOptions);
    this.sparql = createSparqlEngine(this.store);
    await this.initialize();
    return this;
  }

  async initialize(): Promise<this> {
    await addRdfXmlToStore(this.options.ccfOwlUrl, this.store);
    // await addJsonLdToStore('/assets/rui-data.jsonld', this.store);
    return this;
  }

  async testQuery1(): Promise<unknown[]> {
    return await this.sparql.query(`
      PREFIX ccf: <http://purl.org/ccf/latest/ccf.owl#>
      SELECT * WHERE {?s ?p ?o . ?s ccf:has_y_dimension ?ydim . FILTER(?ydim > 2.0) .}
    `);
  }

  async testQuery2(): Promise<unknown[]> {
    return await this.sparql.query(`
      PREFIX ccf: <http://purl.org/ccf/latest/ccf.owl#>
      PREFIX obo: <http://purl.obolibrary.org/obo/>
      SELECT DISTINCT ?s
      WHERE {?s ccf:ccf_annotation obo:UBERON_123 . ?s ccf:ccf_annotation obo:UBERON_456 . ?s rdfs:label ?label}
    `);
  }
}

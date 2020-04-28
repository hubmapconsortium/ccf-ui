// tslint:disable: no-unsafe-any
import * as dataFactory from '@rdfjs/data-model';
import { AbstractLevelDOWN } from 'abstract-leveldown';
import { EventEmitter } from 'events';
import { toRDF } from 'jsonld';
import * as Level from 'level-js';
import MemDown from 'memdown';
import { RdfStore } from 'quadstore';
import * as SparqlEngine from 'quadstore-sparql';
import * as RDF from 'rdf-js';
import { RdfXmlParser } from 'rdfxml-streaming-parser';
import { Readable } from 'readable-stream';
import { JsonLd, Url } from 'jsonld/jsonld-spec';

export type FullRDFStore = RDF.Sink<EventEmitter, EventEmitter> & RDF.Source<RDF.Quad> & RDF.Store<RDF.Quad>;

export interface FullSparqlEngine extends RDF.Sink<EventEmitter, EventEmitter> {
  query(query: string, format?: string): Promise<unknown[]>;
  queryStream(query: string, format?: string): Readable;
}

export function createArrayStream(arr: unknown[]): Readable {
  let i = 0;
  const l = arr.length;
  return new Readable({
    objectMode: true,
    read() {
      this.push(i < l ? arr[i++] : null);
    }
  });
}

export async function addJsonLdToStore(uri: JsonLd|Url, store: RDF.Sink<EventEmitter, EventEmitter>
    ): Promise<RDF.Sink<EventEmitter, EventEmitter>> {
  let jsonLdData:JsonLd;
  if (typeof uri === 'string') {
    jsonLdData = await fetch(uri, {redirect: 'follow'}).then(x => x.json());
  } else {
    jsonLdData = uri;
  }
  const quads = (await toRDF(jsonLdData) as unknown) as unknown[];
  store.import(createArrayStream(quads));
  return store;
}

export async function addRdfXmlToStore(uri: string, store: RDF.Sink<EventEmitter, EventEmitter>
    ): Promise<RDF.Sink<EventEmitter, EventEmitter>> {
  const xmlData = await fetch(uri, {redirect: 'follow'}).then(x => x.text());
  return new Promise((resolve) => {
    const xmlParser = new RdfXmlParser({dataFactory, strict: true});
    xmlParser.once('end', () => resolve(store));
    store.import(xmlParser);
    xmlParser.write(xmlData);
    xmlParser.end();
  });
}

// tslint:disable-next-line: no-any
export function createTripleStore(leveldown: 'memdown' | 'level', levelOptions: any): FullRDFStore {
  let levelDB: AbstractLevelDOWN;
  switch (leveldown) {
    case 'level':
      levelDB = new Level(levelOptions.dbname, {prefix: levelOptions?.prefix ?? undefined, version: levelOptions?.dbversion ?? 0});
      break;
    default:
    case 'memdown':
      levelDB = new MemDown();
      break;
  }
  return new RdfStore(levelDB);
}

export function createSparqlEngine(store: RDF.Store<RDF.Quad>): FullSparqlEngine {
  return new SparqlEngine(store);
}

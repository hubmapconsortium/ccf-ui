import { EventEmitter } from 'events';
import jsonld from 'jsonld';
import { JsonLd, Url } from 'jsonld/jsonld-spec';
import { DataFactory, Parser, Quad, Store } from 'n3';
import * as rdf from 'rdf-js';
import { RdfXmlParser } from 'rdfxml-streaming-parser';
import { Readable } from 'readable-stream';

// Temporary solution for using the new readQuads function on Store until the @types are updated
type OTerm = rdf.Term | string | null;
interface QuadReader {
  readQuads(
    subject: OTerm,
    predicate: OTerm,
    object: OTerm,
    graph: OTerm
  ): Generator<Quad>;
}

export function readQuads(
  store: Store,
  subject: OTerm,
  predicate: OTerm,
  object: OTerm,
  graph: OTerm
): Generator<Quad> {
  return (store as unknown as QuadReader).readQuads(
    subject,
    predicate,
    object,
    graph
  );
}

/**
 * Turns a stream of values into an array.
 *
 * @param readStream The input stream.
 * @returns A promise that resolves to an array of values when the stream completes.
 */
export function streamToArray<T = unknown>(
  readStream: EventEmitter
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const chunks: T[] = [];
    readStream
      .on('data', (chunk: T) => {
        chunks.push(chunk);
      })
      .once('end', () => {
        resolve(chunks);
      })
      .once('error', (err) => {
        reject(err);
      });
  });
}

/**
 * Turns an array into a readable stream.
 *
 * @param arr The values.
 * @returns A new readable stream emitting the values from the array.
 */
export function arrayToStream<T>(arr: T[]): Readable {
  const length = arr.length;
  let i = 0;

  return new Readable({
    objectMode: true,
    read(): void {
      this.push(i < length ? arr[i++] : null);
    },
  });
}

/**
 * Adds data from json ld to the store.
 * Accepts either a json object or a uri to load data from.
 *
 * @param uri A data uri or a json object.
 * @param store The store to add data to.
 * @returns A promise that resolves when the data has been added.
 */
export async function addJsonLdToStore(
  uri: JsonLd | Url,
  store: rdf.Sink<EventEmitter, EventEmitter>
): Promise<rdf.Sink<EventEmitter, EventEmitter>> {
  let jsonLdData: JsonLd | undefined;
  if (typeof uri === 'string') {
    const response = await fetch(uri, { redirect: 'follow' });
    if (response.ok) {
      jsonLdData = (await response.json()) as JsonLd;
    }
  } else {
    jsonLdData = uri;
  }

  if (jsonLdData) {
    const quads = (await jsonld.toRDF(jsonLdData)) as unknown[];
    store.import(arrayToStream(quads) as unknown as EventEmitter);
  }
  return store;
}

/**
 * Adds data from rdf xml to the store.
 * Accepts either a xml-formatted string or a uri to load data from.
 *
 * @param uri A data uri or an xml-formatted string to load data from.
 * @param store The store to add data to
 * @returns A promise that resolves when the data has been added.
 */
export async function addRdfXmlToStore(
  uri: string,
  store: rdf.Sink<EventEmitter, EventEmitter>
): Promise<rdf.Sink<EventEmitter, EventEmitter>> {
  let xmlData: string | undefined;
  if (typeof uri === 'string' && uri?.startsWith('http')) {
    const response = await fetch(uri, { redirect: 'follow' });
    if (response.ok) {
      xmlData = await response.text();
    }
  } else {
    xmlData = uri;
  }

  if (xmlData) {
    const xmlParser = new RdfXmlParser({
      dataFactory: DataFactory,
      strict: true,
    });
    const result = new Promise<rdf.Sink<EventEmitter, EventEmitter>>(
      (resolve) => {
        xmlParser.once('end', () => resolve(store));
      }
    );

    store.import(xmlParser);
    xmlParser.write(xmlData);
    xmlParser.end();
    return result;
  } else {
    return store;
  }
}

/**
 * Adds data from an n3 file to the store.
 * Accepts either a n3-formatted string or a uri to load data from.
 *
 * @param uri A data uri or an n3-formatted string.
 * @param store The store to add data to.
 * @returns A promise that resolves when the data has been added.
 */
export async function addN3ToStore(
  uri: string | Url,
  store: rdf.Sink<EventEmitter, EventEmitter>
): Promise<rdf.Sink<EventEmitter, EventEmitter>> {
  let data: string | undefined;
  if (typeof uri === 'string' && uri?.startsWith('http')) {
    const response = await fetch(uri, { redirect: 'follow' });
    if (response.ok) {
      data = await response.text();
    }
  } else {
    data = uri;
  }
  if (data) {
    const quads = new Parser({ format: 'n3' }).parse(data);
    store.import(arrayToStream(quads) as unknown as EventEmitter);
  }
  return store;
}

export function serializeN3Store(store: Store): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  store.size; // this causes the store to compute the size before we serialize it
  const storeData = Object.assign({} as Record<string, unknown>, store);
  delete storeData['_factory'];
  return JSON.stringify(storeData);
}

export function deserializeN3Store(
  serializedStore: string,
  factory?: rdf.DataFactory
): Store {
  const storeData = JSON.parse(serializedStore);
  const store = new Store();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Object.assign(store, storeData, { _factory: factory ?? DataFactory });
  return store;
}

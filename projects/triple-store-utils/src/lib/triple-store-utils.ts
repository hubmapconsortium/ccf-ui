import { EventEmitter } from 'events';
import { toRDF } from 'jsonld';
import { JsonLd, Url } from 'jsonld/jsonld-spec';
import * as RDF from 'rdf-js';
import { RdfXmlParser } from 'rdfxml-streaming-parser';
import { Readable } from 'readable-stream';
import { DataFactory } from 'n3';

export * from 'n3';

export function streamToArray<T = unknown>(readStream: EventEmitter): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const chunks: T[] = [];
    readStream
      .on('data', (chunk: T) => { chunks.push(chunk); })
      .once('end', () => { resolve(chunks); })
      .once('error', (err) => { reject(err); });
  });
}

export function arrayToStream<T = unknown>(arr: T[]): Readable {
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
    jsonLdData = (await fetch(uri, {redirect: 'follow'}).then(x => x.json())) as JsonLd;
  } else {
    jsonLdData = uri;
  }
  const quads = (await toRDF(jsonLdData)) as unknown[];
  store.import(arrayToStream(quads));
  return store;
}

export async function addRdfXmlToStore(uri: string, store: RDF.Sink<EventEmitter, EventEmitter>
    ): Promise<RDF.Sink<EventEmitter, EventEmitter>> {
  const xmlData = await fetch(uri, {redirect: 'follow'}).then(x => x.text());
  return new Promise((resolve) => {
    const xmlParser = new RdfXmlParser({dataFactory: DataFactory, strict: true});
    xmlParser.once('end', () => resolve(store));
    store.import(xmlParser);
    xmlParser.write(xmlData);
    xmlParser.end();
  });
}

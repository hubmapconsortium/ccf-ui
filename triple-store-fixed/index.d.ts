/// <reference types="node" />
import { EventEmitter } from 'events';
import { JsonLd, Url } from 'jsonld/jsonld-spec';
import { Store, Quad } from 'n3';
import * as RDF from 'rdf-js';
import { Readable } from 'readable-stream';
export * from 'n3';
declare type OTerm = RDF.Term | string | null;
export declare function readQuads(store: Store, subject: OTerm, predicate: OTerm, object: OTerm, graph: OTerm): Generator<Quad>;
/**
 * Turns a stream of values into an array.
 *
 * @param readStream The input stream.
 * @returns A promise that resolves to an array of values when the stream completes.
 */
export declare function streamToArray<T = unknown>(readStream: EventEmitter): Promise<T[]>;
/**
 * Turns an array into a readable stream.
 *
 * @param arr The values.
 * @returns A new readable stream emitting the values from the array.
 */
export declare function arrayToStream<T>(arr: T[]): Readable;
/**
 * Adds data from json ld to the store.
 * Accepts either a json object or a uri to load data from.
 *
 * @param uri A data uri or a json object.
 * @param store The store to add data to.
 * @returns A promise that resolves when the data has been added.
 */
export declare function addJsonLdToStore(uri: JsonLd | Url, store: RDF.Sink<EventEmitter, EventEmitter>): Promise<RDF.Sink<EventEmitter, EventEmitter>>;
/**
 * Adds data from rdf xml to the store.
 * Accepts either a xml-formatted string or a uri to load data from.
 *
 * @param uri A data uri or an xml-formatted string to load data from.
 * @param store The store to add data to
 * @returns A promise that resolves when the data has been added.
 */
export declare function addRdfXmlToStore(uri: string, store: RDF.Sink<EventEmitter, EventEmitter>): Promise<RDF.Sink<EventEmitter, EventEmitter>>;
/**
 * Adds data from an n3 file to the store.
 * Accepts either a n3-formatted string or a uri to load data from.
 *
 * @param uri A data uri or an n3-formatted string.
 * @param store The store to add data to.
 * @returns A promise that resolves when the data has been added.
 */
export declare function addN3ToStore(uri: string | Url, store: RDF.Sink<EventEmitter, EventEmitter>): Promise<RDF.Sink<EventEmitter, EventEmitter>>;
export declare function serializeN3Store(store: Store): string;
export declare function deserializeN3Store(serializedStore: string, factory?: RDF.DataFactory): Store;

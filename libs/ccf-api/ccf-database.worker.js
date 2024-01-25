/* eslint-env es6 */
import * as comunica from '@comunica/query-sparql-rdfjs';
import 'ccf-api';
import { CCFDatabase } from 'ccf-database';
import { expose } from 'comlink';
import nodeEndpoint from 'comlink/dist/umd/node-adapter';
import { readFileSync } from 'fs';
import { parentPort, workerData } from 'worker_threads';

function parseDbOwlUrl(source) {
  if (!source.startsWith('http')) {
    try {
      // Attempt to load the source url as a local file
      const data = readFileSync(source, { encoding: 'utf-8' }).toString();
      return data;
    } catch (_error) {
      return source;
    }
  } else {
    return source;
  }
}

const options = workerData.options;
if (options) {
  options.ccfOwlUrl = parseDbOwlUrl(options.ccfOwlUrl);
}

/** Worker thread database. */
const database = new CCFDatabase(options);

/** SPARQL Query Functionality */
const sparqlEngine = new comunica.QueryEngine();

async function sparqlQuery(query, mimetype) {
  const result = await sparqlEngine.query(query, { sources: [database.store] });
  const { data } = await sparqlEngine.resultToString(result, mimetype);
  let output = '';
  for await (const datum of data) {
    output += datum.toString();
  }
  return output;
}

expose({ database, sparqlQuery }, nodeEndpoint(parentPort));

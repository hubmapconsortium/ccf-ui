/* eslint-env es6 */
const QueryEngine = require('@comunica/query-sparql-rdfjs').QueryEngine;
const parentPort = require('worker_threads').parentPort;
const workerData = require('worker_threads').workerData;
const CCFDatabase = require('ccf-database').CCFDatabase;
const expose = require('comlink').expose;
const nodeEndpoint = require('comlink/dist/umd/node-adapter');
const readFileSync = require('fs').readFileSync;


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
const sparqlEngine = new QueryEngine();

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

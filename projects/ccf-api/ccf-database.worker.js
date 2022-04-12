/* eslint-env es6 */
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

expose(database, nodeEndpoint(parentPort));

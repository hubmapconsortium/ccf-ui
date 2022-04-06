import { CCFDatabase, CCFDatabaseOptions } from 'ccf-database';
import { wrap } from 'comlink';
import nodeEndpoint from 'comlink/dist/umd/node-adapter';
import { Worker } from 'worker_threads';


export function createCCFDatabaseWorker(options: CCFDatabaseOptions): CCFDatabase {
  const worker = new Worker('./projects/ccf-api/ccf-database.worker.js', { workerData: { options } });
  const database = wrap<CCFDatabase>(nodeEndpoint(worker));
  return database as unknown as CCFDatabase;
}

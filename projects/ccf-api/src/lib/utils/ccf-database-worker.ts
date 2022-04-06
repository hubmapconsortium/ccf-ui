import { CCFDatabase, CCFDatabaseOptions } from 'ccf-database';
import { releaseProxy, wrap } from 'comlink';
import nodeEndpoint from 'comlink/dist/umd/node-adapter';
import { Worker } from 'worker_threads';


export interface CCFDatabaseInstance {
  database: CCFDatabase;
  dispose: () => Promise<void>;
}

export async function createCCFDatabaseWorker(options: CCFDatabaseOptions): Promise<CCFDatabaseInstance> {
  const worker = new Worker('./projects/ccf-api/ccf-database.worker.js', { workerData: { options } });
  const database = wrap<CCFDatabase>(nodeEndpoint(worker));
  await database.connect();
  const dispose = async () => {
    database[releaseProxy]();
    await worker.terminate();
  };
  return {
    // NOTE: this is safe as all ccf operations are proxied and used via async/await
    database: database as unknown as CCFDatabase,
    dispose
  };
}

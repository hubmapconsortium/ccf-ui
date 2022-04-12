import { CCFDatabase, CCFDatabaseOptions, CCFDatabaseStatusTracker } from 'ccf-database';
import { releaseProxy, wrap } from 'comlink';
import nodeEndpoint from 'comlink/dist/umd/node-adapter';
import { Worker } from 'worker_threads';


export class CCFDatabaseInstance {
  readonly status = new CCFDatabaseStatusTracker(this.database);

  constructor(public database: CCFDatabase, public dispose: () => Promise<void>) { }
}

export async function createCCFDatabaseWorker(options: CCFDatabaseOptions): Promise<CCFDatabaseInstance> {
  const worker = new Worker('./projects/ccf-api/ccf-database.worker.js', { workerData: { options } });
  const database = wrap<CCFDatabase>(nodeEndpoint(worker));
  return new CCFDatabaseInstance(database as unknown as CCFDatabase, async () => {
    database[releaseProxy]();
    await worker.terminate();
  });
}

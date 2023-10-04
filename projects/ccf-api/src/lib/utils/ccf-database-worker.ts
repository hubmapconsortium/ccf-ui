import { CCFDatabase, CCFDatabaseOptions, CCFDatabaseStatusTracker } from 'ccf-database';
import { releaseProxy, wrap } from 'comlink';
import nodeEndpoint from 'comlink/dist/umd/node-adapter';
import { Worker } from 'worker_threads';


export type SparqlQueryFunction = (query: string, mimetype: string) => Promise<string>;

export class CCFDatabaseInstance {
  readonly status = new CCFDatabaseStatusTracker(this.database);

  constructor(public database: CCFDatabase, public sparqlQuery: SparqlQueryFunction, public dispose: () => Promise<void>) { }
}

export async function createCCFDatabaseWorker(options: CCFDatabaseOptions): Promise<CCFDatabaseInstance> {
  const worker = new Worker('./dist/server/ccf-database.worker.js', { workerData: { options } });
  const dbWorker = wrap<{ database: CCFDatabase; sparqlQuery: SparqlQueryFunction }>(nodeEndpoint(worker));
  return new CCFDatabaseInstance(
    dbWorker.database as unknown as CCFDatabase,
    dbWorker.sparqlQuery,
    async () => {
      dbWorker[releaseProxy]();
      await worker.terminate();
    });
}

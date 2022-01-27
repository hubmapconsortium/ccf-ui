import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { CCFDatabaseOptions } from 'ccf-database';
import { GlobalConfigState, WorkerCCFDatabaseDataSourceService } from 'ccf-shared';


@Injectable({
  providedIn: 'root'
})
export class WorkerDataSourceService extends WorkerCCFDatabaseDataSourceService {
  constructor(
    globalConfig: GlobalConfigState<CCFDatabaseOptions>,
    private readonly locator: LocationStrategy
  ) {
    super(globalConfig);
  }

  protected createWorker(_config: CCFDatabaseOptions): Worker {
    const url = this.getWorkerUrl(true);
    return new Worker(url, { type: 'module' });
  }

  private getWorkerUrl(directImport: boolean): string | URL {
    if (directImport) {
      return new URL('./data-source.worker', import.meta.url);
    }

    const externalUrl = this.locator.prepareExternalUrl('0-es2015.worker.js');
    const codeBlob = new Blob(
      [`importScripts('${externalUrl}')`],
      { type: 'application/javascript' }
    );

    return URL.createObjectURL(codeBlob);
  }
}

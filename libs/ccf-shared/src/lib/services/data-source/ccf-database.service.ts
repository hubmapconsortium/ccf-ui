import { Injectable, isDevMode } from '@angular/core';
import { CCFDatabase, CCFDatabaseOptions } from 'ccf-database';
import { Remote, releaseProxy, wrap } from 'comlink';
import { Observable, Unsubscribable, using } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { GlobalConfigState } from '../../config/global-config.state';
import { DataSourceLike, DelegateDataSource } from './data-source';

interface CCFDatabaseManager extends Unsubscribable {
  database: CCFDatabase | Remote<CCFDatabase>;
}

@Injectable()
abstract class CCFDatabaseDataSourceBaseService extends DelegateDataSource {
  readonly impl$: Observable<DataSourceLike>;
  readonly database$: Observable<CCFDatabase | Remote<CCFDatabase>>;

  constructor(globalConfig: GlobalConfigState<CCFDatabaseOptions>) {
    super();

    this.impl$ = this.database$ = globalConfig.config$.pipe(
      (source) => source as Observable<CCFDatabaseOptions>,
      filter((config) => Object.keys(config).length > 0),
      switchMap((config) =>
        using(
          () => this.createDatabase(config),
          (manager) =>
            this.connectDatabase(manager as CCFDatabaseManager, config)
        )
      ),
      map((manager) => manager.database),
      shareReplay(1)
    );
  }

  protected abstract createDatabase(
    config: CCFDatabaseOptions
  ): CCFDatabaseManager;

  private async connectDatabase(
    manager: CCFDatabaseManager,
    config: CCFDatabaseOptions
  ): Promise<CCFDatabaseManager> {
    const cacheResults = !isDevMode(); // Do not cache while in dev mode
    await manager.database.connect(config, cacheResults);
    return manager;
  }
}

@Injectable({
  providedIn: 'root',
})
export class CCFDatabaseDataSourceService extends CCFDatabaseDataSourceBaseService {
  protected createDatabase(config: CCFDatabaseOptions): CCFDatabaseManager {
    return {
      database: new CCFDatabase(config),
      unsubscribe: () => undefined,
    };
  }
}

@Injectable()
export abstract class WorkerCCFDatabaseDataSourceService extends CCFDatabaseDataSourceBaseService {
  protected abstract createWorker(config: CCFDatabaseOptions): Worker;

  protected createDatabase(config: CCFDatabaseOptions): CCFDatabaseManager {
    const worker = this.createWorker(config);
    const database = wrap<CCFDatabase>(worker);

    return {
      database,
      unsubscribe: () => {
        database[releaseProxy]();
        worker.terminate();
      },
    };
  }
}

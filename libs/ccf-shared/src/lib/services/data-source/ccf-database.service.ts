import { Injectable, isDevMode } from '@angular/core';
import { CCFDatabase, CCFDatabaseOptions } from 'ccf-database';
import { Remote, releaseProxy, wrap } from 'comlink';
import { Observable, ObservableInput, Unsubscribable, using } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { GlobalConfigState } from '../../config/global-config.state';
import { ApiEndpointDataSourceService } from './api-endpoint.service';
import {
  DataSource,
  DataSourceDataType,
  DataSourceLike,
  DataSourceMethod,
  DelegateDataSource,
  ForwardingDataSource,
} from './data-source';

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
          (manager) => this.connectDatabase(manager as CCFDatabaseManager, config)
        )
      ),
      map((manager) => manager.database),
      shareReplay(1)
    );
  }

  protected abstract createDatabase(config: CCFDatabaseOptions): CCFDatabaseManager;

  private async connectDatabase(manager: CCFDatabaseManager, config: CCFDatabaseOptions): Promise<CCFDatabaseManager> {
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

const REMOTE_METHODS: (keyof DataSource)[] = [
  'getOntologyTreeModel',
  'getCellTypeTreeModel',
  'getBiomarkerTreeModel',
  'getReferenceOrgans',
];

@Injectable({
  providedIn: 'root',
})
export class HybridCCfDatabaseDatasourceService extends ForwardingDataSource {
  constructor(
    private readonly remote: ApiEndpointDataSourceService,
    private readonly local: CCFDatabaseDataSourceService
  ) {
    super();
  }

  protected forwardCall<K extends keyof DataSource>(
    method: K,
    ...args: Parameters<DataSourceMethod<K>>
  ): Observable<DataSourceDataType<K>> {
    type AnyFunction = (...rest: unknown[]) => ObservableInput<unknown>;
    type Res = Observable<DataSourceDataType<K>>;
    const source = this.isRemoteCall(method) ? this.remote : this.local;
    return (source[method] as AnyFunction)(...args) as Res;
  }

  private isRemoteCall(method: keyof DataSource): boolean {
    return REMOTE_METHODS.includes(method);
  }
}

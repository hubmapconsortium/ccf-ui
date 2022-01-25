import { Injectable, Injector, ProviderToken } from '@angular/core';
import {
  ApiEndpointDataSourceService, CCFDatabaseDataSourceService, DataSourceLike, DelegateDataSource, GlobalConfigState,
} from 'ccf-shared';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';


export interface DelegateDataSourceOptions {
  useRemoteApi?: boolean;
  remoteApiEndpoint?: string;
}


@Injectable({
  providedIn: 'root'
})
export class DelegateDataSourceService extends DelegateDataSource {
  readonly impl$: Observable<DataSourceLike>;

  constructor(
    globalConfig: GlobalConfigState<DelegateDataSourceOptions>,
    injector: Injector
  ) {
    super();

    this.impl$ = globalConfig.config$.pipe(
      source => source as Observable<DelegateDataSourceOptions>,
      map(config => this.selectImpl(config)),
      distinctUntilChanged(),
      map(token => injector.get(token)),
      shareReplay(1)
    );
  }

  private selectImpl(config: DelegateDataSourceOptions): ProviderToken<DataSourceLike> {
    const useRemote = config.useRemoteApi && !!config.remoteApiEndpoint;
    return useRemote ? ApiEndpointDataSourceService : CCFDatabaseDataSourceService;
  }
}

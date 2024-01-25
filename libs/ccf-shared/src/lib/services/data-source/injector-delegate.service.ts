import { Injectable, Injector, ProviderToken } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

import { GlobalConfigState } from '../../config/global-config.state';
import { DataSourceLike, DelegateDataSource } from './data-source';


@Injectable()
export abstract class InjectorDelegateDataSourceService<C> extends DelegateDataSource {
  readonly impl$: Observable<DataSourceLike>;

  constructor(
    globalConfig: GlobalConfigState<C>,
    injector: Injector
  ) {
    super();

    this.impl$ = globalConfig.config$.pipe(
      source => source as Observable<C>,
      map(config => this.selectToken(config)),
      distinctUntilChanged(),
      map(token => injector.get(token)),
      shareReplay(1)
    );
  }

  protected abstract selectToken(config: C): ProviderToken<DataSourceLike>;
}

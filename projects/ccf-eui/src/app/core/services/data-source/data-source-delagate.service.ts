import { Injectable } from '@angular/core';
import {
  AggregateResult, Filter, OntologyTreeModel, SpatialEntity, SpatialSceneNode, TissueBlockResult,
} from 'ccf-database';
import { GlobalConfigState } from 'ccf-shared';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { DataSourceService } from './data-source.service';
import { LocalDataSourceService } from './local-data-source.service';
import { RemoteDataSourceService } from './remote-data-source.service';


export interface DataSourceDelegateOptions {
  useRemoteApi?: boolean;
  remoteApiEndpoint?: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataSourceDelegateService implements DataSourceService {
  private readonly impl$: Observable<DataSourceService>;

  constructor(
    globalConfig: GlobalConfigState<DataSourceDelegateOptions>,
    localDataSource: LocalDataSourceService,
    remoteDataSource: RemoteDataSourceService
  ) {
    this.impl$ = globalConfig.config$.pipe(
      map(config => !!config.useRemoteApi && !!config.remoteApiEndpoint),
      map(useRemote => useRemote ? remoteDataSource : localDataSource),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  getProviderNames(): Observable<string[]> {
    return this.forwardCall('getProviderNames');
  }

  getDatasetTechnologyNames(): Observable<string[]> {
    return this.forwardCall('getDatasetTechnologyNames');
  }

  getOntologyTreeModel(): Observable<OntologyTreeModel> {
    return this.forwardCall('getOntologyTreeModel');
  }

  getReferenceOrgans(): Observable<SpatialEntity[]> {
    return this.forwardCall('getReferenceOrgans');
  }

  getTissueBlockResults(filter?: Filter): Observable<TissueBlockResult[]> {
    return this.forwardCall('getTissueBlockResults', filter);
  }

  getAggregateResults(filter?: Filter): Observable<AggregateResult[]> {
    return this.forwardCall('getAggregateResults', filter);
  }

  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.forwardCall('getOntologyTermOccurences', filter);
  }

  getScene(filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.forwardCall('getScene', filter);
  }

  private forwardCall<K extends keyof DataSourceService>(
    method: K, ...args: Parameters<DataSourceService[K]>
  ): ReturnType<DataSourceService[K]> {
    return this.impl$.pipe(
      switchMap(impl => impl[method](...args)),
    ) as ReturnType<DataSourceService[K]>;
  }
}

import { Injectable, ProviderToken } from '@angular/core';
import {
  ApiEndpointDataSourceService, CCFDatabaseDataSourceService, DataSourceLike,
  HybridCCfDatabaseDatasourceService,
  InjectorDelegateDataSourceService
} from 'ccf-shared';

import { environment } from '../../../../environments/environment';
import { WorkerDataSourceService } from './worker-data-source.service';


export interface DelegateDataSourceOptions {
  dataSources?: [];
  useRemoteApi?: boolean;
  remoteApiEndpoint?: string;
}


@Injectable({
  providedIn: 'root'
})
export class DelegateDataSourceService extends InjectorDelegateDataSourceService<DelegateDataSourceOptions> {
  protected selectToken(config: DelegateDataSourceOptions): ProviderToken<DataSourceLike> {
    const { dataSources, useRemoteApi, remoteApiEndpoint } = config;

    if (useRemoteApi && !!remoteApiEndpoint) {
      if (dataSources && dataSources.length > 0) {
        return HybridCCfDatabaseDatasourceService;
      } else {
        return ApiEndpointDataSourceService;
      }
    } else if (typeof Worker !== 'undefined' && !environment.disableDbWorker) {
      return WorkerDataSourceService;
    } else {
      return CCFDatabaseDataSourceService;
    }
  }
}

import { Injectable, ProviderToken } from '@angular/core';
import {
  ApiEndpointDataSourceService, CCFDatabaseDataSourceService, DataSourceLike, InjectorDelegateDataSourceService,
} from 'ccf-shared';

import { environment } from '../../../../environments/environment';
import { WorkerDataSourceService } from './worker-data-source.service';


export interface DelegateDataSourceOptions {
  useRemoteApi?: boolean;
  remoteApiEndpoint?: string;
}


@Injectable({
  providedIn: 'root'
})
export class DelegateDataSourceService extends InjectorDelegateDataSourceService<DelegateDataSourceOptions> {
  protected selectToken(config: DelegateDataSourceOptions): ProviderToken<DataSourceLike> {
    const { useRemoteApi, remoteApiEndpoint } = config;

    if (useRemoteApi && !!remoteApiEndpoint) {
      return ApiEndpointDataSourceService;
    } else if (typeof Worker !== 'undefined' && !environment.disableDbWorker) {
      return WorkerDataSourceService;
    } else {
      return CCFDatabaseDataSourceService;
    }
  }
}

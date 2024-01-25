import { Injectable, ProviderToken } from '@angular/core';
import {
  ApiEndpointDataSourceService, CCFDatabaseDataSourceService, DataSourceLike, InjectorDelegateDataSourceService,
} from 'ccf-shared';


export interface DelegateDataSourceOptions {
  useRemoteApi?: boolean;
  remoteApiEndpoint?: string;
}


@Injectable({
  providedIn: 'root'
})
export class DelegateDataSourceService extends InjectorDelegateDataSourceService<DelegateDataSourceOptions> {
  protected selectToken(config: DelegateDataSourceOptions): ProviderToken<DataSourceLike> {
    const useRemote = config.useRemoteApi && !!config.remoteApiEndpoint;
    return useRemote ? ApiEndpointDataSourceService : CCFDatabaseDataSourceService;
  }
}

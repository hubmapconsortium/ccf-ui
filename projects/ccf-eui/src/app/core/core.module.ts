import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { MousePositionTrackerModule } from 'ccf-shared';
import { AnalyticsModule } from 'ccf-shared/analytics';

import { environment } from '../../environments/environment';
import { HeaderModule } from './header/header.module';
import { DataSourceService } from './services/data-source/data-source.service';
import { RemoteDataSourceService } from './services/data-source/remote-data-source.service';
import { ThemingModule } from './services/theming/theming.module';
import { StoreModule } from './store/store.module';


const providers: Provider[] = [];

if (environment.useRemoteApi && environment.dbOptions.remoteApiEndpoint) {
  providers.push({
    provide: DataSourceService,
    useExisting: RemoteDataSourceService
  });
}


@NgModule({
  imports: [
    HttpClientModule,
    AnalyticsModule.forRoot({
      gaToken: environment.googleAnalyticsToken,
      appName: 'eui'
    }),
    MousePositionTrackerModule,

    HeaderModule,
    StoreModule,
    ThemingModule
  ],
  providers,
  exports: [HeaderModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('The core module should only be imported once in the root module');
    }
  }
}

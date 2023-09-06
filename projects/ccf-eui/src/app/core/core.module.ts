import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DataSourceService, MousePositionTrackerModule } from 'ccf-shared';
import { AnalyticsModule } from 'ccf-shared/analytics';
import { environment } from '../../environments/environment';
import { HeaderModule } from './header/header.module';
import { DelegateDataSourceService } from './services/data-source/data-source.service';
import { ThemingModule } from './services/theming/theming.module';
import { StoreModule } from './store/store.module';


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
  providers: [
    { provide: DataSourceService, useExisting: DelegateDataSourceService }
  ],
  exports: [HeaderModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('The core module should only be imported once in the root module');
    }
  }
}

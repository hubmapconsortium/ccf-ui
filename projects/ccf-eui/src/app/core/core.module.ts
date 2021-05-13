import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MousePositionTrackerModule } from 'ccf-shared';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { environment } from 'projects/ccf-rui/src/environments/environment';

import { HeaderModule } from './header/header.module';
import { ThemingModule } from './services/theming/theming.module';
import { StoreModule } from './store/store.module';


@NgModule({
  imports: [
    HttpClientModule,

    NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsToken),
    MousePositionTrackerModule,

    HeaderModule,
    StoreModule,
    ThemingModule
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

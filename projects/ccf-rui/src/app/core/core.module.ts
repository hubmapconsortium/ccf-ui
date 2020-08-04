import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { StoreModule } from './store/store.module';


@NgModule({
  imports: [HttpClientModule, StoreModule],
  exports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('The core module should only be imported once in the root module');
    }
  }
}

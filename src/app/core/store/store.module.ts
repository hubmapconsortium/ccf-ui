import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsDataPluginModule } from '@ngxs-labs/data';

import { environment } from '../../../environments/environment';


@NgModule({
  imports: [
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
      // Consider setting compatibility and executionStrategy
      // https://www.ngxs.io/advanced/options
    }),
    NgxsDataPluginModule.forRoot()
  ]
})
export class StoreModule { }

import { NgModule } from '@angular/core';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../../../environments/environment';
import { IconRegistryState } from './icon-registry/icon-registry.state';


@NgModule({
  imports: [
    NgxsModule.forRoot([IconRegistryState], {
      developmentMode: !environment.production
      // Consider setting compatibility and executionStrategy
      // https://www.ngxs.io/advanced/options
    }),
    NgxsDataPluginModule.forRoot()
  ]
})
export class StoreModule { }

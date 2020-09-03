import { NgModule } from '@angular/core';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../../../environments/environment';
import { IconRegistryState } from './icon-registry/icon-registry.state';
import { PageState } from './page/page.state';
import { RegistrationState } from './registration/registration.state';
import { ModelState } from './model/model.state';


/**
 * States shared across the entire app.
 */
export const ROOT_STATES = [
  IconRegistryState,
  PageState,
  ModelState,
  RegistrationState
];

@NgModule({
  imports: [
    // For some strange reason the data plugin is not happy being placed after the store module!?
    NgxsDataPluginModule.forRoot(),

    NgxsModule.forRoot(ROOT_STATES, {
      developmentMode: !environment.production
      // Consider setting compatibility and executionStrategy
      // https://www.ngxs.io/advanced/options
    }),

    // Logger plugin must be last!
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    })
  ]
})
export class StoreModule { }

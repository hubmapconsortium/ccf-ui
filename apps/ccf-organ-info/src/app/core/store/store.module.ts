import { NgModule } from '@angular/core';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../../../environments/environment';
import { GlobalConfigState } from 'ccf-shared';


/**
 * States shared across the entire app.
 */
export const ROOT_STATES = [
  GlobalConfigState,
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

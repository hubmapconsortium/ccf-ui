import { NgModule } from '@angular/core';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../../../environments/environment';
import { ColorAssignmentState } from './color-assignment/color-assignment.state';
import { DataState } from './data/data.state';
import { IconRegistryState } from './icon-registry/icon-registry.state';
import { ListResultsState } from './list-results/list-results.state';
import { GlobalConfigState } from 'ccf-shared';
import { SceneState } from './scene/scene.state';


/**
 * States shared across the entire app.
 */
export const ROOT_STATES = [
  GlobalConfigState,
  ColorAssignmentState,
  IconRegistryState,
  ListResultsState,
  DataState,
  SceneState,
  // Add call to action state class
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

import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NgModule } from '@angular/core';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { CallToActionState, GlobalConfigState } from 'ccf-shared';

import { environment } from '../../../environments/environment';
import { ColorAssignmentState } from './color-assignment/color-assignment.state';
import { DataState } from './data/data.state';
import { IconRegistryState } from './icon-registry/icon-registry.state';
import { ListResultsState } from './list-results/list-results.state';
import { SceneState } from './scene/scene.state';
import { SpatialSearchFilterState } from './spatial-search-filter/spatial-search-filter.state';
import { SpatialSearchUiState } from './spatial-search-ui/spatial-search-ui.state';

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
  CallToActionState,
  SpatialSearchUiState,
  SpatialSearchFilterState,
];

@NgModule({
  imports: [
    // For some strange reason the data plugin is not happy being placed after the store module!?
    NgxsDataPluginModule.forRoot(),

    NgxsModule.forRoot(ROOT_STATES, {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
      },
      // Consider setting compatibility and executionStrategy
      // https://www.ngxs.io/advanced/options
    }),

    NgxsDispatchPluginModule.forRoot(),

    // Logger plugin must be last!
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
})
export class StoreModule {}

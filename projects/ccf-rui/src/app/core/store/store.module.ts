import { NgModule } from '@angular/core';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';

import { environment } from '../../../environments/environment';
import { AnatomicalStructureTagState } from './anatomical-structure-tags/anatomical-structure-tags.state';
import { IconRegistryState } from './icon-registry/icon-registry.state';
import { ModelState } from './model/model.state';
import { PageState } from './page/page.state';
import { ReferenceDataState } from './reference-data/reference-data.state';
import { RegistrationState } from './registration/registration.state';
import { SceneState } from './scene/scene.state';


/**
 * States shared across the entire app.
 */
export const ROOT_STATES = [
  GlobalConfigState,
  IconRegistryState,
  PageState,
  ModelState,
  AnatomicalStructureTagState,
  ReferenceDataState,
  RegistrationState,
  SceneState
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

    // Must come before all other plugins except the ngxs data plugin!
    NgxsStoragePluginModule.forRoot({
      key: ['registration.registrations']
    }),

    // Logger plugin must be last!
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    })
  ]
})
export class StoreModule {}

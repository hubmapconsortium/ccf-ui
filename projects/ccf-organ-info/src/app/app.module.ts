import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BodyUiModule } from 'ccf-shared';
import { ModelState } from './core/store/model.state';
import { SceneState } from './core/store/scene.state';
import { ReferenceDataState } from './core/store/reference-data/reference-data.state'
import { environment } from '../environments/environment';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';

export const ROOT_STATES = [
  ModelState,
  SceneState,
  ReferenceDataState
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxsDataPluginModule.forRoot(),

    NgxsModule.forRoot(ROOT_STATES, {
      developmentMode: !environment.production
      // Consider setting compatibility and executionStrategy
      // https://www.ngxs.io/advanced/options
    }),
    BrowserModule,
    BodyUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

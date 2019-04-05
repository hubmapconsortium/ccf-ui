import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconRegistryState } from './shared/state/icon-registry/icon-registry.state';
import { OntologyState } from './shared/state/ontology/ontology.state';
import { MainModule } from './views/main/main.module';

const rootStates = [
  OntologyState,
  IconRegistryState
  // Add additional root states here!
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,

    NgxsModule.forRoot(rootStates, { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),

    AppRoutingModule,
    MainModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

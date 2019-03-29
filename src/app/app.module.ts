import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OntologyState } from './shared/state/ontology/ontology.state';
import { MainModule } from './views/main/main.module';

const rootStates = [
  OntologyState
  // Add additional root states here!
];

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    NgxsModule.forRoot(rootStates, { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

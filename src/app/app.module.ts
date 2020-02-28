import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';

import { AppStateModule } from './app-state.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { OntologyExplorationModule } from './modules/ontology-exploration/ontology-exploration.module';
import { OntologyState } from './shared/state/ontology/ontology.state';


@NgModule({
  imports: [
    AppStateModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    NgxsDataPluginModule.forRoot(),
    NgxsModule.forRoot([OntologyState], { developmentMode: !environment.production }),
    OntologyExplorationModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { FiltersPopoverModule } from './modules/filters/filters-popover/filters-popover.module';
import { OntologyExplorationModule } from './modules/ontology-exploration/ontology-exploration.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { OntologyState } from './shared/state/ontology/ontology.state';
import { SearchState } from './shared/state/search/search.state';

@NgModule({
  imports: [
    AppStateModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    DrawerModule,
    HttpClientModule,
    NgxsDataPluginModule.forRoot(),
    NgxsModule.forRoot([OntologyState, SearchState], { developmentMode: !environment.production }),
    OntologyExplorationModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    DrawerModule,
    FiltersPopoverModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../../../environments/environment';
import { DataState } from './data/data.state';
import { IconRegistryState } from './icon-registry/icon-registry.state';
import { OntologyState } from './ontology/ontology.state';
import { SearchState } from './search/search.state';


export const ROOT_STATES = [
  IconRegistryState,
  DataState,
  OntologyState,
  SearchState
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
  ]
})
export class StoreModule { }

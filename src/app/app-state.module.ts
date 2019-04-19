import { NgModule } from '@angular/core';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { IconRegistryState } from './shared/state/icon-registry/icon-registry.state';
import { NavigationState } from './shared/state/navigation/navigation.state';
import { OntologyState } from './shared/state/ontology/ontology.state';
import { SearchState } from './shared/state/search/search.state';

const rootStates = [
  OntologyState,
  IconRegistryState,
  NavigationState,
  SearchState
  // Add additional root states here!
];

@NgModule({
  imports: [
    NgxsModule.forRoot(rootStates, { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
  ]
})
export class AppStateModule { }

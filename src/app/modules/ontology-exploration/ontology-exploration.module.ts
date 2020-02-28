import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OntologySearchModule } from './ontology-search/ontology-search.module';
import { OntologyTreeModule } from './ontology-tree/ontology-tree.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OntologySearchModule,
    OntologyTreeModule
  ],
  exports: [OntologySearchModule, OntologyTreeModule]
})
export class OntologyExplorationModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OntologySearchModule } from './ontology-search/ontology-search.module';
import { OntologySelectionModule } from './ontology-selection/ontology-selection.module';
import { OntologyTreeModule } from './ontology-tree/ontology-tree.module';


@NgModule({
  imports: [
    CommonModule,
    OntologySearchModule,
    OntologyTreeModule,
    OntologySelectionModule
  ],
  exports: [OntologySearchModule, OntologyTreeModule, OntologySelectionModule]
})
export class OntologyExplorationModule { }

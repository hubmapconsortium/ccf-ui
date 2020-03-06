import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OntologySearchModule } from '../ontology-search/ontology-search.module';
import { OntologyTreeModule } from '../ontology-tree/ontology-tree.module';
import { OntologySelectionComponent } from './ontology-selection.component';


@NgModule({
  imports: [
    CommonModule,
    OntologySearchModule,
    OntologyTreeModule
  ],
  declarations: [OntologySelectionComponent],
  exports: [OntologySelectionComponent],
})
export class OntologySelectionModule { }

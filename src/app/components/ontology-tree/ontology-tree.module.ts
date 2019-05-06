import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OntologyTreeComponent } from './ontology-tree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OntologyTreeComponent],
  exports: [OntologyTreeComponent],
})
export class OntologyTreeModule { }

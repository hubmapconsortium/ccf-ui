import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatTreeModule } from '@angular/material';

import { OntologyTreeComponent } from './ontology-tree.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule
  ],
  declarations: [OntologyTreeComponent],
  exports: [OntologyTreeComponent],
})
export class OntologyTreeModule { }

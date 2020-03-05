import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { OntologyTreeComponent } from './ontology-tree.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTreeModule
  ],
  declarations: [OntologyTreeComponent],
  exports: [OntologyTreeComponent],
})
export class OntologyTreeModule { }

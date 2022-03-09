import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { CellTypeTreeComponent } from './cell-type-tree.component';
import { OpacitySliderModule } from 'ccf-shared';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTreeModule,
    OpacitySliderModule
  ],
  declarations: [CellTypeTreeComponent],
  exports: [CellTypeTreeComponent],
})
export class CellTypeTreeModule { }

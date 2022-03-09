import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CellTypeSearchModule } from '../cell-type-search/cell-type-search.module';
import { CellTypeTreeModule } from '../cell-type-tree/cell-type-tree.module';
import { CellTypeSelectionComponent } from './cell-type-selection.component';


@NgModule({
  imports: [
    CommonModule,
    CellTypeSearchModule,
    CellTypeTreeModule
  ],
  declarations: [CellTypeSelectionComponent],
  exports: [CellTypeSelectionComponent],
})
export class CellTypeSelectionModule { }

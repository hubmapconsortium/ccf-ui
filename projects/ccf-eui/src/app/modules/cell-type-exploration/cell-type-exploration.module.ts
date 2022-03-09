import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CellTypeSearchModule } from './cell-type-search/cell-type-search.module';
import { CellTypeSelectionModule } from './cell-type-selection/cell-type-selection.module';
import { CellTypeTreeModule } from './cell-type-tree/cell-type-tree.module';


@NgModule({
  imports: [
    CommonModule,
    CellTypeSearchModule,
    CellTypeTreeModule,
    CellTypeSelectionModule
  ],
  exports: [CellTypeSearchModule, CellTypeTreeModule, CellTypeSelectionModule]
})
export class CellTypeExplorationModule { }

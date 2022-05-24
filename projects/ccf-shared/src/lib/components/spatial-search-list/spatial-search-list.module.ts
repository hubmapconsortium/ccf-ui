import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpatialSearchListComponent } from './spatial-search-list.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [SpatialSearchListComponent],
  exports: [SpatialSearchListComponent]
})
export class SpatialSearchListModule { }

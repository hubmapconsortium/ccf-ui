import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { SpatialSearchListComponent } from './spatial-search-list.component';


@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [SpatialSearchListComponent],
  exports: [SpatialSearchListComponent]
})
export class SpatialSearchListModule { }

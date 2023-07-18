import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

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

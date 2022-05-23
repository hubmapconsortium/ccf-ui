import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

import { SpatialSearchConfigComponent } from './spatial-search-config.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
  ],
  declarations: [SpatialSearchConfigComponent],
  exports: [SpatialSearchConfigComponent]
})
export class SpatialSearchConfigModule { }

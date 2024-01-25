import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { SpatialSearchConfigModule } from '../spatial-search-config/spatial-search-config.module';
import { SpatialSearchConfigBehaviorComponent } from './spatial-search-config-behavior.component';

@NgModule({
  imports: [
    CommonModule,
    SpatialSearchConfigModule,
    MatDialogModule
  ],
  declarations: [SpatialSearchConfigBehaviorComponent],
  exports: [SpatialSearchConfigBehaviorComponent]
})
export class SpatialSearchConfigBehaviorModule { }

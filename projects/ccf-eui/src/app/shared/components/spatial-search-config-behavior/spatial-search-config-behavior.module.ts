import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpatialSearchConfigModule } from '../spatial-search-config/spatial-search-config.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { SpatialSearchConfigBehaviorComponent } from './spatial-search-config-behavior.component';

@NgModule({
  imports: [
    CommonModule,
    SpatialSearchConfigModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  declarations: [SpatialSearchConfigBehaviorComponent],
  exports: [SpatialSearchConfigBehaviorComponent]
})
export class SpatialSearchConfigBehaviorModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

import { SpatialSearchUiModule } from '../spatial-search-ui/spatial-search-ui.module';
import { SpatialSearchUiBehaviorComponent } from './spatial-search-ui-behavior.component';

@NgModule({
  imports: [
    CommonModule,
    SpatialSearchUiModule,
    MatDialogModule
  ],
  declarations: [SpatialSearchUiBehaviorComponent],
  exports: [SpatialSearchUiBehaviorComponent]
})
export class SpatialSearchUiBehaviorModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { SpatialSearchConfigModule } from '../spatial-search-config/spatial-search-config.module';
import { SpatialSearchUiBehaviorModule } from '../spatial-search-ui-behavior/spatial-search-ui-behavior.module';
import { SpatialSearchConfigBehaviorComponent } from './spatial-search-config-behavior.component';

@NgModule({
  imports: [CommonModule, SpatialSearchConfigModule, MatDialogModule, SpatialSearchUiBehaviorModule],
  declarations: [SpatialSearchConfigBehaviorComponent],
  exports: [SpatialSearchConfigBehaviorComponent],
})
export class SpatialSearchConfigBehaviorModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpatialSearchUiComponent } from './spatial-search-ui.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpatialSearchUiComponent],
  exports: [SpatialSearchUiComponent]
})
export class SpatialSearchUiModule { }

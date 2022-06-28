import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XYZPositionModule } from 'ccf-shared';

import { TissueBlockListModule } from '../tissue-block-list/tissue-block-list.module';
import { SpatialSearchUiComponent } from './spatial-search-ui.component';

@NgModule({
  imports: [
    CommonModule,

    TissueBlockListModule,
    XYZPositionModule
  ],
  declarations: [SpatialSearchUiComponent],
  exports: [SpatialSearchUiComponent]
})
export class SpatialSearchUiModule { }

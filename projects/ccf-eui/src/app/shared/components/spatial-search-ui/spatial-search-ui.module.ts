import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpatialSearchKeyboardUIBehaviorModule } from '../spatial-search-keyboard-ui-behavior/spatial-search-keyboard-ui-behavior.module';
import { TissueBlockListModule } from '../tissue-block-list/tissue-block-list.module';

import { SpatialSearchUiComponent } from './spatial-search-ui.component';

@NgModule({
  imports: [
    CommonModule,
    TissueBlockListModule,
    SpatialSearchKeyboardUIBehaviorModule,
  ],
  declarations: [SpatialSearchUiComponent],
  exports: [SpatialSearchUiComponent]
})
export class SpatialSearchUiModule { }

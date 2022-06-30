import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfoButtonModule, XYZPositionModule } from 'ccf-shared';
import { SpatialSearchKeyboardUIBehaviorModule } from '../spatial-search-keyboard-ui-behavior/spatial-search-keyboard-ui-behavior.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

import { TissueBlockListModule } from '../tissue-block-list/tissue-block-list.module';
import { SpatialSearchUiComponent } from './spatial-search-ui.component';

@NgModule({
  imports: [
    CommonModule,
    XYZPositionModule,
    TissueBlockListModule,
    SpatialSearchKeyboardUIBehaviorModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    InfoButtonModule
  ],
  declarations: [SpatialSearchUiComponent],
  exports: [SpatialSearchUiComponent]
})
export class SpatialSearchUiModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpatialSearchKeyboardUIBehaviorModule } from '../spatial-search-keyboard-ui-behavior/spatial-search-keyboard-ui-behavior.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { BodyUiModule, InfoButtonModule } from 'ccf-shared';
import { TissueBlockListModule } from '../tissue-block-list/tissue-block-list.module';

import { SpatialSearchUiComponent } from './spatial-search-ui.component';

@NgModule({
  imports: [
    CommonModule,
    BodyUiModule,
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

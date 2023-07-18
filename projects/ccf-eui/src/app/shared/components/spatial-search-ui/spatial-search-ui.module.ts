import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';

import { BodyUiModule, InfoButtonModule, XYZPositionModule } from 'ccf-shared';
import { SpatialSearchKeyboardUIBehaviorModule } from '../spatial-search-keyboard-ui-behavior/spatial-search-keyboard-ui-behavior.module';
import { TermOccurrenceListModule } from '../term-occurence-list/term-occurrence.module';
import { TissueBlockListModule } from '../tissue-block-list/tissue-block-list.module';
import { SpatialSearchUiComponent } from './spatial-search-ui.component';

@NgModule({
  imports: [
    CommonModule,
    BodyUiModule,
    XYZPositionModule,
    TissueBlockListModule,
    SpatialSearchKeyboardUIBehaviorModule,
    MatIconModule,
    MatSliderModule,
    TermOccurrenceListModule,
    MatDividerModule,
    MatButtonModule,
    InfoButtonModule,
    TermOccurrenceListModule
  ],
  declarations: [SpatialSearchUiComponent],
  exports: [SpatialSearchUiComponent]
})
export class SpatialSearchUiModule { }

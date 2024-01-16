import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

import { BodyUiModule, InfoButtonModule, SpatialSearchKeyboardUIBehaviorModule, XYZPositionModule } from 'ccf-shared';
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

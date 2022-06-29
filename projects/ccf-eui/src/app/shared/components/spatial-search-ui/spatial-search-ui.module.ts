import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { InfoButtonModule } from 'ccf-shared';
import { TissueBlockListModule } from '../tissue-block-list/tissue-block-list.module';

import { SpatialSearchUiComponent } from './spatial-search-ui.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    InfoButtonModule,
    TissueBlockListModule
  ],
  declarations: [SpatialSearchUiComponent],
  exports: [SpatialSearchUiComponent]
})
export class SpatialSearchUiModule { }

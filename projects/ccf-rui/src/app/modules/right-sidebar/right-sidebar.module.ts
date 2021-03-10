import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BlockSizeInputModule } from '../../shared/components/block-size-input/block-size-input.module';
import { RotationSliderModule } from '../../shared/components/rotation-slider/rotation-slider.module';
import { SlicesInputModule } from '../../shared/components/slices-input/slices-input.module';
import { TagListModule } from '../../shared/components/tag-list/tag-list.module';
import { TagSearchModule } from '../../shared/components/tag-search/tag-search.module';
import { ReviewButtonModule } from '../review/review-button/review-button.module';
import { RightSidebarComponent } from './right-sidebar.component';

import { InfoButtonModule } from 'ccf-shared';


@NgModule({
  imports: [
    CommonModule,

    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTooltipModule,

    BlockSizeInputModule,
    ReviewButtonModule,
    RotationSliderModule,
    SlicesInputModule,
    TagListModule,
    TagSearchModule,
    InfoButtonModule
  ],
  declarations: [RightSidebarComponent],
  exports: [RightSidebarComponent]
})
export class RightSidebarModule { }

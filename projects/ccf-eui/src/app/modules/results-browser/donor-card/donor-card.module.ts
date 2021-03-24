import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { ThumbnailCarouselModule } from '../../../shared/components/thumbnail-carousel/thumbnail-carousel.module';
import { DonorCardComponent } from './donor-card.component';



@NgModule({
  imports: [
    CommonModule,

    MatCheckboxModule,
    MatIconModule,

    ThumbnailCarouselModule
  ],
  declarations: [DonorCardComponent],
  exports: [DonorCardComponent]
})
export class DonorCardModule { }

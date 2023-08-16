import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SwiperModule } from 'swiper/angular';
import { Navigation, Swiper } from 'swiper';

import { ThumbnailCarouselComponent } from './thumbnail-carousel.component';


@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,

    SwiperModule
  ],
  declarations: [ThumbnailCarouselComponent],
  exports: [ThumbnailCarouselComponent]
})
export class ThumbnailCarouselModule {
  constructor() {
    // Install swiper modules
    Swiper.use([Navigation]);
  }
}

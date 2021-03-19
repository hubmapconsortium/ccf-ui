import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { Navigation, Swiper } from 'swiper/core';

import { ThumbnailCarouselComponent } from './thumbnail-carousel.component';


// Install swiper modules
Swiper.use([Navigation]);


@NgModule({
  imports: [
    CommonModule,

    SwiperModule
  ],
  declarations: [ThumbnailCarouselComponent],
  exports: [ThumbnailCarouselComponent]
})
export class ThumbnailCarouselModule { }

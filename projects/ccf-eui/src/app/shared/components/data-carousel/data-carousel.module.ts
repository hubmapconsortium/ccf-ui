import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataCarouselComponent } from './data-carousel.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DataCarouselComponent],
  exports: [DataCarouselComponent]
})
export class DataCarouselModule { }

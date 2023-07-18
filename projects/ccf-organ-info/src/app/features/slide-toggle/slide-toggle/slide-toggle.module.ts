import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

import { SlideToggleComponent } from './slide-toggle.component';


@NgModule({
  declarations: [
    SlideToggleComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule
  ],
  exports: [
    SlideToggleComponent
  ]
})
export class SlideToggleModule { }

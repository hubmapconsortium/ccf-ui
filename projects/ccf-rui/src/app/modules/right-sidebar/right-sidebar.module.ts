import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RotationSliderModule } from '../../shared/components/rotation-slider/rotation-slider.module';
import { RightSidebarComponent } from './right-sidebar.component';


@NgModule({
  imports: [CommonModule, RotationSliderModule],
  declarations: [RightSidebarComponent],
  exports: [RightSidebarComponent]
})
export class RightSidebarModule { }

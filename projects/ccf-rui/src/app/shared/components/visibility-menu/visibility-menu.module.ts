import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpacitySliderModule } from '../opacity-slider/opacity-slider.module';

import { VisibilityMenuComponent } from './visibility-menu.component';


@NgModule({
  imports: [CommonModule, MatIconModule, OpacitySliderModule],
  declarations: [VisibilityMenuComponent],
  exports: [VisibilityMenuComponent]
})
export class VisibilityMenuModule { }

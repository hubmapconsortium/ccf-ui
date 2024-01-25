import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpacitySliderModule } from 'ccf-shared';
import { MatRippleModule } from '@angular/material/core';

import { VisibilityMenuComponent } from './visibility-menu.component';


@NgModule({
  imports: [CommonModule, MatIconModule, MatRippleModule, OpacitySliderModule],
  declarations: [VisibilityMenuComponent],
  exports: [VisibilityMenuComponent]
})
export class VisibilityMenuModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';

import { NameInputComponent } from './name-input.component';
import { ToggleableTooltipModule } from '../toggleable-tooltip/toggleable-tooltip.module';


@NgModule({
  imports: [CommonModule, MatSlideToggleModule, MatInputModule, ToggleableTooltipModule],
  declarations: [NameInputComponent],
  exports: [NameInputComponent]
})
export class NameInputModule { }

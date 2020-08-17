import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { GenderSelectorComponent } from './gender-selector.component';


@NgModule({
  imports: [CommonModule, MatSlideToggleModule],
  declarations: [GenderSelectorComponent],
  exports: [GenderSelectorComponent]
})
export class GenderSelectorModule { }

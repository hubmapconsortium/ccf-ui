import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { LabeledSlideToggleComponent } from './labeled-slide-toggle.component';


@NgModule({
  imports: [CommonModule, MatSlideToggleModule],
  declarations: [LabeledSlideToggleComponent],
  exports: [LabeledSlideToggleComponent]
})
export class LabeledSlideToggleModule { }

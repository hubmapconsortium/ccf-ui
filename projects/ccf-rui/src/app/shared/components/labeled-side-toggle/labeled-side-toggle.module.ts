import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { LabeledSideToggleComponent } from './labeled-side-toggle.component';


@NgModule({
  imports: [CommonModule, MatSlideToggleModule],
  declarations: [LabeledSideToggleComponent],
  exports: [LabeledSideToggleComponent]
})
export class LabeledSideToggleModule { }

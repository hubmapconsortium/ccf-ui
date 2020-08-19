import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NameInputComponent } from './name-input.component';


@NgModule({
  imports: [CommonModule, MatSlideToggleModule],
  declarations: [NameInputComponent],
  exports: [NameInputComponent]
})
export class NameInputModule { }

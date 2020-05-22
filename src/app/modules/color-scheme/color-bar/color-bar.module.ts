import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorBarComponent } from './color-bar.component';


@NgModule({
  declarations: [ColorBarComponent],
  imports: [
    CommonModule
  ],
  exports: [ColorBarComponent]
})
export class ColorBarModule { }

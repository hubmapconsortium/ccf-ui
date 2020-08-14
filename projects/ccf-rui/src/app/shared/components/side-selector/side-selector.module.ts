import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SideSelectorComponent } from './side-selector.component';


@NgModule({
  imports: [CommonModule, MatSlideToggleModule],
  declarations: [SideSelectorComponent],
  exports: [SideSelectorComponent]
})
export class SideSelectorModule { }

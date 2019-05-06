import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule, MatIconModule } from '@angular/material';

import { GenderSelectorComponent } from './gender-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  declarations: [GenderSelectorComponent],
  exports: [GenderSelectorComponent]
})
export class GenderSelectorModule { }

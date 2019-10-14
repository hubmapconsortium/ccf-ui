import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

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

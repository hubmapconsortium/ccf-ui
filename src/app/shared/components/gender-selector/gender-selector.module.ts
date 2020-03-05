import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

import { GenderSelectorComponent } from './gender-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
  ],
  declarations: [GenderSelectorComponent],
  exports: [GenderSelectorComponent]
})

export class GenderSelectorModule { }
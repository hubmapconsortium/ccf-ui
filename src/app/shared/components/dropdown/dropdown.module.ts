import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

import { DropdownComponent } from './dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
  ],
  declarations: [DropdownComponent],
  exports: [DropdownComponent]
})

export class DropdownModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { DropdownComponent } from './dropdown.component';


@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent]
})

export class DropdownModule { }

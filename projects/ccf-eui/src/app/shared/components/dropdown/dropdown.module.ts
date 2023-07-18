import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

import { DropdownComponent } from './dropdown.component';


@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent]
})

export class DropdownModule { }

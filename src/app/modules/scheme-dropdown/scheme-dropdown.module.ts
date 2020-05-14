import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { SchemeDropdownComponent } from './scheme-dropdown.component';

@NgModule({
  declarations: [SchemeDropdownComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule
  ],
  exports: [SchemeDropdownComponent]
})
export class SchemeDropdownModule { }

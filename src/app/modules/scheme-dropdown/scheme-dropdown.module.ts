import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { ColorBarModule } from '../../modules/color-scheme/color-bar/color-bar.module';
import { SchemeDropdownComponent } from './scheme-dropdown.component';

@NgModule({
  declarations: [SchemeDropdownComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    ColorBarModule
  ],
  exports: [SchemeDropdownComponent]
})
export class SchemeDropdownModule { }

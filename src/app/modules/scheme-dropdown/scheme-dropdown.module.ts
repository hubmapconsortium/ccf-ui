import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemeDropdownComponent } from './scheme-dropdown.component';


@NgModule({
  declarations: [SchemeDropdownComponent],
  imports: [
    CommonModule
  ],
  exports: [SchemeDropdownComponent]
})
export class SchemeDropdownModule { }

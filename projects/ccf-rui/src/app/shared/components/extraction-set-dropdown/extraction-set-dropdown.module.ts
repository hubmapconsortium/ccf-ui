import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExtractionSetDropdownComponent } from './extraction-set-dropdown.component';


@NgModule({
  imports: [CommonModule],
  declarations: [ExtractionSetDropdownComponent],
  exports: [ExtractionSetDropdownComponent]
})
export class ExtractionSetDropdownModule { }

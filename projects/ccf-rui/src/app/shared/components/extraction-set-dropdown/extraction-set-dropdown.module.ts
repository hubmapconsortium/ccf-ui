import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

import { ExtractionSetDropdownComponent } from './extraction-set-dropdown.component';


@NgModule({
  imports: [CommonModule, MatSelectModule],
  declarations: [ExtractionSetDropdownComponent],
  exports: [ExtractionSetDropdownComponent]
})
export class ExtractionSetDropdownModule { }

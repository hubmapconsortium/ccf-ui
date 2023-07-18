import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

import { ExtractionSetDropdownComponent } from './extraction-set-dropdown.component';


@NgModule({
  imports: [CommonModule, MatSelectModule],
  declarations: [ExtractionSetDropdownComponent],
  exports: [ExtractionSetDropdownComponent]
})
export class ExtractionSetDropdownModule { }

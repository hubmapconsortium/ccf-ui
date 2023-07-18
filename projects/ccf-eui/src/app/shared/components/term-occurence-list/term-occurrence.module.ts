import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { TermOccurrenceListComponent } from './term-occurrence.component';


@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatTooltipModule, MatIconModule],
  declarations: [TermOccurrenceListComponent],
  exports: [TermOccurrenceListComponent]
})

export class TermOccurrenceListModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { TermOccurrenceListComponent } from './term-occurrence.component';


@NgModule({
  imports: [CommonModule, MatTooltipModule, MatIconModule],
  declarations: [TermOccurrenceListComponent],
  exports: [TermOccurrenceListComponent]
})

export class TermOccurrenceListModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TermOccurrenceListComponent } from './term-occurrence.component';


@NgModule({
  imports: [CommonModule, MatTooltipModule, MatIconModule],
  declarations: [TermOccurrenceListComponent],
  exports: [TermOccurrenceListComponent]
})

export class TermOccurrenceListModule { }

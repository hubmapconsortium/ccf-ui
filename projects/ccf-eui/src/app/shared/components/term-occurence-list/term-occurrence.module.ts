import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TermOccurrenceListComponent } from './term-occurrence.component';


@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatTooltipModule, MatIconModule],
  declarations: [TermOccurrenceListComponent],
  exports: [TermOccurrenceListComponent]
})

export class TermOccurrenceListModule { }

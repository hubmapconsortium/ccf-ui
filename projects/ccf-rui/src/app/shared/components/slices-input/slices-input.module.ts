import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NumbersOnlyModule } from 'ccf-shared';
import { SlicesInputComponent } from './slices-input.component';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    NumbersOnlyModule
  ],
  declarations: [SlicesInputComponent],
  exports: [SlicesInputComponent]
})
export class SlicesInputModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NumbersOnlyModule } from 'ccf-shared';
import { SlicesInputComponent } from './slices-input.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    NumbersOnlyModule,
    MatFormFieldModule
  ],
  declarations: [SlicesInputComponent],
  exports: [SlicesInputComponent]
})
export class SlicesInputModule { }

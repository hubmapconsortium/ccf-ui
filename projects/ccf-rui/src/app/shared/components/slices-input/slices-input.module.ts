import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlicesInputComponent } from './slices-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatInputModule, MatIconModule],
  declarations: [SlicesInputComponent],
  exports: [SlicesInputComponent]
})
export class SlicesInputModule { }
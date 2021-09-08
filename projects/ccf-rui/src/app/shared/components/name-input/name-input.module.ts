import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NameInputComponent } from './name-input.component';


@NgModule({
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  declarations: [NameInputComponent],
  exports: [NameInputComponent]
})
export class NameInputModule { }

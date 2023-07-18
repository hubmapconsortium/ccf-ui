import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

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

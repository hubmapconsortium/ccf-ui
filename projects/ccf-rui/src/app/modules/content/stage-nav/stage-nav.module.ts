import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { LabeledSlideToggleModule } from '../../../shared/components/labeled-slide-toggle/labeled-slide-toggle.module';

import { StageNavComponent } from './stage-nav.component';


@NgModule({
  imports: [
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    LabeledSlideToggleModule,
    MatTooltipModule
  ],
  declarations: [StageNavComponent],
  exports: [StageNavComponent]
})
export class StageNavModule { }

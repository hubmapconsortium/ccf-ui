import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { LabeledSlideToggleModule } from '../../../shared/components/labeled-slide-toggle/labeled-slide-toggle.module';

import { StageNavComponent } from './stage-nav.component';


@NgModule({
  imports: [CommonModule, MatRadioModule, MatSelectModule, MatIconModule, LabeledSlideToggleModule],
  declarations: [StageNavComponent],
  exports: [StageNavComponent]
})
export class StageNavModule { }

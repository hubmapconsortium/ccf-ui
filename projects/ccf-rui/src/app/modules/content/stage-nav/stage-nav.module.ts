import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { StageNavComponent } from './stage-nav.component';


@NgModule({
  imports: [CommonModule, MatRadioModule, MatSlideToggleModule],
  declarations: [StageNavComponent],
  exports: [StageNavComponent]
})
export class StageNavModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageNavComponent } from './stage-nav.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [StageNavComponent],
  imports: [CommonModule, MatRadioModule, MatSlideToggleModule],
  exports: [StageNavComponent]
})
export class StageNavModule { }

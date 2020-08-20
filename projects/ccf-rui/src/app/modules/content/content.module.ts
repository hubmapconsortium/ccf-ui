import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentComponent } from '../content/content.component';
import { StageNavModule } from './stage-nav/stage-nav.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [CommonModule, StageNavModule, MatIconModule],
  declarations: [ContentComponent],
  exports: [ContentComponent]
})
export class ContentModule { }

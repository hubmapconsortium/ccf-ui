import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentComponent } from '../content/content.component';
import { StageNavModule } from './stage-nav/stage-nav.module';


@NgModule({
  imports: [CommonModule, StageNavModule],
  declarations: [ContentComponent],
  exports: [ContentComponent]
})
export class ContentModule { }

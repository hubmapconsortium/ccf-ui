import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreDebugModule } from 'ccf-shared';

import { ContentComponent } from '../content/content.component';
import { StageNavModule } from './stage-nav/stage-nav.module';


@NgModule({
  imports: [CommonModule, StageNavModule, StoreDebugModule],
  declarations: [ContentComponent],
  exports: [ContentComponent]
})
export class ContentModule { }

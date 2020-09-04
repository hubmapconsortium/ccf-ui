import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreDebugModule } from 'ccf-shared';

import { ContentComponent } from '../content/content.component';
import { StageNavModule } from './stage-nav/stage-nav.module';
import { MatIconModule } from '@angular/material/icon';
import { VideoModalLauncherModule } from './video-modal/video-modal-launcher/video-modal-launcher.module';


@NgModule({
  imports: [CommonModule, StageNavModule, MatIconModule, StoreDebugModule, VideoModalLauncherModule],
  declarations: [ContentComponent],
  exports: [ContentComponent]
})
export class ContentModule { }

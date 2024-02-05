import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VideoModalModule } from '../video-modal/video-modal.module';
import { VideoModalLauncherComponent } from './video-modal-launcher.component';

@NgModule({
  declarations: [VideoModalLauncherComponent],
  imports: [CommonModule, MatIconModule, VideoModalModule],
  exports: [VideoModalLauncherComponent],
})
export class VideoModalLauncherModule {}

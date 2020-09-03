import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoModalComponent } from './video-modal.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [ VideoModalComponent ],
  imports: [
    CommonModule,
    YouTubePlayerModule
  ],
  exports: [ VideoModalComponent ]
})
export class VideoModalModule { }

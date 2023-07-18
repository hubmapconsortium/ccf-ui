import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoModalComponent } from './video-modal.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ VideoModalComponent ],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [ VideoModalComponent ]
})
export class VideoModalModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoModalLauncherComponent } from './video-modal-launcher.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ VideoModalLauncherComponent ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ VideoModalLauncherComponent ]
})
export class VideoModalLauncherModule { }

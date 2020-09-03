import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTutorialComponent } from './app-tutorial.component';
import { VideoModalLauncherModule } from './video-modal-launcher/video-modal-launcher.module';

@NgModule({
  declarations: [ AppTutorialComponent] ,
  imports: [
    CommonModule,
    VideoModalLauncherModule
  ],
  exports: [ AppTutorialComponent ]
})
export class AppTutorialModule { }

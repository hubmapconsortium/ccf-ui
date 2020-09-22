import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreDebugModule } from 'ccf-shared';

import { ContentComponent } from '../content/content.component';
import { StageNavModule } from './stage-nav/stage-nav.module';
import { MatIconModule } from '@angular/material/icon';
import { VideoModalLauncherModule } from './video-modal/video-modal-launcher/video-modal-launcher.module';
import { ToggleableTooltipModule } from '../../shared/components/toggleable-tooltip/toggleable-tooltip.module';
import { MatRippleModule } from '@angular/material/core';
import { AngularResizedEventModule } from 'angular-resize-event';


@NgModule({
  imports: [
    CommonModule,
    StageNavModule,
    MatIconModule,
    StoreDebugModule,
    VideoModalLauncherModule,
    ToggleableTooltipModule,
    MatRippleModule,
    AngularResizedEventModule
  ],
  declarations: [ContentComponent],
  exports: [ContentComponent]
})
export class ContentModule { }

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { VideoModalComponent } from '../video-modal/video-modal.component';

@Component({
  selector: 'ccf-video-modal-launcher',
  templateUrl: './video-modal-launcher.component.html',
  styleUrls: ['./video-modal-launcher.component.scss']
})
export class VideoModalLauncherComponent {
  constructor(private readonly dialog: MatDialog) { }

  launchVideoModal(): void {
    this.dialog.open(VideoModalComponent, {
      width: '46em',
      backdropClass: 'modal-backdrop-dark',
      data: { }
    });
  }
}

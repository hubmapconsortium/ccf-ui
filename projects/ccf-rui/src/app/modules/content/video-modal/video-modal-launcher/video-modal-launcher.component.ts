import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { VideoModalComponent } from '../video-modal/video-modal.component';

/**
 * Component for launching an angular material modal.
 */
@Component({
  selector: 'ccf-video-modal-launcher',
  templateUrl: './video-modal-launcher.component.html',
  styleUrls: ['./video-modal-launcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoModalLauncherComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-video-modal-launcher';

  /**
   * Input used to toggle the launcher on and off.
   */
  @Input() visible = true;

  /**
   * Creates an instance of video modal launcher component.
   */
  constructor(private readonly dialog: MatDialog) { }

  /**
   * Launches the video modal component.
   */
  launchVideoModal(): void {
    this.dialog.open(VideoModalComponent, {
      width: '46rem',
      data: {}
    });
  }
}

import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component for displaying a youtube video inside of an angular material modal.
 */
@Component({
  selector: 'ccf-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss']
})
export class VideoModalComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-video-modal';

  /**
   * Creates an instance of video modal component.
   */
  constructor(
    public dialogRef: MatDialogRef<VideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown
  ) { }

  /**
   * load the youtube player api in on init
   */
  ngOnInit(): void {
    this.loadYoutubePlayerAPI();
  }

  /**
   * Loads in youtube player api
   */
  loadYoutubePlayerAPI(): void {
    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  /**
   * Closes the video modal component
   */
  close(): void {
    this.dialogRef.close();
  }
}

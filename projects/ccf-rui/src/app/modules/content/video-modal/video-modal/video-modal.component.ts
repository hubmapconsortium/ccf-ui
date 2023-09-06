import { Component, OnInit, HostBinding, Inject, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';

/**
 * Component for displaying a youtube video inside of an angular material modal.
 */
@Component({
  selector: 'ccf-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoModalComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-video-modal';

  /**
   * Creates an instance of video modal component.
   */
  constructor(
    private renderer2: Renderer2,
    public dialogRef: MatDialogRef<VideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown,
    @Inject(DOCUMENT) private document: Document
  ) { }

  /**
   * load the youtube player api in on init
   */
  ngOnInit(): void {
    this.loadYoutubePlayerAPI();
  }

  /**
   * loads the IFrame Player API code asynchronously from YouTube.
   */
  loadYoutubePlayerAPI(): void {
    const script = this.renderer2.createElement('script') as HTMLScriptElement;
    script.src = 'https://www.youtube.com/iframe_api';
    this.renderer2.appendChild(this.document.body, script);
  }

  /**
   * Closes the video modal component
   */
  close(): void {
    this.dialogRef.close();
  }
}

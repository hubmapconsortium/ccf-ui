import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ccf-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss']
})
export class VideoModalComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-video-modal';

  // https://www.youtube.com/watch?v=-ABy5IeCEk4
  ngOnInit(): void {
    this.loadYoutubePlayerAPI();
  }

  loadYoutubePlayerAPI(): void {
    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}

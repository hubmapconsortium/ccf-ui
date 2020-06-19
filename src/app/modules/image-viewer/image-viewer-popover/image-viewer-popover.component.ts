import { Component } from '@angular/core';
import { ImageViewerData, ListResult } from 'ccf-database';

import { ViewerState } from '../../../core/store/viewer/viewer.state';


const EMPTY_DATA: ImageViewerData = {
  '@id': '',
  '@type': 'ImageViewerData',
  id: '',
  label: '',
  organName: '',
  metadata: []
};

const EMPTY_RESULT: ListResult = {
  '@id': '',
  '@type': 'ListResult',
  id: '',
  label: ''
};


/**
 * Popup that displays detailed information on a selected image along with viewing options
 */
@Component({
  selector: 'ccf-image-viewer-popover',
  templateUrl: './image-viewer-popover.component.html',
  styleUrls: ['./image-viewer-popover.component.scss']
})
export class ImageViewerPopoverComponent {
  /**
   * Data of the image to be passed into the viewer
   */
  data = EMPTY_DATA;

  /**
   * Currently active result.
   */
  result = EMPTY_RESULT;

  get sourceUrls(): string[] {
    const { result } = this;
    if (result.resultType !== 'image_viewer' || result.resultUrl === undefined) {
      return [];
    }

    return [result.resultUrl];
  }

  /**
   * Whether or not the image viewer is visible
   */
  viewerVisible = false;

  constructor(readonly state: ViewerState) { }

  /**
   * Returns viewer to closed state
   */
  close(): void {
    this.viewerVisible = false;
  }

  /**
   * Changes viewer to opened state
   * @param data Data of the image to be passed into the viewer
   */
  open(data: ImageViewerData, result: ListResult): void {
    this.viewerVisible = true;
    this.data = data;
    this.result = result;
  }
}

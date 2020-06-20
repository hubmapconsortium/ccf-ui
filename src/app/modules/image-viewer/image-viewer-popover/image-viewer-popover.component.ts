import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./image-viewer-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  /**
   * Urls to load image data from.
   */
  sourceUrls: string[] = [];

  /**
   * Whether or not the image viewer is visible
   */
  viewerVisible = false;

  /**
   * Initializes the component.
   *
   * @param state The image viewer state.
   * @param cdr Reference to this components change detector.
   */
  constructor(readonly state: ViewerState, private readonly cdr: ChangeDetectorRef) { }

  /**
   * Returns viewer to closed state
   */
  close(): void {
    this.viewerVisible = false;
    this.cdr.markForCheck();
  }

  /**
   * Changes viewer to opened state
   * @param data Data of the image to be passed into the viewer
   */
  open(data: ImageViewerData, result: ListResult): void {
    this.viewerVisible = true;
    this.data = data;
    this.result = result;
    this.setSourceUrls(result);
    this.cdr.markForCheck();
  }

  private setSourceUrls(result: ListResult): void {
    const { resultType, resultUrl } = result;
    if (resultType !== 'image_viewer' || resultUrl === undefined) {
      this.sourceUrls = [];
    } else {
      this.sourceUrls = [resultUrl];
    }
  }
}

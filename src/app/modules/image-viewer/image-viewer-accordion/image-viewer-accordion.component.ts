import { Component, Input } from '@angular/core';

/**
 * Expandable accordion panel for the image viewer
 */
@Component({
  selector: 'ccf-image-viewer-accordion',
  templateUrl: './image-viewer-accordion.component.html',
  styleUrls: ['./image-viewer-accordion.component.scss']
})
export class ImageViewerAccordionComponent {

  /**
   * Metadata of image to be displayed in the About panel
   */
  @Input() metadata: { label: string; value: string; }[];

}

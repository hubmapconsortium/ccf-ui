import { Component, Input } from '@angular/core';

/**
 * Expandable accordion panel for the image viewer
 */
@Component({
  selector: 'ccf-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

  /**
   * Metadata of image to be displayed in the About panel
   */
  @Input() metadata: { label: string; value: string; }[];

}

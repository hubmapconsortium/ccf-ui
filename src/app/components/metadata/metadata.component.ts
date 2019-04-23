import { Component, Input } from '@angular/core';

/**
 * metadata common component to dsiplay metadata of bidy, organ tisues and cells.
 */
@Component({
  selector: 'ccf-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent {
  /**
   * Input  of metadata component is list of metadata objects.
   */
  @Input() metadata: { [label: string]: string }[];
}

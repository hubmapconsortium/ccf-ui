import { Component } from '@angular/core';

import { OrganDataService } from '../../shared/services/organ-data/organ-data.service';

/**
 * Component organ view component.
 */
@Component({
  selector: 'ccf-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss']
})

export class OrganComponent {
  /**
   * Metadata that is shown on the right hand side table.
   */
  activeMetadata: [{ [label: string]: string }] | [] = [];

  /**
   * Creates an instance of organ component.
   *
   * @param organService Service used to fetch organ related data for display.
   */
  constructor(public readonly dataService: OrganDataService) { }
}

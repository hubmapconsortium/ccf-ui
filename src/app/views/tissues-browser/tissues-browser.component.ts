import { Component } from '@angular/core';

import { TissuesBrowserDataService } from '../../shared/services/tissues-browser-data/tissues-browser-data.service';

/**
 * Base view of the tissues browser. Responsible for fetching data and passing it to the grid component.
 */
@Component({
  selector: 'ccf-tissues-browser',
  templateUrl: './tissues-browser.component.html',
  styleUrls: ['./tissues-browser.component.scss']
})
export class TissuesBrowserComponent {
  /**
   * Creates an instance of tissues browser component.
   *
   * @param dataService The service from which data is received.
   */
  constructor(readonly dataService: TissuesBrowserDataService) { }
}

import { Component } from '@angular/core';

import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { SearchService } from '../../shared/services/search/search.service';

/**
 * Main view containing common items to all subviews.
 */
@Component({
  selector: 'ccf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  /**
   * Indicates whether the search drawer is active(open)/inactive(closed).
   */
  searchActive = false;

  /**
   * Creates an instance of main component.
   *
   * @param navigation The navigation service used to determine active routes.
   * @param search The search service used to fetch a description of the current search.
   */
  constructor(
    readonly navigation: NavigationService,
    readonly search: SearchService
  ) { }
}

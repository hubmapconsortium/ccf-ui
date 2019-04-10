import { Component } from '@angular/core';

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
}

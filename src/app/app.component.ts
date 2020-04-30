import { CCFDatabase } from 'ccf-database';
import { Component } from '@angular/core';

import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';

/**
 * This is the main angular component that all the other components branch off from.
 * It is in charge of the header and drawer components who have many sub-components.
 */
@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    const db = new CCFDatabase();
    db.connect().then(() => (globalThis as any).db = db);
    console.log(db);
  }
  // Todo: add to ngxs global state
  /**
   * The list of filters for the tissue browser, with default values set.
   */
  filters: Record<string, unknown | unknown[]> = { tmc: [], technologies: [], sex: 'Both', ageRange: [1, 110], BMIRange: [13, 83] };

  /**
   * Resets the drawers and filter components to their default state.
   * @param left The left drawer component gets passed in so we can call it's methods to control it's state
   * @param right The right drawer component gets passed in so we can call it's methods to control it's state
   * @param filterbox The filter's popover component gets passed in so we can control it's popover's state
   */
  reset(left: DrawerComponent, right: DrawerComponent, filterbox: FiltersPopoverComponent) {
    left.open();
    left.closeExpanded();
    right.open();
    right.closeExpanded();
    filterbox.removeBox();
  }
}

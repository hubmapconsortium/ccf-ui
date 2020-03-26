import { Component } from '@angular/core';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fullscreenActive = false;
  constructor() {}

  // Todo: add to ngxs global state
  filters: Record<string, unknown | unknown[]> = { tmc: [], technologies: [], sex: 'Both', ageRange: [1, 110], BMIRange: [13, 83] };

  reset(left: DrawerComponent, right: DrawerComponent, filterbox: FiltersPopoverComponent) {
    left.open();
    left.closeExpanded();
    right.open();
    right.closeExpanded();
    filterbox.removeBox();
  }

  /**
   * Toggles expanded mode of the drawer
   * @param drawer The drawer being toggled
   */
  toggleFullScreen(drawer: DrawerComponent) {
    if (this.fullscreenActive) {
      drawer.closeExpanded();
      this.fullscreenActive = false;
    } else {
      drawer.openExpanded();
      this.fullscreenActive = true;
    }
  }
}

import { Component } from '@angular/core';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component'
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component'

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}

  reset(left: DrawerComponent, right: DrawerComponent, filterbox: FiltersPopoverComponent) {
    left.open();
    right.open();
    filterbox.removeBox();
  }
}

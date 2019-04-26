import { Component } from '@angular/core';

@Component({
  selector: 'ccf-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  /**
   * Available search filter categories and their values, TODO - needs to be fetched from the data
   * based on the implementation
   */
  filterCategories = new Map([
    ['Technologies', ['IMS', 'MxIF', 'AF', 'PAS', 'IHC']] ,
    ['TMCs', ['TMC-Vanderbilt', 'TMC-UCSD', 'TMC-Stanford', 'TMC-Florida', 'TMC-CalTech']]
  ]);
}

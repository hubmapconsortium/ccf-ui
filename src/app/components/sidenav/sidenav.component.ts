import { Component } from '@angular/core';

@Component({
  selector: 'ccf-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  searchFilterMap = {
    'Technologies': ['IMS', 'MxIF', 'AF'] ,
    'TMCs': ['TMC-Vanderbilt', 'TMC-UCSD', 'TMC-Stanford', 'TMC-Florida', 'TMC-CalTech']
  };

  searchFilterCategories = Object.keys(this.searchFilterMap);
}

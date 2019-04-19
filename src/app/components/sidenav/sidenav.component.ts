import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ccf-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
}

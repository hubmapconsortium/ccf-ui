import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'ccf-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() toggleExpandOutput = new EventEmitter<boolean>();
  expanded = true;
  constructor() { }

  ngOnInit() {
  }

  toggleExpand() {
    this.expanded = !this.expanded;
    this.toggleExpandOutput.emit(this.expanded);
  }
}

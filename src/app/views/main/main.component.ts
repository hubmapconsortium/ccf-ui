import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sidenavExpanded = true;
  constructor() { }

  ngOnInit() {
  }

  toggleExpand($event: boolean) {
    this.sidenavExpanded = $event;
  }
}

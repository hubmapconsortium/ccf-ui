import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ccf-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent {

  @Output() drawerToggle = new EventEmitter<boolean>();
  sidenavExpanded = true;

  emitToggleEvent() {
    this.sidenavExpanded = !this.sidenavExpanded;
    this.drawerToggle.emit(this.sidenavExpanded);
  }
}

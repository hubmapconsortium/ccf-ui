import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ccf-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent {

  @Output() drawerToggle = new EventEmitter<boolean>();
  constructor() { }

  emitToggleEvent() {
    this.drawerToggle.emit(true);
  }

}

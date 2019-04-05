import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ccf-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent {

  @Output() drawerToggle: Observable<boolean>;
  private readonly _drawerToggleEventEmitter = new EventEmitter<boolean>();
  sidenavExpanded = true;

  constructor() {
    this.drawerToggle = this._drawerToggleEventEmitter.asObservable();
  }

  emitToggleEvent() {
    this.sidenavExpanded = !this.sidenavExpanded;
    this._drawerToggleEventEmitter.next(this.sidenavExpanded);
  }
}

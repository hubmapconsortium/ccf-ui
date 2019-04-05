import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ccf-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent {

  /**
   * Output sends an drawer toggle event as an observable to main.component.ts
   */
  @Output() drawerToggle: Observable<boolean>;

  private readonly _drawerToggleEventEmitter = new EventEmitter<boolean>();
  sidenavExpanded = true;

  constructor() {
    this.drawerToggle = this._drawerToggleEventEmitter.asObservable();
  }


  /**
   * Emits toggle event
   * clicking on this will change the event emitter of the observable and also sidenavExpanded state
   */
  emitToggleEvent() {
    this.sidenavExpanded = !this.sidenavExpanded;
    this._drawerToggleEventEmitter.next(this.sidenavExpanded);
  }
}

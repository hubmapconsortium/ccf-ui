import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Component that allows the user to change the viewing angle and rendering mode of the stage.
 */
@Component({
  selector: 'ccf-stage-nav',
  templateUrl: './stage-nav.component.html',
  styleUrls: ['./stage-nav.component.scss']
})
export class StageNavComponent {
  /**
   * Input that allows changing the current side from outside the component
   */
  @Input() currentSide = 'anterior';

  /**
   * Input that allows toggling of 3D view on / off from outside the component
   */
  @Input() currentView3D = false;

  /**
   * Output that emits whenever the current side selection changes
   */
  @Output() currentSideChanged = new EventEmitter<string>();

  /**
   * Output that emits whenever the 3D view is toggled on / off
   */
  @Output() currentView3DChanged = new EventEmitter<boolean>();

  /**
   * Handles the updating of the side selection and calling the event emitter
   * @param selection the new selected side
   */
  updateSide(selection: string): void {
    this.currentSide = selection;
    this.currentSideChanged.emit(this.currentSide);
  }


  /**
   * Handles updating of the boolean that keeps track of current view
   * and calling the event emitter.
   * @param selection 3D (true) or Register (false)
   */
  updateView(selection: boolean): void {
    this.currentView3D = selection;
    this.currentView3DChanged.emit(this.currentView3D);
  }
}

import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';


/** Valid values for side. */
export type Side = 'left' | 'right' | 'anterior' | 'posterior';

/**
 * Component that allows the user to change the viewing angle and rendering mode of the stage.
 */
@Component({
  selector: 'ccf-stage-nav',
  templateUrl: './stage-nav.component.html',
  styleUrls: ['./stage-nav.component.scss']
})
export class StageNavComponent {

  @HostBinding('class') readonly clsName = 'ccf-stage-nav';

  /**
   * Input that allows changing the current side from outside the component
   */
  @Input() side: Side = 'anterior';

  /**
   * Input that allows toggling of 3D view on / off from outside the component
   */
  @Input() view3D = false;

  /**
   * Output that emits whenever the current side selection changes
   */
  @Output() sideChanged = new EventEmitter<Side>();

  /**
   * Output that emits whenever the 3D view is toggled on / off
   */
  @Output() view3DChanged = new EventEmitter<boolean>();

  /**
   * Handles the updating of the side selection and calling the event emitter
   * @param selection the new selected side
   */
  updateSide(selection: Side): void {
    this.side = selection;
    this.sideChanged.emit(this.side);
  }


  /**
   * Handles updating of the boolean that keeps track of current view
   * and calling the event emitter.
   * @param selection 3D (true) or Register (false)
   */
  updateView(selection: boolean): void {
    this.view3D = selection;
    this.view3DChanged.emit(this.view3D);
  }
}

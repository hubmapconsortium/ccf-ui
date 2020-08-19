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

  /**
   * HTML class name
   */
  @HostBinding('class') readonly clsName = 'ccf-stage-nav';

  /**
   * Input that allows changing the current side from outside the component
   */
  @Input() side: Side = 'anterior';

  /**
   * Output that emits whenever the current side selection changes
   */
  @Output() sideChanged = new EventEmitter<Side>();

  /**
   * Handles the updating of the side selection and calling the event emitter
   * @param selection the new selected side
   */
  updateSide(selection: Side): void {
    this.side = selection;
    this.sideChanged.emit(this.side);
  }
}

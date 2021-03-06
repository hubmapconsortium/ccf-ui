import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

/**
 * Component for easily adding a visibility toggle with customizable label and
 * pre set up emitter.
 */
@Component({
  selector: 'ccf-visibility-toggle',
  templateUrl: './visibility-toggle.component.html',
  styleUrls: ['./visibility-toggle.component.scss']
})
export class VisibilityToggleComponent {
  /**
   * HTML class name
   */
  @HostBinding('class') readonly clsName = 'ccf-visibility-toggle';

  /**
   * Keeps track of the current visibility state of the toggle.
   */
  @Input() visible = false;

  /**
   * Input that allows the label to be set from outside the component,
   * making it more reusable.
   */
  @Input() toggleLabel = '';

  /**
   * Whether or not the slider is disabled
   */
  @Input() disabled = false;

  /**
   * Outputs the new visibility state whenever toggleVisibility()
   * changes it.
   */
  @Output() visibilityChanged = new EventEmitter<boolean>();

  /**
   * Toggles visibility and emits the new value.
   */
  toggleVisibility(): void {
    this.visible = !this.visible;

    this.visibilityChanged.emit(this.visible);
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/**
 * Component for easily adding a visibility toggle with customizable label and
 * pre set up emitter.
 */
@Component({
  selector: 'ccf-visibility-toggle',
  templateUrl: './visibility-toggle.component.html',
  styleUrls: ['./visibility-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Output() readonly visibilityChanged = new EventEmitter<boolean>();

  /**
   * Creates an instance of visibility toggle component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Toggles visibility and emits the new value.
   */
  toggleVisibility(): void {
    this.visible = !this.visible;

    this.ga.event('visibility_toggled', 'visibility_toggle', '' + this.visible);
    this.visibilityChanged.emit(this.visible);
  }
}

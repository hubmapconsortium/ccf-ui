import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';


/**
 * Generic toggle slider component
 */
@Component({
  selector: 'ccf-labeled-slide-toggle',
  templateUrl: './labeled-slide-toggle.component.html',
  styleUrls: ['./labeled-slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LabeledSlideToggleComponent {
  /**
   * HTML class name
   */
  @HostBinding('class') readonly clsName = 'ccf-labeled-slide-toggle';

  /**
   * The two selection options to be toggled
   */
  @Input() labels: [string, string] = ['Left', 'Right'];

  /**
   * Input value for toggle slider
   */
  @Input() value = 'Left';

  /**
   * Whether or not the slider is disabled
   */
  @Input() disabled = false;

  /**
   * Emits the datatype with the currently selected option
   */
  @Output() readonly valueChange = new EventEmitter<string>();

  /**
   * Creates an instance of labeled slide toggle component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Determines if left toggle option is selected
   */
  get left(): boolean {
    const { value, labels } = this;
    return value !== labels[1];
  }

  /**
   * Updates and emits the currently selected option
   *
   * @param selection The current toggle state (true=left, false=right)
   */
  updateToggle(selection: boolean): void {
    this.value = selection ? this.labels[0] : this.labels[1];
    this.ga.event('slide_toggle_toggled', 'slide_toggle', this.value);
    this.valueChange.emit(this.value);
  }
}

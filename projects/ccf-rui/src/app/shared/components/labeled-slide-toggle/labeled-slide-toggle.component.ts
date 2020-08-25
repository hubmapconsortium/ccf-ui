import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';


/**
 * Generic toggle slider component
 */
@Component({
  selector: 'ccf-labeled-slide-toggle',
  templateUrl: './labeled-slide-toggle.component.html',
  styleUrls: ['./labeled-slide-toggle.component.scss']
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
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Determines if left toggle option is selected
   */
  get left(): boolean {
    const { value, labels } = this;
    return value !== labels[1];
  }

  /**
   * Updates and emits the currently selected option
   * @param selection The current toggle state (true=left, false=right)
   */
  updateToggle(selection: boolean): void {
    this.value = selection ? this.labels[0] : this.labels[1];
    this.valueChange.emit(this.value);
  }
}

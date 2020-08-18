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
   * Input value for toggle slider
   */
  // tslint:disable: no-unsafe-any
  @Input() set value(label: string) {
    this.left = !this.labels || label !== this.labels[1];
  }
  get value(): string { return this._value; }
  private _value: string;

  /**
   * Whether or not the slider is disabled
   */
  @Input() disabled = false;

  /**
   * The two selection options to be toggled
   */
  @Input() labels: [string, string];

  /**
   * Determines if left toggle option is selected
   */
  left = true;

  /**
   * Emits the datatype with the currently selected option
   */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Updates and emits the currently selected option
   * @param selection The current toggle state (true=left, false=right)
   */
  updateToggle(selection: boolean): void {
    this.left = selection;
    this.valueChange.emit(selection ? this.labels[0] : this.labels[1]);
  }
}

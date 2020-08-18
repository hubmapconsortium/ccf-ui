import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generic toggle slider component
 */
@Component({
  selector: 'ccf-labeled-side-toggle',
  templateUrl: './labeled-side-toggle.component.html',
  styleUrls: ['./labeled-side-toggle.component.scss']
})

export class LabeledSideToggleComponent {

  /**
   * Whether or not the slider is disabled
   */
  @Input() slideDisabled = false;

  /**
   * The category of data selected
   */
  @Input() dataType: string;

  /**
   * The two selection options to be toggled
   */
  @Input() labels: string[];

  /**
   * Determines if left toggle option is selected
   */
  left = true;

  /**
   * Emits the datatype with the currently selected option
   */
  @Output() toggleChanged = new EventEmitter<{}>();

  /**
   * Updates and emits the currently selected option
   * @param selection The current toggle state (true=left, false=right)
   */
  updateToggle(selection: boolean): void {
    this.left = selection;
    this.toggleChanged.emit({
      dataType: this.dataType,
      value: selection ? this.labels[0] : this.labels[1]
    });
  }
}

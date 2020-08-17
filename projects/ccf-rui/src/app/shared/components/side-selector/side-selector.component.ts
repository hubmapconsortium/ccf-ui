import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Slider for side selection (if applicable)
 */
@Component({
  selector: 'ccf-side-selector',
  templateUrl: './side-selector.component.html',
  styleUrls: ['./side-selector.component.scss']
})
export class SideSelectorComponent {

  /**
   * Disables the silder if not applicable to currently selected organ
   */
  @Input() disabled = false;

  /**
   * Input to determine if 'L' is selected
   */
  @Input() left = false;

  /**
   * Emits the currently selected side
   */
  @Output() sideChanged = new EventEmitter<string>();

  /**
   * Updates and emits the currently selected side
   * @param selection The current toggle state
   */
  updateSide(selection: boolean): void {
    this.left = selection;
    this.sideChanged.emit(this.left ? 'left' : 'right');
  }
}

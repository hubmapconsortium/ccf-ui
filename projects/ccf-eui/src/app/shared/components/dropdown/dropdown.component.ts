import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component for a dropdown menu.
 */
@Component({
  selector: 'ccf-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  /**
   * What the component is selecting for.
   */
  @Input() label: string;

  /**
   * Choices displayed in the dropdown menu.
   */
  @Input() options: string[];

  /**
   * Current option selected.
   */
  @Input() selection: string;

  /**
   * Emits the new selected option when selection is changed.
   */
  @Output() readonly selectionChange = new EventEmitter<string>();

  /**
   * Determines if menu contents are visible (used for fade-in effect).
   */
  optionsVisible = 'invisible';

  /**
   * Controls fade-in effect after dropdown menu opens
   */
  toggleOptions(): void {
    this.optionsVisible = this.optionsVisible === 'visible' ? 'invisible' : 'visible';
  }

  /**
   * Updates the selected value.
   * @param value The value that has been selected
   */
  selectionChanged(value: string): void {
    this.selection = value;
    this.selectionChange.emit(value);
  }
}

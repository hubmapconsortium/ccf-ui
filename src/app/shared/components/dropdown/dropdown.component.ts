import { Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Component for a dropdown menu.
 */
@Component({
  selector: 'ccf-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() label: string;
  @Input() options: string[];
  @Input() selection: string;
  @Output() readonly selectionChange = new EventEmitter<string>();

  optionsVisible = 'options invisible';

  /**
   * Controls fade-in effect after dropdown menu opens
   */
  toggleOptions() {
    if (this.optionsVisible === 'options visible') {
      this.optionsVisible = 'options invisible';
    } else {
      setTimeout(() => {
        this.optionsVisible = 'options visible';
      }, 275);
    }
  }

  /**
   * Updates the selected value.
   * @param value The value that has been selected
   */
  selectionChanged(value: string) {
    this.selection = value;
    this.selectionChange.emit(value);
  }
}

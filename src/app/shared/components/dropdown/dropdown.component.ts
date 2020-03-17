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
    const visible = 'options visible';
    const invisible = 'options invisible';

    this.optionsVisible = this.optionsVisible === visible ? invisible : visible;
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

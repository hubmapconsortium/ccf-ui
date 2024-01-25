import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/**
 * Component for a dropdown menu.
 */
@Component({
  selector: 'ccf-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
   * Creates an instance of dropdown component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Controls fade-in effect after dropdown menu opens
   */
  toggleOptions(): void {
    this.optionsVisible = this.optionsVisible === 'visible' ? 'invisible' : 'visible';
  }

  /**
   * Updates the selected value.
   *
   * @param value The value that has been selected
   */
  selectionChanged(value: string): void {
    this.selection = value;
    this.ga.event('selection_change', 'dropdown', `${this.label}:${value}`);
    this.selectionChange.emit(value);
  }
}

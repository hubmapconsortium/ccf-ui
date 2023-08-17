import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/**
 * Creates a labeled group of checkboxes and emits a current list of selections whenever a selection changes.
 */
@Component({
  selector: 'ccf-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  /**
   * The label that describes the overall question the checkbox is asking
   */
  @Input() label: string;

  /**
   * Used to generate the individual checkboxes and their individual labels
   */
  @Input() options: string[];

  /**
   * A list of the checkboxes the user has checked. To be updated any time a checkbox changes.
   */
  @Input() selection: string[] = [];

  /**
   * Number of columns
   */
  @Input() columns = 3;

  /**
   * Any time a checkbox changes we emit that value so the parent component has that information
   */
  @Output() readonly selectionChange = new EventEmitter<string[]>();

  /**
   * Creates an instance of checkbox component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * This method captures checkbox events and decides whether to add or remove a filter selection based on the checked property
   *
   * @param event Event object from the checkbox that contains the boolean property 'checked'
   * @param option Tells us which option was checked or unchecked
   */
  filterOnChange(event: MatCheckboxChange, option: string): void {
    const checked = event.checked;

    if (checked) {
      this.selection = [...this.selection, option];
      this.ga.event('filter_added', 'filter_checkbox', option);
    } else {
      this.selection = this.selection.filter(selection => selection !== option);
      this.ga.event('filter_removed', 'filter_checkbox', option);
    }

    this.selectionChange.emit(this.selection);
  }
}

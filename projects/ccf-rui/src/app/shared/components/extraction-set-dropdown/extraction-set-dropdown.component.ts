import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { ExtractionSet } from '../../../core/models/extraction-set';

/**
 * Dropdown for selecting the extraction set
 */
@Component({
  selector: 'ccf-extraction-set-dropdown',
  templateUrl: './extraction-set-dropdown.component.html',
  styleUrls: ['./extraction-set-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtractionSetDropdownComponent {

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-extraction-set-dropdown';

  /**
   * Emits the current extraction set when selected
   */
  @Output() readonly setChange = new EventEmitter<ExtractionSet>();

  /**
   * Extraction sets to be displayed as options
   */
  @Input() sets: ExtractionSet[];

  /**
   * The currently selected extraction set
   */
  selected: ExtractionSet;

  /**
   * Creates an instance of extraction set dropdown component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Sets the selected extraction set and emits the extraction set
   *
   * @param value The extraction set selected
   */
  extractionSetChanged(value: ExtractionSet): void {
    this.selected = value;
    this.ga.event('selected_extraction_set_change', 'extraction_set_dropdown', value.name);
    this.setChange.emit(value);
  }

  /**
   * Determines whether there is more than one extraction set
   *
   * @returns true if there is more than one extraction set
   */
  isMultiple(): boolean {
    return this.sets.length > 1;
  }
}

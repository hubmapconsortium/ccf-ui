import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TissueBlockResult } from 'ccf-database';
import { GoogleAnalyticsService } from 'ngx-google-analytics';


/**
 * Donor card component which displays data from a patient
 */
@Component({
  selector: 'ccf-donor-card',
  templateUrl: './donor-card.component.html',
  styleUrls: ['./donor-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonorCardComponent {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-donor-card';

  /** Tissue Block to generate the donor card from */
  @Input() tissueBlock!: TissueBlockResult;

  /** Allows the selected state to be set from outside the component */
  @Input() selected = false;

  /** Allows color of the checkbox background to be set from outside the component */
  @Input() color!: string;

  /** Allows the expanded state of the card to be set from outside the component */
  @Input() expanded = false;

  @Input() highlighted = false;

  /** Emits the new checked state whenever it changes */
  @Output() readonly checked = new EventEmitter<boolean>();

  /** Emit the url of any link when clicked. */
  @Output() readonly linkClick = new EventEmitter<string>();

  /** To keep track of which element, if any, are hovered over. */
  hoverState = '';

  /**
   * Creates an instance of donor card component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Handles the logic that needs to run when the checkbox is clicked on.
   */
  handleCheckbox(): void {
    this.selected = !this.selected;
    this.ga.event('selected_toggled', 'donor_card', this.tissueBlock.label, +this.selected);
    this.checked.emit(this.selected);
    this.expanded = false;
  }

  /**
   * Ensures that the expanded variable is only changed if selected first.
   */
  toggleExpansion(): void {
    if (this.selected) {
      this.expanded = !this.expanded;
      this.ga.event('expanded_toggled', 'donor_card', this.tissueBlock.label, +this.expanded);
    }
  }

  /**
   * Handles what happens when an info card is clicked.
   * Passes up the link click event unless the card isn't selected
   * In which case it selects it for ease of use.
   *
   * @param url the URL to emit up.
   */
  linkHandler(url: string): void {
    this.ga.event('link_clicked', 'donor_card', this.tissueBlock.label);
    if (this.selected) {
      this.linkClick.emit(url);
    } else {
      this.selected = true;
      this.checked.emit(this.selected);
    }
  }
}

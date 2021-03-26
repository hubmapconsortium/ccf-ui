import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TissueBlockResult } from 'ccf-database';




@Component({
  selector: 'ccf-donor-card',
  templateUrl: './donor-card.component.html',
  styleUrls: ['./donor-card.component.scss']
})
export class DonorCardComponent {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-donor-card';

  /** Tissue Block to generate the donor card from */
  @Input() donor!: TissueBlockResult;

  /** Allows the selected state to be set from outside the component */
  @Input() selected = false;

  /** Allows color of the checkbox background to be set from outside the component */
  @Input() color!: string;

  /** Allows the expanded state of the card to be set from outside the component */
  @Input() expanded = false;

  /** Emits the new checked state whenever it changes */
  @Output() checked = new EventEmitter<boolean>();

  /** Emit the url of any link when clicked. */
  @Output() linkClick = new EventEmitter<string>();

  /** To keep track of which element, if any, are hovered over. */
  hoverState = '';

  /**
   * Handles the logic that needs to run when the checkbox is clicked on.
   */
  handleCheckbox(): void {
    this.selected = !this.selected;
    this.checked.emit(this.selected);
    this.expanded = false;
  }

  /**
   * Ensures that the expanded variable is only changed if selected first.
   * */
  toggleExpansion(): void {
    if(this.selected) {
      this.expanded = !this.expanded;
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
    if (this.selected) {
      this.linkClick.emit(url);
    } else {
      this.selected = true;
      this.checked.emit(this.selected);
    }
  }
}

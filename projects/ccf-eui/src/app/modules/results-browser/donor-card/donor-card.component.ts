import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { DonorCard } from '../../../core/models/donor';


@Component({
  selector: 'ccf-donor-card',
  templateUrl: './donor-card.component.html',
  styleUrls: ['./donor-card.component.scss']
})
export class DonorCardComponent {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-donor-card';

  @Input() donor: DonorCard;
  @Output() checked = new EventEmitter<boolean>();

  handleCheckbox(): void {
    this.donor.selected = !this.donor.selected;
    this.checked.emit(this.donor.selected);
  }

  applyStyles(): unknown {
    if (!this.donor.selected) {
      return { 'background-color: ': 'white' };
    }

    return { 'background-color': this.donor.color };
  }
}

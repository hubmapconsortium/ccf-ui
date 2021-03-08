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

  handleCheckbox(event): void {
    const { checked } = event;
    this.donor.selected = checked;
    this.checked.emit(checked);
  }
}

import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TissueBlockResult } from '../../../core/models/tissue-block-result';



@Component({
  selector: 'ccf-donor-card',
  templateUrl: './donor-card.component.html',
  styleUrls: ['./donor-card.component.scss']
})
export class DonorCardComponent {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-donor-card';

  @Input() donor!: TissueBlockResult;
  @Input() selected = false;
  @Input() color!: string;
  @Input() expanded = false;
  @Output() checked = new EventEmitter<boolean>();

  handleCheckbox(): void {
    this.selected = !this.selected;
    this.checked.emit(this.selected);
    this.expanded = false;
  }

  toggleExpansion(): void {
    if(this.selected) {
      this.expanded = !this.expanded;
    }
  }
}

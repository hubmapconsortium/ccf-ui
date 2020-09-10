import { Component, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'ccf-extraction-set-dropdown',
  templateUrl: './extraction-set-dropdown.component.html',
  styleUrls: ['./extraction-set-dropdown.component.scss']
})
export class ExtractionSetDropdownComponent {

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-extraction-set-dropdown';

  constructor() { }


}

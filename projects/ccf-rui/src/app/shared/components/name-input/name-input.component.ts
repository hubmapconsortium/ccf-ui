import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ccf-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.scss']
})
export class NameInputComponent {

  @HostBinding('class') readonly clsName = 'ccf-name-input';
}

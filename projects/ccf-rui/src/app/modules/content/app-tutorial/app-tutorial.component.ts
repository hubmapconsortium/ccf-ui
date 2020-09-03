import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ccf-app-tutorial',
  templateUrl: './app-tutorial.component.html',
  styleUrls: ['./app-tutorial.component.scss']
})
export class AppTutorialComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-app-tutorial';
}

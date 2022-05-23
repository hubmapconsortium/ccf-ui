import { ChangeDetectionStrategy, Component, ViewEncapsulation, HostBinding, Input } from '@angular/core';
import {FormControl} from '@angular/forms';


export type Sex = 'male' | 'female'

@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchConfigComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-config';

  @Input() organs: string[] = [
    'Blood Vasculature',
    'Brain',
    'Eye, Left',
    'Eye, Right',
    'Fallopian Tube, Left',
    'Fallopian Tube, Right',
    'Heart'
  ];

  sex: Sex = 'male'

  panelColor = new FormControl('red');

  constructor() { }

  updateSex(value: Sex) {
    this.sex = value;
  }
}

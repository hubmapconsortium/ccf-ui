import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

export type Sex = 'male' | 'female'

@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchConfigComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-config';

  sex: Sex = 'male'

  constructor() { }

  updateSex(value) {
    this.sex = value;
  }
}

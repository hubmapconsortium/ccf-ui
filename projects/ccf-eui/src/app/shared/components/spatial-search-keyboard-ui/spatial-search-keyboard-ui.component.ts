import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';


@Component({
  selector: 'ccf-spatial-search-keyboard-ui',
  templateUrl: './spatial-search-keyboard-ui.component.html',
  styleUrls: ['./spatial-search-keyboard-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchKeyboardUIComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-keyboard-ui';

  @Input() currentKey?: string;
}

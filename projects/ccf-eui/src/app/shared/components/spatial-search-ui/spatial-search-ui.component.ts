import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { SpatialSearchPosition } from '../spatial-search-keyboard-ui-behavior/spatial-search-keyboard-ui-behavior.component';

@Component({
  selector: 'ccf-spatial-search-ui',
  templateUrl: './spatial-search-ui.component.html',
  styleUrls: ['./spatial-search-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchUiComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-ui';

  position: SpatialSearchPosition;

  move(newPos: SpatialSearchPosition): void {
    this.position = newPos;
    console.log(this.position);
  }
}

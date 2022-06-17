import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output } from '@angular/core';

/**
 * Button that opens up the Spatial Search config
 */
@Component({
  selector: 'ccf-run-spatial-search',
  templateUrl: './run-spatial-search.component.html',
  styleUrls: ['./run-spatial-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunSpatialSearchComponent {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-run-spatial-search';

  /**
   * Emits when the button is clicked
   */
  @Output() readonly buttonClick = new EventEmitter();
}

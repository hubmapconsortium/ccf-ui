import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

/**
 * Component displaying a x, y, and z position
 */
@Component({
  selector: 'ccf-xyz-position',
  templateUrl: './xyz-position.component.html',
  styleUrls: ['./xyz-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XYZPositionComponent {
  /** Html class name */
  @HostBinding('class') readonly clsName = 'ccf-xyz-position';

  /** X position */
  @Input() x = 0;

  /** Y position */
  @Input() y = 0;

  /** Z position */
  @Input() z = 0;

  /** Number format for position values */
  readonly format = '1.0-2';
}

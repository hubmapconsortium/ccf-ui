import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { OrganInfo } from 'ccf-shared';

/** Sex can either be male or female */
export type Sex = 'male' | 'female';

/**
 * Config popup for spatial search
 */
@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchConfigComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-config';

  /** Selectable organs */
  @Input() organs!: OrganInfo[];

  /** Currently selected organ */
  @Input() selectedOrgan?: OrganInfo;

  /** Currently selected sex */
  @Input() sex!: Sex;

  /** Emits when sex is updated */
  @Output() readonly updateSex = new EventEmitter<Sex>();

  /** Emits when organ is updated */
  @Output() readonly updateOrgan = new EventEmitter<OrganInfo>();

  /** Emits when the continue button is clicked */
  @Output() readonly buttonClicked = new EventEmitter();

  /** Emits when the close button is clicked */
  @Output() readonly closeDialog = new EventEmitter();

  /** Emits when the info button is clicked */
  @Output() readonly infoClicked = new EventEmitter();
}

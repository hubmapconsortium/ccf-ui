import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { SpatialSceneNode } from 'ccf-body-ui';
import { TissueBlockResult } from 'ccf-database';
import { OrganInfo } from 'ccf-shared';

import { Position, RadiusSettings, TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';

/**
 * Main Spatial Search UI component
 */
@Component({
  selector: 'ccf-spatial-search-ui',
  templateUrl: './spatial-search-ui.component.html',
  styleUrls: ['./spatial-search-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpatialSearchUiComponent {
  /** HTML Class */
  @HostBinding('class') readonly className = 'ccf-spatial-search-ui';

  /** Nodes in the scene */
  @Input() readonly scene: SpatialSceneNode[];

  /** Bounds of the scene */
  @Input() readonly sceneBounds: Position;

  /** Scene target */
  @Input() readonly sceneTarget: [number, number, number];

  /** Current selected sex */
  @Input() readonly sex: string;

  /** Current selected organ */
  @Input() readonly referenceOrgan: OrganInfo;

  /** Current sphere radius setting */
  @Input() readonly radius: number;

  /** Maximum, minimum, and default sphere radius values */
  @Input() readonly radiusSettings: RadiusSettings;

  /** Starting position of sphere */
  @Input() readonly defaultPosition: Position;

  /** Current position of sphere */
  @Input() readonly position: Position;

  /** Tissue blocks within the sphere radius */
  @Input() readonly tissueBlocks: TissueBlockResult[];

  /** Anatomical structures within the sphere radius */
  @Input() readonly anatomicalStructures: TermResult[];

  /** Cell types within the sphere radius */
  @Input() readonly cellTypes: TermResult[];

  /** Emits when run spatial search button clicked */
  @Output() readonly addSpatialSearch = new EventEmitter();

  /** Emits when reset probing sphere button clicked */
  @Output() readonly resetPosition = new EventEmitter();

  /** Emits when reset camera button clicked */
  @Output() readonly resetSphere = new EventEmitter();

  /** Emits when close button clicked */
  @Output() readonly closeSpatialSearch = new EventEmitter();

  /** Emits when the radius changes */
  @Output() readonly radiusChange = new EventEmitter<number>();

  /** Emits when the sphere position changes */
  @Output() readonly positionChange = new EventEmitter<Position>();

  /** Emits when the edit organ link is clicked */
  @Output() readonly editReferenceOrganClicked = new EventEmitter();

  /** Emits when info button in header is clicked */
  @Output() readonly infoClicked = new EventEmitter();

  /** Emits when a node in the scene is clicked */
  @Output() readonly nodeClicked = new EventEmitter<SpatialSceneNode>();
}

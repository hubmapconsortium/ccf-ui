import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { SpatialSceneNode } from 'ccf-body-ui';
import { TissueBlockResult } from 'ccf-database';
import { OrganInfo } from 'ccf-shared';
import { Position, RadiusSettings, TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';

@Component({
  selector: 'ccf-spatial-search-ui',
  templateUrl: './spatial-search-ui.component.html',
  styleUrls: ['./spatial-search-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchUiComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-ui';

  @Input() readonly scene: SpatialSceneNode[];

  @Input() readonly sceneBounds: Position;

  @Input() readonly sceneTarget: [ number, number, number ];

  @Input() readonly sex: string;

  @Input() readonly referenceOrgan: OrganInfo;

  @Input() readonly radius: number;

  @Input() readonly radiusSettings: RadiusSettings;

  @Input() readonly defaultPosition: Position;

  @Input() readonly position: Position;

  @Input() readonly tissueBlocks: TissueBlockResult[];

  @Input() readonly anatomicalStructures: TermResult[];

  @Input() readonly cellTypes: TermResult[];

  @Output() readonly addSpatialSearch = new EventEmitter();

  @Output() readonly resetPosition = new EventEmitter();

  @Output() readonly resetSphere = new EventEmitter();

  @Output() readonly closeSpatialSearch = new EventEmitter();

  @Output() readonly radiusChange = new EventEmitter<number>();

  @Output() readonly positionChange = new EventEmitter<Position>();

  @Output() readonly editReferenceOrganClicked = new EventEmitter();

  @Output() readonly infoClicked = new EventEmitter();

  @Output() readonly nodeClicked = new EventEmitter<SpatialSceneNode>();
}

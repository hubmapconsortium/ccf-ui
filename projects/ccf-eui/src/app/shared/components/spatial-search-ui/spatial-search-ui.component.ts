import { ChangeDetectionStrategy, Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

export interface CameraSetting {
  x: number;
  y: number;
  z: number;
}


@Component({
  selector: 'ccf-spatial-search-ui',
  templateUrl: './spatial-search-ui.component.html',
  styleUrls: ['./spatial-search-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchUiComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-ui';

  @Input() readonly sex: string;

  @Input() readonly referenceOrgan: string;

  @Input() readonly radius: number;

  @Input() readonly sliderSettings: number[] = [0, 0];

  @Input() readonly defaultCamera: CameraSetting;

  @Input() readonly currentCamera: CameraSetting;

  @Output() readonly addSpatialSearch = new EventEmitter();

  @Output() readonly resetCamera = new EventEmitter();

  @Output() readonly resetSphere = new EventEmitter();

  @Output() readonly closeSpatialSearch = new EventEmitter();

  @Output() readonly radiusChange = new EventEmitter<number>();

  @Output() readonly cameraChange = new EventEmitter<CameraSetting>();

  @Output() readonly editReferenceOrganClicked = new EventEmitter();

  @Output() readonly infoClicked = new EventEmitter();
}

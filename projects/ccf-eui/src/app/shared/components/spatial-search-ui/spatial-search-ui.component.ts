import { ChangeDetectionStrategy, Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

export interface SpatialSearchCoordinates {
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

  @Input() readonly defaultCoordinates: SpatialSearchCoordinates;

  @Input() readonly currentCoordinates: SpatialSearchCoordinates;

  @Output() readonly addSpatialSearch = new EventEmitter();

  @Output() readonly resetCoordinates = new EventEmitter();

  @Output() readonly resetSphere = new EventEmitter();

  @Output() readonly closeSpatialSearch = new EventEmitter();

  @Output() readonly radiusChange = new EventEmitter<number>();

  @Output() readonly coordinatesChange = new EventEmitter<SpatialSearchCoordinates>();

  @Output() readonly editReferenceOrganClicked = new EventEmitter();

  @Output() readonly infoClicked = new EventEmitter();
}

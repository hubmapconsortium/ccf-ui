import { ChangeDetectionStrategy, Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { SpatialSearch } from 'ccf-database';
import { Sex } from '../spatial-search-config/spatial-search-config.component';


@Component({
  selector: 'ccf-spatial-search-ui',
  templateUrl: './spatial-search-ui.component.html',
  styleUrls: ['./spatial-search-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchUiComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-ui';

  @Input() readonly sex: Sex;

  @Input() readonly organ: string;

  @Input() readonly spatialSearch: SpatialSearch;

  @Input() readonly radius: number;

  @Output() readonly runSearchClicked = new EventEmitter<SpatialSearch>();

  @Output() readonly resetCamera = new EventEmitter();

  @Output() readonly resetSphere = new EventEmitter();

  @Output() readonly editReferenceOrganClicked = new EventEmitter();

  @Output() readonly closeSpatialSearch = new EventEmitter();

  @Output() readonly radiusChange = new EventEmitter<number>();
}

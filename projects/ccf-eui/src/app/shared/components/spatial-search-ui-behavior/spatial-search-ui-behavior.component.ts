import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpatialSearch } from 'ccf-database';
import { OrganInfo } from 'ccf-shared';
import { Sex } from '../spatial-search-config/spatial-search-config.component';
import { SpatialSearchUiComponent } from '../spatial-search-ui/spatial-search-ui.component';

export interface SearchConfigData {
  sex: Sex;
  organ: OrganInfo;
  radius: number;
}


@Component({
  selector: 'ccf-spatial-search-ui-behavior',
  templateUrl: './spatial-search-ui-behavior.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchUiBehaviorComponent {

  @Input() sex: Sex;

  @Input() organ: string;

  @Input() spatialSearch: SpatialSearch;

  @Input() radius: number;

  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchUiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchConfigData
  ) {
    this.sex = data.sex;
    this.organ = data.organ.organ;
    this.radius = data.radius;
  }

  close(): void {
    this.dialogRef.close();
  }

  radiusChanged(value: number): void {
    this.radius = value;
  }
}

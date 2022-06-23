import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpatialSearch } from 'ccf-database';
import { OrganInfo } from 'ccf-shared';
import { Sex } from '../spatial-search-config/spatial-search-config.component';
import { SpatialSearchUiComponent } from '../spatial-search-ui/spatial-search-ui.component';


export interface SearchConfigData {
  sex: Sex;
  organ: OrganInfo;
  spatialSearch: SpatialSearch;
}

export interface CameraSetting {
  x: number;
  y: number;
  z: number;
}

@Component({
  selector: 'ccf-spatial-search-ui-behavior',
  templateUrl: './spatial-search-ui-behavior.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchUiBehaviorComponent {

  sex: string;

  organ: string;

  spatialSearch: SpatialSearch;

  defaultCamera: CameraSetting;

  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchUiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchConfigData
  ) {
    this.sex = data.sex === 'male' ? 'Male' : 'Female';
    this.organ = data.organ.name;
    this.spatialSearch = data.spatialSearch;
    this.defaultCamera = {
      x: this.spatialSearch.x,
      y: this.spatialSearch.y,
      z: this.spatialSearch.z
    };
  }

  close(): void {
    this.dialogRef.close();
  }

  addSpatialSearch(): void {
    //add to spatial search list
    console.log(this.spatialSearch);
  }

  spatialSearchChanged(value: number, key: string): void {
    this.spatialSearch = { ...this.spatialSearch, [key]: value };
  }

  openSpatialSearchConfig(): void {
    console.log('open config');
  }

  changeCamera(setting: CameraSetting): void {
    this.spatialSearch = { ...this.spatialSearch, x: setting.x, y: setting.y, z: setting.z };
  }

  resetCamera(): void {
    this.changeCamera(this.defaultCamera);
  }
}

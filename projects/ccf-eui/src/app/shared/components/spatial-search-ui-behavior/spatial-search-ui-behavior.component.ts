import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpatialSearch } from 'ccf-database';
import { OrganInfo } from 'ccf-shared';
import { SpatialSearchConfigBehaviorComponent } from '../spatial-search-config-behavior/spatial-search-config-behavior.component';
import { Sex } from '../spatial-search-config/spatial-search-config.component';
import { CameraSetting, SpatialSearchUiComponent } from '../spatial-search-ui/spatial-search-ui.component';


export interface SearchConfigData {
  sex: Sex;
  organ: OrganInfo;
  spatialSearch: SpatialSearch;
  sliderSettings: number[];
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

  sliderSettings: number[];

  defaultCamera: CameraSetting;

  currentCamera: CameraSetting;

  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchUiComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: SearchConfigData
  ) {
    this.sex = data.sex === 'male' ? 'Male' : 'Female';
    this.organ = data.organ.name;
    this.spatialSearch = data.spatialSearch;
    this.sliderSettings = data.sliderSettings;
    this.defaultCamera = {
      x: this.spatialSearch.x,
      y: this.spatialSearch.y,
      z: this.spatialSearch.z
    };
    this.currentCamera = this.defaultCamera;
  }

  close(): void {
    this.dialogRef.close();
  }

  addSpatialSearch(): void {
    //add to spatial search list
    this.close();
  }

  spatialSearchChanged(value: number, key: string): void {
    this.spatialSearch = { ...this.spatialSearch, [key]: value };
  }

  openSpatialSearchConfig(): void {
    this.close();
    this.dialog.open(SpatialSearchConfigBehaviorComponent);
  }

  changeCamera(setting: CameraSetting): void {
    this.spatialSearch = { ...this.spatialSearch, x: setting.x, y: setting.y, z: setting.z };
    this.currentCamera = setting;
  }

  resetCamera(): void {
    this.changeCamera(this.defaultCamera);
  }
}

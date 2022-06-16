import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SpatialSearchUiComponent } from '../spatial-search-ui/spatial-search-ui.component';



@Component({
  selector: 'ccf-spatial-search-ui-behavior',
  templateUrl: './spatial-search-ui-behavior.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchUiBehaviorComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchUiComponent>,
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}

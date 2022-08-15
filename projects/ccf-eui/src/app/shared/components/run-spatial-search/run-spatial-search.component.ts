import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs/operators';

import { StartSpatialSearchFlow } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import {
  SpatialSearchConfigBehaviorComponent,
} from '../spatial-search-config-behavior/spatial-search-config-behavior.component';


/**
 * Button that opens up the Spatial Search config
 */
@Component({
  selector: 'ccf-run-spatial-search',
  templateUrl: './run-spatial-search.component.html',
  styleUrls: ['./run-spatial-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunSpatialSearchComponent {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-run-spatial-search';

  constructor(private readonly store: Store, private readonly dialog: MatDialog) { }

  /**
   * Starts spatial search flow
   */
  startSpatialSearchFlow(): void {
    this.store.dispatch(new StartSpatialSearchFlow()).pipe(
      take(1),
      tap(() => this.dialog.open(SpatialSearchConfigBehaviorComponent))
    ).subscribe();
  }
}

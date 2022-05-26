import { MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { SpatialSearchConfigComponent } from './spatial-search-config.component';
import { SpatialSearchConfigModule } from './spatial-search-config.module';

describe('SpatialSearchConfigComponent', () => {
  let shallow: Shallow<SpatialSearchConfigComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchConfigComponent, SpatialSearchConfigModule)
      .mock(MatDialogRef, { close(): void { /* Empty */ } });
  });
});

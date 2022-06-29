import { MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { SpatialSearchConfigBehaviorComponent } from './spatial-search-config-behavior.component';
import { SpatialSearchConfigBehaviorModule } from './spatial-search-config-behavior.module';

function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

describe('SpatialSearchConfigBehaviorComponent', () => {
  let shallow: Shallow<SpatialSearchConfigBehaviorComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchConfigBehaviorComponent, SpatialSearchConfigBehaviorModule)
      .mock(MatDialogRef, { close(): void { /* Empty */ } });
  });

  it('should close the dialog when the close() method is called', async () => {
    const { instance, get } = await shallow.render();
    const ref = get(MatDialogRef);
    instance.close();
    await wait(250);
    expect(ref.close).toHaveBeenCalled();
  });
});

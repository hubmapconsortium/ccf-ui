import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs/internal/observable/of';
import { Shallow } from 'shallow-render';
import { SceneState } from '../../../core/store/scene/scene.state';

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
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()]
    });

    shallow = new Shallow(SpatialSearchConfigBehaviorComponent, SpatialSearchConfigBehaviorModule)
      .mock(MatDialogRef, { close(): void { /* Empty */ } })
      .mock(SceneState, { referenceOrgans$: of([]) });
  });

  it('should close the dialog when the close() method is called', async () => {
    const { instance, get } = await shallow.render();
    const ref = get(MatDialogRef);
    instance.close();
    await wait(250);
    expect(ref.close).toHaveBeenCalled();
  });
});

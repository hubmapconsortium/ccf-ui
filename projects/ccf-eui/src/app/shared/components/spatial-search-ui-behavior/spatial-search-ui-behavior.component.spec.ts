import { TestBed } from '@angular/core/testing';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { NgxsModule } from '@ngxs/store';
import { Shallow } from 'shallow-render';

import { SpatialSearchUiBehaviorComponent } from './spatial-search-ui-behavior.component';
import { SpatialSearchUiBehaviorModule } from './spatial-search-ui-behavior.module';

function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

describe('SpatialSearchUiBehaviorComponent', () => {
  let shallow: Shallow<SpatialSearchUiBehaviorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([], {})]
    });

    shallow = new Shallow(SpatialSearchUiBehaviorComponent, SpatialSearchUiBehaviorModule)
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

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { SpatialSearchUiBehaviorComponent, SearchConfigData } from './spatial-search-ui-behavior.component';
import { SpatialSearchUiBehaviorModule } from './spatial-search-ui-behavior.module';

function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

const configData: SearchConfigData = {
  sex: 'male',
  organ: { name: 'Organ', src: '', organ: 'organ' },
  spatialSearch: { x: 0, y: 0, z: 0, radius: 100, target: '' },
  sliderSettings: [5, 50]
};

describe('SpatialSearchUiBehaviorComponent', () => {
  let shallow: Shallow<SpatialSearchUiBehaviorComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchUiBehaviorComponent, SpatialSearchUiBehaviorModule)
      .mock(MatDialogRef, { close(): void { /* Empty */ } })
      .provide({ provide: MAT_DIALOG_DATA, useValue: configData });
  });

  it('should close the dialog when the close() method is called', async () => {
    const { instance, get } = await shallow.mock(MAT_DIALOG_DATA, configData).render();
    const ref = get(MatDialogRef);
    instance.close();
    await wait(250);
    expect(ref.close).toHaveBeenCalled();
  });
});

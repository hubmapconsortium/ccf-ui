import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { InfoDialogComponent } from './info-dialog.component';
import { InfoDialogModule } from './info-dialog.module';


function wait(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}

describe('InfoDialogComponent', () => {
  let shallow: Shallow<InfoDialogComponent>;

  beforeEach(() => {
    shallow = new Shallow(InfoDialogComponent, InfoDialogModule)
      .provide({ provide: MatDialogRef, useValue: {} })
      .provide({ provide: MAT_DIALOG_DATA, useValue: [ ] });
  });

  it('should close the dialog when the close() method is called', async () => {
    const { instance, get } = await shallow
      .mock(MatDialogRef, { close(): void { } })
      .mock(MAT_DIALOG_DATA, [])
      .render();
    const ref = get(MatDialogRef);
    instance.close();
    await wait(250);

    expect(ref.close).toHaveBeenCalled();
  });
});

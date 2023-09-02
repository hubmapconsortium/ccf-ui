import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { InfoDialogComponent } from './info-dialog.component';
import { InfoDialogModule } from './info-dialog.module';


function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

describe('InfoDialogComponent', () => {
  let shallow: Shallow<InfoDialogComponent>;

  beforeEach(() => {
    shallow = new Shallow(InfoDialogComponent, InfoDialogModule)
      .provide({ provide: MatDialogRef, useValue: {} })
      .provide({ provide: MAT_DIALOG_DATA, useValue: [ ] });
  });

  it('should call the close() method when the close button is pressed', async () => {
    const { find, instance } = await shallow
      .mock(MAT_DIALOG_DATA, [])
      .render();
    const spy = spyOn(instance, 'close');
    const closeButton = find('.close-icon');

    closeButton.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should close the dialog when the close() method is called', async () => {
    const { instance, inject } = await shallow
      .mock(MatDialogRef, { close(): void { /* empty */ } })
      .mock(MAT_DIALOG_DATA, [])
      .render();
    const ref = inject(MatDialogRef);
    instance.close();
    await wait(250);

    expect(ref.close).toHaveBeenCalled();
  });
});

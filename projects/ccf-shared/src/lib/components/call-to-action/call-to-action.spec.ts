import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { CallToActionComponent } from './call-to-action.component';
import { CallToActionModule } from './call-to-action.module';


function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

describe('InfoDialogComponent', () => {
  let shallow: Shallow<CallToActionComponent>;

  beforeEach(() => {
    shallow = new Shallow(CallToActionComponent, CallToActionModule)
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
    const { instance, get } = await shallow
      .mock(MatDialogRef, { close(): void { /* empty */ } })
      .mock(MAT_DIALOG_DATA, [])
      .render();
    const ref = get(MatDialogRef);
    instance.close();
    await wait(250);

    expect(ref.close).toHaveBeenCalled();
  });
});

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { MetaData } from '../../../core/models/meta-data';
import { ReviewModalComponent } from './review-modal.component';
import { ReviewModalModule } from './review-modal.module';


function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

const metaData: MetaData = [
  { label: 'First Name', value: 'Homer' },
  { label: 'Last Name', value: 'Simpson' },
  { label: 'Reference Organ Name', value: 'kidney, left, make, vh' },
  { label: 'Tissue Block Dimensions (mm)', value: '20, 10, 10' },
  { label: 'Tissue Block Position (mm)', value: '10, 74 16' },
  { label: 'Tissue Block Rotation', value: '0, 358.75, 20.07' },
  { label: 'Extraction Site(s)', value: 'Bisection line' },
  { label: 'Anatomical Structure Tags', value: 'Tag 1, Tag 2, Tag 3' },
  { label: 'Time Stamp', value: '7/10/2020 9:53:04 AM' },
  { label: 'Alignment ID', value: '5dae2c44-aad-5-4f7a-aa12-c0551de97b' }
];

describe('ReviewModalComponent', () => {
  let shallow: Shallow<ReviewModalComponent>;

  beforeEach(() => {
    shallow = new Shallow(ReviewModalComponent, ReviewModalModule)
      .provide({ provide: MatDialogRef, useValue: {} })
      .provide({
        provide: MAT_DIALOG_DATA, useValue: {
          registrationCallbackSet: true,
          metaData
        }
      });
  });

  it('should call the close() method when the close button is pressed', async () => {
    const { find, instance } = await shallow.render();

    const spy = spyOn(instance, 'close');
    const closeButton = find('.material-icons.close-icon');

    closeButton.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should close the dialog when the close() method is called', async () => {
    const { instance, inject } = await shallow
      .mock(MatDialogRef, { close(): void { /* Empty */ } })
      .render();
    const ref = inject(MatDialogRef);
    instance.close();
    await wait(250);

    expect(ref.close).toHaveBeenCalled();
  });
});

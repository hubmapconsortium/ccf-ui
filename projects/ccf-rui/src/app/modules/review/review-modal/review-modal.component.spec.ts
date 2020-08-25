import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { ReviewModalComponent } from './review-modal.component';
import { ReviewModalModule } from './review-modal.module';
import { ReviewObject } from '../../../core/models/registration-data';

const reviewObject: ReviewObject = {
  firstName: 'Homer',
  lastName: 'Simpson',
  referenceOrgan: 'kidney, left, make, vh',
  tissueBlockSize: '20, 10, 10',
  tissueBlockPosition: '10, 74, 16',
  tissueBlockRotation: '0, 358.75, 20.07',
  extractionSites: 'Bisection line',
  anatomicalStructureTags: 'Tag 1, Tag 2, Tag 3',
  timestamp: '7/10/2020 9:53:04 AM',
  alignmentID: '5dae2c44-aad-5-4f7a-aa12-c0551de97b'
};

describe('ReviewModalComponent', () => {
  let shallow: Shallow<ReviewModalComponent>;

  beforeEach(() => {
    shallow = new Shallow(ReviewModalComponent, ReviewModalModule)
      .provide({ provide: MatDialogRef, useValue: {} })
      .provide({
        provide: MAT_DIALOG_DATA, useValue: {
          embeddedMode: true,
          reviewObject
        }
      });
  });

  it('should call the close() method when the close button is pressed', async () => {
    const { find, instance } = await shallow.render();
    instance.reviewObject = reviewObject;

    const spy = spyOn(instance, 'close');
    const closeButton = find('.material-icons.close-icon');

    closeButton.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should close the dialog when the close() method is called', async () => {
    const { instance, get } = await shallow
      .mock(MatDialogRef, { close(): void { } })
      .render();
    const ref = get(MatDialogRef);

    instance.close();

    expect(ref.close).toHaveBeenCalled();
  });
});

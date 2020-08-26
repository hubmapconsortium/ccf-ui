import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { ReviewModalComponent } from './review-modal.component';
import { ReviewModalModule } from './review-modal.module';
import { RegistrationData } from '../../../core/models/registration-data';
import { XYZTriplet } from '../../../core/store/stage/stage.state';

const registrationData: RegistrationData = {
  firstName: 'Homer',
  lastName: 'Simpson',
  referenceOrgan: 'kidney, left, make, vh',
  tissueBlockSize: { x: 20, y: 10, z: 10 },
  tissueBlockPosition: { x: 10, y: 74, z: 16 },
  tissueBlockRotation: { x: 0, y: 358.75, z: 20.07 },
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
          registrationData
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
    const { instance, get } = await shallow
      .mock(MatDialogRef, { close(): void { } })
      .render();
    const ref = get(MatDialogRef);

    instance.close();

    expect(ref.close).toHaveBeenCalled();
  });

  it('should properly format XYZTriplets into strings', async () => {
    const { instance } = await shallow.render();
    const inputTest: XYZTriplet = { x: 1, y: 2, z: 3 };
    const result = instance.xyzTripletToString(inputTest);

    expect(result).toEqual('1, 2, 3');
  });
});

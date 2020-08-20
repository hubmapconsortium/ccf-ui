import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { ReviewModalComponent } from './review-modal.component';
import { ReviewModalModule } from './review-modal.module';

describe('ReviewModalComponent', () => {
  let shallow: Shallow<ReviewModalComponent>;

  beforeEach(() => {
    shallow = new Shallow(ReviewModalComponent, ReviewModalModule)
      .provide({ provide: MatDialogRef, useValue: {} })
      .provide({ provide: MAT_DIALOG_DATA, useValue: {} });
  });

  it('should call the close() method when the close button is pressed', async () => {
    const { find, instance } = await shallow.render();
    const spy = spyOn(instance, 'close');
    const closeButton = find('.close-icon');

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

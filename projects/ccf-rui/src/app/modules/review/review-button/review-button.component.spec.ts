import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subject } from 'rxjs';
import { Shallow } from 'shallow-render';

import { ReviewButtonComponent } from './review-button.component';
import { ReviewButtonModule } from './review-button.module';

describe('ReviewButtonComponent', () => {
  let shallow: Shallow<ReviewButtonComponent>;
  let afterClosedObservable: Subject<boolean>;
  const emptyMetaData = [{ value: '' }, { value: '' }, { value: '' }];
  const metaData = [{ value: 'First Name' }, { value: 'Last Name' }, { value: 'Organ' }];

  beforeEach(() => {
    const mockDialog = jasmine.createSpyObj<MatDialogRef<unknown, boolean>>('DialogRef', ['afterClosed']);
    afterClosedObservable = new Subject();
    mockDialog.afterClosed.and.returnValue(afterClosedObservable);

    shallow = new Shallow(ReviewButtonComponent, ReviewButtonModule)
      .mock(MatDialog, { open(): MatDialogRef<unknown, boolean> {
        return mockDialog;
      } });
  });

  it('should launch the review dialog if the registration is valid', async () => {
    const { find, instance } = await shallow.render({ bind: { registrationIsValid: true, metaData } });
    const spy = spyOn(instance, 'launchReviewModal');
    find('.review-button').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalled();
  });

  it('should not launch the review dialog if the registration is not valid', async () => {
    const { find, instance } = await shallow.render({ bind: { registrationIsValid: false, metaData: emptyMetaData } });
    const spy = spyOn(instance, 'launchReviewModal');
    find('.review-button').triggerEventHandler('click', '');
    expect(spy).not.toHaveBeenCalled();
  });

  it('launchReviewModal opens the modal', async () => {
    const { instance, get } = await shallow.render();
    instance.launchReviewModal();
    expect(get(MatDialog).open).toHaveBeenCalled();
  });

  it('should emit the event when the modal is closed via the download button', async () => {
    const { instance, outputs } = await shallow.render();
    instance.launchReviewModal();
    afterClosedObservable.next(true);

    expect(outputs.registerData.emit).toHaveBeenCalled();
  });

  it('should not emit the event when the modal is closed not via the download button', async () => {
    const { instance, outputs } = await shallow.render();
    instance.launchReviewModal();
    afterClosedObservable.next(false);

    expect(outputs.registerData.emit).not.toHaveBeenCalled();
  });

  it('prevents default', async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mockEvent = {
      preventDefault: () => undefined
    } as MouseEvent;
    const { instance } = await shallow.render();
    const spy = spyOn(mockEvent, 'preventDefault');
    instance.registerButtonClick(mockEvent);
    expect(spy).toHaveBeenCalled();
  });
});

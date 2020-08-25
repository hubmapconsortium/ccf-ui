import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { ReviewButtonComponent } from './review-button.component';
import { ReviewButtonModule } from './review-button.module';

describe('ReviewButtonComponent', () => {
  let shallow: Shallow<ReviewButtonComponent>;
  const mockMatDialog = {
    open(...args: unknown[]): MatDialogRef<unknown, unknown> {
      return undefined as unknown as MatDialogRef<unknown, unknown>;
    }
  };

  beforeEach(() => {
    shallow = new Shallow(ReviewButtonComponent, ReviewButtonModule);
  });

  it('should launch the review dialog', async () => {
    const { find, instance } = await shallow.mock(MatDialog, mockMatDialog).render();
    const spy = spyOn(instance, 'launchReviewModal');
    find('.review-button').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalled();
  });

  it('launchReviewModal opens the modal', async () => {
    const { instance, get } = await shallow.mock(MatDialog, mockMatDialog).render();
    instance.launchReviewModal();
    expect(get(MatDialog).open).toHaveBeenCalled();
  });
});

import { Shallow } from 'shallow-render';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { VideoModalComponent } from './video-modal.component';
import { VideoModalModule } from './video-modal.module';

describe('VideoModalComponent', () => {
  let shallow: Shallow<VideoModalComponent>;

  beforeEach(() => {
    shallow = new Shallow(VideoModalComponent, VideoModalModule)
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
    const { instance, inject } = await shallow
      .mock(MatDialogRef, { close(): void { /* Empty */ } })
      .render();
    const ref = inject(MatDialogRef);

    instance.close();

    expect(ref.close).toHaveBeenCalled();
  });
});

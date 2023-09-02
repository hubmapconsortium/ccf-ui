import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { VideoModalLauncherComponent } from './video-modal-launcher.component';
import { VideoModalLauncherModule } from './video-modal-launcher.module';


describe('VideoModalLauncherComponent', () => {
  let shallow: Shallow<VideoModalLauncherComponent>;

  beforeEach(() => {
    shallow = new Shallow(VideoModalLauncherComponent, VideoModalLauncherModule)
      .provideMock(MatDialog)
      .mock(MatDialog, {
        open: () => undefined as unknown as MatDialogRef<unknown, unknown>
      });
  });

  it('should launch the video modal', async () => {
    const { find, instance } = await shallow.render();
    const spy = spyOn(instance, 'launchVideoModal');
    find('mat-icon').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalled();
  });

  it('launchVideoModal opens the modal', async () => {
    const { instance, inject } = await shallow.render();
    instance.launchVideoModal();
    expect(inject(MatDialog).open).toHaveBeenCalled();
  });
});

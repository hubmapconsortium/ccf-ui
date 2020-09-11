import { Shallow } from 'shallow-render';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { VideoModalLauncherComponent } from './video-modal-launcher.component';
import { VideoModalLauncherModule } from './video-modal-launcher.module';

describe('VideoModalLauncherComponent', () => {
    let shallow: Shallow<VideoModalLauncherComponent>;
    const mockMatDialog = {
        open(...args: unknown[]): MatDialogRef<unknown, unknown> {
            return undefined as unknown as MatDialogRef<unknown, unknown>;
        }
    };

    beforeEach(() => {
        shallow = new Shallow(VideoModalLauncherComponent, VideoModalLauncherModule);
    });

    it('should launch the video modal', async () => {
        const { find, instance } = await shallow.mock(MatDialog, mockMatDialog).render();
        const spy = spyOn(instance, 'launchVideoModal');
        find('mat-icon').triggerEventHandler('click', '');
        expect(spy).toHaveBeenCalled();
    });

    it('launchVideoModal opens the modal', async () => {
        const { instance, get } = await shallow.mock(MatDialog, mockMatDialog).render();
        instance.launchVideoModal();
        expect(get(MatDialog).open).toHaveBeenCalled();
    });
});

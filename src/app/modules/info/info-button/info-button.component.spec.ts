import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { InfoButtonComponent } from './info-button.component';
import { InfoButtonModule } from './info-button.module';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';


describe('InfoButtonComponent', () => {
  let shallow: Shallow<InfoButtonComponent>;
  const mockMatDialog = {
    open(...args: unknown[]) {
      return undefined as unknown as MatDialogRef<unknown, unknown>;
    }
  };

  beforeEach(() => {
    shallow = new Shallow(InfoButtonComponent, InfoButtonModule);
  });

  it('should display the info icon', async () => {
    const { find } = await shallow.render();
    const nativeElement = find('mat-icon').nativeElement as HTMLElement;
    expect(nativeElement.textContent).toBe('info_outline');
  });

  it('should launch the info dialog', async () => {
    const { find, instance } = await shallow.mock(MatDialog, mockMatDialog).render();
    const spy = spyOn(instance, 'launchInfoDialog');
    find('mat-icon').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalled();
  });

  it('launchInfoDialog opens dialog box', async () => {
    const { find, instance } = await shallow
      .mock(MatDialog, mockMatDialog)
      .render();
    const spy = spyOn(mockMatDialog, 'open');
    instance.launchInfoDialog();
    expect(spy).toHaveBeenCalled();
  });
});

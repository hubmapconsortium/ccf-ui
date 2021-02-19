import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { InfoButtonComponent } from './info-button.component';
import { InfoButtonModule } from './info-button.module';


describe('InfoButtonComponent', () => {
  let shallow: Shallow<InfoButtonComponent>;
  const mockMatDialog = {
    open(...args: unknown[]): MatDialogRef<unknown, unknown> {
      return undefined as unknown as MatDialogRef<unknown, unknown>;
    }
  };

  beforeEach(() => {
    shallow = new Shallow(InfoButtonComponent, InfoButtonModule);
  });

  it('should display the info icon', async () => {
    const { find } = await shallow.render();
    const nativeElement = find('mat-icon').nativeElement as HTMLElement;
    expect(nativeElement.textContent?.trim()).toBe('info_outline');
  });

  it('should launch the info dialog', async () => {
    const { find, instance } = await shallow.mock(MatDialog, mockMatDialog).render();
    const spy = spyOn(instance, 'onDialogButtonClick');
    find('mat-icon').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalled();
  });

  it('launchInfoDialog opens dialog box', async () => {
    const { instance, get } = await shallow.mock(MatDialog, mockMatDialog).render();
    instance.onDialogButtonClick();
    expect(get(MatDialog).open).toHaveBeenCalled();
  });
});

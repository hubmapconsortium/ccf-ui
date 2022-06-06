import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { InfoButtonComponent } from './info-button.component';
import { InfoButtonModule } from './info-button.module';
import { DocumentationContent, InfoButtonService } from './info-button.service';
import { PanelData } from '../info-button/info-button.service';

describe('InfoButtonComponent', () => {
  let shallow: Shallow<InfoButtonComponent>;

  const mockMatDialog = {
    open(..._args: unknown[]): MatDialogRef<unknown, unknown> {
      return undefined as unknown as MatDialogRef<unknown, unknown>;
    },
    openDialogs: []
  };


  beforeEach(() => {
    shallow = new Shallow(InfoButtonComponent, InfoButtonModule);
  });

  it('should display the info icon', async () => {
    const { find } = await shallow.render();
    const nativeElement = find('mat-icon').nativeElement as HTMLElement;
    expect(nativeElement.textContent?.trim()).toBe('info');
  });

  it('should launch the info dialog', async () => {
    const { find, instance } = await shallow.mock(MatDialog, mockMatDialog).render();
    const spy = spyOn(instance, 'onDialogButtonClick');
    find('mat-icon').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalled();
  });

  it('launchInfoDialog opens dialog box', async () => {
    const { instance, get } = await shallow.mock(MatDialog, mockMatDialog).render();
    instance.launchInfoDialog({ content: [{} as DocumentationContent], infoTitle: '', videoID: '' });
    expect(get(MatDialog).open).toHaveBeenCalled();
  });

  it('launches the dialog when data is emitted from the service', async () => {
    const { instance, get } = await shallow.render();
    const spy = spyOn(instance, 'launchInfoDialog');
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    get(InfoButtonService).panelContent.next({ content: [{} as DocumentationContent], infoTitle: '', videoID: '' });
    expect(spy).toHaveBeenCalled();
  });

  it('does not launch the dialog when data is empty', async () => {
    const { instance, get } = await shallow.render();
    const spy = spyOn(instance, 'launchInfoDialog');
    get(InfoButtonService).panelContent.next({} as PanelData);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call onDialogButtonClick', async () => {
    const { instance, get } = await shallow.render();
    const spy = spyOn(get(InfoButtonService), 'updateData');
    instance.onDialogButtonClick();
    expect(spy).toHaveBeenCalled();
  });
});

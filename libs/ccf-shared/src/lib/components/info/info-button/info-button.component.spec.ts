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
    const { instance, inject } = await shallow.mock(MatDialog, mockMatDialog).render();
    const empty: DocumentationContent[] = [{ title: '', content: '' }];
    instance.launchInfoDialog({ content: empty, infoTitle: '', videoID: '' });
    expect(inject(MatDialog).open).toHaveBeenCalled();
  });

  it('launches the dialog when data is emitted from the service', async () => {
    const { instance, inject } = await shallow.render();
    const empty: DocumentationContent[] = [{ title: '', content: '' }];
    const spy = spyOn(instance, 'launchInfoDialog');
    inject(InfoButtonService).panelContent.next({ content: empty, infoTitle: '', videoID: '' });
    expect(spy).toHaveBeenCalled();
  });

  it('does not launch the dialog when data is empty', async () => {
    const { instance, inject } = await shallow.render();
    const spy = spyOn(instance, 'launchInfoDialog');
    inject(InfoButtonService).panelContent.next({ content: [] as DocumentationContent[] } as PanelData);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call onDialogButtonClick', async () => {
    const { instance, inject } = await shallow.render();
    const spy = spyOn(inject(InfoButtonService), 'updateData');
    instance.onDialogButtonClick();
    expect(spy).toHaveBeenCalled();
  });
});

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { InfoButtonComponent } from './info-button.component';
import { InfoButtonModule } from './info-button.module';
import { InfoButtonService } from './info-button.service';
import { DocumentationContent } from '../../../core/models/documentation';

describe('InfoButtonComponent', () => {
  let shallow: Shallow<InfoButtonComponent>;

  const mockMatDialog = {
    open(...args: unknown[]): MatDialogRef<unknown, unknown> {
      return undefined as unknown as MatDialogRef<unknown, unknown>;
    }
  };


  beforeEach(() => {
    shallow = new Shallow(InfoButtonComponent, InfoButtonModule)
      .mock(MatDialog, { open() { return {}; } });
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
    const { instance, get } = await shallow.render();
    instance.launchInfoDialog([]);
    expect(get(MatDialog).open).toHaveBeenCalled();
  });

  it('launches the dialog when data is emitted from the service', async () => {
    const { instance, get } = await shallow.render();
    const spy = spyOn(instance, 'launchInfoDialog');
    get(InfoButtonService).markdownContent.next([{} as DocumentationContent]);
    expect(spy).toHaveBeenCalled();
  });

  it('does not launch the dialog when data is empty', async () => {
    const { instance, get } = await shallow.render();
    const spy = spyOn(instance, 'launchInfoDialog');
    get(InfoButtonService).markdownContent.next([]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call onDialogButtonClick', async () => {
    const { instance, get } = await shallow.render();
    const spy = spyOn(get(InfoButtonService), 'readMarkdown');
    instance.onDialogButtonClick();
    expect(spy).toHaveBeenCalled();
  });
});

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { InfoButtonComponent } from './info-button.component';
import { InfoButtonModule } from './info-button.module';
import { InfoButtonService } from './info-button.service';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';

describe('InfoButtonComponent', () => {
  let shallow: Shallow<InfoButtonComponent>;
  let httpGet: jasmine.Spy;
  let service: InfoButtonService;

  const mockMatDialog = {
    open(...args: unknown[]): MatDialogRef<unknown, unknown> {
      return undefined as unknown as MatDialogRef<unknown, unknown>;
    }
  };


  beforeEach(() => {
    httpGet = jasmine.createSpy('get', () => EMPTY);
    shallow = new Shallow(InfoButtonComponent, InfoButtonModule)
      .provide({provide: HttpClient, useValue: {get: httpGet}})
    service = new InfoButtonService({get: httpGet} as unknown as HttpClient);
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
    const { instance, get } = await shallow
      .mock(MatDialog, mockMatDialog)
      .mock(InfoButtonService, service)
      .render();
    instance.onDialogButtonClick();
    expect(get(MatDialog).open).toHaveBeenCalled();
  });
});

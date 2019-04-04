import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';

import { AboutComponent } from '../../components/about/about.component';
import { AboutModalService } from './about-modal.service';

describe('AboutModalService', () => {
  let matDialog: MatDialog;
  let service: AboutModalService;

  const mockedMatDialog = {
    afterOpened: new Subject(),
    afterAllClosed: new Subject(),
    closeAll: (): void => undefined,
    open: (): void => undefined,
  };

  const mockedProviders: Provider[] = [
    { provide: MatDialog, useValue: mockedMatDialog }
  ];

  beforeEach(() => TestBed.configureTestingModule({
    providers: mockedProviders
  }));

  beforeEach(() => {
    service = TestBed.get(AboutModalService);
    matDialog = TestBed.get(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the modal', () => {
    const openSpy = spyOn(matDialog, 'open');
    service.openAbout();
    expect(openSpy).toHaveBeenCalledWith(AboutComponent, {
      width: '50rem'
    });
  });

  it('should close the modal', () => {
    const closeSpy = spyOn(matDialog, 'closeAll');
    service.closeAbout();
    expect(closeSpy).toHaveBeenCalled();
  });
});

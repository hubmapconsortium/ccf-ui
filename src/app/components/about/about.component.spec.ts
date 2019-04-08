import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatIconModule } from '@angular/material';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let matDialog: MatDialog;
  const mockMatDialog = {
    closeAll: (): void => undefined
  };

  beforeEach(async(() => {
    const mockProviders: Provider[] = [
      { provide: MatDialog, useValue: mockMatDialog }
    ];
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      providers: mockProviders,
      imports: [ MatIconModule, MatDialogModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    const closeAllSpy = spyOn(matDialog, 'closeAll');
    component.close();
    expect(closeAllSpy).toHaveBeenCalled();
  });
});

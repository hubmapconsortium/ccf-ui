import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { MockModule } from 'ng-mocks';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const mockMatDialog = {
    closeAll: (): void => undefined
  };

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MockModule(MatIconModule)],
      declarations: [HeaderComponent],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create app logo', () => {
    const appLogo: DebugElement = fixture.debugElement.query(By.css('.logo'));
    expect(appLogo).not.toBeNull();
  });

  it('should create about icon', () => {
    const aboutIcon: DebugElement = fixture.debugElement.query(By.css('.about'));
    expect(aboutIcon).not.toBeNull();
  });
});

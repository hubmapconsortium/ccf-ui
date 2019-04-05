import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponents } from 'ng-mocks';

import { AboutIconComponent } from './icons/about-icon/about-icon.component';
import { LogoComponent } from './icons/logo/logo.component';
import { ToolbarComponent } from './toolbar.component';

fdescribe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent, MockComponents(LogoComponent, AboutIconComponent)]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create app logo', () => {
    const appLogo: DebugElement = fixture.debugElement.query(By.css('ccf-logo'));
    expect(appLogo).not.toBeNull();
  });

  it('should create about icon', () => {
    const aboutIcon: DebugElement = fixture.debugElement.query(By.css('ccf-about-icon'));
    expect(aboutIcon).not.toBeNull();
  });
});

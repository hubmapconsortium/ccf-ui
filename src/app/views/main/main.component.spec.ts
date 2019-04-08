import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MockModule } from 'ng-mocks';

import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { LeftbarModule } from '../../components/leftbar/leftbar.module';
import { SidenavModule } from '../../components/sidenav/sidenav.module';
import { MainComponent } from './main.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule, NoopAnimationsModule, MockModule(RouterModule),
        MockModule(ToolbarModule), MockModule(LeftbarModule),
        MockModule(SidenavModule)
      ],
      declarations: [MainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the toolbar', () => {
    const toolbar: DebugElement = fixture.debugElement.query(By.css('ccf-toolbar'));
    expect(toolbar).not.toBeNull();
  });

  it('should render the leftbar', () => {
    const leftbar: DebugElement = fixture.debugElement.query(By.css('ccf-leftbar'));
    expect(leftbar).not.toBeNull();
  });

  it('should render Material drawer', () => {
    const drawer: DebugElement = fixture.debugElement.query(By.css('.drawer'));
    expect(drawer).not.toBeNull();
  });

  it('should render sidenav', () => {
    const sidenav: DebugElement = fixture.debugElement.query(By.css('.sidenav'));
    expect(sidenav).not.toBeNull();
  });
});

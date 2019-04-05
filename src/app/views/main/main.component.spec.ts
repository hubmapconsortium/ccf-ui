import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponents } from 'ng-mocks';
import { DataviewComponent } from 'src/app/components/dataview/dataview.component';
import { LeftbarComponent } from 'src/app/components/leftbar/leftbar.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';

import { MainComponent } from './main.component';
import { DebugElement } from '@angular/core';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent,
        MockComponents(ToolbarComponent, LeftbarComponent, SidenavComponent, DataviewComponent)],
        imports: [MatSidenavModule, BrowserAnimationsModule]
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

  it('should render dataview', () => {
    const dataview: DebugElement = fixture.debugElement.query(By.css('.dataview'));
    expect(dataview).not.toBeNull();
  });

  it('should render sidenav', () => {
    const sidenav: DebugElement = fixture.debugElement.query(By.css('.sidenav'));
    expect(sidenav).not.toBeNull();
  });
});

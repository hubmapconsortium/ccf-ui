import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponents, MockRender } from 'ng-mocks';

import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<{ }>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MockComponents(MainComponent)]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`<ccf-root></ccf-root>`);
    element = fixture.debugElement.query(By.directive(AppComponent));
    component = element.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});

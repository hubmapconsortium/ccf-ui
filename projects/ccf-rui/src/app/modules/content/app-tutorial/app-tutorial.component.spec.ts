import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTutorialComponent } from './app-tutorial.component';

describe('AppTutorialComponent', () => {
  let component: AppTutorialComponent;
  let fixture: ComponentFixture<AppTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsBrowserComponent } from './results-browser.component';

describe('ResultsBrowserComponent', () => {
  let component: ResultsBrowserComponent;
  let fixture: ComponentFixture<ResultsBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

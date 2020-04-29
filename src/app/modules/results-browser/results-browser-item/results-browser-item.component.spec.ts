import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsBrowserItemComponent } from './results-browser-item.component';

describe('ResultsBrowserItemComponent', () => {
  let component: ResultsBrowserItemComponent;
  let fixture: ComponentFixture<ResultsBrowserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsBrowserItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsBrowserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

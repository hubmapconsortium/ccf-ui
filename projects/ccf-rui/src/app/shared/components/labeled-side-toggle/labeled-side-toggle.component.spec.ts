import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledSideToggleComponent } from './labeled-side-toggle.component';

describe('LabeledSideToggleComponent', () => {
  let component: LabeledSideToggleComponent;
  let fixture: ComponentFixture<LabeledSideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeledSideToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledSideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

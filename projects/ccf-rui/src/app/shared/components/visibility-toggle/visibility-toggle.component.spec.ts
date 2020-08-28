import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityToggleComponent } from './visibility-toggle.component';

describe('VisibilityToggleComponent', () => {
  let component: VisibilityToggleComponent;
  let fixture: ComponentFixture<VisibilityToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisibilityToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

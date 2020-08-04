import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationSliderComponent } from './rotation-slider.component';

describe('RotationSliderComponent', () => {
  let component: RotationSliderComponent;
  let fixture: ComponentFixture<RotationSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

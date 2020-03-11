import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualSliderComponent } from './dual-slider.component';

describe('SliderComponent', () => {
  let component: DualSliderComponent;
  let fixture: ComponentFixture<DualSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
